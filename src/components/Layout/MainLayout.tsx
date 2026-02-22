import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';

interface MainLayoutProps {
  children: React.ReactNode;
  notificationCount?: number;
  onNotificationClick?: () => void;
  onProfileClick?: () => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  notificationCount = 3,
  onNotificationClick,
  onProfileClick,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleRouteChange = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  return (
    // ✅ FIX 1: flex row, full viewport height, no overflow on root
    <div className="flex h-screen bg-dark-900 text-dark-100 overflow-hidden">

      {/* ✅ Sidebar — fixed width column, never shrinks */}
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      {/* ✅ FIX 2: Right column — flex column, min-width:0 prevents overflow */}
      <div className="flex flex-col flex-1 min-w-0">

        {/* ✅ FIX 3: Navbar is NOW inside the right column — no more overlap */}
        <Navbar
          notificationCount={notificationCount}
          onNotificationClick={onNotificationClick}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          onProfileClick={onProfileClick}
        />

        {/* ✅ FIX 4: Scrollable content area — only this scrolls, not the whole page */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="p-4 lg:p-8 max-w-7xl mx-auto">
            {children}
          </div>
        </main>

        {/* ✅ Footer stays at bottom of right column */}
        <footer className="bg-dark-800 border-t border-dark-700 flex-shrink-0">
          <div className="p-4 lg:p-6 text-center text-dark-400 text-sm">
            <p>&copy; 2026 ResGuard - Smart Health Monitoring System. All rights reserved.</p>
          </div>
        </footer>

      </div>
    </div>
  );
};