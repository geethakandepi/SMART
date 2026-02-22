# ResGuard Project Setup Guide

## ✅ Project Successfully Created!

ResGuard - Smart Health Monitoring System Frontend has been fully scaffolded and is ready for development.

### 📋 What's Included

#### **Core Project Files**
- ✅ React 18 + Vite setup with TypeScript
- ✅ Tailwind CSS 4 with custom medical color scheme
- ✅ React Router v6 for navigation
- ✅ React Query (TanStack Query) for data management
- ✅ Recharts for health data visualization
- ✅ Axios for API communication

#### **Project Structure**
```
src/
├── pages/
│   ├── Dashboard.tsx       # Main health overview
│   ├── Metrics.tsx         # Detailed metrics analysis
│   ├── Alerts.tsx          # Alert management
│   ├── History.tsx         # Historical data & trends
│   └── Settings.tsx        # User settings
├── components/
│   ├── Layout.tsx          # Main app layout with sidebar
│   └── MetricCard.tsx      # Health metric display component
├── context/
│   └── HealthContext.tsx   # Global health state
├── hooks/
│   └── useHealth.ts        # Custom health hook
├── services/
│   └── api.ts              # API integration
├── utils/
│   └── helpers.ts          # Utility functions
├── assets/                 # Static assets
├── App.tsx                 # Main router
├── main.tsx                # Entry point
└── index.css               # Tailwind styles
```

### 🎨 Design System

**Color Palette:**
- Primary Blue: `#0EA5E9` - Main actions & UI
- Alert Red: `#EF4444` - Warnings & critical alerts
- Safe Green: `#22C55E` - Success states
- Dark Background: `#111827` - Main background
- Secondary Dark: `#1F2937` - Cards & components

**Features:**
- Dark medical dashboard theme
- Responsive sidebar navigation
- Professional health monitoring UI
- Custom Tailwind components (.card, .btn, .badge, .input)

### 🚀 Getting Started

#### 1. **Development Server**
```bash
npm run dev
```
Server runs at: `http://localhost:5173/`

#### 2. **Build for Production**
```bash
npm run build
```

#### 3. **Preview Production Build**
```bash
npm run preview
```

#### 4. **Linting**
```bash
npm run lint
```

### 📦 Installed Dependencies

**Production:**
- react@18.2.0
- react-dom@19.2.0
- react-router-dom@7.13.0
- @tanstack/react-query@5.90.21
- recharts@3.7.0
- axios@1.13.5

**Development:**
- TypeScript
- Vite 7
- tailwindcss@4.2.0
- @tailwindcss/postcss
- autoprefixer
- eslint + plugins

### 🔌 API Integration

**Create `.env` file:**
```bash
cp .env.example .env
```

**Configure API endpoint:**
```
VITE_API_URL=http://localhost:5000/api
```

**Available Services:**
- `healthService` - Health metrics & vitals
- `patientService` - Patient profile management
- `authService` - Authentication
- `deviceService` - Device management

### 🎯 Pages

| Page | Purpose | Features |
|------|---------|----------|
| Dashboard | Health overview | Current metrics, trends, quick actions |
| Metrics | Detailed analysis | Weekly charts, statistics, export |
| Alerts | Alert management | Critical alerts, notification settings |
| History | Historical data | Trend charts, detailed records |
| Settings | User preferences | Profile, notifications, security |

### 💡 Key Components

**MetricCard**
- Displays individual health metrics
- Color-coded status indicators
- Normal range references
- Trend icons

**CriticalAlert**
- Error and warning displays
- Severity levels (critical/warning)
- Icon indicators

**Layout**
- Responsive sidebar navigation
- Header with notifications
- Dark theme applied globally

### 🛠️ Utilities Available

```typescript
// helpers.ts functions
formatNumber(value, decimals)
getHealthStatusColor(value, min, max)
parseBloodPressure(bp)
formatTime/formatDate/formatDateTime(date)
getRelativeTime(date)
generateMockHealthData()
calculateAverage(values)
getMinMax(values)
```

### 🔐 Security Features

- ✅ TypeScript for type safety
- ✅ Environment variables for config
- ✅ API interceptors for auth
- ✅ Input validation helpers
- ✅ Token management in localStorage

### 📱 Responsive Design

- **Mobile**: <640px
- **Tablet**: 640px - 1024px  
- **Desktop**: >1024px

### 🎓 Next Steps

1. **Update API URLs** - Configure `VITE_API_URL` in `.env`
2. **Add Authentication** - Implement login in auth service
3. **Connect Backend** - Link to ResGuard API server
4. **Add Real Data** - Replace mock data with API calls
5. **Customize Branding** - Update logo and colors in settings
6. **Deploy** - Build and host on production server

### 📖 Documentation

- [Full README](./README.md) - Comprehensive project documentation
- [Tailwind Config](./tailwind.config.js) - Color scheme & theme
- [API Services](./src/services/api.ts) - Backend integration
- [Health Context](./src/context/HealthContext.tsx) - Global state

### 🐛 Troubleshooting

**Port 5173 already in use?**
```bash
npm run dev -- --port 3000
```

**Build errors?**
```bash
rm -rf node_modules dist
npm install
npm run build
```

**Module not found?**
```bash
npm install
npm run dev
```

### 📞 Support Resources

- [React Docs](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com)
- [React Query](https://tanstack.com/query)
- [Recharts](https://recharts.org)

---

**Project Status**: ✅ Ready for Development
**Last Updated**: February 21, 2026
**Version**: 1.0.0
