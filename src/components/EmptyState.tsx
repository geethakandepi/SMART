import React from 'react';

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description, action }) => (
  <div className="flex flex-col items-center justify-center py-12 px-4">
    <div className="text-6xl mb-4">{icon}</div>
    <h3 className="text-2xl font-bold text-white mb-2 text-center">{title}</h3>
    <p className="text-gray-400 text-center mb-6 max-w-md">{description}</p>
    {action && (
      <button
        onClick={action.onClick}
        className="px-6 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-semibold transition"
      >
        {action.label}
      </button>
    )}
  </div>
);

// Specific empty states
export const NoPatients: React.FC<{ onAdd?: () => void }> = ({ onAdd }) => (
  <EmptyState
    icon="👥"
    title="No Patients Found"
    description="No patients are currently being monitored. Add your first patient to get started."
    action={onAdd ? { label: 'Add Patient', onClick: onAdd } : undefined}
  />
);

export const NoAlerts: React.FC = () => (
  <EmptyState
    icon="✨"
    title="All Clear"
    description="No alerts at this time. All monitored patients are within normal ranges."
  />
);

export const NoData: React.FC<{ retryFn?: () => void }> = ({ retryFn }) => (
  <EmptyState
    icon="📭"
    title="No Data Available"
    description="Unable to load the requested data. Please try again."
    action={retryFn ? { label: 'Try Again', onClick: retryFn } : undefined}
  />
);

export const NoMetrics: React.FC = () => (
  <EmptyState
    icon="📊"
    title="No Metrics Available"
    description="Metrics will appear here once vital signs data is collected."
  />
);
