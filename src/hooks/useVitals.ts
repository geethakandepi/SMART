import { useState, useEffect } from 'react';
import { vitalService } from '../services/api';

export interface Vitals {
  heartRate: number;
  bloodPressure: string;
  temperature: number;
  oxygenSaturation: number;
  respiratoryRate: number;
  bloodGlucose?: number;
  weight?: number;
  smsSent?: boolean;
  timestamp: Date;
}

export interface UseVitalsReturn {
  vitals: Vitals | null;
  status: 'idle' | 'loading' | 'success' | 'error';
  loading: boolean;
  error: string | null;
}

export const useVitals = (patientId: string): UseVitalsReturn => {
  const [vitals, setVitals] = useState<Vitals | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVitals = async () => {
      try {
        setStatus('loading');
        setError(null);

        const response = await vitalService.getRandomVitals(patientId);
        const data = response.data;

        const newVitals: Vitals = {
          heartRate: data.heartRate,
          bloodPressure: data.bloodPressure,
          temperature: data.temperature,
          oxygenSaturation: data.oxygenSaturation,
          respiratoryRate: data.respiratoryRate,
          bloodGlucose: data.bloodGlucose,
          weight: data.weight,
          smsSent: data.smsSent,
          timestamp: new Date(data.timestamp || Date.now()),
        };

        setVitals(newVitals);
        setStatus('success');

        // Show browser notification if smsSent is true
        if (data.smsSent && 'Notification' in window && Notification.permission === 'granted') {
          new Notification(`Alert for Patient ${patientId}`, {
            body: `SMS notification sent for vital signs alert`,
            icon: '/favicon.svg',
          });
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch vitals');
        setStatus('error');
        console.error('Error fetching vitals:', err);
      }
    };

    // Initial fetch
    fetchVitals();

    // Set up interval to fetch every 30 seconds
    const interval = setInterval(fetchVitals, 30000);

    return () => clearInterval(interval);
  }, [patientId]);

  return {
    vitals,
    status,
    loading: status === 'loading',
    error,
  };
};
