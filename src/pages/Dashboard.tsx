import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Types
interface Alert {
  id: number;
  patientName: string;
  alertType: string;
  severity: 'critical' | 'warning' | 'normal';
  timestamp: string;
  status: string;
}

interface Patient {
  id: number;
  name: string;
  room: string;
  status: string;
  statusColor: string;
}

// Mock data for vital signs (24-hour data)
const vitalSignsData = [
  { time: '00:00', heartRate: 72, bloodPressure: 118, spO2: 98 },
  { time: '02:00', heartRate: 68, bloodPressure: 115, spO2: 97 },
  { time: '04:00', heartRate: 65, bloodPressure: 112, spO2: 96 },
  { time: '06:00', heartRate: 70, bloodPressure: 116, spO2: 97 },
  { time: '08:00', heartRate: 78, bloodPressure: 122, spO2: 98 },
  { time: '10:00', heartRate: 85, bloodPressure: 128, spO2: 98 },
  { time: '12:00', heartRate: 88, bloodPressure: 130, spO2: 97 },
  { time: '14:00', heartRate: 82, bloodPressure: 125, spO2: 98 },
  { time: '16:00', heartRate: 76, bloodPressure: 120, spO2: 97 },
  { time: '18:00', heartRate: 74, bloodPressure: 118, spO2: 98 },
  { time: '20:00', heartRate: 71, bloodPressure: 116, spO2: 97 },
  { time: '22:00', heartRate: 69, bloodPressure: 114, spO2: 96 },
];

// Mock data for recent alerts
const recentAlertsData: Alert[] = [
  { id: 1, patientName: 'John Doe', alertType: 'High Heart Rate', severity: 'critical', timestamp: '2 mins ago', status: 'Active' },
  { id: 2, patientName: 'Jane Smith', alertType: 'Low SpO2', severity: 'critical', timestamp: '15 mins ago', status: 'Active' },
  { id: 3, patientName: 'Robert Johnson', alertType: 'High Blood Pressure', severity: 'warning', timestamp: '32 mins ago', status: 'Acknowledged' },
  { id: 4, patientName: 'Emma Davis', alertType: 'Irregular Heart Rate', severity: 'warning', timestamp: '1 hour ago', status: 'Resolved' },
  { id: 5, patientName: 'Michael Wilson', alertType: 'Normal Range', severity: 'normal', timestamp: '2 hours ago', status: 'Resolved' },
];

// Mock data for active patients
const activePatients: Patient[] = [
  { id: 1, name: 'John Doe', room: '101', status: 'Stable', statusColor: 'bg-green-500' },
  { id: 2, name: 'Jane Smith', room: '102', status: 'Critical', statusColor: 'bg-red-500' },
  { id: 3, name: 'Robert Johnson', room: '103', status: 'Monitoring', statusColor: 'bg-yellow-500' },
  { id: 4, name: 'Emma Davis', room: '104', status: 'Stable', statusColor: 'bg-green-500' },
  { id: 5, name: 'Michael Wilson', room: '105', status: 'Stable', statusColor: 'bg-green-500' },
  { id: 6, name: 'Sarah Anderson', room: '106', status: 'Monitoring', statusColor: 'bg-yellow-500' },
];

// Summary card component
interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend: 'up' | 'down';
  trendValue: string;
  bgColor: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, icon, trend, trendValue, bgColor }) => (
  <div className={`${bgColor} rounded-lg p-6 text-white shadow-md hover:shadow-lg transition-shadow`}>
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-100 text-sm font-medium">{title}</p>
        <h3 className="text-4xl font-bold mt-2">{value}</h3>
        <p className={`text-sm mt-2 flex items-center gap-1 ${trend === 'up' ? 'text-red-200' : 'text-green-200'}`}>
          <span>{trend === 'up' ? '↑' : '↓'}</span>
          <span>{trendValue}</span>
        </p>
      </div>
      <div className="text-4xl">{icon}</div>
    </div>
  </div>
);

// Alert severity badge
interface AlertBadgeProps {
  severity: 'critical' | 'warning' | 'normal';
}

