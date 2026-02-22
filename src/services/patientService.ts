import apiClient from './api';

// Types
interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

interface Patient {
  id: number;
  name: string;
  age: number;
  ward: string;
  bedNumber: string;
  doctor: string;
  admissionDate: string;
  email?: string;
  phone?: string;
  status?: string;
}

interface PatientVitals {
  heartRate: number;
  bloodPressureSystolic: number;
  bloodPressureDiastolic: number;
  spO2: number;
  temperature: number;
  respiratoryRate: number;
  timestamp: string;
}

/**
 * Get all patients from the system
 */
export const getAllPatients = async (): Promise<ApiResponse<Patient[]>> => {
  try {
    const response = await apiClient.get('/patients');
    return {
      data: response.data,
      error: null,
    };
  } catch (error: any) {
    return {
      data: null,
      error: error?.message || 'Failed to fetch patients',
    };
  }
};

/**
 * Get a specific patient by ID
 */
export const getPatientById = async (id: string | number): Promise<ApiResponse<Patient>> => {
  try {
    const response = await apiClient.get(`/patients/${id}`);
    return {
      data: response.data,
      error: null,
    };
  } catch (error: any) {
    return {
      data: null,
      error: error?.message || `Failed to fetch patient ${id}`,
    };
  }
};

/**
 * Get the latest vital signs for a patient
 */
export const getPatientVitals = async (id: string | number): Promise<ApiResponse<PatientVitals>> => {
  try {
    const response = await apiClient.get(`/patients/${id}/vitals`);
    return {
      data: response.data,
      error: null,
    };
  } catch (error: any) {
    return {
      data: null,
      error: error?.message || `Failed to fetch vitals for patient ${id}`,
    };
  }
};

/**
 * Update patient information
 */
export const updatePatient = async (
  id: string | number,
  patientData: Partial<Patient>
): Promise<ApiResponse<Patient>> => {
  try {
    const response = await apiClient.put(`/patients/${id}`, patientData);
    return {
      data: response.data,
      error: null,
    };
  } catch (error: any) {
    return {
      data: null,
      error: error?.message || `Failed to update patient ${id}`,
    };
  }
};

/**
 * Discharge a patient
 */
export const dischargePatient = async (id: string | number): Promise<ApiResponse<{ success: boolean }>> => {
  try {
    const response = await apiClient.post(`/patients/${id}/discharge`);
    return {
      data: response.data,
      error: null,
    };
  } catch (error: any) {
    return {
      data: null,
      error: error?.message || `Failed to discharge patient ${id}`,
    };
  }
};

export default {
  getAllPatients,
  getPatientById,
  getPatientVitals,
  updatePatient,
  dischargePatient,
};
