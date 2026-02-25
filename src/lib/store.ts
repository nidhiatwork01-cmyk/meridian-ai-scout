import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Company, List, SavedSearch, SearchState, EnrichResult } from './types';
import { companies as seedCompanies } from './mock-data';

interface PersistedData {
  lists: List[];
  savedSearches: SavedSearch[];
  companyNotes: Record<string, string>;
  companyLists: Record<string, string[]>;
}

interface AppState extends PersistedData {
  companies: Company[];
  commandPaletteOpen: boolean;
  createList: (name: string, description?: string, color?: string) => void;
  deleteList: (id: string) => void;
  addCompanyToList: (companyId: string, listId: string) => void;
  removeCompanyFromList: (companyId: string, listId: string) => void;
  saveSearch: (search: SearchState) => void;
  runSavedSearch: (id: string) => void;
  deleteSearch: (id: string) => void;
  updateNote: (companyId: string, note: string) => void;
  updateEnrichment: (companyId: string, result: EnrichResult) => void;
  setCommandPaletteOpen: (open: boolean) => void;
}

const uid = () => Math.random().toString(36).substring(2, 10);

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      companies: seedCompanies,
      lists: [
        { id: 'list-1', name: 'Top AI Companies', description: 'High-conviction AI infrastructure plays', companyIds: ['co_3', 'co_8', 'co_38', 'co_39'], createdAt: '2024-01-15', color: 'teal' },
        { id: 'list-2', name: 'Series A Targets', description: 'Companies ready for Series A investment', companyIds: ['co_11', 'co_12', 'co_16'], createdAt: '2024-02-01', color: 'blue' },
      ],
      savedSearches: [],
      companyNotes: {},
      companyLists: {},
      commandPaletteOpen: false,

      createList: (name, description = '', color = 'teal') =>
        set((s) => ({
          lists: [...s.lists, { id: uid(), name, description, companyIds: [], createdAt: new Date().toISOString(), color }],
        })),

      deleteList: (id) =>
        set((s) => ({ lists: s.lists.filter((l) => l.id !== id) })),

      addCompanyToList: (companyId, listId) =>
        set((s) => ({
          lists: s.lists.map((l) =>
            l.id === listId && !l.companyIds.includes(companyId)
              ? { ...l, companyIds: [...l.companyIds, companyId] }
              : l
          ),
        })),

      removeCompanyFromList: (companyId, listId) =>
        set((s) => ({
          lists: s.lists.map((l) =>
            l.id === listId ? { ...l, companyIds: l.companyIds.filter((id) => id !== companyId) } : l
          ),
        })),

      saveSearch: (search) =>
        set((s) => ({
          savedSearches: [
            ...s.savedSearches,
            {
              id: uid(),
              name: search.name,
              query: search.query,
              filters: search.filters,
              resultCount: search.resultCount,
              createdAt: new Date().toISOString(),
              lastRunAt: new Date().toISOString(),
            },
          ],
        })),

      runSavedSearch: (id) =>
        set((s) => ({
          savedSearches: s.savedSearches.map((ss) =>
            ss.id === id ? { ...ss, lastRunAt: new Date().toISOString() } : ss
          ),
        })),

      deleteSearch: (id) =>
        set((s) => ({ savedSearches: s.savedSearches.filter((ss) => ss.id !== id) })),

      updateNote: (companyId, note) =>
        set((s) => ({
          companyNotes: { ...s.companyNotes, [companyId]: note },
        })),

      updateEnrichment: (companyId, result) =>
        set((s) => ({
          companies: s.companies.map((c) => (c.id === companyId ? { ...c, enriched: result } : c)),
        })),

      setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
    }),
    {
      name: 'meridian-store-v2',
      partialize: (state) => ({
        lists: state.lists,
        savedSearches: state.savedSearches,
        companyNotes: state.companyNotes,
        companyLists: state.companyLists,
      }),
    }
  )
);
