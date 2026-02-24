import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Company, List, SavedSearch, SearchState, EnrichResult, FilterState } from './types';
import { companies as seedCompanies } from './mock-data';

interface AppState {
  companies: Company[];
  lists: List[];
  savedSearches: SavedSearch[];
  commandPaletteOpen: boolean;

  // Lists
  createList: (name: string, description?: string, color?: string) => void;
  deleteList: (id: string) => void;
  addCompanyToList: (companyId: string, listId: string) => void;
  removeCompanyFromList: (companyId: string, listId: string) => void;

  // Saved Searches
  saveSearch: (search: SearchState) => void;
  deleteSearch: (id: string) => void;

  // Notes
  updateNote: (companyId: string, note: string) => void;

  // Enrichment
  updateEnrichment: (companyId: string, result: EnrichResult) => void;

  // UI
  setCommandPaletteOpen: (open: boolean) => void;
}

const uid = () => Math.random().toString(36).substring(2, 10);

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      companies: seedCompanies,
      lists: [
        { id: 'list-1', name: 'Top AI Companies', description: 'High-conviction AI infrastructure plays', companyIds: ['c_3', 'c_8', 'c_38', 'c_39'], createdAt: '2024-01-15', color: 'teal' },
        { id: 'list-2', name: 'Series A Targets', description: 'Companies ready for Series A investment', companyIds: ['c_11', 'c_12', 'c_16'], createdAt: '2024-02-01', color: 'blue' },
      ],
      savedSearches: [],
      commandPaletteOpen: false,

      createList: (name, description = '', color = 'teal') =>
        set((s) => ({
          lists: [...s.lists, { id: uid(), name, description, companyIds: [], createdAt: new Date().toISOString(), color }],
        })),

      deleteList: (id) =>
        set((s) => ({
          lists: s.lists.filter((l) => l.id !== id),
          companies: s.companies.map((c) => ({
            ...c,
            savedToLists: c.savedToLists.filter((lid) => lid !== id),
          })),
        })),

      addCompanyToList: (companyId, listId) =>
        set((s) => ({
          lists: s.lists.map((l) =>
            l.id === listId && !l.companyIds.includes(companyId)
              ? { ...l, companyIds: [...l.companyIds, companyId] }
              : l
          ),
          companies: s.companies.map((c) =>
            c.id === companyId && !c.savedToLists.includes(listId)
              ? { ...c, savedToLists: [...c.savedToLists, listId] }
              : c
          ),
        })),

      removeCompanyFromList: (companyId, listId) =>
        set((s) => ({
          lists: s.lists.map((l) =>
            l.id === listId ? { ...l, companyIds: l.companyIds.filter((id) => id !== companyId) } : l
          ),
          companies: s.companies.map((c) =>
            c.id === companyId ? { ...c, savedToLists: c.savedToLists.filter((id) => id !== listId) } : c
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

      deleteSearch: (id) =>
        set((s) => ({ savedSearches: s.savedSearches.filter((ss) => ss.id !== id) })),

      updateNote: (companyId, note) =>
        set((s) => ({
          companies: s.companies.map((c) => (c.id === companyId ? { ...c, notes: note } : c)),
        })),

      updateEnrichment: (companyId, result) =>
        set((s) => ({
          companies: s.companies.map((c) => (c.id === companyId ? { ...c, enriched: result } : c)),
        })),

      setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
    }),
    {
      name: 'meridian-store',
      partialize: (state) => ({
        lists: state.lists,
        savedSearches: state.savedSearches,
        companies: state.companies.map((c) => ({
          ...c,
          // Only persist user data
        })),
      }),
    }
  )
);
