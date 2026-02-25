import { Search, Sun, Moon, Menu } from 'lucide-react';
import { useStore } from '@/lib/store';
import { useTheme } from '@/hooks/use-theme';
import { NotificationsDropdown } from './NotificationsDropdown';
import { UserProfileMenu } from './UserProfileMenu';

interface TopBarProps {
  onOpenMobileMenu: () => void;
}

export function TopBar({ onOpenMobileMenu }: TopBarProps) {
  const setCommandPaletteOpen = useStore((s) => s.setCommandPaletteOpen);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-20 h-14 border-b border-border bg-background/80 backdrop-blur-sm flex items-center px-3 sm:px-4 md:px-6 gap-2 sm:gap-3">
      <button
        onClick={onOpenMobileMenu}
        className="md:hidden p-2 rounded-md hover:bg-secondary text-muted-foreground transition-colors"
        aria-label="Open menu"
      >
        <Menu className="h-4 w-4" />
      </button>

      {/* Search trigger */}
      <button
        onClick={() => setCommandPaletteOpen(true)}
        className="flex min-w-0 flex-1 items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-secondary/50 text-muted-foreground text-sm hover:bg-secondary transition-colors md:max-w-sm lg:w-80"
      >
        <Search className="h-4 w-4" />
        <span className="truncate hidden sm:inline">Search companies...</span>
        <span className="truncate sm:hidden">Search</span>
        <kbd className="ml-auto hidden lg:inline-block text-[10px] bg-background rounded px-1.5 py-0.5 border border-border font-mono">⌘K</kbd>
      </button>

      {/* Right actions */}
      <div className="ml-auto flex items-center gap-1 sm:gap-2">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md hover:bg-secondary text-muted-foreground transition-colors"
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
        <NotificationsDropdown />
        <UserProfileMenu />
      </div>
    </header>
  );
}
