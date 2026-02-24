import { Outlet } from 'react-router-dom';
import { AppSidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { CommandPalette } from './CommandPalette';

export function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <div className="pl-60 transition-all duration-200">
        <TopBar />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
      <CommandPalette />
    </div>
  );
}
