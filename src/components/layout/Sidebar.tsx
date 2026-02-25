import { Telescope, BookMarked, Search, Settings, Compass, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Discover', icon: Telescope, path: '/companies' },
  { label: 'Lists', icon: BookMarked, path: '/lists' },
  { label: 'Saved Searches', icon: Search, path: '/saved' },
  { label: 'Settings', icon: Settings, path: '/settings' },
];

interface AppSidebarProps {
  collapsed: boolean;
  onToggleCollapsed: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export function AppSidebar({ collapsed, onToggleCollapsed, mobileOpen, onCloseMobile }: AppSidebarProps) {
  const location = useLocation();
  const expanded = mobileOpen || !collapsed;

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border flex flex-col z-30 transition-[width,transform] duration-200',
        'w-60',
        collapsed ? 'md:w-16' : 'md:w-60',
        mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 h-14 border-b border-sidebar-border shrink-0">
        <Compass className="h-5 w-5 text-primary shrink-0" />
        {expanded && <span className="text-foreground font-semibold text-lg tracking-tight">Meridian</span>}
        <button
          onClick={onCloseMobile}
          className="ml-auto p-1 rounded hover:bg-sidebar-accent text-sidebar-foreground md:hidden"
          aria-label="Close menu"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Thesis badge */}
      {expanded && (
        <div className="px-4 py-3">
          <div className="rounded-md bg-teal-muted px-3 py-1.5 text-xs text-primary font-medium">
            Thesis: B2B SaaS · AI · Dev Tools
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 px-2 py-2 space-y-0.5">
        {navItems.map((item) => {
          const active = location.pathname.startsWith(item.path);
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onCloseMobile}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors group relative',
                active
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground border-l-2 border-primary'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground border-l-2 border-transparent'
              )}
            >
              <item.icon className={cn('h-4 w-4 shrink-0', active && 'text-primary')} />
              {expanded && (
                <>
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-sidebar-border p-3 flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-xs font-semibold text-secondary-foreground shrink-0">
          VC
        </div>
        {expanded && (
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">Fund Manager</p>
            <p className="text-xs text-primary">Pro Plan</p>
          </div>
        )}
        <button
          onClick={onToggleCollapsed}
          className="hidden md:inline-flex p-1 rounded hover:bg-sidebar-accent text-sidebar-foreground shrink-0"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>
    </aside>
  );
}
