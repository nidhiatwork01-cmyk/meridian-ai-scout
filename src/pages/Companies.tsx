import { useMemo, useState } from 'react';
import { useStore } from '@/lib/store';
import { CompanyFilters } from '@/components/companies/CompanyFilters';
import { CompanyTable } from '@/components/companies/CompanyTable';
import { FilterState } from '@/lib/types';

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
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Discover Companies</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {filtered.length} companies found
          </p>
        </div>
      </div>

      <CompanyFilters filters={filters} onChange={setFilters} />
      <CompanyTable data={filtered} />
    </div>
  );
}
