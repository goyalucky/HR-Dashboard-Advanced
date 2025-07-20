import React from 'react';

export function Card({ 
  children, 
  className = '', 
  padding = 'md',
  hover = false 
}) {
  const baseClasses = 'bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-200';
  
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };
  
  const hoverClasses = hover ? 'hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600' : '';

  return (
    <div className={`${baseClasses} ${paddingClasses[padding]} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
}
