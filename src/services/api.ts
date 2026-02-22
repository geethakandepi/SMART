import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Health Data Services
export const healthService = {
  // Get health data
  getHealthMetrics: async (patientId: string) => {
    return apiClient.get(`/health/${patientId}/metrics`);
  },

  // Get vital signs
  getVitals: async (patientId: string) => {
    return apiClient.get(`/health/${patientId}/vitals`);
  },

  // Get health history
  getHealthHistory: async (patientId: string, days: number = 30) => {
    return apiClient.get(`/health/${patientId}/history`, { params: { days } });
  },

  // Update health data
  updateHealthData: async (patientId: string, data: any) => {
    return apiClient.post(`/health/${patientId}/update`, data);
  },

  // Get alerts
  getHealthAlerts: async (patientId: string) => {
    return apiClient.get(`/health/${patientId}/alerts`);
  },

  // Get recommendations
  getRecommendations: async (patientId: string) => {
    return apiClient.get(`/health/${patientId}/recommendations`);
  },
};

// Patient Services
export const patientService = {
  // Get patient profile
  getProfile: async (patientId: string) => {
    return apiClient.get(`/patients/${patientId}`);
  },

  // Update patient profile
  updateProfile: async (patientId: string, data: any) => {
    return apiClient.put(`/patients/${patientId}`, data);
  },

  // Get patient list (for admin)
  listPatients: async (page: number = 1, limit: number = 10) => {
    return apiClient.get('/patients', { params: { page, limit } });
  },
};

// Authentication Services
export const authService = {
  // Login
  login: async (email: string, password: string) => {
    return apiClient.post('/auth/login', { email, password });
  },

  // Register
  register: async (data: any) => {
    return apiClient.post('/auth/register', data);
  },

  // Logout
  logout: async () => {
    localStorage.removeItem('authToken');
    return Promise.resolve();
  },

  // Verify token
  verifyToken: async () => {
    return apiClient.get('/auth/verify');
  },
};

// Device Services
export const deviceService = {
  // Get paired devices
  getDevices: async (patientId: string) => {
    return apiClient.get(`/devices/${patientId}`);
  },

  // Pair new device
  pairDevice: async (patientId: string, deviceData: any) => {
    return apiClient.post(`/devices/${patientId}/pair`, deviceData);
  },

  // Get device data
  getDeviceData: async (deviceId: string) => {
    return apiClient.get(`/devices/${deviceId}/data`);
  },
};

// Vital Signs Services
export const vitalService = {
  // Check vitals
  checkVitals: async (patientId: string, patientName: string, room: string, vitals: any) => {
    return apiClient.post('/vitals/check', { patientId, patientName, room, vitals });
  },

  // Get random vitals
  getRandomVitals: async (patientId: string) => {
    return apiClient.get(`/vitals/random/${patientId}`);
  },
};

// Alert Services
export const alertService = {
  // Get active alerts
  getActiveAlerts: async () => {
    return apiClient.get('/alerts/active');
  },

  // Get alert history
  getAlertHistory: async () => {
    return apiClient.get('/alerts/history');
  },
};

// Patient Services (additional)
export const getPatients = async () => {
  return apiClient.get('/patients');
};

export default apiClient;
