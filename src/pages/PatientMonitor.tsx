import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Types
interface PatientInfo {
  id: number;
  name: string;
  age: number;
  ward: string;
  doctor: string;
  admissionDate: string;
  bedNumber: string;
}

interface VitalSigns {
  heartRate: number;
  bloodPressureSystolic: number;
  bloodPressureDiastolic: number;
  spO2: number;
  temperature: number;
  respiratoryRate: number;
}

interface WaveformData {
  time: number;
  value: number;
}

// Mock patient list
const mockPatients: PatientInfo[] = [
  { id: 1, name: 'John Doe', age: 65, ward: 'ICU-A', doctor: 'Dr. Anderson', admissionDate: '2025-02-15', bedNumber: '101' },
  { id: 2, name: 'Jane Smith', age: 58, ward: 'ICU-B', doctor: 'Dr. Martinez', admissionDate: '2025-02-12', bedNumber: '102' },
  { id: 3, name: 'Robert Johnson', age: 72, ward: 'ICU-A', doctor: 'Dr. Anderson', admissionDate: '2025-02-10', bedNumber: '103' },
  { id: 4, name: 'Emma Davis', age: 45, ward: 'General Ward', doctor: 'Dr. Williams', admissionDate: '2025-02-18', bedNumber: '204' },
  { id: 5, name: 'Michael Wilson', age: 60, ward: 'ICU-C', doctor: 'Dr. Brown', admissionDate: '2025-02-14', bedNumber: '105' },
];

// Generator for realistic vital signs
const generateVitalSigns = (baseHeartRate: number = 75): VitalSigns => {
  return {
    heartRate: baseHeartRate + Math.random() * 10 - 5,
    bloodPressureSystolic: 120 + Math.random() * 20 - 10,
    bloodPressureDiastolic: 80 + Math.random() * 15 - 7,
    spO2: 97 + Math.random() * 3 - 1,
    temperature: 36.8 + Math.random() * 0.5 - 0.25,
    respiratoryRate: 16 + Math.random() * 4 - 2,
  };
};

// Get color status based on vital value
const getVitalStatus = (vital: string, value: number): { color: string; status: string } => {
  const statusMap: { [key: string]: { normal: [number, number]; warning: [number, number] } } = {
    heartRate: { normal: [60, 100], warning: [50, 120] },
    spO2: { normal: [95, 100], warning: [90, 95] },
    temperature: { normal: [36.1, 37.2], warning: [35.5, 38.5] },
    respiratoryRate: { normal: [12, 20], warning: [10, 25] },
    bloodPressure: { normal: [90, 140], warning: [80, 160] },
  };

  const range = statusMap[vital];
  if (!range) return { color: 'text-gray-400', status: 'Unknown' };

  if (value >= range.normal[0] && value <= range.normal[1]) {
    return { color: 'text-green-400', status: 'Normal' };
  } else if (value >= range.warning[0] && value <= range.warning[1]) {
    return { color: 'text-yellow-400', status: 'Warning' };
  } else {
    return { color: 'text-red-400', status: 'Critical' };
  }
};

// Vital sign card component
interface VitalCardProps {
  label: string;
  value: string | number;
  unit: string;
  normalRange: string;
  vital: string;
  numValue: number;
  icon: string;
}

const VitalCard: React.FC<VitalCardProps> = ({ label, value, unit, normalRange, vital, numValue, icon }) => {
  const { color, status } = getVitalStatus(vital, numValue);

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition">
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="text-gray-400 text-sm font-medium">{label}</p>
          <p className={`text-3xl font-bold mt-1 ${color}`}>{value}</p>
          <p className="text-xs text-gray-500 mt-2">{unit}</p>
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
      <div className="pt-3 border-t border-gray-700">
        <p className="text-xs text-gray-400">Normal: {normalRange}</p>
        <p className={`text-xs font-semibold mt-1 ${color}`}>{status}</p>
      </div>
    </div>
  );
};

// Patient info card
interface PatientCardProps {
  patient: PatientInfo;
}

