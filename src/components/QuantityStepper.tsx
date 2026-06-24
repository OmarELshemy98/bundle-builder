import React from 'react';

interface QuantityStepperProps {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  size?: 'sm' | 'md';
  disabled?: boolean;
}

export const QuantityStepper: React.FC<QuantityStepperProps> = ({ 
  quantity, 
  onQuantityChange, 
  size = 'md',
  disabled = false 
}) => {
  const buttonSizeClasses = size === 'sm' ? 'w-6 h-6' : 'w-8 h-8';
  const quantitySizeClasses = size === 'sm' ? 'w-8 h-6 text-xs' : 'w-10 h-8';
  
  return (
    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
      <button
        onClick={() => !disabled && onQuantityChange(Math.max(0, quantity - 1))}
        className={`${buttonSizeClasses} flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={disabled}
      >
        <svg 
          className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" />
        </svg>
      </button>
      <span className={`${quantitySizeClasses} flex items-center justify-center font-medium text-gray-900`}>
        {quantity}
      </span>
      <button
        onClick={() => !disabled && onQuantityChange(quantity + 1)}
        className={`${buttonSizeClasses} flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={disabled}
      >
        <svg 
          className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
};
