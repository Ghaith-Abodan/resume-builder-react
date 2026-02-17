import React from 'react';
import { Loader2 } from 'lucide-react';

export const Button = ({ 
  children, 
  onClick, 
  variant = 'blue',
  type = 'button', 
  className = '', 
  disabled = false, 
  isLoading = false,
  icon: Icon,
  loadingTitle='', 
}) => {
  

  const variants = {
    blue:'bg-linear-to-br from-blue-200 to-blue-400 text-blue-900 ring-blue-500 hover:ring transition-colors',
    green: 'bg-linear-to-br from-green-200 to-green-400 text-green-900 ring-green-500 hover:ring transition-colors',
    purple: 'bg-linear-to-br from-purple-200 to-purple-400 text-purple-900 ring-purple-500 hover:ring transition-colors',
    red: 'bg-linear-to-br from-red-200 to-red-400 text-red-900 ring-red-500 hover:ring transition-colors',
    ghost:'text-gray-600 hover:bg-gray-50 '
};

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`flex items-center py-2 px-3 gap-2 text-xs rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${variants[variant]} ${className}`}
    >
      {isLoading ? (
        <Loader2 className="animate-spin size-4" />
      ) : (
        Icon && <Icon className="size-4" />
      )}
      
      {isLoading ? loadingTitle : <span className='max-sm:hidden'>{children}</span>}
    </button>
  );
};

