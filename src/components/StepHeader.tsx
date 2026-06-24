import React from 'react';

interface StepHeaderProps {
  stepNumber: number;
  title: string;
  icon?: React.ReactNode;
  selectedCount?: number;
  isExpanded: boolean;
  onToggleExpand: () => void;
  showBottomBorder?: boolean;
  showTopBorder?: boolean;
  badgeText?: string;
}

const stepTextStyle = {
  fontFamily: 'Gilroy-Medium',
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '100%',
  letterSpacing: '1.6px',
  verticalAlign: 'middle',
  textTransform: 'uppercase' as const,
  color: '#6b7280'
};

const titleStyle = {
  fontFamily: 'Gilroy-SemiBold',
  fontWeight: 400,
  fontSize: '22px',
  lineHeight: '100%',
  letterSpacing: '0px',
  color: '#111827'
};

export const StepHeader: React.FC<StepHeaderProps> = ({ 
  stepNumber, 
  title, 
  icon, 
  selectedCount, 
  isExpanded, 
  onToggleExpand, 
  showTopBorder,
  showBottomBorder,
  badgeText 
}) => {
  return (
    <div 
      className="px-6 py-5"
      style={{
        borderTop: showTopBorder ? '0.5px solid #1F1F1F' : 'none',
        borderBottom: showBottomBorder ? '0.5px solid #1F1F1F' : 'none'
      }}
    >
      <div 
        className="mb-4 pb-4"
        style={stepTextStyle}
      >
        STEP {stepNumber} OF 4
      </div>
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={onToggleExpand}
      >
        <div className="flex items-center gap-3">
          {icon}
          <h2 style={titleStyle}>{title}</h2>
        </div>
        <div className="flex items-center gap-2">
          {selectedCount !== undefined && selectedCount >= 0 && (
            <span className="text-indigo-600 font-medium">{selectedCount} selected</span>
          )}
          {badgeText && (
            <span className="bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {badgeText}
            </span>
          )}
          <svg 
            className={`w-5 h-5 text-indigo-600 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};
