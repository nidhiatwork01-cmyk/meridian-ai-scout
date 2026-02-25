import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Save, LayoutList, LayoutGrid } from 'lucide-react';
import { useStore } from '@/lib/store';
import { CompanyFilters } from '@/components/companies/CompanyFilters';
import { CompanyTable } from '@/components/companies/CompanyTable';
import { StageBadge } from '@/components/companies/StageBadge';
import { CompanyLogo } from '@/components/companies/CompanyLogo';
import { FilterState } from '@/lib/types';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

const defaultFilters: FilterState = {
  query: '',
  stages: [],
  sectors: [],
  countries: [],
  foundedRange: [2000, 2025],
  employeeRanges: [],
  thesisMatchMin: null,
};

export default function Companies() {
  const companies = useStore((s) => s.companies);
  const savedSearches = useStore((s) => s.savedSearches);
  const saveSearch = useStore((s) => s.saveSearch);
  const runSavedSearch = useStore((s) => s.runSavedSearch);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  const filtered = useMemo(() => {
    return companies.filter((c) => {
      if (filters.query) {
        const q = filters.query.toLowerCase();
        if (
          !c.name.toLowerCase().includes(q) &&
          !c.sector.toLowerCase().includes(q) &&
          !c.domain.toLowerCase().includes(q) &&
          !c.tags.some((t) => t.toLowerCase().includes(q))
        )
          return false;
      }
      if (filters.stages.length && !filters.stages.includes(c.stage)) return false;
      if (filters.sectors.length && !filters.sectors.includes(c.sector)) return false;
      if (filters.thesisMatchMin && c.thesisMatch < filters.thesisMatchMin) return false;
      return true;
    });
  }, [companies, filters]);

  const handleSaveSearch = () => {
    const defaultName = filters.query ? `Search: ${filters.query}` : `Search ${new Date().toLocaleDateString()}`;
    const name = window.prompt('Save this search as:', defaultName)?.trim();
    if (!name) return;

    saveSearch({
      name,
      query: filters.query,
      filters,
      resultCount: filtered.length,
    });

    toast({
      title: 'Search saved',
      description: `"${name}" saved with ${filtered.length} result${filtered.length === 1 ? '' : 's'}.`,
    });
  };

  useEffect(() => {
    const savedId = searchParams.get('saved');
    if (!savedId) return;

    const matched = savedSearches.find((ss) => ss.id === savedId);
    if (matched) {
      setFilters(matched.filters);
      setViewMode('table');
      runSavedSearch(savedId);
      toast({
        title: 'Saved search loaded',
        description: `Applied "${matched.name}".`,
      });
    } else {
      toast({
        title: 'Saved search not found',
        description: 'The selected saved search no longer exists.',
      });
    }

    const next = new URLSearchParams(searchParams);
    next.delete('saved');
    setSearchParams(next, { replace: true });
  }, [runSavedSearch, savedSearches, searchParams, setSearchParams]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Discover Companies</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {filtered.length} companies found
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleSaveSearch}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity w-full sm:w-auto"
          >
            <Save className="h-4 w-4" />
            Save Search
          </button>
          <div className="flex items-center rounded-md border border-border bg-secondary/40 p-0.5">
            <button
              onClick={() => setViewMode('table')}
              className={cn(
                'h-8 w-10 inline-flex items-center justify-center rounded-md transition-colors',
                viewMode === 'table' ? 'bg-background text-foreground' : 'text-muted-foreground hover:text-foreground'
              )}
              aria-label="Table view"
              title="Table view"
            >
              <LayoutList className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                'h-8 w-10 inline-flex items-center justify-center rounded-md transition-colors',
                viewMode === 'grid' ? 'bg-background text-foreground' : 'text-muted-foreground hover:text-foreground'
              )}
              aria-label="Grid view"
              title="Grid view"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <CompanyFilters filters={filters} onChange={setFilters} />
      {viewMode === 'table' ? (
        <CompanyTable data={filtered} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((c) => (
            <button
              key={c.id}
              onClick={() => navigate(`/companies/${c.id}`)}
              className="rounded-lg border border-border bg-card p-4 text-left hover:bg-secondary/30 transition-colors"
            >
              <div className="flex items-start gap-3">
                <CompanyLogo name={c.name} logo={c.logo} size="md" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-foreground truncate">{c.name}</p>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">{c.tagline}</p>
                </div>
                <StageBadge stage={c.stage} />
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div className="text-muted-foreground">Sector</div>
                <div className="text-foreground text-right truncate">{c.sector}</div>
                <div className="text-muted-foreground">HQ</div>
                <div className="text-foreground text-right truncate">{c.hq}</div>
                <div className="text-muted-foreground">Last Round</div>
                <div className="text-foreground text-right truncate">{c.lastRound}</div>
                <div className="text-muted-foreground">Match</div>
                <div className="text-foreground text-right">{c.thesisMatch}%</div>
              </div>
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full rounded-lg border border-border bg-card p-8 text-center text-sm text-muted-foreground">
              No companies found for current filters.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
