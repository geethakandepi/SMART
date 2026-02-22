// Format number with specific decimal places
export const formatNumber = (value: number, decimals: number = 1): string => {
  return value.toFixed(decimals);
};

// Get health status color based on value and normal range
export const getHealthStatusColor = (
  value: number,
  normalMin: number,
  normalMax: number
): 'safe' | 'alert' | 'warning' => {
  if (value >= normalMin && value <= normalMax) {
    return 'safe';
  }
  if (Math.abs(value - normalMin) < Math.abs(value - normalMax)) {
    return value < normalMin ? 'alert' : 'warning';
  }
  return value > normalMax ? 'alert' : 'warning';
};

// Parse blood pressure string
export const parseBloodPressure = (bp: string): { systolic: number; diastolic: number } | null => {
  const parts = bp.split('/');
  if (parts.length === 2) {
    return {
      systolic: parseInt(parts[0], 10),
      diastolic: parseInt(parts[1], 10),
    };
  }
  return null;
};

// Format timestamp
export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export const formatDateTime = (date: Date): string => {
  return `${formatDate(date)} ${formatTime(date)}`;
};

// Relative time
export const getRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 30) return `${diffDays}d ago`;
  return formatDate(date);
};

// Generate random color from palette
export const getRandomColor = (): string => {
  const colors = [
    '#0ea5e9', // primary
    '#ef4444', // alert
    '#22c55e', // safe
    '#f59e0b', // orange
    '#8b5cf6', // purple
    '#ec4899', // pink
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Mock data generators for development
export const generateMockHealthData = () => ({
  heartRate: Math.floor(Math.random() * 50) + 60,
  bloodPressure: `${Math.floor(Math.random() * 30) + 110}/${Math.floor(Math.random() * 20) + 70}`,
  temperature: (Math.random() * 1 + 36.5).toFixed(1),
  oxygenSaturation: Math.floor(Math.random() * 5) + 95,
  respiratoryRate: Math.floor(Math.random() * 5) + 12,
  bloodGlucose: Math.floor(Math.random() * 50) + 80,
  weight: parseFloat((Math.random() * 10 + 70).toFixed(1)),
  timestamp: new Date(),
});

// Calculate average from array
export const calculateAverage = (values: number[]): number => {
  if (values.length === 0) return 0;
  return values.reduce((a, b) => a + b, 0) / values.length;
};

// Calculate min/max from array
export const getMinMax = (
  values: number[]
): { min: number; max: number } => {
  if (values.length === 0) return { min: 0, max: 0 };
  return {
    min: Math.min(...values),
    max: Math.max(...values),
  };
};
