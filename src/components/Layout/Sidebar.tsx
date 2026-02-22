import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavItem {
  label: string;
  href: string;
  icon: string;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/', icon: '🏠' },
  { label: 'Patient Monitor', href: '/patient-monitor', icon: '❤️' },
  { label: 'Metrics', href: '/metrics', icon: '📈' },
  { label: 'Alerts & Notifications', href: '/alerts', icon: '🔔' },
  { label: 'Reports', href: '/history', icon: '📊' },
  { label: 'Settings', href: '/settings', icon: '⚙️' },
];

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const location = useLocation();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-dark-800 border-r border-dark-700 transition-all duration-300 z-40 flex-shrink-0 ${
          isOpen ? 'w-64' : 'w-20'
        } lg:w-64 flex flex-col shadow-lg overflow-y-auto`}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-dark-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold text-sm">
              RG
            </div>
            {(isOpen || typeof window !== 'undefined' && window.innerWidth >= 1024) && (
              <div>
                <h1 className="text-lg font-bold text-primary-400">ResGuard</h1>
                <p className="text-xs text-dark-400">Health Monitor</p>
              </div>
            )}
          </div>
          <button
            onClick={onToggle}
            className="p-2 hover:bg-dark-700 rounded-lg transition-colors lg:hidden"
            aria-label="Toggle sidebar"
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={`flex items-center gap-4 px-4 py-3 rounded-lg font-medium transition-all duration-200 group ${
                      isActive
                        ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                        : 'text-dark-300 hover:bg-dark-700/60'
                    }`}
                    title={isOpen ? '' : item.label}
                  >
                    <span className="text-xl min-w-fit group-hover:scale-110 transition-transform">
                      {item.icon}
                    </span>
                    {(isOpen || typeof window !== 'undefined' && window.innerWidth >= 1024) && (
                      <span className="whitespace-nowrap">{item.label}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-dark-700">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-dark-700 transition-colors group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-alert-500/30 to-primary-500/30 flex items-center justify-center text-xl flex-shrink-0">
              👤
            </div>
            {(isOpen || typeof window !== 'undefined' && window.innerWidth >= 1024) && (
              <div className="flex-1 text-left min-w-0">
                <p className="text-sm font-medium text-dark-100 truncate">User</p>
                <p className="text-xs text-dark-400 truncate">user@resguard.com</p>
              </div>
            )}
          </button>
        </div>
      </aside>

      {/* Main content offset */}
      <div className="lg:ml-64" />
    </>
  );
};
