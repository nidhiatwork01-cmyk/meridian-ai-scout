import { Search, Sun, Moon } from 'lucide-react';
import { useStore } from '@/lib/store';
import { useTheme } from '@/hooks/use-theme';
import { NotificationsDropdown } from './NotificationsDropdown';
import { UserProfileMenu } from './UserProfileMenu';

export function TopBar() {
  const setCommandPaletteOpen = useStore((s) => s.setCommandPaletteOpen);
  const { theme, toggleTheme } = useTheme();

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
      <button
        onClick={toggleTheme}
        className="p-2 rounded-md hover:bg-secondary text-muted-foreground transition-colors"
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>
      <NotificationsDropdown />
      <UserProfileMenu />
    </header>
  );
}
