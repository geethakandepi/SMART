import apiClient from './api';

// Types
interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

interface VitalReading {
  id?: number;
  patientId: string | number;
  heartRate: number;
  bloodPressureSystolic: number;
  bloodPressureDiastolic: number;
  spO2: number;
  temperature: number;
  respiratoryRate: number;
  timestamp: string;
  deviceId?: string;
}

interface VitalStats {
  average: VitalReading;
  highest: VitalReading;
  lowest: VitalReading;
  readings: number;
  period: string;
}

/**
 * Get the latest vital signs for a patient
 */
export const getLatestVitals = async (patientId: string | number): Promise<ApiResponse<VitalReading>> => {
  try {
    const response = await apiClient.get(`/vitals/${patientId}/latest`);
    return {
      data: response.data,
      error: null,
    };
  } catch (error: any) {
    return {
      data: null,
      error: error?.message || `Failed to fetch latest vitals for patient ${patientId}`,
    };
  }
};

/**
 * Get vital signs history for a patient over specified hours
 */
export const getVitalHistory = async (
  patientId: string | number,
  hours: number = 24
): Promise<ApiResponse<VitalReading[]>> => {
  try {
    const response = await apiClient.get(`/vitals/${patientId}/history`, {
      params: { hours },
    });
    return {
      data: response.data,
      error: null,
    };
  } catch (error: any) {
    return {
      data: null,
      error: error?.message || `Failed to fetch vital history for patient ${patientId}`,
    };
  }
};

/**
 * Get vital signs statistics for a patient
 */
export const getVitalStats = async (
  patientId: string | number,
  days: number = 7
): Promise<ApiResponse<VitalStats>> => {
  try {
    const response = await apiClient.get(`/vitals/${patientId}/stats`, {
      params: { days },
    });
    return {
      data: response.data,
      error: null,
    };
  } catch (error: any) {
    return {
      data: null,
      error: error?.message || `Failed to fetch vital stats for patient ${patientId}`,
    };
  }
};

/**
 * Record a new vital reading
 */
export const recordVital = async (patientId: string | number, vitalData: Omit<VitalReading, 'id' | 'patientId'>): Promise<ApiResponse<VitalReading>> => {
  try {
    const response = await apiClient.post(`/vitals/${patientId}`, vitalData);
    return {
      data: response.data,
      error: null,
    };
  } catch (error: any) {
    return {
      data: null,
      error: error?.message || `Failed to record vital for patient ${patientId}`,
    };
  }
};

/**
 * Get vital readings within a date range
 */
export const getVitalsByDateRange = async (
  patientId: string | number,
  startDate: string,
  endDate: string
): Promise<ApiResponse<VitalReading[]>> => {
  try {
    const response = await apiClient.get(`/vitals/${patientId}/range`, {
      params: { startDate, endDate },
    });
    return {
      data: response.data,
      error: null,
    };
  } catch (error: any) {
    return {
      data: null,
      error: error?.message || `Failed to fetch vital range for patient ${patientId}`,
    };
  }
};

/**
 * Get abnormal vital readings
 */
export const getAbnormalVitals = async (patientId: string | number): Promise<ApiResponse<VitalReading[]>> => {
  try {
    const response = await apiClient.get(`/vitals/${patientId}/abnormal`);
    return {
      data: response.data,
      error: null,
    };
  } catch (error: any) {
    return {
      data: null,
      error: error?.message || `Failed to fetch abnormal vitals for patient ${patientId}`,
    };
  }
};

/**
 * Get vital trends (comparison over time)
 */
export const getVitalTrends = async (
  patientId: string | number,
  days: number = 7
): Promise<ApiResponse<any>> => {
  try {
    const response = await apiClient.get(`/vitals/${patientId}/trends`, {
      params: { days },
    });
    return {
      data: response.data,
      error: null,
    };
  } catch (error: any) {
    return {
      data: null,
      error: error?.message || `Failed to fetch vital trends for patient ${patientId}`,
    };
  }
};

/**
 * Bulk record vitals for multiple patients
 */
export const bulkRecordVitals = async (
  vitalData: { patientId: string | number; vitals: Omit<VitalReading, 'id' | 'patientId'> }[]
): Promise<ApiResponse<{ recorded: number; failed: number }>> => {
  try {
    const response = await apiClient.post('/vitals/bulk', vitalData);
    return {
      data: response.data,
      error: null,
    };
  } catch (error: any) {
    return {
      data: null,
      error: error?.message || 'Failed to record bulk vitals',
    };
  }
};

export default {
  getLatestVitals,
  getVitalHistory,
  getVitalStats,
  recordVital,
  getVitalsByDateRange,
  getAbnormalVitals,
  getVitalTrends,
  bulkRecordVitals,
};
