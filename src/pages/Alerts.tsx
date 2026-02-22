import React, { useState, useEffect } from 'react';
import { alertService } from '../services/api';

// Types
interface Alert {
  id: number | string;
  patientName: string;
  room: string;
  severity: 'critical' | 'warning' | 'normal';
  message: string;
  timestamp: string;
  isAcknowledged: boolean;
  isResolved: boolean;
  smsSent?: boolean;
}

interface Toast {
  id: number;
  message: string;
  severity: 'critical' | 'warning' | 'normal';
}

// Mock data for alerts (fallback)
const mockAlertsData: Alert[] = [
  { id: 1, patientName: 'John Doe', room: '101', severity: 'critical', message: 'Heart rate exceeded 120 BPM', timestamp: '5 mins ago', isAcknowledged: false, isResolved: false, smsSent: true },
  { id: 2, patientName: 'Jane Smith', room: '102', severity: 'critical', message: 'SpO2 dropped below 92%', timestamp: '12 mins ago', isAcknowledged: false, isResolved: false, smsSent: false },
  { id: 3, patientName: 'Robert Johnson', room: '103', severity: 'warning', message: 'Blood pressure elevated to 145/95', timestamp: '28 mins ago', isAcknowledged: true, isResolved: false, smsSent: true },
  { id: 4, patientName: 'Emma Davis', room: '104', severity: 'warning', message: 'Temperature reading 38.2°C', timestamp: '1 hour ago', isAcknowledged: true, isResolved: false, smsSent: false },
  { id: 5, patientName: 'Michael Wilson', room: '105', severity: 'normal', message: 'Routine vital signs check completed', timestamp: '2 hours ago', isAcknowledged: true, isResolved: true, smsSent: false },
  { id: 6, patientName: 'Sarah Anderson', room: '106', severity: 'warning', message: 'Irregular heart pattern detected', timestamp: '3 hours ago', isAcknowledged: true, isResolved: true, smsSent: true },
  { id: 7, patientName: 'David Brown', room: '107', severity: 'critical', message: 'Blood glucose critically low', timestamp: '4 hours ago', isAcknowledged: false, isResolved: false, smsSent: true },
  { id: 8, patientName: 'Lisa Taylor', room: '108', severity: 'normal', message: 'Device sync successful', timestamp: '5 hours ago', isAcknowledged: true, isResolved: true, smsSent: false },
];

// Severity badge component
interface SeverityBadgeProps {
  severity: 'critical' | 'warning' | 'normal';
}

