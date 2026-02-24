import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Download, BookMarked } from 'lucide-react';
import { useStore } from '@/lib/store';
import { cn } from '@/lib/utils';

const listColors = ['teal', 'blue', 'orange', 'purple', 'red', 'green'];
const colorMap: Record<string, string> = {
  teal: 'border-l-primary', blue: 'border-l-info', orange: 'border-l-warning',
  purple: 'border-l-stage-preseed', red: 'border-l-destructive', green: 'border-l-success',
};

export default function Lists() {
  const lists = useStore((s) => s.lists);
  const companies = useStore((s) => s.companies);
  const createList = useStore((s) => s.createList);
  const deleteList = useStore((s) => s.deleteList);
  const removeCompanyFromList = useStore((s) => s.removeCompanyFromList);
  const navigate = useNavigate();
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newColor, setNewColor] = useState('teal');
  const [expandedList, setExpandedList] = useState<string | null>(null);

  const handleCreate = () => {
    if (!newName.trim()) return;
    createList(newName, newDesc, newColor);
    setNewName('');
    setNewDesc('');
    setShowCreate(false);
  };

  const exportCSV = (listId: string) => {
    const list = lists.find((l) => l.id === listId);
    if (!list) return;
    const items = companies.filter((c) => list.companyIds.includes(c.id));
    const header = 'Name,Domain,Stage,Sector,HQ,Founded,Last Round,Thesis Match\n';
    const rows = items.map((c) => `${c.name},${c.domain},${c.stage},${c.sector},${c.hq},${c.founded},${c.lastRound},${c.thesisMatch}%`).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${list.name}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Lists</h1>
          <p className="text-sm text-muted-foreground mt-1">{lists.length} lists</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="h-4 w-4" /> New List
        </button>
      </div>

      {/* Create modal */}
      {showCreate && (
        <div className="rounded-lg border border-border bg-card p-5 space-y-4">
          <input
            type="text"
            placeholder="List name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full h-9 px-3 rounded-md border border-border bg-secondary/50 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary"
            autoFocus
          />
          <textarea
            placeholder="Description (optional)"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            className="w-full h-20 px-3 py-2 rounded-md border border-border bg-secondary/50 text-sm text-foreground outline-none resize-none focus:ring-1 focus:ring-primary"
          />
          <div className="flex gap-2">
            {listColors.map((c) => (
              <button
                key={c}
                onClick={() => setNewColor(c)}
                className={cn('h-6 w-6 rounded-full border-2 transition-all', c === newColor ? 'border-foreground scale-110' : 'border-transparent')}
                style={{ backgroundColor: `hsl(var(--${c === 'teal' ? 'primary' : c === 'blue' ? 'info' : c === 'orange' ? 'warning' : c === 'purple' ? 'stage-preseed' : c === 'red' ? 'destructive' : 'success'}))` }}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={handleCreate} className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium">Create</button>
            <button onClick={() => setShowCreate(false)} className="px-4 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground">Cancel</button>
          </div>
        </div>
      )}

      {/* List grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {lists.map((list) => {
          const listCompanies = companies.filter((c) => list.companyIds.includes(c.id));
          const expanded = expandedList === list.id;
          return (
            <div key={list.id} className={cn('rounded-lg border border-border bg-card border-l-4 overflow-hidden', colorMap[list.color] || 'border-l-primary')}>
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div className="cursor-pointer" onClick={() => setExpandedList(expanded ? null : list.id)}>
                    <h3 className="text-sm font-semibold text-foreground">{list.name}</h3>
                    {list.description && <p className="text-xs text-muted-foreground mt-0.5">{list.description}</p>}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs bg-secondary rounded-full px-2 py-0.5 text-muted-foreground">{listCompanies.length}</span>
                    <button onClick={() => exportCSV(list.id)} className="p-1 rounded hover:bg-secondary text-muted-foreground"><Download className="h-3.5 w-3.5" /></button>
                    <button onClick={() => deleteList(list.id)} className="p-1 rounded hover:bg-secondary text-muted-foreground hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
                  </div>
                </div>
              </div>
              {expanded && (
                <div className="border-t border-border p-3 space-y-1.5 bg-secondary/20">
                  {listCompanies.length === 0 ? (
                    <p className="text-xs text-muted-foreground text-center py-3">No companies in this list</p>
                  ) : (
                    listCompanies.map((c) => (
                      <div key={c.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-secondary/50">
                        <img src={c.logo} alt="" className="h-6 w-6 rounded bg-secondary object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                        <button onClick={() => navigate(`/companies/${c.id}`)} className="flex-1 text-left text-sm text-foreground hover:text-primary">{c.name}</button>
                        <span className="text-xs text-muted-foreground">{c.stage}</span>
                        <button onClick={() => removeCompanyFromList(c.id, list.id)} className="text-xs text-muted-foreground hover:text-destructive">✕</button>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {lists.length === 0 && (
        <div className="text-center py-16">
          <BookMarked className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No lists yet. Create one to start organizing companies.</p>
        </div>
      )}
    </div>
  );
}
