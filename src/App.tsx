import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HealthProvider } from './context/HealthContext';
import { MainLayout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { PatientMonitor } from './pages/PatientMonitor';
import { Metrics } from './pages/Metrics';
import { Alerts } from './pages/Alerts';
import { History } from './pages/History';
import { Settings } from './pages/Settings';
import { NotFound } from './pages/NotFound';
import './index.css';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HealthProvider>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              }
            />
            <Route
              path="/patient-monitor"
              element={
                <MainLayout>
                  <PatientMonitor />
                </MainLayout>
              }
            />
            <Route
              path="/metrics"
              element={
                <MainLayout>
                  <Metrics />
                </MainLayout>
              }
            />
            <Route
              path="/alerts"
              element={
                <MainLayout>
                  <Alerts />
                </MainLayout>
              }
            />
            <Route
              path="/history"
              element={
                <MainLayout>
                  <History />
                </MainLayout>
              }
            />
            <Route
              path="/settings"
              element={
                <MainLayout>
                  <Settings />
                </MainLayout>
              }
            />
            {/* Fallback route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </HealthProvider>
    </QueryClientProvider>
  );
}

export default App;
