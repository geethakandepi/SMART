import React from 'react';
import { getHealthStatusColor } from '../utils/helpers';

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  normalMin?: number;
  normalMax?: number;
  icon?: string;
  description?: string;
  trend?: 'up' | 'down' | 'stable';
}

const getStatusBgColor = (status: 'safe' | 'alert' | 'warning'): string => {
  switch (status) {
    case 'safe':
      return 'bg-safe-500/20 border-safe-500/20';
    case 'alert':
      return 'bg-alert-500/20 border-alert-500/20';
    case 'warning':
      return 'bg-primary-500/20 border-primary-500/20';
    default:
      return 'bg-dark-700/20 border-dark-700/20';
  }
};

const getStatusTextColor = (status: 'safe' | 'alert' | 'warning'): string => {
  switch (status) {
    case 'safe':
      return 'text-safe-400';
    case 'alert':
      return 'text-alert-400';
    case 'warning':
      return 'text-primary-400';
    default:
      return 'text-dark-400';
  }
};

const getTrendIcon = (trend?: 'up' | 'down' | 'stable'): string => {
  switch (trend) {
    case 'up':
      return '📈';
    case 'down':
      return '📉';
    case 'stable':
      return '➡️';
    default:
      return '';
  }
};

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  unit,
  normalMin,
  normalMax,
  icon,
  description,
  trend,
}) => {
  const isNumeric = typeof value === 'number';
  const status =
    isNumeric && normalMin !== undefined && normalMax !== undefined
      ? getHealthStatusColor(value, normalMin, normalMax)
      : 'safe';

  const bgColor = getStatusBgColor(status);
  const textColor = getStatusTextColor(status);

  return (
    <div className={`card ${bgColor}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-dark-400 text-sm font-medium mb-2">{label}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-dark-100">{value}</span>
            {unit && <span className="text-dark-400 text-sm">{unit}</span>}
            {trend && <span className="text-lg">{getTrendIcon(trend)}</span>}
          </div>
        </div>
        {icon && <span className="text-3xl">{icon}</span>}
      </div>

      {description && <p className={`text-sm ${textColor} font-medium`}>{description}</p>}

      {normalMin !== undefined && normalMax !== undefined && (
        <div className="mt-4 pt-4 border-t border-dark-700/50">
          <p className="text-xs text-dark-400">
            Normal: {normalMin}-{normalMax}
          </p>
        </div>
      )}
    </div>
  );
};

interface CriticalAlertProps {
  message: string;
  severity: 'critical' | 'warning';
}

export const CriticalAlert: React.FC<CriticalAlertProps> = ({ message, severity }) => {
  const isAlert = severity === 'critical';
  return (
    <div
      className={`card border-l-4 ${
        isAlert
          ? 'border-l-alert-500 bg-alert-500/10'
          : 'border-l-primary-500 bg-primary-500/10'
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">
          {isAlert ? '🚨' : '⚠️'}
        </span>
        <p className={isAlert ? 'text-alert-400' : 'text-primary-400'}>
          {message}
        </p>
      </div>
    </div>
  );
};
