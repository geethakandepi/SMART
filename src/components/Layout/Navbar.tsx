import React, { useState, useEffect } from 'react';

interface NavbarProps {
  notificationCount?: number;
  onNotificationClick?: () => void;
  onProfileClick?: () => void;
  onMenuToggle?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  notificationCount = 0,
  onNotificationClick,
  onProfileClick,
  onMenuToggle,
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <header className="sticky top-0 right-0 left-0 bg-dark-800 border-b border-dark-700 shadow-lg z-20 transition-all duration-300 w-full overflow-x-hidden">
      <div className="px-4 lg:px-8 py-4 flex items-center justify-between w-full" style={{ boxSizing: 'border-box' }}>
        {/* Left Side - Menu Toggle + Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuToggle}
            className="p-2 hover:bg-dark-700 rounded-lg transition-colors lg:hidden"
            aria-label="Toggle menu"
          >
            ☰
          </button>

          {/* Branding (visible on lg screens) */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold text-xs">
              RG
            </div>
            <div>
              <h2 className="text-sm font-bold text-primary-400">ResGuard</h2>
              <p className="text-xs text-dark-400">Smart Health Monitor</p>
            </div>
          </div>
        </div>

        {/* Center - Date & Time */}
        <div className="hidden md:flex flex-col items-center">
          <p className="text-sm font-semibold text-dark-100">{formatTime(currentTime)}</p>
          <p className="text-xs text-dark-400">{formatDate(currentTime)}</p>
        </div>

        {/* Right Side - Notifications & Profile */}
        <div className="flex items-center gap-2 lg:gap-4">
          {/* Notification Bell */}
          <button
            onClick={onNotificationClick}
            className="relative p-2 hover:bg-dark-700 rounded-lg transition-colors group"
            aria-label="Notifications"
          >
            <span className="text-xl group-hover:scale-110 transition-transform">🔔</span>
            {notificationCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-alert-500 rounded-full">
                {notificationCount > 99 ? '99+' : notificationCount}
              </span>
            )}
          </button>

          {/* Messages */}
          <button
            className="p-2 hover:bg-dark-700 rounded-lg transition-colors group"
            aria-label="Messages"
          >
            <span className="text-xl group-hover:scale-110 transition-transform">✉️</span>
          </button>

          {/* Profile Dropdown */}
          <div className="flex items-center gap-3 pl-4 border-l border-dark-700">
            <button
              onClick={onProfileClick}
              className="hidden sm:flex items-center gap-2 px-3 py-2 hover:bg-dark-700 rounded-lg transition-colors group"
            >
              <div className="text-right">
                <p className="text-sm font-medium text-dark-100 group-hover:text-primary-400 transition-colors">
                  John Doe
                </p>
                <p className="text-xs text-dark-400">Patient</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500/30 to-safe-500/30 flex items-center justify-center text-sm group-hover:scale-110 transition-transform">
                👤
              </div>
            </button>

            {/* Mobile Profile */}
            <button
              onClick={onProfileClick}
              className="sm:hidden p-2 hover:bg-dark-700 rounded-lg transition-colors"
              aria-label="Profile"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500/30 to-safe-500/30 flex items-center justify-center text-sm hover:scale-110 transition-transform">
                👤
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
