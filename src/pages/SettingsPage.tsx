import { Settings } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Settings</h1>
      <div className="rounded-lg border border-border bg-card p-8 text-center">
        <Settings className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">Settings coming soon.</p>
      </div>
    </div>
  );
}
