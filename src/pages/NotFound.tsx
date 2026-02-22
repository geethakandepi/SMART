import React from 'react';
import { useNavigate } from 'react-router-dom';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-6">
      <div className="text-center max-w-md">
        {/* 404 Icon */}
        <div className="text-8xl font-bold mb-4 bg-gradient-to-br from-sky-500 to-red-500 bg-clip-text text-transparent">
          404
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-white mb-4">Page Not Found</h1>

        {/* Description */}
        <p className="text-gray-400 mb-8 text-lg">
          Sorry, the page you're looking for doesn't exist. It might have been moved or deleted.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-semibold transition order-1 sm:order-0"
          >
            🏠 Back to Dashboard
          </button>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition"
          >
            ← Go Back
          </button>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <p className="text-gray-400 mb-4">Quick Links</p>
          <div className="grid grid-cols-2 gap-3">
            <a href="/" className="text-sky-400 hover:text-sky-300 transition">
              Dashboard
            </a>
            <a href="/patient-monitor" className="text-sky-400 hover:text-sky-300 transition">
              Patient Monitor
            </a>
            <a href="/alerts" className="text-sky-400 hover:text-sky-300 transition">
              Alerts
            </a>
            <a href="/metrics" className="text-sky-400 hover:text-sky-300 transition">
              Metrics
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
