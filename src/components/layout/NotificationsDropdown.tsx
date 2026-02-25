import { useState, useRef, useEffect, useMemo } from 'react';
import { Bell, ExternalLink } from 'lucide-react';
import { useStore } from '@/lib/store';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function NotificationsDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const companies = useStore((s) => s.companies);

  // Gather all signals across companies, sorted newest first
  const notifications = useMemo(() => {
    const all: { companyId: string; companyName: string; signal: typeof companies[0]['signals'][0] }[] = [];
    for (const c of companies) {
      for (const s of c.signals) {
        all.push({ companyId: c.id, companyName: c.name, signal: s });
      }
    }
    return all.sort((a, b) => b.signal.date.localeCompare(a.signal.date)).slice(0, 20);
  }, [companies]);

  const [readIds, setReadIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('meridian-read-notifs');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch { return new Set(); }
  });

  const unreadCount = notifications.filter((n) => !readIds.has(n.signal.id)).length;

  const markAllRead = () => {
    const allIds = new Set(notifications.map((n) => n.signal.id));
    setReadIds(allIds);
    localStorage.setItem('meridian-read-notifs', JSON.stringify([...allIds]));
  };

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-md hover:bg-secondary text-muted-foreground relative transition-colors"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-primary border-2 border-background" />
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-[min(24rem,calc(100vw-1rem))] rounded-lg border border-border bg-popover shadow-xl z-50 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
            {unreadCount > 0 && (
              <button onClick={markAllRead} className="text-xs text-primary hover:underline">
                Mark all read
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-96 overflow-y-auto scrollbar-thin">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-sm text-muted-foreground">No notifications yet</div>
            ) : (
              notifications.map((n) => {
                const isRead = readIds.has(n.signal.id);
                return (
                  <button
                    key={n.signal.id}
                    onClick={() => {
                      const newRead = new Set(readIds);
                      newRead.add(n.signal.id);
                      setReadIds(newRead);
                      localStorage.setItem('meridian-read-notifs', JSON.stringify([...newRead]));
                      setOpen(false);
                      navigate(`/companies/${n.companyId}`);
                    }}
                    className={cn(
                      'w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-secondary/50 transition-colors border-b border-border/50 last:border-0',
                      !isRead && 'bg-primary/5'
                    )}
                  >
                    <span className="text-lg shrink-0 mt-0.5">{n.signal.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-primary">{n.companyName}</span>
                        <span className="text-[10px] text-muted-foreground">{n.signal.date}</span>
                        {!isRead && <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />}
                      </div>
                      <p className="text-sm text-foreground mt-0.5 truncate">{n.signal.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{n.signal.description}</p>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
