import { useContext } from 'react';
import { HealthContext } from '../context/HealthContext';
import type { HealthContextType } from '../context/HealthContext';

export const useHealth = (): HealthContextType => {
  const context = useContext(HealthContext);
  if (!context) {
    throw new Error('useHealth must be used within a HealthProvider');
  }
  return context;
};
