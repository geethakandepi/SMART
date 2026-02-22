# ResGuard Layout & Navigation System

## 📁 Project Structure

The new layout structure is organized in `/src/components/Layout/`:

```
src/components/Layout/
├── MainLayout.tsx      # Main wrapper component
├── Sidebar.tsx         # Left navigation sidebar
├── Navbar.tsx          # Top navigation bar
└── index.ts            # Barrel export file
```

## 🏗️ Component Overview

### MainLayout.tsx
The main wrapper component that combines Sidebar, Navbar, and content area. This is what you use to wrap all pages.

**Props:**
- `children: React.ReactNode` - Page content to render
- `notificationCount?: number` - Badge count for notifications (default: 3)
- `onNotificationClick?: () => void` - Notification bell click handler
- `onProfileClick?: () => void` - Profile button click handler

**Features:**
- Responsive layout (mobile-first)
- Persistent footer
- Max-width container for content
- Automatic sidebar close on mobile navigation
- Fixed navbar and sidebar positioning

**Usage:**
```tsx
import { MainLayout } from './components/Layout';

function MyPage() {
  return (
    <MainLayout notificationCount={5} onNotificationClick={handleNotif}>
      <h1>Page Content</h1>
    </MainLayout>
  );
}
```

### Sidebar.tsx
Fixed left navigation sidebar with icons and labels.

**Features:**
- **Navigation Items:**
  - Dashboard (🏠)
  - Patient Monitor (❤️)
  - Alerts & Notifications (🔔)
  - Reports (📊)
  - Settings (⚙️)
  
- **Active Link Highlighting:**
  - Current page link has primary blue gradient
  - Hover effects with smooth transitions
  
- **Responsive:**
  - Collapsible on mobile (width: 20 on collapse)
  - Always expanded on lg+ screens
  - Smooth width transitions
  
- **User Section:**
  - Avatar with gradient
  - User name and email
  - Clickable profile button

**Props:**
- `isOpen: boolean` - Whether sidebar is expanded
- `onToggle: () => void` - Toggle sidebar visibility

**Mobile Behavior:**
- Shows/hides main navigation
- Overlay when open on small screens
- Close button visible on mobile
- Auto-hiding labels on collapse

### Navbar.tsx
Top navigation bar with branding, live clock, and user actions.

**Features:**
- **Left Section:**
  - Menu toggle button (mobile only)
  - ResGuard branding with logo (lg+ screens)
  
- **Center Section:**
  - Live time display (HH:MM:SS)
  - Current date with day and year
  - Updates every second
  
- **Right Section:**
  - Notification bell with badge count
  - Messages button
  - User profile name and role
  - User avatar

**Props:**
- `notificationCount?: number` - Badge count for notifications
- `onNotificationClick?: () => void` - Notification bell handler
- `onProfileClick?: () => void` - Profile button handler
- `onMenuToggle?: () => void` - Mobile menu toggle handler

**Live Features:**
- Real-time clock with second updates
- Date formatting based on locale
- Time formatting in 24-hour format

## 🎨 Styling & Colors

All components use Tailwind CSS with custom dark theme colors:

- **Background:** `dark-900` (#111827)
- **Cards/Secondary:** `dark-800` (#1F2937)
- **Border:** `dark-700` (#374151)
- **Text Primary:** `dark-100` (#f3f4f6)
- **Text Secondary:** `dark-400` (#9ca3af)
- **Primary (Active):** `primary-500` (#0ea5e9)
- **Alert:** `alert-500` (#ef4444)

## 📱 Responsive Breakpoints

| Breakpoint | Size | Behavior |
|-----------|------|----------|
| Mobile | < 640px | Sidebar collapsed, overlay navigation, full-width |
| Tablet | 640px - 1024px | Collapsible sidebar, reduced spacing |
| Desktop (lg) | ≥ 1024px | Full sidebar visible, expanded content |

**Sidebar Widths:**
- Collapsed: `w-20` (80px)
- Expanded: `w-64` (256px)
- Always expanded: lg+ screens

**Navbar Adjustments:**
- Mobile: Full width with padding
- lg+: Margin-left for sidebar offset

## 🔄 Navigation Flow

1. **Route Changes:** Used with React Router v6
2. **Active States:** Auto-detected using `useLocation()`
3. **Mobile Auto-Close:** Sidebar automatically closes after navigation
4. **Link Highlighting:** Current page link shows gradient background

## 🚀 Usage in Pages

All pages should be wrapped with `MainLayout`:

```tsx
import { MainLayout } from '../components/Layout';

export const Dashboard: React.FC = () => {
  return (
    <MainLayout notificationCount={3}>
      <div className="space-y-8">
        {/* Your page content */}
      </div>
    </MainLayout>
  );
};
```

## 🎯 Current App.tsx Setup

The `App.tsx` file is already updated to use `MainLayout` for all routes:

```tsx
<Route
  path="/"
  element={
    <MainLayout notificationCount={notificationCount}>
      <Dashboard />
    </MainLayout>
  }
/>
```

All pages in the following routes use the same layout:
- `/` - Dashboard
- `/metrics` - Patient Monitor
- `/alerts` - Alerts & Notifications
- `/history` - Reports
- `/settings` - Settings

## 💡 Customization Guide

### Change Navigation Items
Edit the `navItems` array in `Sidebar.tsx`:

```tsx
const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/', icon: '🏠' },
  { label: 'Custom Page', href: '/custom', icon: '⭐' },
  // Add more items...
];
```

### Update Branding
Modify the ResGuard branding in both `Sidebar.tsx` and `Navbar.tsx`:

```tsx
// Change the logo text or logo element
<h1 className="text-lg font-bold text-primary-400">ResGuard</h1>
```

### Notification Handling
Pass notification count and handlers from parent:

```tsx
const [notifications, setNotifications] = useState(3);

<MainLayout 
  notificationCount={notifications}
  onNotificationClick={() => navigate('/alerts')}
/>
```

### Customize Colors
All color classes use Tailwind variables from `tailwind.config.js`:
- Modify `dark`, `primary`, `alert`, `safe` colors there
- Components automatically use the updated colors

## 🔒 Accessibility Features

- Semantic HTML with proper `aria-label` attributes
- Keyboard navigation support
- WCAG compliant color contrast
- Mobile-friendly touch targets (min 44x44 px)
- Proper heading hierarchy

## 📊 Performance Considerations

- Sidebar state managed locally (no Redux needed)
- Navbar updates only on time change (1s interval)
- Mobile sidebar uses CSS transitions (GPU accelerated)
- No unnecessary re-renders
- Lazy-loaded child components via React Router

## 🐛 Troubleshooting

**Sidebar not responding to clicks?**
- Check that `onToggle` handler is properly passed
- Verify `isOpen` state is updating

**Navbar time not updating?**
- Check browser console for errors
- Verify `useEffect` cleanup is running

**Mobile layout broken?**
- Check Tailwind CSS is loaded
- Verify responsive classes are in content paths
- Clear browser cache

**Navigation links not highlighting?**
- Verify `react-router-dom` is updated
- Check route paths match exactly
- Inspect `useLocation()` return value

## 📚 Related Files

- **App.tsx** - Main router configuration
- **tailwind.config.js** - Color scheme definition
- **index.css** - Tailwind directives and custom styles
- **pages/** - Individual page components

## 🔗 Component Hierarchy

```
App
├── Router
├── QueryClientProvider
└── HealthProvider
    └── Routes
        ├── Dashboard
        │   └── MainLayout
        ├── Metrics
        │   └── MainLayout
        ├── Alerts
        │   └── MainLayout
        ├── History
        │   └── MainLayout
        └── Settings
            └── MainLayout
```

---

**Version:** 1.0.0  
**Last Updated:** February 21, 2026  
**Status:** Production Ready