const PatientInfoCard: React.FC<PatientCardProps> = ({ patient }) => {
  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 border border-gray-700 shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-white">{patient.name}</h2>
          <p className="text-gray-400">ID: P-{String(patient.id).padStart(4, '0')}</p>
        </div>
        <div className="bg-green-500 w-4 h-4 rounded-full animate-pulse"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <p className="text-gray-400 text-xs font-semibold">Age</p>
          <p className="text-white text-lg font-bold mt-1">{patient.age} years</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs font-semibold">Ward</p>
          <p className="text-white text-lg font-bold mt-1">{patient.ward}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs font-semibold">Bed Number</p>
          <p className="text-white text-lg font-bold mt-1">{patient.bedNumber}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs font-semibold">Assigned Doctor</p>
          <p className="text-white text-sm font-semibold mt-1">{patient.doctor}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs font-semibold">Admission Date</p>
          <p className="text-white text-sm font-semibold mt-1">{patient.admissionDate}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs font-semibold">Status</p>
          <p className="text-green-400 text-sm font-semibold mt-1">🟢 Active Monitoring</p>
        </div>
      </div>
    </div>
  );
};

export const PatientMonitor: React.FC = () => {
  const [selectedPatientId, setSelectedPatientId] = useState(1);
  const [vitals, setVitals] = useState<VitalSigns>(generateVitalSigns(72));
  const [waveformData, setWaveformData] = useState<WaveformData[]>(
    Array.from({ length: 30 }, (_, i) => ({
      time: i,
      value: 75 + Math.sin(i / 3) * 10 + Math.random() * 5,
    }))
  );
  const [timeCounter, setTimeCounter] = useState(30);

  const selectedPatient = mockPatients.find(p => p.id === selectedPatientId) || mockPatients[0];

  // Simulate live vital updates every 1 second
  useEffect(() => {
    const interval = setInterval(() => {
      setVitals(prev => generateVitalSigns(prev.heartRate));

      // Update waveform with new data point
      setWaveformData(prev => {
        const newData = [...prev.slice(1), { time: prev.length, value: generateVitalSigns().heartRate }];
        return newData;
      });

      setTimeCounter(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 md:p-6 bg-gray-900 min-h-screen page-container">
      {/* Header */}
      <div className="mb-6 md:mb-8 animate-fadeIn">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">Patient Monitor</h1>
        <p className="text-gray-400 mt-1 md:mt-2 text-sm md:text-base">Real-time vital signs and patient monitoring</p>
      </div>

      {/* Patient Selector */}
      <div className="mb-6 md:mb-8 animate-slideInDown">
        <label className="block text-xs md:text-sm font-semibold text-gray-300 mb-2">Select Patient</label>
        <select
          value={selectedPatientId}
          onChange={(e) => setSelectedPatientId(parseInt(e.target.value))}
          className="w-full md:w-80 bg-gray-800 text-white border border-gray-700 rounded-lg px-3 md:px-4 py-2 md:py-3 focus:outline-none focus:ring-2 focus:ring-sky-500 transition text-xs md:text-sm"
        >
          {mockPatients.map(patient => (
            <option key={patient.id} value={patient.id}>
              {patient.name} - {patient.ward} (Bed {patient.bedNumber})
            </option>
          ))}
        </select>
      </div>

      {/* Patient Info Card */}
      <div className="mb-6 md:mb-8 animate-slideInLeft">
        <PatientInfoCard patient={selectedPatient} />
      </div>

      {/* Real-time Vitals Grid */}
      <div className="mb-6 md:mb-8">
        <h2 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4">Real-Time Vital Signs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 stagger-animation">
          {/* Heart Rate with Pulse Animation */}
          <div className="bg-gray-800 rounded-lg p-3 md:p-4 border border-gray-700 hover:border-gray-600 transition relative overflow-hidden">
            <div className="absolute top-2 right-2 animate-pulse">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-gray-400 text-xs md:text-sm font-medium">Heart Rate</p>
                <p className={`text-3xl md:text-5xl font-bold mt-1 md:mt-2 ${getVitalStatus('heartRate', vitals.heartRate).color}`}>
                  {Math.round(vitals.heartRate)}
                </p>
                <p className="text-xs text-gray-500 mt-1 md:mt-2">BPM</p>
              </div>
              <div className="text-2xl md:text-4xl">❤️</div>
            </div>
            <div className="pt-3 border-t border-gray-700">
              <p className="text-xs text-gray-400">Normal: 60-100 BPM</p>
              <p className={`text-xs font-semibold mt-1 ${getVitalStatus('heartRate', vitals.heartRate).color}`}>
                {getVitalStatus('heartRate', vitals.heartRate).status}
              </p>
            </div>
          </div>

          {/* Blood Pressure */}
          <VitalCard
            label="Blood Pressure"
            value={`${Math.round(vitals.bloodPressureSystolic)}/${Math.round(vitals.bloodPressureDiastolic)}`}
            unit="mmHg"
            normalRange="90-140 / 60-90"
            vital="bloodPressure"
            numValue={vitals.bloodPressureSystolic}
            icon="💓"
          />

          {/* SpO2 */}
          <VitalCard
            label="Oxygen Saturation"
            value={Math.round(vitals.spO2 * 10) / 10}
            unit="%"
            normalRange="95-100%"
            vital="spO2"
            numValue={vitals.spO2}
            icon="💨"
          />

          {/* Temperature */}
          <VitalCard
            label="Temperature"
            value={Math.round(vitals.temperature * 10) / 10}
            unit="°C"
            normalRange="36.1-37.2°C"
            vital="temperature"
            numValue={vitals.temperature}
            icon="🌡️"
          />

          {/* Respiratory Rate */}
          <VitalCard
            label="Respiratory Rate"
            value={Math.round(vitals.respiratoryRate)}
            unit="breaths/min"
            normalRange="12-20"
            vital="respiratoryRate"
            numValue={vitals.respiratoryRate}
            icon="🫁"
          />

          {/* Live Update Status */}
          <div className="bg-gray-800 rounded-lg p-3 md:p-4 border border-gray-700 flex flex-col justify-between">
            <div>
              <p className="text-gray-400 text-xs md:text-sm font-medium mb-2">Monitoring Status</p>
              <div className="flex items-center gap-2 mb-3 md:mb-4">
                <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-white font-semibold text-xs md:text-sm">Live Monitoring</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-400">Updates per second</p>
              <p className="text-xl md:text-2xl font-bold text-sky-400 mt-1">{timeCounter}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Live Waveform Chart */}
      <div className="bg-gray-800 rounded-lg p-4 md:p-6 shadow-lg border border-gray-700 mb-6 md:mb-8 animate-slideInUp">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 md:gap-4 mb-3 md:mb-4">
          <h2 className="text-base md:text-xl font-bold text-white">ECG Waveform - Heart Rate (Live)</h2>
          <div className="flex items-center gap-2 text-xs md:text-sm">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-gray-300">Real-time</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200} minHeight={200}>
          <LineChart data={waveformData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="time"
              stroke="#9CA3AF"
              tick={{ fontSize: 10 }}
              domain={['dataMin', 'dataMax']}
            />
            <YAxis
              stroke="#9CA3AF"
              tick={{ fontSize: 10 }}
              domain={[50, 120]}
              label={{ value: 'BPM', angle: -90, position: 'insideLeft', fontSize: 10 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#F3F4F6' }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#EF4444"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
        <p className="text-xs text-gray-400 mt-3 md:mt-4">
          📊 Chart updates every second with latest heart rate data. Shows last 30 readings. ECG-style visualization for continuous monitoring.
        </p>
      </div>

      {/* Alert Status Footer */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 stagger-animation">
        <div className="bg-green-900 bg-opacity-30 rounded-lg p-4 md:p-4 border border-green-700">
          <h3 className="text-green-400 font-semibold text-sm md:text-base mb-1">✅ All Systems Normal</h3>
          <p className="text-gray-300 text-xs md:text-sm">No critical alerts at this time</p>
        </div>
        <div className="bg-blue-900 bg-opacity-30 rounded-lg p-3 md:p-4 border border-blue-700">
          <h3 className="text-blue-400 font-semibold text-sm md:text-base mb-1">📡 Connection Status</h3>
          <p className="text-gray-300 text-xs md:text-sm">Connected to monitoring device</p>
        </div>
        <div className="bg-sky-900 bg-opacity-30 rounded-lg p-3 md:p-4 border border-sky-700">
          <h3 className="text-sky-400 font-semibold text-sm md:text-base mb-1">⏱️ Uptime</h3>
          <p className="text-gray-300 text-xs md:text-sm">Monitoring for 4 hours 32 minutes</p>
        </div>
      </div>
    </div>
  );
};

export default PatientMonitor;
