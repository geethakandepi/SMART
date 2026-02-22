import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type Period = '24H' | '7D' | '14D' | '30D' | '90D' | 'Custom';

interface HistoricalReading {
  time: string;
  heartRate: number;
  bloodPressure: number;
  spO2: number;
  temperature: number;
  respiratoryRate: number;
}

export const History: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('30D');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [historicalData, setHistoricalData] = useState<HistoricalReading[]>(
    generateHistoricalData('30D')
  );

  function generateHistoricalData(period: Period): HistoricalReading[] {
    const data: HistoricalReading[] = [];
    const baseDays = period === '24H' ? 1 : period === '7D' ? 7 : period === '14D' ? 14 : period === '30D' ? 30 : 90;
    const readingsPerDay = period === '24H' ? 24 : 1;
    const totalReadings = baseDays * readingsPerDay;

    for (let i = 0; i < totalReadings; i++) {
      const hours = Math.floor(i / readingsPerDay);
      const daysAgo = Math.floor(hours / 24);
      const hour = hours % 24;
      const date = new Date();
      date.setDate(date.getDate() - daysAgo);
      date.setHours(hour, Math.floor(Math.random() * 60), 0, 0);

      data.push({
        time: date.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        heartRate: 60 + Math.floor(Math.random() * 50),
        bloodPressure: 100 + Math.floor(Math.random() * 40),
        spO2: 95 + Math.random() * 5,
        temperature: 36.2 + Math.random() * 1.5,
        respiratoryRate: 12 + Math.floor(Math.random() * 16),
      });
    }
    return data;
  }

  return (
    <div className="p-4 md:p-6 bg-gray-900 min-h-screen page-container">
      {/* Header */}
      <div className="mb-6 md:mb-8 animate-fadeIn">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">Vital Signs History</h1>
        <p className="text-gray-400 mt-1 md:mt-2 text-sm md:text-base">View and analyze historical vital sign data</p>
      </div>

      {/* Date Range Selector - Mobile First */}
      <div className="bg-gray-800 rounded-lg p-4 md:p-6 border border-gray-700 mb-6 md:mb-8 animate-slideInDown">
        <h2 className="text-base md:text-lg font-semibold text-white mb-4">Select Time Period</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3">
          {['24H', '7D', '14D', '30D', '90D', 'Custom'].map(period => (
            <button
              key={period}
              onClick={() => {
                setSelectedPeriod(period as Period);
                if (period !== 'Custom') {
                  const newData = generateHistoricalData(period as Period);
                  setHistoricalData(newData);
                }
              }}
              className={`px-3 py-2 md:py-3 rounded-lg font-medium transition text-xs md:text-sm ${
                selectedPeriod === period
                  ? 'bg-sky-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {period}
            </button>
          ))}
        </div>

        {/* Custom Date Range - Hidden on Mobile */}
        {selectedPeriod === 'Custom' && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            <input
              type="date"
              value={customStartDate}
              onChange={(e) => setCustomStartDate(e.target.value)}
              className="bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600 focus:border-sky-500 focus:outline-none text-xs md:text-sm"
            />
            <input
              type="date"
              value={customEndDate}
              onChange={(e) => setCustomEndDate(e.target.value)}
              className="bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600 focus:border-sky-500 focus:outline-none text-xs md:text-sm"
            />
          </div>
        )}
      </div>

      {/* Stats Cards - Responsive Grid */}
      <div className="mb-6 md:mb-8">
        <h2 className="text-base md:text-lg font-bold text-white mb-3 md:mb-4">Summary Statistics</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3 md:gap-4 stagger-animation">
          {/* Heart Rate Stats */}
          <div className="bg-gray-800 rounded-lg p-3 md:p-4 border border-gray-700">
            <p className="text-gray-400 text-xs md:text-sm font-medium">Avg Heart Rate</p>
            <p className="text-xl md:text-2xl font-bold text-red-400 mt-2">72</p>
            <p className="text-xs text-gray-500 mt-1">BPM</p>
          </div>

          {/* Blood Pressure Stats */}
          <div className="bg-gray-800 rounded-lg p-3 md:p-4 border border-gray-700">
            <p className="text-gray-400 text-xs md:text-sm font-medium">Avg BP</p>
            <p className="text-xl md:text-2xl font-bold text-blue-400 mt-2">120/80</p>
            <p className="text-xs text-gray-500 mt-1">mmHg</p>
          </div>

          {/* SpO2 Stats */}
          <div className="bg-gray-800 rounded-lg p-3 md:p-4 border border-gray-700">
            <p className="text-gray-400 text-xs md:text-sm font-medium">Avg SpO2</p>
            <p className="text-xl md:text-2xl font-bold text-green-400 mt-2">97.5</p>
            <p className="text-xs text-gray-500 mt-1">%</p>
          </div>

          {/* Temperature Stats */}
          <div className="bg-gray-800 rounded-lg p-3 md:p-4 border border-gray-700">
            <p className="text-gray-400 text-xs md:text-sm font-medium">Avg Temp</p>
            <p className="text-xl md:text-2xl font-bold text-yellow-400 mt-2">36.7</p>
            <p className="text-xs text-gray-500 mt-1">°C</p>
          </div>

          {/* Respiratory Stats */}
          <div className="bg-gray-800 rounded-lg p-3 md:p-4 border border-gray-700">
            <p className="text-gray-400 text-xs md:text-sm font-medium">Avg RR</p>
            <p className="text-xl md:text-2xl font-bold text-cyan-400 mt-2">16</p>
            <p className="text-xs text-gray-500 mt-1">breaths/min</p>
          </div>

          {/* Data Points */}
          <div className="bg-gray-800 rounded-lg p-3 md:p-4 border border-gray-700">
            <p className="text-gray-400 text-xs md:text-sm font-medium">Data Points</p>
            <p className="text-xl md:text-2xl font-bold text-purple-400 mt-2">{historicalData.length}</p>
            <p className="text-xs text-gray-500 mt-1">readings</p>
          </div>
        </div>
      </div>

      {/* Charts Section - Stacked on Mobile */}
      <div className="mb-6 md:mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Heart Rate Chart */}
          <div className="bg-gray-800 rounded-lg p-4 md:p-6 border border-gray-700 animate-slideInLeft">
            <h3 className="text-base md:text-lg font-bold text-white mb-3 md:mb-4">Heart Rate Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={historicalData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorHR" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9CA3AF" tick={{ fontSize: 10 }} />
                <YAxis stroke="#9CA3AF" tick={{ fontSize: 10 }} domain={[50, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: '#F3F4F6' }}
                />
                <Area type="monotone" dataKey="heartRate" stroke="#EF4444" fillOpacity={1} fill="url(#colorHR)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Blood Pressure Chart */}
          <div className="bg-gray-800 rounded-lg p-4 md:p-6 border border-gray-700 animate-slideInRight">
            <h3 className="text-base md:text-lg font-bold text-white mb-3 md:mb-4">Blood Pressure Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={historicalData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorBP" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9CA3AF" tick={{ fontSize: 10 }} />
                <YAxis stroke="#9CA3AF" tick={{ fontSize: 10 }} domain={[80, 150]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: '#F3F4F6' }}
                />
                <Area type="monotone" dataKey="bloodPressure" stroke="#3B82F6" fillOpacity={1} fill="url(#colorBP)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* SpO2 Chart */}
          <div className="bg-gray-800 rounded-lg p-4 md:p-6 border border-gray-700 animate-slideInLeft">
            <h3 className="text-base md:text-lg font-bold text-white mb-3 md:mb-4">Oxygen Saturation Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={historicalData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorSpO2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9CA3AF" tick={{ fontSize: 10 }} />
                <YAxis stroke="#9CA3AF" tick={{ fontSize: 10 }} domain={[90, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: '#F3F4F6' }}
                />
                <Area type="monotone" dataKey="spO2" stroke="#10B981" fillOpacity={1} fill="url(#colorSpO2)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Temperature Chart */}
          <div className="bg-gray-800 rounded-lg p-4 md:p-6 border border-gray-700 animate-slideInRight">
            <h3 className="text-base md:text-lg font-bold text-white mb-3 md:mb-4">Temperature Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={historicalData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FBBF24" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#FBBF24" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9CA3AF" tick={{ fontSize: 10 }} />
                <YAxis stroke="#9CA3AF" tick={{ fontSize: 10 }} domain={[36, 38]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: '#F3F4F6' }}
                />
                <Area type="monotone" dataKey="temperature" stroke="#FBBF24" fillOpacity={1} fill="url(#colorTemp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Data Table - Responsive */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden animate-slideInUp">
        <div className="p-4 md:p-6 border-b border-gray-700">
          <h3 className="text-base md:text-lg font-bold text-white">Detailed Readings</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs md:text-sm">
            <thead className="bg-gray-700 text-gray-200">
              <tr>
                <th className="px-3 md:px-4 py-2 md:py-3 text-left font-semibold">Time</th>
                <th className="px-3 md:px-4 py-2 md:py-3 text-left font-semibold">HR</th>
                <th className="px-3 md:px-4 py-2 md:py-3 text-left font-semibold">BP</th>
                <th className="px-3 md:px-4 py-2 md:py-3 text-left font-semibold">SpO2</th>
                <th className="px-3 md:px-4 py-2 md:py-3 text-left font-semibold">Temp</th>
                <th className="hidden md:table-cell px-3 md:px-4 py-2 md:py-3 text-left font-semibold">RR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {historicalData.slice(-10).reverse().map((reading, idx) => (
                <tr key={idx} className="hover:bg-gray-700 transition">
                  <td className="px-3 md:px-4 py-2 md:py-3 text-gray-300">{reading.time}</td>
                  <td className={`px-3 md:px-4 py-2 md:py-3 font-semibold ${reading.heartRate > 100 ? 'text-red-400' : 'text-green-400'}`}>
                    {reading.heartRate}
                  </td>
                  <td className="px-3 md:px-4 py-2 md:py-3 text-gray-300">{reading.bloodPressure}</td>
                  <td className={`px-3 md:px-4 py-2 md:py-3 font-semibold ${reading.spO2 < 95 ? 'text-red-400' : 'text-green-400'}`}>
                    {reading.spO2.toFixed(1)}%
                  </td>
                  <td className="px-3 md:px-4 py-2 md:py-3 text-gray-300">{reading.temperature.toFixed(1)}°C</td>
                  <td className="hidden md:table-cell px-3 md:px-4 py-2 md:py-3 text-gray-300">{reading.respiratoryRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
