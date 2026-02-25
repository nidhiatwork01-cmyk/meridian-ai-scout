import { useState } from 'react';
import { User, Shield, Bell, Palette, CreditCard, Save } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/use-theme';

const sections = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'thesis', label: 'Investment Thesis', icon: Shield },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'billing', label: 'Billing', icon: CreditCard },
] as const;

type Section = typeof sections[number]['id'];

export default function SettingsPage() {
  const [active, setActive] = useState<Section>('profile');
  const { theme, toggleTheme } = useTheme();

  const [profile, setProfile] = useState({
    name: 'Alex Morgan',
    email: 'alex@meridian.vc',
    firm: 'Meridian Ventures',
    role: 'General Partner',
  });

  const [thesis, setThesis] = useState({
    sectors: 'B2B SaaS, AI Infrastructure, Developer Tools',
    stages: 'Seed, Series A',
    geoFocus: 'North America, Europe',
    checkSize: '$500K - $5M',
    notes: 'Focus on technical founders building horizontal platforms with strong developer adoption signals.',
  });

  const [notifPrefs, setNotifPrefs] = useState({
    newSignals: true,
    fundingRounds: true,
    teamChanges: false,
    weeklyDigest: true,
    productLaunches: true,
  });

  const [saved, setSaved] = useState(false);
  const showSaved = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <button
          onClick={showSaved}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity w-full sm:w-auto"
        >
          <Save className="h-4 w-4" />
          {saved ? 'Saved ✓' : 'Save Changes'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar nav */}
        <nav className="space-y-1">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors',
                active === s.id
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
              )}
            >
              <s.icon className="h-4 w-4" />
              {s.label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <div className="lg:col-span-3 space-y-6">
          {active === 'profile' && (
            <div className="rounded-lg border border-border bg-card p-6 space-y-5">
              <h2 className="text-lg font-semibold text-foreground">Profile Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Full Name</label>
                  <input
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Email</label>
                  <input
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Firm</label>
                  <input
                    value={profile.firm}
                    onChange={(e) => setProfile({ ...profile, firm: e.target.value })}
                    className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Role</label>
                  <input
                    value={profile.role}
                    onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
            </div>
          )}

          {active === 'thesis' && (
            <div className="rounded-lg border border-border bg-card p-6 space-y-5">
              <h2 className="text-lg font-semibold text-foreground">Investment Thesis</h2>
              <p className="text-sm text-muted-foreground">Configure your fund's thesis to improve company matching scores.</p>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Target Sectors</label>
                  <input
                    value={thesis.sectors}
                    onChange={(e) => setThesis({ ...thesis, sectors: e.target.value })}
                    className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Target Stages</label>
                  <input
                    value={thesis.stages}
                    onChange={(e) => setThesis({ ...thesis, stages: e.target.value })}
                    className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Geographic Focus</label>
                  <input
                    value={thesis.geoFocus}
                    onChange={(e) => setThesis({ ...thesis, geoFocus: e.target.value })}
                    className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Check Size</label>
                  <input
                    value={thesis.checkSize}
                    onChange={(e) => setThesis({ ...thesis, checkSize: e.target.value })}
                    className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Thesis Notes</label>
                  <textarea
                    value={thesis.notes}
                    onChange={(e) => setThesis({ ...thesis, notes: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {active === 'notifications' && (
            <div className="rounded-lg border border-border bg-card p-6 space-y-5">
              <h2 className="text-lg font-semibold text-foreground">Notification Preferences</h2>
              <p className="text-sm text-muted-foreground">Choose which events generate notifications.</p>
              <div className="space-y-4">
                {([
                  ['newSignals', 'New Signals', 'Get notified when tracked companies have new activity signals'],
                  ['fundingRounds', 'Funding Rounds', 'Alerts when companies announce new funding rounds'],
                  ['teamChanges', 'Team Changes', 'Notifications for executive hires and departures'],
                  ['weeklyDigest', 'Weekly Digest', 'Receive a weekly summary of all activity'],
                  ['productLaunches', 'Product Launches', 'Alerts when companies launch new products'],
                ] as const).map(([key, label, desc]) => (
                  <div key={key} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-foreground">{label}</p>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                    <button
                      onClick={() => setNotifPrefs((p) => ({ ...p, [key]: !p[key] }))}
                      className={cn(
                        'relative w-10 h-5 rounded-full transition-colors',
                        notifPrefs[key] ? 'bg-primary' : 'bg-secondary'
                      )}
                    >
                      <span
                        className={cn(
                          'absolute top-0.5 h-4 w-4 rounded-full bg-primary-foreground transition-transform shadow-sm',
                          notifPrefs[key] ? 'left-5' : 'left-0.5'
                        )}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {active === 'appearance' && (
            <div className="rounded-lg border border-border bg-card p-6 space-y-5">
              <h2 className="text-lg font-semibold text-foreground">Appearance</h2>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-foreground">Dark Mode</p>
                  <p className="text-xs text-muted-foreground">Switch between light and dark themes</p>
                </div>
                <button
                  onClick={toggleTheme}
                  className={cn(
                    'relative w-10 h-5 rounded-full transition-colors',
                    theme === 'dark' ? 'bg-primary' : 'bg-secondary'
                  )}
                >
                  <span
                    className={cn(
                      'absolute top-0.5 h-4 w-4 rounded-full bg-primary-foreground transition-transform shadow-sm',
                      theme === 'dark' ? 'left-5' : 'left-0.5'
                    )}
                  />
                </button>
              </div>
            </div>
          )}

          {active === 'billing' && (
            <div className="rounded-lg border border-border bg-card p-6 space-y-5">
              <h2 className="text-lg font-semibold text-foreground">Billing & Plan</h2>
              <div className="rounded-lg border border-primary/30 bg-primary/5 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-foreground">Pro Plan</p>
                    <p className="text-xs text-muted-foreground">Unlimited companies · AI enrichment · Export</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/15 text-primary">Active</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Next billing date: March 15, 2025 · $99/month</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
