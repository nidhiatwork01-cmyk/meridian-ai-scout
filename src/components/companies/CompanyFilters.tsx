import { useState } from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { FilterState, Stage } from '@/lib/types';
import { cn } from '@/lib/utils';

const stages: Stage[] = ['Pre-Seed', 'Seed', 'Series A', 'Series B', 'Series C+'];
const sectors = ['Developer Tools', 'AI Infrastructure', 'FinTech', 'HealthTech', 'Climate', 'B2B SaaS', 'Security', 'Data Infrastructure'];

interface Props {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

export function CompanyFilters({ filters, onChange }: Props) {
  const [showMore, setShowMore] = useState(false);

  const toggleStage = (stage: Stage) => {
    const next = filters.stages.includes(stage)
      ? filters.stages.filter((s) => s !== stage)
      : [...filters.stages, stage];
    onChange({ ...filters, stages: next });
  };

  const toggleSector = (sector: string) => {
    const next = filters.sectors.includes(sector)
      ? filters.sectors.filter((s) => s !== sector)
      : [...filters.sectors, sector];
    onChange({ ...filters, sectors: next });
  };

  const hasActiveFilters = filters.stages.length > 0 || filters.sectors.length > 0 || filters.thesisMatchMin !== null;

  return (
    <div className="space-y-3">
      {/* Search */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search companies by name, sector, tags..."
            value={filters.query}
            onChange={(e) => onChange({ ...filters, query: e.target.value })}
            className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-secondary/50 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary transition-all"
          />
        </div>
        <button
          onClick={() => setShowMore(!showMore)}
          className={cn(
            'flex items-center justify-center sm:justify-start gap-2 px-3 h-9 rounded-md border text-sm font-medium transition-colors',
            showMore ? 'bg-primary text-primary-foreground border-primary' : 'border-border bg-secondary/50 text-muted-foreground hover:text-foreground'
          )}
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Filters
        </button>
      </div>

      {/* Filter chips */}
      {showMore && (
        <div className="space-y-3 animate-in slide-in-from-top-2">
          <div>
            <span className="text-xs font-medium text-muted-foreground mb-1.5 block">Stage</span>
            <div className="flex flex-wrap gap-1.5">
              {stages.map((s) => (
                <button
                  key={s}
                  onClick={() => toggleStage(s)}
                  className={cn(
                    'px-2.5 py-1 rounded-md text-xs font-medium border transition-colors',
                    filters.stages.includes(s)
                      ? 'bg-primary/15 text-primary border-primary/30'
                      : 'bg-secondary/50 text-muted-foreground border-border hover:text-foreground'
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <span className="text-xs font-medium text-muted-foreground mb-1.5 block">Sector</span>
            <div className="flex flex-wrap gap-1.5">
              {sectors.map((s) => (
                <button
                  key={s}
                  onClick={() => toggleSector(s)}
                  className={cn(
                    'px-2.5 py-1 rounded-md text-xs font-medium border transition-colors',
                    filters.sectors.includes(s)
                      ? 'bg-primary/15 text-primary border-primary/30'
                      : 'bg-secondary/50 text-muted-foreground border-border hover:text-foreground'
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.thesisMatchMin === 70}
                onChange={(e) => onChange({ ...filters, thesisMatchMin: e.target.checked ? 70 : null })}
                className="rounded border-border accent-primary"
              />
              <span className="text-xs text-muted-foreground">Thesis Match &gt;70% only</span>
            </label>
          </div>
        </div>
      )}

      {/* Active filters */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 flex-wrap">
          {filters.stages.map((s) => (
            <span key={s} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-primary/10 text-primary text-xs">
              {s} <button onClick={() => toggleStage(s)}><X className="h-3 w-3" /></button>
            </span>
          ))}
          {filters.sectors.map((s) => (
            <span key={s} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-primary/10 text-primary text-xs">
              {s} <button onClick={() => toggleSector(s)}><X className="h-3 w-3" /></button>
            </span>
          ))}
          {filters.thesisMatchMin && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-primary/10 text-primary text-xs">
              Match ≥{filters.thesisMatchMin}% <button onClick={() => onChange({ ...filters, thesisMatchMin: null })}><X className="h-3 w-3" /></button>
            </span>
          )}
          <button
            onClick={() => onChange({ query: '', stages: [], sectors: [], countries: [], foundedRange: [2000, 2025], employeeRanges: [], thesisMatchMin: null })}
            className="text-xs text-muted-foreground hover:text-foreground underline"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
