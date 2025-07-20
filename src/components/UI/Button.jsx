import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) {
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary:
      'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600',
    secondary:
      'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 dark:bg-gray-500 dark:hover:bg-gray-600',
    outline:
      'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800',
    ghost:
      'text-gray-700 hover:bg-gray-100 focus:ring-gray-500 dark:text-gray-300 dark:hover:bg-gray-800',
    danger:
      'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 dark:bg-red-500 dark:hover:bg-red-600',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <button
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
      )}

      {Icon && iconPosition === 'left' && !loading && (
        <Icon className={`${iconSizeClasses[size]} ${children ? 'mr-2' : ''}`} />
      )}

      {children}

      {Icon && iconPosition === 'right' && !loading && (
        <Icon className={`${iconSizeClasses[size]} ${children ? 'ml-2' : ''}`} />
      )}
    </button>
  );
}
