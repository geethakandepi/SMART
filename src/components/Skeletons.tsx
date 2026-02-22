import React from 'react';

// Skeleton card component
export const SkeletonCard: React.FC<{ count?: number }> = ({ count = 4 }) => (
  <div className="space-y-4">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="bg-gray-800 rounded-lg p-4 animate-pulse">
        <div className="h-4 bg-gray-700 rounded w-3/4 mb-3"></div>
        <div className="h-3 bg-gray-700 rounded w-1/2"></div>
      </div>
    ))}
  </div>
);

// Skeleton chart component
export const SkeletonChart: React.FC = () => (
  <div className="bg-gray-800 rounded-lg p-6 animate-pulse">
    <div className="h-6 bg-gray-700 rounded w-1/4 mb-6"></div>
    <div className="space-y-3">
      <div className="h-40 bg-gray-700 rounded"></div>
      <div className="flex gap-2">
        <div className="h-3 bg-gray-700 rounded flex-1"></div>
        <div className="h-3 bg-gray-700 rounded flex-1"></div>
        <div className="h-3 bg-gray-700 rounded flex-1"></div>
      </div>
    </div>
  </div>
);

// Skeleton grid component
export const SkeletonGrid: React.FC<{ cols?: number; count?: number }> = ({ cols = 4, count = 4 }) => (
  <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${cols} gap-4`}>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="bg-gray-800 rounded-lg p-4 animate-pulse">
        <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>
        <div className="h-8 bg-gray-700 rounded w-2/3 mb-2"></div>
        <div className="h-3 bg-gray-700 rounded w-1/4"></div>
      </div>
    ))}
  </div>
);

// Skeleton table component
export const SkeletonTable: React.FC<{ rows?: number; cols?: number }> = ({ rows = 5, cols = 4 }) => (
  <div className="bg-gray-800 rounded-lg p-4 animate-pulse">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex gap-4 mb-4 pb-4 border-b border-gray-700">
        {Array.from({ length: cols }).map((_, j) => (
          <div key={j} className="h-4 bg-gray-700 rounded flex-1"></div>
        ))}
      </div>
    ))}
  </div>
);
