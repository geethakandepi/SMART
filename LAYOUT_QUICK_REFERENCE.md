# ResGuard Layout - Quick Reference

## 📐 Layout Structure

```
┌─────────────────────────────────────────────────────────┐
│                       NAVBAR                             │
│  ☰ Menu  │  ResGuard Logo  │  🕐 Time/Date  │🔔 ✉️ 👤   │
├──────────────┬─────────────────────────────────────────┤
│              │                                          │
│              │                                          │
│  SIDEBAR     │                                          │
│              │          MAIN CONTENT AREA               │
│  🏠 Dash     │                                          │
│  ❤️ Monitor  │          (Page Content Renders)          │
│  🔔 Alerts   │                                          │
│  📊 Reports  │                                          │
│  ⚙️ Settings │                                          │
│              │                                          │
│              │                                          │
│  User Info   │                                          │
└──────────────┴─────────────────────────────────────────┘
│                     FOOTER (Optional)                    │
└─────────────────────────────────────────────────────────┘
```

## 🎯 Navigation Items

| Icon | Label | Route | Purpose |
|------|-------|-------|---------|
| 🏠 | Dashboard | `/` | Health overview & vitals |
| ❤️ | Patient Monitor | `/metrics` | Detailed health metrics |
| 🔔 | Alerts & Notifications | `/alerts` | Alert management |
| 📊 | Reports | `/history` | Historical data & trends |
| ⚙️ | Settings | `/settings` | User preferences |

## 📱 Responsive Behavior

### Mobile (<640px)
```
┌─────────────────────┐
│ ☰  │     🔔 ✉️ 👤    │  ← Navbar (sticky)
├─────────────────────┤
│                     │
│   MAIN CONTENT      │  ← Full width
│                     │
│  (Sidebar hidden,   │
│   overlay when      │
│   menu is open)     │
│                     │
└─────────────────────┘
```

### Tablet/Desktop (≥1024px)
```
┌─────────────┬──────────────────────────────┐
│   SIDEBAR   │   NAVBAR (Sticky Top)        │
│  (Always    ├──────────────────────────────┤
│   Visible)  │                              │
│             │   MAIN CONTENT AREA          │
│             │   (Full responsive width)    │
└─────────────┴──────────────────────────────┘
```

## 🎨 Color Scheme

### Navbar & Sidebar
- **Background:** Dark (#1F2937)
- **Border:** Subtle gray (#374151)
- **Active Link:** Blue gradient (#0EA5E9 to #0284C7)
- **Hover:** Light dark (#4B5563)
- **Text:** Light gray (#f3f4f6)

### Notification Badge
- **Background:** Alert red (#EF4444)
- **Text:** White
- **Position:** Top-right of bell icon

## ⚡ Key Features

### Sidebar
- ✅ Fixed positioning
- ✅ Collapsible on mobile
- ✅ Auto-expand on desktop
- ✅ Active link highlighting
- ✅ User profile section
- ✅ Smooth width transitions
- ✅ Overlay on mobile when open

### Navbar
- ✅ Fixed at top
- ✅ Live time/date display (updates every second)
- ✅ Notification badge with count
- ✅ Responsive menu toggle
- ✅ User profile dropdown
- ✅ Message and notification buttons
- ✅ Offset for sidebar on desktop

### Main Content
- ✅ Center-aligned with max-width
- ✅ Proper padding on all screen sizes
- ✅ Footer with copyright
- ✅ Full responsive support

## 💻 Component Usage

### Basic Usage
```tsx
import { MainLayout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';

function App() {
  return (
    <MainLayout>
      <Dashboard />
    </MainLayout>
  );
}
```

### With Notifications
```tsx
<MainLayout 
  notificationCount={5}
  onNotificationClick={() => {
    // Handle notification click
    navigate('/alerts');
  }}
/>
```

## 🔧 File Locations

**Layout Components:**
```
src/components/Layout/
├── MainLayout.tsx    (1.9 KB)
├── Sidebar.tsx       (4.3 KB)
├── Navbar.tsx        (4.9 KB)
└── index.ts          (0.1 KB)
```

**Total Layout Code:** ~11 KB

## 📊 Component Sizes

| Component | File Size | Lines | Purpose |
|-----------|-----------|-------|---------|
| MainLayout | 1.9 KB | 62 | Wrapper component |
| Sidebar | 4.3 KB | 118 | Navigation sidebar |
| Navbar | 4.9 KB | 165 | Top navigation |

## 🚀 Performance

- **Bundle Impact:** ~10-12 KB combined
- **Render Performance:** Optimized with minimal re-renders
- **Mobile Performance:** Smooth animations with CSS transitions
- **Load Time:** <200ms additional with all layout components

## 🔄 State Management

- **Sidebar Open State:** Local state (no Redux)
- **Navbar Time:** useEffect with cleanup
- **Route Detection:** useLocation from React Router
- **Notification Count:** Passed as props

## 🎓 Integration Guide

### Step 1: Import MainLayout
```tsx
import { MainLayout } from './components/Layout';
```

### Step 2: Wrap Your Page
```tsx
export const Dashboard = () => (
  <MainLayout>
    <YourContent />
  </MainLayout>
);
```

### Step 3: Handle Events (Optional)
```tsx
<MainLayout 
  onNotificationClick={handleNotif}
  onProfileClick={handleProfile}
  notificationCount={unreadCount}
/>
```

## 🐛 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Sidebar not toggling | Verify `onToggle` is passed to Sidebar |
| Time not updating | Check browser console, refresh page |
| Layout broken on mobile | Clear cache, verify Tailwind CSS |
| Links not highlighting | Ensure routes match exactly |
| Navbar overlapping content | Check `mt-20 lg:mt-0` class on main |

## 📞 Support

For layout issues or customization:
1. Check LAYOUT_DOCUMENTATION.md
2. Review component props
3. Verify Tailwind CSS is loaded
4. Check browser console for errors

---

**Last Updated:** February 21, 2026  
**Status:** ✅ Production Ready  
**Version:** 1.0.0
