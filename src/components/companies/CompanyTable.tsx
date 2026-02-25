import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
  SortingState,
} from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal, ExternalLink, BookMarked } from 'lucide-react';
import { Company } from '@/lib/types';
import { StageBadge } from './StageBadge';
import { CompanyLogo } from './CompanyLogo';
import { cn } from '@/lib/utils';

const col = createColumnHelper<Company>();

export function CompanyTable({ data }: { data: Company[] }) {
  const navigate = useNavigate();
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo(
    () => [
      col.accessor('name', {
        header: 'Company',
        cell: ({ row }) => (
          <div className="flex items-center gap-3 min-w-[200px]">
            <CompanyLogo name={row.original.name} logo={row.original.logo} size="md" />
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{row.original.name}</p>
              <p className="text-xs text-muted-foreground truncate">{row.original.tagline}</p>
            </div>
          </div>
        ),
      }),
      col.accessor('stage', {
        header: 'Stage',
        cell: ({ getValue }) => <StageBadge stage={getValue()} />,
      }),
      col.accessor('sector', {
        header: 'Sector',
        cell: ({ getValue }) => <span className="text-sm text-muted-foreground">{getValue()}</span>,
      }),
      col.accessor('hq', {
        header: 'HQ',
        cell: ({ getValue }) => <span className="text-sm text-muted-foreground">{getValue()}</span>,
      }),
      col.accessor('lastRound', {
        header: 'Last Round',
        cell: ({ row }) => (
          <div>
            <span className="text-sm text-foreground">{row.original.lastRound}</span>
            <span className="text-xs text-muted-foreground ml-1">({row.original.lastRoundDate})</span>
          </div>
        ),
      }),
      col.accessor('thesisMatch', {
        header: 'Thesis Match',
        cell: ({ getValue }) => {
          const v = getValue();
          const color = v >= 80 ? 'bg-success' : v >= 60 ? 'bg-warning' : 'bg-destructive';
          return (
            <div className="flex items-center gap-2 min-w-[100px]">
              <div className="flex-1 h-1.5 rounded-full bg-secondary">
                <div className={cn('h-full rounded-full transition-all', color)} style={{ width: `${v}%` }} />
              </div>
              <span className="text-xs font-mono text-muted-foreground w-8 text-right">{v}%</span>
            </div>
          );
        },
      }),
      col.accessor('signalScore', {
        header: 'Signals',
        cell: ({ getValue, row }) => (
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono text-foreground">{getValue()}</span>
            <span className="text-xs text-muted-foreground">({row.original.signals.length})</span>
          </div>
        ),
      }),
      col.display({
        id: 'actions',
        cell: ({ row }) => (
          <button
            onClick={(e) => { e.stopPropagation(); }}
            className="p-1 rounded hover:bg-secondary text-muted-foreground"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
        ),
      }),
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 20 } },
  });

  return (
    <div>
      <div className="rounded-lg border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id} className="border-b border-border bg-secondary/30">
                {hg.headers.map((h) => (
                  <th
                    key={h.id}
                    className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground select-none"
                    onClick={h.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-1">
                      {flexRender(h.column.columnDef.header, h.getContext())}
                      {h.column.getCanSort() && <ArrowUpDown className="h-3 w-3" />}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                onClick={() => navigate(`/companies/${row.original.id}`)}
                className="border-b border-border hover:bg-secondary/30 cursor-pointer transition-colors"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-xs text-muted-foreground">
          Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
          {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, data.length)} of {data.length}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1.5 text-xs rounded-md border border-border bg-secondary/50 text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
          >
            Previous
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1.5 text-xs rounded-md border border-border bg-secondary/50 text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
