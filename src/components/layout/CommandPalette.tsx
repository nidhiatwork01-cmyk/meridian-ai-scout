import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Building2, BookMarked, Telescope } from 'lucide-react';
import { useStore } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';

export function CommandPalette() {
  const open = useStore((s) => s.commandPaletteOpen);
  const setOpen = useStore((s) => s.setCommandPaletteOpen);
  const companies = useStore((s) => s.companies);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = [useRef(''), { current: '' }] as any;
  
  // Use state properly
  const queryState = useRef('');

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(!open);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, setOpen]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  const handleSelect = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15 }}
            className="fixed left-1/2 top-[20%] -translate-x-1/2 w-full max-w-lg bg-card border border-border rounded-xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search companies, actions..."
                className="flex-1 bg-transparent text-foreground outline-none text-sm placeholder:text-muted-foreground"
                onChange={(e) => {
                  queryState.current = e.target.value;
                  // Force re-render by setting state on parent - simplified for demo
                  inputRef.current?.dispatchEvent(new Event('input'));
                }}
              />
              <kbd className="text-[10px] bg-secondary rounded px-1.5 py-0.5 border border-border font-mono text-muted-foreground">ESC</kbd>
            </div>
            <div className="max-h-80 overflow-y-auto scrollbar-thin p-2">
              <div className="px-2 py-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Quick Actions</div>
              <button onClick={() => handleSelect('/companies')} className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-secondary transition-colors text-left">
                <Telescope className="h-4 w-4 text-primary" />
                <span>Discover Companies</span>
              </button>
              <button onClick={() => handleSelect('/lists')} className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-secondary transition-colors text-left">
                <BookMarked className="h-4 w-4 text-primary" />
                <span>View Lists</span>
              </button>

              <div className="px-2 py-1.5 mt-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Companies</div>
              {companies.slice(0, 8).map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleSelect(`/companies/${c.id}`)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-secondary transition-colors text-left"
                >
                  <img src={c.logo} alt="" className="h-5 w-5 rounded bg-secondary object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  <div className="flex-1 min-w-0">
                    <span className="text-foreground">{c.name}</span>
                    <span className="text-muted-foreground ml-2 text-xs">{c.sector}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{c.stage}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
