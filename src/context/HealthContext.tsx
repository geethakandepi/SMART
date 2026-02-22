import React, { createContext, useState, useCallback, useEffect } from 'react';
import { alertService } from '../services/api';

export interface HealthMetrics {
  heartRate: number;
  bloodPressure: string;
  temperature: number;
  oxygenSaturation: number;
  respiratoryRate: number;
  bloodGlucose?: number;
  weight?: number;
  timestamp: Date;
}

export interface HealthAlert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export interface AlertHistoryItem {
  id: string;
  patientName: string;
  room: string;
  severity: 'critical' | 'warning' | 'normal';
  message: string;
  timestamp: string;
  smsSent: boolean;
}

export interface HealthContextType {
  metrics: HealthMetrics | null;
  alerts: HealthAlert[];
  alertHistory: AlertHistoryItem[];
  updateMetrics: (metrics: HealthMetrics) => void;
  addAlert: (alert: HealthAlert) => void;
  clearAlert: (id: string) => void;
  clearAllAlerts: () => void;
}

export const HealthContext = createContext<HealthContextType | undefined>(undefined);

export const HealthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [metrics, setMetrics] = useState<HealthMetrics | null>(null);
  const [alerts, setAlerts] = useState<HealthAlert[]>([]);
  const [alertHistory, setAlertHistory] = useState<AlertHistoryItem[]>([]);

  // Fetch alert history on mount
  useEffect(() => {
    const fetchAlertHistory = async () => {
      try {
        const response = await alertService.getAlertHistory();
        setAlertHistory(response.data || []);
      } catch (err) {
        console.error('Error fetching alert history:', err);
      }
    };

    fetchAlertHistory();
  }, []);

  const updateMetrics = useCallback((newMetrics: HealthMetrics) => {
    setMetrics(newMetrics);
  }, []);

  const addAlert = useCallback((alert: HealthAlert) => {
    setAlerts((prevAlerts) => [alert, ...prevAlerts]);
  }, []);

  const clearAlert = useCallback((id: string) => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
  }, []);

  const clearAllAlerts = useCallback(() => {
    setAlerts([]);
  }, []);

  const value: HealthContextType = {
    metrics,
    alerts,
    alertHistory,
    updateMetrics,
    addAlert,
    clearAlert,
    clearAllAlerts,
  };

  return <HealthContext.Provider value={value}>{children}</HealthContext.Provider>;
};