const AlertBadge: React.FC<AlertBadgeProps> = ({ severity }) => {
  const severityMap = {
    critical: 'bg-red-100 text-red-800 border border-red-300',
    warning: 'bg-yellow-100 text-yellow-800 border border-yellow-300',
    normal: 'bg-green-100 text-green-800 border border-green-300',
  };

  const severityLabel = {
    critical: 'Critical',
    warning: 'Warning',
    normal: 'Normal',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${severityMap[severity]}`}>
      {severityLabel[severity]}
    </span>
  );
};

export const Dashboard: React.FC = () => {
  const [alertCount, setAlertCount] = useState(2);

  // Simulate real-time updates
  useEffect(() => {
    const timer = setInterval(() => {
      setAlertCount(prev => (prev >= 5 ? 2 : prev + 1));
    }, 30000); // Update every 30 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-4 md:p-6 bg-gray-900 min-h-screen page-container">
      {/* Header */}
      <div className="mb-6 md:mb-8 animate-fadeIn">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1 md:mt-2 text-sm md:text-base">Welcome back! Here's your real-time monitoring overview.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8 stagger-animation">
        <SummaryCard
          title="Total Patients Monitored"
          value="247"
          icon="👥"
          trend="up"
          trendValue="+12 this week"
          bgColor="bg-gradient-to-br from-sky-500 to-sky-700"
        />
        <SummaryCard
          title="Active Alerts"
          icon="🔔"
          value={alertCount}
          trend="down"
          trendValue="-5 from yesterday"
          bgColor="bg-gradient-to-br from-amber-500 to-amber-700"
        />
        <SummaryCard
          title="Critical Cases"
          value="8"
          icon="⚠️"
          trend="up"
          trendValue="+2 today"
          bgColor="bg-gradient-to-br from-red-500 to-red-700"
        />
        <SummaryCard
          title="Devices Online"
          value="243"
          icon="📡"
          trend="down"
          trendValue="-4 offline"
          bgColor="bg-gradient-to-br from-green-500 to-green-700"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-6">
        {/* Vital Signs Chart */}
        <div className="lg:col-span-2 bg-gray-800 rounded-lg p-4 md:p-6 shadow-lg border border-gray-700 animate-slideInLeft">
          <h2 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4">Vital Signs - Last 24 Hours</h2>
          <ResponsiveContainer width="100%" height={250} minHeight={250}>
            <LineChart data={vitalSignsData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9CA3AF" tick={{ fontSize: 12 }} />
              <YAxis stroke="#9CA3AF" tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                labelStyle={{ color: '#F3F4F6' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Line 
                type="monotone" 
                dataKey="heartRate" 
                stroke="#EF4444" 
                strokeWidth={2}
                dot={false}
                name="Heart Rate (bpm)"
              />
              <Line 
                type="monotone" 
                dataKey="bloodPressure" 
                stroke="#0EA5E9" 
                strokeWidth={2}
                dot={false}
                name="Blood Pressure (mmHg)"
              />
              <Line 
                type="monotone" 
                dataKey="spO2" 
                stroke="#22C55E" 
                strokeWidth={2}
                dot={false}
                name="SpO2 (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Stats */}
        <div className="bg-gray-800 rounded-lg p-4 md:p-6 shadow-lg border border-gray-700 animate-slideInRight">
          <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6">Quick Stats</h3>
          <div className="space-y-3 md:space-y-4">
            <div className="bg-gray-700 rounded p-3 md:p-4 hover:bg-gray-600 transition">
              <p className="text-gray-400 text-xs md:text-sm">Average Heart Rate</p>
              <p className="text-xl md:text-2xl font-bold text-sky-400 mt-1">76 bpm</p>
            </div>
            <div className="bg-gray-700 rounded p-3 md:p-4 hover:bg-gray-600 transition">
              <p className="text-gray-400 text-xs md:text-sm">Avg Blood Pressure</p>
              <p className="text-xl md:text-2xl font-bold text-sky-400 mt-1">120/76 mmHg</p>
            </div>
            <div className="bg-gray-700 rounded p-3 md:p-4 hover:bg-gray-600 transition">
              <p className="text-gray-400 text-xs md:text-sm">Avg SpO2</p>
              <p className="text-xl md:text-2xl font-bold text-green-400 mt-1">97%</p>
            </div>
            <div className="bg-gray-700 rounded p-3 md:p-4 hover:bg-gray-600 transition">
              <p className="text-gray-400 text-xs md:text-sm">Alerts Response Time</p>
              <p className="text-xl md:text-2xl font-bold text-amber-400 mt-1">2.3 mins</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Alerts Table */}
      <div className="mt-6 md:mt-8 bg-gray-800 rounded-lg p-4 md:p-6 shadow-lg border border-gray-700 animate-slideInUp">
        <h2 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4">Recent Alerts</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs md:text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 md:py-3 px-2 md:px-4 text-gray-300 font-semibold">Patient Name</th>
                <th className="text-left py-2 md:py-3 px-2 md:px-4 text-gray-300 font-semibold">Alert Type</th>
                <th className="text-left py-2 md:py-3 px-2 md:px-4 text-gray-300 font-semibold">Severity</th>
                <th className="text-left py-2 md:py-3 px-2 md:px-4 text-gray-300 font-semibold">Timestamp</th>
                <th className="text-left py-2 md:py-3 px-2 md:px-4 text-gray-300 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentAlertsData.map(alert => (
                <tr key={alert.id} className="border-b border-gray-700 hover:bg-gray-700 transition">
                  <td className="py-2 md:py-3 px-2 md:px-4 text-gray-100 font-medium">{alert.patientName}</td>
                  <td className="py-2 md:py-3 px-2 md:px-4 text-gray-300">{alert.alertType}</td>
                  <td className="py-2 md:py-3 px-2 md:px-4">
                    <AlertBadge severity={alert.severity} />
                  </td>
                  <td className="py-2 md:py-3 px-2 md:px-4 text-gray-400">{alert.timestamp}</td>
                  <td className="py-2 md:py-3 px-2 md:px-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      alert.status === 'Active' 
                        ? 'bg-blue-900 text-blue-200' 
                        : alert.status === 'Acknowledged'
                        ? 'bg-yellow-900 text-yellow-200'
                        : 'bg-gray-700 text-gray-300'
                    }`}>
                      {alert.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Active Patients List */}
      <div className="mt-6 md:mt-8">
        <h2 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4">Active Patients</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 stagger-animation">
          {activePatients.map(patient => (
            <div key={patient.id} className="bg-gray-800 rounded-lg p-3 md:p-4 shadow-md border border-gray-700 hover:border-sky-500 transition">
              <div className="flex justify-between items-start mb-3 md:mb-4">
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-white">{patient.name}</h3>
                  <p className="text-gray-400 text-xs md:text-sm">Room {patient.room}</p>
                </div>
                <div className={`${patient.statusColor} w-2 h-2 md:w-3 md:h-3 rounded-full`}></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-xs md:text-sm">Status:</span>
                <span className={`font-semibold text-xs md:text-sm ${
                  patient.status === 'Stable' 
                    ? 'text-green-400' 
                    : patient.status === 'Critical'
                    ? 'text-red-400'
                    : 'text-yellow-400'
                }`}>
                  {patient.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
