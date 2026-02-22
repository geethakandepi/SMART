# ResGuard - Smart Health Monitoring System Frontend

A modern, responsive health monitoring dashboard built with React 18, Vite, and Tailwind CSS. ResGuard provides real-time health metrics tracking, alert management, and comprehensive health history visualization.

## 🏥 Features

- **Real-time Health Monitoring**: Track vital signs including heart rate, blood pressure, temperature, and oxygen saturation
- **Interactive Dashboards**: Beautiful charts and visualizations using Recharts
- **Alert Management**: Receive and manage critical health alerts
- **Health History**: View historical health data with trends and analytics
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark Medical Theme**: Professional healthcare-inspired UI with intuitive navigation
- **Data Sync**: Automatic cloud synchronization of health data
- **Privacy-First**: Secure local and encrypted cloud storage options

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **Routing**: React Router v6
- **State Management**: React Query (TanStack Query)
- **Data Visualization**: Recharts
- **HTTP Client**: Axios
- **Language**: TypeScript

## 📋 Project Structure

```
src/
├── pages/              # Page components (Dashboard, Metrics, Alerts, etc.)
├── components/         # Reusable UI components
├── context/            # React Context for global state (HealthContext)
├── hooks/              # Custom React hooks (useHealth)
├── services/           # API services and data fetching
├── utils/              # Helper functions and utilities
├── assets/             # Static assets (images, icons, etc.)
├── App.tsx             # Main App router and setup
├── main.tsx            # Application entry point
└── index.css           # Tailwind CSS styles
```

## 🎨 Color Scheme

- **Primary (Blue)**: `#0EA5E9` - Main actions and UI elements
- **Alert (Red)**: `#EF4444` - Critical warnings and dangerous actions
- **Safe (Green)**: `#22C55E` - Success states and normal readings
- **Dark Background**: `#111827` - Dark sidebar and main background
- **Dark Secondary**: `#1F2937` - Cards and secondary backgrounds

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn
- Modern web browser

### Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Configure environment**:
Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

Edit `.env` and set your API endpoint:
```
VITE_API_URL=http://localhost:5000/api
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

Create an optimized production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 📖 Pages Overview

### Dashboard
Overview of current health status with key metrics, trends, and quick action buttons.

### Health Metrics
Detailed analysis of vital signs with weekly comparison charts and statistics.

### Alerts
Centralized alert management with filtering options and notification preferences.

### Health History
Historical data visualization with charts showing trends over 7, 30, and 90-day periods.

### Settings
User profile management, notification preferences, security settings, and data privacy options.

## 🔗 API Integration

The application connects to a backend API. Key endpoints:

- `GET /health/{patientId}/metrics` - Current health metrics
- `GET /health/{patientId}/vitals` - Real-time vital signs
- `GET /health/{patientId}/history` - Historical data
- `GET /health/{patientId}/alerts` - Health alerts
- `POST /auth/login` - User authentication
- `PUT /patients/{patientId}` - Update patient profile

## 🎯 Custom Hooks

### useHealth
Access global health context:
```tsx
import { useHealth } from '@/hooks/useHealth';

function MyComponent() {
  const { metrics, alerts, updateMetrics } = useHealth();
  // Use health context...
}
```

## 🛠️ Utilities

### Health Helpers (`utils/helpers.ts`)
- `formatNumber()` - Format numbers with specific decimals
- `getHealthStatusColor()` - Determine color based on health metric
- `formatTime()` / `formatDate()` / `formatDateTime()` - Date formatting
- `getRelativeTime()` - Convert dates to relative time
- `generateMockHealthData()` - Generate mock health data for development
- `calculateAverage()` - Calculate average from array
- `getMinMax()` - Get min/max values from array

## 📊 Components

### MetricCard
Display individual health metrics:
```tsx
<MetricCard
  label="Heart Rate"
  value={72}
  unit="bpm"
  normalMin={60}
  normalMax={100}
  icon="❤️"
  trend="stable"
/>
```

### CriticalAlert
Display critical or warning alerts:
```tsx
<CriticalAlert
  message="Heart rate elevated"
  severity="warning"
/>
```

### Layout
Main application layout with sidebar navigation and header.

## 🔐 Security

- Environment variables for sensitive configuration
- API request interceptors for authentication
- HTTPS recommended for production
- Data sanitization and validation
- User session management

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📱 Responsive Breakpoints

- Mobile: <640px
- Tablet: 640px - 1024px
- Desktop: >1024px

## 🔄 State Management

### Global Health Context
- `metrics`: Current health metrics
- `alerts`: Array of health alerts
- `updateMetrics()`: Update current metrics
- `addAlert()`: Add new alert
- `clearAlert()`: Remove specific alert
- `clearAllAlerts()`: Clear all alerts

### React Query
Used for:
- Server state management
- Data fetching and caching
- Background sync
- Request deduplication

## 🚦 Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 🤝 Contributing

1. Create feature branches from `main`
2. Follow existing code style and patterns
3. Write clear commit messages
4. Create pull requests with descriptions
5. Ensure all tests pass and linting succeeds

## 📝 License

Private - ResGuard Smart Health Monitoring System

## 📞 Support

For issues, feature requests, or questions:
- Open an issue on the project repository
- Contact the development team

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Router](https://reactrouter.com/)
- [React Query](https://tanstack.com/query/latest)
- [Recharts](https://recharts.org/)

---

**Last Updated**: February 21, 2026
**Version**: 1.0.0
**Status**: Development
