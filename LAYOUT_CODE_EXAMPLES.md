# ResGuard Layout - Code Examples

## Basic Setup

### Example 1: Simple Page with MainLayout

```tsx
// src/pages/Dashboard.tsx
import { MainLayout } from '../components/Layout';

export const Dashboard: React.FC = () => {
  return (
    <MainLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        {/* Your content here */}
      </div>
    </MainLayout>
  );
};
```

### Example 2: Page with Notification Handler

```tsx
// src/pages/Dashboard.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../components/Layout';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [unreadNotifications, setUnreadNotifications] = useState(3);

  const handleNotificationClick = () => {
    setUnreadNotifications(0);
    navigate('/alerts');
  };

  return (
    <MainLayout 
      notificationCount={unreadNotifications}
      onNotificationClick={handleNotificationClick}
    >
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        {/* Content */}
      </div>
    </MainLayout>
  );
};
```

### Example 3: Page with Profile Handler

```tsx
// src/pages/Dashboard.tsx
import { useState } from 'react';
import { MainLayout } from '../components/Layout';
import { ProfileModal } from '../components/ProfileModal';

export const Dashboard: React.FC = () => {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <>
      <MainLayout onProfileClick={() => setShowProfile(true)}>
        <div className="space-y-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>
      </MainLayout>

      {showProfile && (
        <ProfileModal onClose={() => setShowProfile(false)} />
      )}
    </>
  );
};
```

## Advanced Examples

### Example 4: Alerts Page with Badge Count

```tsx
// src/pages/Alerts.tsx
import { useEffect, useState } from 'react';
import { MainLayout } from '../components/Layout';
import { useHealth } from '../hooks/useHealth';

export const Alerts: React.FC = () => {
  const { alerts } = useHealth();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const unread = alerts.filter(a => !a.read).length;
    setUnreadCount(unread);
  }, [alerts]);

  const handleNotificationClick = () => {
    // Mark all as read
    alerts.forEach(a => {
      a.read = true;
    });
    setUnreadCount(0);
  };

  return (
    <MainLayout 
      notificationCount={unreadCount}
      onNotificationClick={handleNotificationClick}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Alerts & Notifications</h1>
          {unreadCount > 0 && (
            <span className="badge badge-alert">
              {unreadCount} Unread
            </span>
          )}
        </div>

        {/* Alert items */}
      </div>
    </MainLayout>
  );
};
```

### Example 5: Settings Page with Profile Modal

```tsx
// src/pages/Settings.tsx
import { useState } from 'react';
import { MainLayout } from '../components/Layout';

export const Settings: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    email: 'john@example.com',
  });

  const handleProfileClick = () => {
    // This could open a profile editor modal
    console.log('Edit profile clicked');
  };

  const handleNotificationClick = () => {
    // Navigate to alerts
    window.location.href = '/alerts';
  };

  return (
    <MainLayout 
      onProfileClick={handleProfileClick}
      onNotificationClick={handleNotificationClick}
    >
      <div className="space-y-8 max-w-2xl">
        <h1 className="text-3xl font-bold">Settings</h1>

        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="input"
              />
            </div>
          </div>
        </div>

        <button className="btn-primary px-6 py-3">Save Changes</button>
      </div>
    </MainLayout>
  );
};
```

## Component Integration

### Example 6: Using with React Query

```tsx
// src/pages/Dashboard.tsx
import { MainLayout } from '../components/Layout';
import { useQuery } from '@tanstack/react-query';
import { healthService } from '../services/api';

export const Dashboard: React.FC = () => {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ['health', 'metrics'],
    queryFn: () => healthService.getHealthMetrics('patient-id'),
  });

  if (isLoading) {
    return (
      <MainLayout>
        <div className="text-center py-12">Loading...</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Display metrics */}
      </div>
    </MainLayout>
  );
};
```

### Example 7: Using with Context

```tsx
// src/pages/Dashboard.tsx
import { MainLayout } from '../components/Layout';
import { useHealth } from '../hooks/useHealth';

export const Dashboard: React.FC = () => {
  const { metrics, alerts } = useHealth();

  return (
    <MainLayout notificationCount={alerts.length}>
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Display metrics from context */}
        </div>
      </div>
    </MainLayout>
  );
};
```

## Custom Layout Variations

### Example 8: Custom Header Content

```tsx
// src/pages/Dashboard.tsx
import { MainLayout } from '../components/Layout';

export const Dashboard: React.FC = () => {
  return (
    <MainLayout>
      <div className="mb-8 pb-6 border-b border-dark-700">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-dark-400 mt-2">
              Welcome back, John Doe
            </p>
          </div>
          <button className="btn-primary px-4 py-2">
            + New Measurement
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {/* Main content */}
      </div>
    </MainLayout>
  );
};
```

### Example 9: Grid Layout Page

```tsx
// src/pages/Metrics.tsx
import { MainLayout } from '../components/Layout';
import { MetricCard } from '../components/MetricCard';

export const Metrics: React.FC = () => {
  return (
    <MainLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Health Metrics</h1>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            label="Heart Rate"
            value={72}
            unit="bpm"
            icon="❤️"
          />
          <MetricCard
            label="Blood Pressure"
            value="120/80"
            unit="mmhg"
            icon="💓"
          />
          <MetricCard
            label="Temperature"
            value="36.8"
            unit="°C"
            icon="🌡️"
          />
          <MetricCard
            label="O₂ Saturation"
            value="98"
            unit="%"
            icon="💨"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            {/* Chart 1 */}
          </div>
          <div className="card">
            {/* Chart 2 */}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
```

## Responsive Patterns

### Example 10: Responsive Content Areas

```tsx
// src/pages/Dashboard.tsx
import { MainLayout } from '../components/Layout';

export const Dashboard: React.FC = () => {
  return (
    <MainLayout>
      <div className="space-y-8">
        <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>

        {/* Mobile single column, tablet 2 columns, desktop 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="card p-4 md:p-6">
            {/* Content */}
          </div>
          {/* More items */}
        </div>

        {/* Mobile stacked, desktop side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 card">
            {/* Main content */}
          </div>
          <div className="card">
            {/* Sidebar content */}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
```

## Modal & Overlay Examples

### Example 11: Using Layout with Modals

```tsx
// src/pages/Dashboard.tsx
import { useState } from 'react';
import { MainLayout } from '../components/Layout';
import { AlertModal } from '../components/AlertModal';

export const Dashboard: React.FC = () => {
  const [selectedAlert, setSelectedAlert] = useState(null);

  return (
    <>
      <MainLayout>
        <div className="space-y-8">
          {/* Content */}
        </div>
      </MainLayout>

      {selectedAlert && (
        <AlertModal
          alert={selectedAlert}
          onClose={() => setSelectedAlert(null)}
        />
      )}
    </>
  );
};
```

## Navigation Examples

### Example 12: Programmatic Navigation

```tsx
// src/pages/Dashboard.tsx
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../components/Layout';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleViewAlerts = () => {
    navigate('/alerts', { state: { tab: 'critical' } });
  };

  const handleViewSettings = () => {
    navigate('/settings', { state: { section: 'profile' } });
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <button onClick={handleViewAlerts} className="btn-primary">
          View Alerts
        </button>

        <button onClick={handleViewSettings} className="btn-secondary">
          Settings
        </button>
      </div>
    </MainLayout>
  );
};
```

---

**Last Updated:** February 21, 2026  
**Version:** 1.0.0  
**Status:** ✅ Ready for Use
