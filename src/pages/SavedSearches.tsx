import { useNavigate } from 'react-router-dom';
import { Search, Trash2, Play } from 'lucide-react';
import { useStore } from '@/lib/store';

export default function SavedSearches() {
  const savedSearches = useStore((s) => s.savedSearches);
  const deleteSearch = useStore((s) => s.deleteSearch);
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Saved Searches</h1>
        <p className="text-sm text-muted-foreground mt-1">{savedSearches.length} saved searches</p>
      </div>

      {savedSearches.length === 0 ? (
        <div className="text-center py-16">
          <Search className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No saved searches yet.</p>
          <p className="text-sm text-muted-foreground mt-1">Run a search and click "Save Search" to track it.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedSearches.map((ss) => (
            <div key={ss.id} className="rounded-lg border border-border bg-card p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-sm font-semibold text-foreground">{ss.name}</h3>
                <button onClick={() => deleteSearch(ss.id)} className="p-1 rounded hover:bg-secondary text-muted-foreground hover:text-destructive">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
              {ss.query && (
                <span className="inline-block px-2 py-0.5 rounded bg-secondary text-xs font-mono text-muted-foreground mb-2">"{ss.query}"</span>
              )}
              <div className="flex flex-wrap gap-1 mb-3">
                {ss.filters.stages.map((s) => (
                  <span key={s} className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary">{s}</span>
                ))}
                {ss.filters.sectors.map((s) => (
                  <span key={s} className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">{s}</span>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{ss.resultCount} results</span>
                <button
                  onClick={() => navigate(`/companies?saved=${encodeURIComponent(ss.id)}`)}
                  className="flex items-center gap-1 text-xs text-primary hover:underline"
                >
                  <Play className="h-3 w-3" /> Run Search
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
