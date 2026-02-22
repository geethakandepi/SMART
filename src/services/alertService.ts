import apiClient from './api';

// Types
interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

interface AlertData {
  id: number;
  patientId: string | number;
  patientName: string;
  room: string;
  severity: 'critical' | 'warning' | 'normal';
  message: string;
  timestamp: string;
  isAcknowledged: boolean;
  isResolved: boolean;
  acknowledgedBy?: string;
  acknowledgedAt?: string;
  resolvedBy?: string;
  resolvedAt?: string;
}

/**
 * Get all alerts from the system
 */
export const getAllAlerts = async (): Promise<ApiResponse<AlertData[]>> => {
  try {
    const response = await apiClient.get('/alerts');
    return {
      data: response.data,
      error: null,
    };
  } catch (error: any) {
    return {
      data: null,
      error: error?.message || 'Failed to fetch alerts',
    };
  }
};

/**
 * Get alerts for a specific patient
 */
export const getPatientAlerts = async (patientId: string | number): Promise<ApiResponse<AlertData[]>> => {
  try {
    const response = await apiClient.get(`/alerts/patient/${patientId}`);
    return {
      data: response.data,
      error: null,
    };
  } catch (error: any) {
    return {
      data: null,
      error: error?.message || `Failed to fetch alerts for patient ${patientId}`,
    };
  }
};

/**
 * Get unresolved critical alerts
 */
export const getCriticalAlerts = async (): Promise<ApiResponse<AlertData[]>> => {
  try {
    const response = await apiClient.get('/alerts/critical');
    return {
      data: response.data,
      error: null,
    };
  } catch (error: any) {
    return {
      data: null,
      error: error?.message || 'Failed to fetch critical alerts',
    };
  }
};

/**
 * Mark an alert as acknowledged
 */
export const acknowledgeAlert = async (alertId: string | number): Promise<ApiResponse<AlertData>> => {
  try {
    const response = await apiClient.post(`/alerts/${alertId}/acknowledge`, {
      acknowledgedAt: new Date().toISOString(),
    });
    return {
      data: response.data,
      error: null,
    };
  } catch (error: any) {
    return {
      data: null,
      error: error?.message || `Failed to acknowledge alert ${alertId}`,
    };
  }
};

/**
 * Mark an alert as resolved
 */
export const resolveAlert = async (alertId: string | number): Promise<ApiResponse<AlertData>> => {
  try {
    const response = await apiClient.post(`/alerts/${alertId}/resolve`, {
      resolvedAt: new Date().toISOString(),
    });
    return {
      data: response.data,
      error: null,
    };
  } catch (error: any) {
    return {
      data: null,
      error: error?.message || `Failed to resolve alert ${alertId}`,
    };
  }
};

/**
 * Create a new alert
 */
export const createAlert = async (alertData: Omit<AlertData, 'id'>): Promise<ApiResponse<AlertData>> => {
  try {
    const response = await apiClient.post('/alerts', alertData);
    return {
      data: response.data,
      error: null,
    };
  } catch (error: any) {
    return {
      data: null,
      error: error?.message || 'Failed to create alert',
    };
  }
};

/**
 * Bulk acknowledge alerts
 */
export const bulkAcknowledgeAlerts = async (alertIds: (string | number)[]): Promise<ApiResponse<{ updated: number }>> => {
  try {
    const response = await apiClient.post('/alerts/bulk-acknowledge', { alertIds });
    return {
      data: response.data,
      error: null,
    };
  } catch (error: any) {
    return {
      data: null,
      error: error?.message || 'Failed to acknowledge alerts',
    };
  }
};

export default {
  getAllAlerts,
  getPatientAlerts,
  getCriticalAlerts,
  acknowledgeAlert,
  resolveAlert,
  createAlert,
  bulkAcknowledgeAlerts,
};
