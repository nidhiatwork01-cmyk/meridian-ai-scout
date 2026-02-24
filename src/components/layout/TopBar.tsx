import { Search, Bell } from 'lucide-react';
import { useStore } from '@/lib/store';

export function TopBar() {
  const setCommandPaletteOpen = useStore((s) => s.setCommandPaletteOpen);

  return (
    <header className="sticky top-0 z-20 h-14 border-b border-border bg-background/80 backdrop-blur-sm flex items-center px-6 gap-4">
      <div className="flex-1" />
      
      {/* Search trigger */}
      <button
        onClick={() => setCommandPaletteOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-secondary/50 text-muted-foreground text-sm hover:bg-secondary transition-colors w-80"
      >
        <Search className="h-4 w-4" />
        <span>Search companies...</span>
        <kbd className="ml-auto text-[10px] bg-background rounded px-1.5 py-0.5 border border-border font-mono">⌘K</kbd>
      </button>

      <div className="flex-1" />

      {/* Right actions */}
      <button className="p-2 rounded-md hover:bg-secondary text-muted-foreground relative">
        <Bell className="h-4 w-4" />
        <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
      </button>
      <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-xs font-semibold text-secondary-foreground">
        VC
      </div>
    </header>
  );
}
