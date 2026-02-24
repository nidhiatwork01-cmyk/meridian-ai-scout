import { Telescope, BookMarked, Search, Settings, Compass, ChevronLeft, ChevronRight } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Discover', icon: Telescope, path: '/companies', shortcut: 'G C' },
  { label: 'Lists', icon: BookMarked, path: '/lists', shortcut: 'G L' },
  { label: 'Saved Searches', icon: Search, path: '/saved', shortcut: 'G S' },
  { label: 'Settings', icon: Settings, path: '/settings', shortcut: 'G ,' },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border flex flex-col z-30 transition-all duration-200',
        collapsed ? 'w-16' : 'w-60'
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 h-14 border-b border-sidebar-border shrink-0">
        <Compass className="h-5 w-5 text-primary shrink-0" />
        {!collapsed && <span className="text-foreground font-semibold text-lg tracking-tight">Meridian</span>}
      </div>

      {/* Thesis badge */}
      {!collapsed && (
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
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors group relative',
                active
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground border-l-2 border-primary'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground border-l-2 border-transparent'
              )}
            >
              <item.icon className={cn('h-4 w-4 shrink-0', active && 'text-primary')} />
              {!collapsed && (
                <>
                  <span>{item.label}</span>
                  <span className="ml-auto text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                    {item.shortcut}
                  </span>
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
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">Fund Manager</p>
            <p className="text-xs text-primary">Pro Plan</p>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-sidebar-accent text-sidebar-foreground shrink-0"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>
    </aside>
  );
}