const SeverityBadge: React.FC<SeverityBadgeProps> = ({ severity }) => {
  const severityMap = {
    critical: { bg: 'bg-red-900 border-red-700', text: 'text-red-200', label: 'CRITICAL' },
    warning: { bg: 'bg-yellow-900 border-yellow-700', text: 'text-yellow-200', label: 'WARNING' },
    normal: { bg: 'bg-green-900 border-green-700', text: 'text-green-200', label: 'NORMAL' },
  };

  const style = severityMap[severity];

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${style.bg} ${style.text}`}>
      {style.label}
    </span>
  );
};

// Toast notification component
interface ToastProps {
  toast: Toast;
  onClose: (id: number) => void;
}

const ToastNotification: React.FC<ToastProps> = ({ toast, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(toast.id), 5000);
    return () => clearTimeout(timer);
  }, [toast.id, onClose]);

  const severityStyles = {
    critical: 'bg-red-900 border-red-700',
    warning: 'bg-yellow-900 border-yellow-700',
    normal: 'bg-green-900 border-green-700',
  };

  const icon = {
    critical: '🚨',
    warning: '⚠️',
    normal: '✅',
  };

  return (
    <div className={`fixed top-6 right-6 flex items-center gap-3 p-4 rounded-lg border ${severityStyles[toast.severity]} text-white shadow-lg animate-slide-in z-50`}>
      <span className="text-xl">{icon[toast.severity]}</span>
      <span className="font-medium">{toast.message}</span>
      <button
        onClick={() => onClose(toast.id)}
        className="ml-4 text-white hover:text-gray-200 transition"
      >
        ✕
      </button>
    </div>
  );
};

// Alert item component
interface AlertItemProps {
  alert: Alert;
  onAcknowledge: (id: number | string) => void;
  onResolve: (id: number | string) => void;
}

const AlertItem: React.FC<AlertItemProps> = ({ alert, onAcknowledge, onResolve }) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 md:p-4 mb-3 md:mb-4 hover:border-gray-600 transition animate-slideInLeft">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2 md:mb-3">
            <SeverityBadge severity={alert.severity} />
            {alert.smsSent && (
              <span className="px-2 py-1 rounded text-xs font-semibold bg-purple-900 text-purple-200">
                📱 SMS SENT
              </span>
            )}
            {alert.isResolved && (
              <span className="px-2 py-1 rounded text-xs font-semibold bg-gray-700 text-gray-300">
                RESOLVED
              </span>
            )}
            {alert.isAcknowledged && !alert.isResolved && (
              <span className="px-2 py-1 rounded text-xs font-semibold bg-blue-900 text-blue-200">
                ACKNOWLEDGED
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4 mb-2 md:mb-3">
            <div className="min-w-0">
              <p className="text-xs md:text-sm text-gray-400">Patient & Room</p>
              <p className="text-white font-semibold text-sm md:text-base truncate">{alert.patientName} - Room {alert.room}</p>
            </div>
            <div className="min-w-0">
              <p className="text-xs md:text-sm text-gray-400">Timestamp</p>
              <p className="text-white font-semibold text-sm md:text-base">{alert.timestamp}</p>
            </div>
          </div>

          <p className="text-gray-200 text-sm md:text-base mb-2 md:mb-3">{alert.message}</p>
        </div>

        <div className="flex gap-2 flex-col xs:flex-row md:flex-col lg:flex-row">
          {!alert.isAcknowledged && (
            <button
              onClick={() => onAcknowledge(alert.id)}
              className="px-3 md:px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold transition text-xs md:text-sm whitespace-nowrap"
            >
              👁️ Acknowledge
            </button>
          )}
          {!alert.isResolved && (
            <button
              onClick={() => onResolve(alert.id)}
              className="px-3 md:px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white font-semibold transition text-xs md:text-sm whitespace-nowrap"
            >
              ✓ Resolve
            </button>
          )}
          {alert.isResolved && (
            <button
              disabled
              className="px-3 md:px-4 py-2 rounded bg-gray-700 text-gray-400 font-semibold text-xs md:text-sm whitespace-nowrap cursor-not-allowed"
            >
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export const Alerts: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlertsData);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'critical' | 'warning' | 'normal'>('all');
  const [filterPatient, setFilterPatient] = useState('');
  const [filterResolved, setFilterResolved] = useState<'all' | 'pending' | 'resolved'>('all');
  const [loading, setLoading] = useState(true);

  // Fetch active alerts from API
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setLoading(true);
        const response = await alertService.getActiveAlerts();
        const apiAlerts = response.data || [];

        // Convert API response to Alert format
        const formattedAlerts: Alert[] = apiAlerts.map((alert: any) => ({
          id: alert.id,
          patientName: alert.patientName,
          room: alert.room,
          severity: alert.severity,
          message: alert.message,
          timestamp: alert.timestamp,
          isAcknowledged: alert.isAcknowledged || false,
          isResolved: alert.isResolved || false,
          smsSent: alert.smsSent || false,
        }));

        setAlerts(formattedAlerts.length > 0 ? formattedAlerts : mockAlertsData);
      } catch (err) {
        console.error('Error fetching alerts:', err);
        setAlerts(mockAlertsData);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();

    // Refresh alerts every 30 seconds
    const interval = setInterval(fetchAlerts, 30000);
    return () => clearInterval(interval);
  }, []);

  // Filter alerts based on criteria
  const filteredAlerts = alerts.filter(alert => {
    if (filterSeverity !== 'all' && alert.severity !== filterSeverity) return false;
    if (filterPatient && !alert.patientName.toLowerCase().includes(filterPatient.toLowerCase())) return false;
    if (filterResolved === 'pending' && alert.isResolved) return false;
    if (filterResolved === 'resolved' && !alert.isResolved) return false;
    return true;
  });

  // Calculate statistics
  const criticalCount = alerts.filter(a => a.severity === 'critical' && !a.isResolved).length;
  const resolvedCount = alerts.filter(a => a.isResolved).length;
  const totalToday = alerts.length;

  // Handle acknowledge
  const handleAcknowledge = (id: number | string) => {
    setAlerts(prev =>
      prev.map(alert =>
        alert.id === id ? { ...alert, isAcknowledged: true } : alert
      )
    );
  };

  // Handle resolve
  const handleResolve = (id: number | string) => {
    setAlerts(prev =>
      prev.map(alert =>
        alert.id === id ? { ...alert, isResolved: true, isAcknowledged: true } : alert
      )
    );
  };

  // Remove toast notification
  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="p-4 md:p-6 bg-gray-900 min-h-screen page-container">
      {/* Header */}
      <div className="mb-6 md:mb-8 animate-fadeIn">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">Alerts & Notifications</h1>
        <p className="text-gray-400 mt-1 md:mt-2 text-sm md:text-base">Manage patient alerts and notifications</p>
      </div>

      {/* Statistics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8 stagger-animation">
        <div className="bg-sky-900 bg-opacity-30 border border-sky-700 rounded-lg p-3 md:p-4">
          <p className="text-sky-300 text-xs md:text-sm font-semibold">Total Alerts Today</p>
          <p className="text-white text-2xl md:text-3xl font-bold mt-1 md:mt-2">{totalToday}</p>
        </div>
        <div className="bg-red-900 bg-opacity-30 border border-red-700 rounded-lg p-3 md:p-4">
          <p className="text-red-300 text-xs md:text-sm font-semibold">🚨 Critical & Unresolved</p>
          <p className="text-white text-2xl md:text-3xl font-bold mt-1 md:mt-2">{criticalCount}</p>
        </div>
        <div className="bg-green-900 bg-opacity-30 border border-green-700 rounded-lg p-3 md:p-4">
          <p className="text-green-300 text-xs md:text-sm font-semibold">✓ Resolved</p>
          <p className="text-white text-2xl md:text-3xl font-bold mt-1 md:mt-2">{resolvedCount}</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 md:p-6 mb-6 md:mb-8 animate-slideInDown">
        <h2 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4">Filters</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {/* Severity Filter */}
          <div>
            <label className="block text-xs md:text-sm font-semibold text-gray-300 mb-2">Severity</label>
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value as any)}
              className="w-full bg-gray-700 text-white border border-gray-600 rounded px-2 md:px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 transition text-xs md:text-sm"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical Only</option>
              <option value="warning">Warning Only</option>
              <option value="normal">Normal Only</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-xs md:text-sm font-semibold text-gray-300 mb-2">Status</label>
            <select
              value={filterResolved}
              onChange={(e) => setFilterResolved(e.target.value as any)}
              className="w-full bg-gray-700 text-white border border-gray-600 rounded px-2 md:px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 transition text-xs md:text-sm"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          {/* Patient Name Filter */}
          <div className="sm:col-span-2 lg:col-span-2">
            <label className="block text-xs md:text-sm font-semibold text-gray-300 mb-2">Patient Name</label>
            <input
              type="text"
              value={filterPatient}
              onChange={(e) => setFilterPatient(e.target.value)}
              placeholder="Search patient name..."
              className="w-full bg-gray-700 text-white border border-gray-600 rounded px-2 md:px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 transition placeholder-gray-500 text-xs md:text-sm"
            />
          </div>
        </div>

        {/* Clear Filters */}
        {(filterSeverity !== 'all' || filterPatient || filterResolved !== 'all') && (
          <div className="mt-3 md:mt-4">
            <button
              onClick={() => {
                setFilterSeverity('all');
                setFilterPatient('');
                setFilterResolved('all');
              }}
              className="px-3 md:px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition text-xs md:text-sm"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Alerts Count */}
      <div className="mb-3 md:mb-4">
        <p className="text-gray-400 text-xs md:text-sm">
          Showing <span className="text-white font-semibold">{filteredAlerts.length}</span> of{' '}
          <span className="text-white font-semibold">{alerts.length}</span> alerts
        </p>
      </div>

      {/* Alerts List */}
      <div className="mb-8 stagger-animation">
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map(alert => (
            <AlertItem
              key={alert.id}
              alert={alert}
              onAcknowledge={handleAcknowledge}
              onResolve={handleResolve}
            />
          ))
        ) : (
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 md:p-8 text-center">
            <p className="text-gray-400 text-base md:text-lg">No alerts found with current filters</p>
            <p className="text-gray-500 text-xs md:text-sm mt-2">Adjust your search criteria to view alerts</p>
          </div>
        )}
      </div>

      {/* Toast Notifications */}
      <div className="fixed top-0 right-0 z-50">
        {toasts.map(toast => (
          <ToastNotification key={toast.id} toast={toast} onClose={removeToast} />
        ))}
      </div>
    </div>
  );
};
