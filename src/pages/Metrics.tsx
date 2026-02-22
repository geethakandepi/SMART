import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const Metrics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const mockWeeklyData = [
    { day: 'Mon', heartRate: 72, temp: 36.8, o2: 98 },
    { day: 'Tue', heartRate: 75, temp: 36.9, o2: 97 },
    { day: 'Wed', heartRate: 70, temp: 36.7, o2: 98 },
    { day: 'Thu', heartRate: 78, temp: 37.0, o2: 96 },
    { day: 'Fri', heartRate: 73, temp: 36.8, o2: 98 },
    { day: 'Sat', heartRate: 76, temp: 36.9, o2: 97 },
    { day: 'Sun', heartRate: 71, temp: 36.8, o2: 98 },
  ];

  return (
    <div className="p-4 md:p-6 bg-gray-900 min-h-screen page-container">
      {/* Header */}
      <div className="mb-6 md:mb-8 animate-fadeIn">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">Health Metrics</h1>
        <p className="text-gray-400 mt-1 md:mt-2 text-sm md:text-base">Track and analyze your vital signs</p>
      </div>

      {/* Period Selector */}
      <div className="flex gap-2 md:gap-3 mb-6 md:mb-8 animate-slideInDown overflow-x-auto pb-2">
        {['week', 'month', 'quarter'].map(period => (
          <button
            key={period}
            onClick={() => setSelectedPeriod(period)}
            className={`px-3 py-2 md:px-4 md:py-3 rounded-lg font-medium transition text-xs md:text-sm whitespace-nowrap ${
              selectedPeriod === period
                ? 'bg-sky-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {period === 'week' ? 'This Week' : period === 'month' ? 'This Month' : 'This Quarter'}
          </button>
        ))}
      </div>

      {/* This Week's Summary - Responsive Cards */}
      <div className="mb-6 md:mb-8">
        <h2 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4">Summary Metrics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 stagger-animation">
          {/* Average Heart Rate */}
          <div className="bg-gray-800 rounded-lg p-4 md:p-5 border border-gray-700 hover:border-gray-600 transition">
            <div className="flex justify-between items-start mb-3 md:mb-4">
              <div>
                <p className="text-gray-400 text-xs md:text-sm font-medium">Avg Heart Rate</p>
                <p className="text-2xl md:text-3xl font-bold text-red-400 mt-2">73</p>
                <p className="text-xs text-gray-500 mt-1">bpm</p>
              </div>
              <div className="text-2xl md:text-4xl">❤️</div>
            </div>
            <p className="text-xs text-gray-400 pt-3 border-t border-gray-700">Within normal range</p>
          </div>

          {/* Average Temperature */}
          <div className="bg-gray-800 rounded-lg p-4 md:p-5 border border-gray-700 hover:border-gray-600 transition">
            <div className="flex justify-between items-start mb-3 md:mb-4">
              <div>
                <p className="text-gray-400 text-xs md:text-sm font-medium">Avg Temperature</p>
                <p className="text-2xl md:text-3xl font-bold text-yellow-400 mt-2">36.8</p>
                <p className="text-xs text-gray-500 mt-1">°C</p>
              </div>
              <div className="text-2xl md:text-4xl">🌡️</div>
            </div>
            <p className="text-xs text-gray-400 pt-3 border-t border-gray-700">Stable & normal</p>
          </div>

          {/* Average O2 Saturation */}
          <div className="bg-gray-800 rounded-lg p-4 md:p-5 border border-gray-700 hover:border-gray-600 transition">
            <div className="flex justify-between items-start mb-3 md:mb-4">
              <div>
                <p className="text-gray-400 text-xs md:text-sm font-medium">Avg O₂ Saturation</p>
                <p className="text-2xl md:text-3xl font-bold text-green-400 mt-2">97</p>
                <p className="text-xs text-gray-500 mt-1">%</p>
              </div>
              <div className="text-2xl md:text-4xl">💨</div>
            </div>
            <p className="text-xs text-gray-400 pt-3 border-t border-gray-700">Healthy level</p>
          </div>
        </div>
      </div>

      {/* Weekly Metrics Comparison Chart */}
      <div className="bg-gray-800 rounded-lg p-4 md:p-6 border border-gray-700 mb-6 md:mb-8 animate-slideInLeft">
        <h3 className="text-base md:text-lg font-bold text-white mb-3 md:mb-4">Weekly Metrics Comparison</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={mockWeeklyData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="day" stroke="#9CA3AF" tick={{ fontSize: 10 }} />
            <YAxis stroke="#9CA3AF" tick={{ fontSize: 10 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#F3F4F6' }}
            />
            <Legend wrapperStyle={{ paddingTop: '12px', fontSize: '12px' }} />
            <Bar dataKey="heartRate" fill="#0EA5E9" name="Heart Rate (bpm)" />
            <Bar dataKey="temp" fill="#F59E0B" name="Temperature (°C)" />
            <Bar dataKey="o2" fill="#10B981" name="O₂ Saturation (%)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Detailed Metrics - Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
        {/* Latest Reading */}
        <div className="bg-gray-800 rounded-lg p-4 md:p-6 border border-gray-700 animate-slideInLeft">
          <h3 className="text-base md:text-lg font-bold text-white mb-4">Latest Reading</h3>
          <div className="space-y-3 md:space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-700">
              <span className="text-gray-400 text-xs md:text-sm">Heart Rate</span>
              <span className="text-lg md:text-xl font-bold text-red-400">72 bpm</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-700">
              <span className="text-gray-400 text-xs md:text-sm">Blood Pressure</span>
              <span className="text-lg md:text-xl font-bold text-blue-400">118/76</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-700">
              <span className="text-gray-400 text-xs md:text-sm">Temperature</span>
              <span className="text-lg md:text-xl font-bold text-yellow-400">36.8°C</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-xs md:text-sm">O₂ Saturation</span>
              <span className="text-lg md:text-xl font-bold text-green-400">97%</span>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-gray-800 rounded-lg p-4 md:p-6 border border-gray-700 animate-slideInRight">
          <h3 className="text-base md:text-lg font-bold text-white mb-4">Statistics</h3>
          <div className="space-y-3 md:space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-700">
              <span className="text-gray-400 text-xs md:text-sm">Highest HR</span>
              <span className="text-lg md:text-xl font-bold text-red-400">82 bpm</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-700">
              <span className="text-gray-400 text-xs md:text-sm">Lowest HR</span>
              <span className="text-lg md:text-xl font-bold text-green-400">68 bpm</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-700">
              <span className="text-gray-400 text-xs md:text-sm">Total Readings</span>
              <span className="text-lg md:text-xl font-bold text-sky-400">127</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-xs md:text-sm">Days Tracked</span>
              <span className="text-lg md:text-xl font-bold text-purple-400">45</span>
            </div>
          </div>
        </div>
      </div>

      {/* Export Options - Responsive */}
      <div className="bg-gray-800 rounded-lg p-4 md:p-6 border border-gray-700 animate-slideInUp">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h3 className="text-base md:text-lg font-bold text-white">Export Data</h3>
            <p className="text-gray-400 text-xs md:text-sm mt-1">Download your metrics for medical records</p>
          </div>
          <div className="flex gap-2 md:gap-3 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-3 md:px-4 rounded-lg transition text-xs md:text-sm">
              📊 CSV
            </button>
            <button className="flex-1 sm:flex-none bg-sky-600 hover:bg-sky-700 text-white font-medium py-2 px-3 md:px-4 rounded-lg transition text-xs md:text-sm">
              📄 PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
