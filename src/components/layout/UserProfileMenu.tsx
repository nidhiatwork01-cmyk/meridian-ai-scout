import { useState, useRef, useEffect } from 'react';
import { User, Settings, LogOut, CreditCard, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const menuItems = [
  { label: 'Profile', icon: User, path: '/settings', section: 'profile' },
  { label: 'Settings', icon: Settings, path: '/settings' },
  { label: 'Billing', icon: CreditCard, path: '/settings', section: 'billing' },
  { label: 'Help & Support', icon: HelpCircle, path: '/settings', section: 'help' },
];

export function UserProfileMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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
        className="h-8 w-8 rounded-full bg-primary/15 flex items-center justify-center text-xs font-semibold text-primary hover:bg-primary/25 transition-colors"
      >
        AM
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-64 rounded-lg border border-border bg-popover shadow-xl z-50 overflow-hidden">
          {/* User info */}
          <div className="px-4 py-3 border-b border-border">
            <p className="text-sm font-semibold text-foreground">Alex Morgan</p>
            <p className="text-xs text-muted-foreground">alex@meridian.vc</p>
            <span className="inline-block mt-1.5 px-2 py-0.5 rounded text-[10px] font-medium bg-primary/15 text-primary">
              Pro Plan
            </span>
          </div>

          {/* Menu items */}
          <div className="py-1">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  setOpen(false);
                  navigate(item.path);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-secondary/50 transition-colors"
              >
                <item.icon className="h-4 w-4 text-muted-foreground" />
                {item.label}
              </button>
            ))}
          </div>

          {/* Logout */}
          <div className="border-t border-border py-1">
            <button
              onClick={() => setOpen(false)}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
