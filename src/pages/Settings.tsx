import React, { useState } from 'react';

export const Settings: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    dateOfBirth: '1990-05-15',
    weight: '75',
    height: '180',
    bloodType: 'O+',
    emergencyContact: '+1-555-0123',
    notifyEmail: true,
    notifyPush: true,
    notifySMS: false,
    dataSync: true,
    darkMode: true,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSave = () => {
    console.log('Settings saved:', formData);
    alert('Settings saved successfully!');
  };

  const bmi = (
    parseFloat(formData.weight) /
    Math.pow(parseFloat(formData.height) / 100, 2)
  ).toFixed(1);

  return (
    <div className="p-4 md:p-6 bg-gray-900 min-h-screen page-container max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6 md:mb-8 animate-fadeIn">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">Settings</h1>
        <p className="text-gray-400 mt-1 md:mt-2 text-sm md:text-base">Manage your account and preferences</p>
      </div>

      {/* Personal Information */}
      <div className="bg-gray-800 rounded-lg p-4 md:p-6 border border-gray-700 mb-4 md:mb-6 animate-slideInDown">
        <h2 className="text-base md:text-lg font-bold text-white mb-4 md:mb-6">Personal Information</h2>
        <div className="space-y-4 md:space-y-6">
          {/* Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 md:py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-xs md:text-sm"
              />
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 md:py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-xs md:text-sm"
              />
            </div>
          </div>

          {/* DOB & Blood Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-300 mb-2">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 md:py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-xs md:text-sm"
              />
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-300 mb-2">Blood Type</label>
              <select
                name="bloodType"
                value={formData.bloodType}
                onChange={handleInputChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 md:py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-xs md:text-sm"
              >
                <option>O+</option>
                <option>O-</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
              </select>
            </div>
          </div>

          {/* Height, Weight, BMI */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-300 mb-2">Height (cm)</label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleInputChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 md:py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-xs md:text-sm"
              />
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-300 mb-2">Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 md:py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-xs md:text-sm"
              />
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-300 mb-2">BMI</label>
              <input
                type="text"
                disabled
                value={bmi}
                className="w-full bg-gray-600 border border-gray-600 rounded-lg px-3 py-2 md:py-2.5 text-gray-400 cursor-not-allowed text-xs md:text-sm"
              />
            </div>
          </div>

          {/* Emergency Contact */}
          <div>
            <label className="block text-xs md:text-sm font-medium text-gray-300 mb-2">Emergency Contact</label>
            <input
              type="tel"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleInputChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 md:py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-xs md:text-sm"
            />
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-gray-800 rounded-lg p-4 md:p-6 border border-gray-700 mb-4 md:mb-6 animate-slideInLeft">
        <h2 className="text-base md:text-lg font-bold text-white mb-4">Notification Settings</h2>
        <div className="space-y-3 md:space-y-4">
          <label className="flex items-start gap-3 cursor-pointer hover:bg-gray-700/50 p-3 rounded-lg transition-colors">
            <input
              type="checkbox"
              name="notifyEmail"
              checked={formData.notifyEmail}
              onChange={handleInputChange}
              className="w-4 h-4 md:w-5 md:h-5 mt-1 cursor-pointer accent-sky-500"
            />
            <div>
              <p className="font-medium text-white text-sm md:text-base">Email Notifications</p>
              <p className="text-xs md:text-sm text-gray-400">Receive health alerts and updates via email</p>
            </div>
          </label>
          <label className="flex items-start gap-3 cursor-pointer hover:bg-gray-700/50 p-3 rounded-lg transition-colors">
            <input
              type="checkbox"
              name="notifyPush"
              checked={formData.notifyPush}
              onChange={handleInputChange}
              className="w-4 h-4 md:w-5 md:h-5 mt-1 cursor-pointer accent-sky-500"
            />
            <div>
              <p className="font-medium text-white text-sm md:text-base">Push Notifications</p>
              <p className="text-xs md:text-sm text-gray-400">Get instant alerts on your device</p>
            </div>
          </label>
          <label className="flex items-start gap-3 cursor-pointer hover:bg-gray-700/50 p-3 rounded-lg transition-colors">
            <input
              type="checkbox"
              name="notifySMS"
              checked={formData.notifySMS}
              onChange={handleInputChange}
              className="w-4 h-4 md:w-5 md:h-5 mt-1 cursor-pointer accent-sky-500"
            />
            <div>
              <p className="font-medium text-white text-sm md:text-base">SMS Notifications</p>
              <p className="text-xs md:text-sm text-gray-400">Critical alerts via text message</p>
            </div>
          </label>
        </div>
      </div>

      {/* Data & Privacy */}
      <div className="bg-gray-800 rounded-lg p-4 md:p-6 border border-gray-700 mb-4 md:mb-6 animate-slideInRight">
        <h2 className="text-base md:text-lg font-bold text-white mb-4">Data & Privacy</h2>
        <div className="space-y-3 md:space-y-4">
          <label className="flex items-start gap-3 cursor-pointer hover:bg-gray-700/50 p-3 rounded-lg transition-colors">
            <input
              type="checkbox"
              name="dataSync"
              checked={formData.dataSync}
              onChange={handleInputChange}
              className="w-4 h-4 md:w-5 md:h-5 mt-1 cursor-pointer accent-sky-500"
            />
            <div>
              <p className="font-medium text-white text-sm md:text-base">Cloud Sync</p>
              <p className="text-xs md:text-sm text-gray-400">Automatically sync your health data to cloud</p>
            </div>
          </label>
          <label className="flex items-start gap-3 cursor-pointer hover:bg-gray-700/50 p-3 rounded-lg transition-colors">
            <input
              type="checkbox"
              name="darkMode"
              checked={formData.darkMode}
              onChange={handleInputChange}
              className="w-4 h-4 md:w-5 md:h-5 mt-1 cursor-pointer accent-sky-500"
            />
            <div>
              <p className="font-medium text-white text-sm md:text-base">Dark Mode</p>
              <p className="text-xs md:text-sm text-gray-400">Enable dark theme for the application</p>
            </div>
          </label>
          <button className="text-sky-400 hover:text-sky-300 font-medium text-xs md:text-sm mt-4">
            📥 Download Your Data
          </button>
        </div>
      </div>

      {/* Security */}
      <div className="bg-gray-800 rounded-lg p-4 md:p-6 border border-gray-700 mb-4 md:mb-6 animate-slideInUp">
        <h2 className="text-base md:text-lg font-bold text-white mb-4">Security</h2>
        <div className="space-y-2 md:space-y-3">
          <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 md:py-3 px-4 rounded-lg transition text-xs md:text-sm">
            🔐 Change Password
          </button>
          <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 md:py-3 px-4 rounded-lg transition text-xs md:text-sm">
            🔑 Two-Factor Authentication
          </button>
          <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 md:py-3 px-4 rounded-lg transition text-xs md:text-sm">
            📱 Manage Devices
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-900/20 rounded-lg p-4 md:p-6 border-l-4 border-l-red-500 border border-red-800/50 mb-6 md:mb-8 animate-slideInUp">
        <h2 className="text-base md:text-lg font-bold text-red-400 mb-2">Danger Zone</h2>
        <p className="text-gray-300 text-xs md:text-sm mb-4">
          Irreversible actions that will permanently affect your account
        </p>
        <button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 md:py-3 px-4 rounded-lg transition text-xs md:text-sm">
          🗑️ Delete Account
        </button>
      </div>

      {/* Save Button - Sticky on Mobile */}
      <div className="flex flex-col sm:flex-row gap-2 md:gap-3 justify-end sticky bottom-0 bg-gray-900/95 p-4 -m-4 rounded-lg border-t border-gray-700">
        <button className="flex-1 sm:flex-none bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 md:py-3 px-4 rounded-lg transition text-xs md:text-sm">
          Cancel
        </button>
        <button onClick={handleSave} className="flex-1 sm:flex-none bg-sky-600 hover:bg-sky-700 text-white font-medium py-2 md:py-3 px-4 rounded-lg transition text-xs md:text-sm">
          ✓ Save Changes
        </button>
      </div>
    </div>
  );
};
