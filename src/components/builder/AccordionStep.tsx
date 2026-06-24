import { ReactNode } from 'react';

import { ChevronIcon } from '../shared/ChevronIcon';
import { StepIcon, StepIconName } from './StepIcons';

interface AccordionStepProps {
  stepNumber: number;
  title: string;
  icon: StepIconName;
  isExpanded: boolean;
  selectedCount: number;
  onToggle: () => void;
  children?: ReactNode;
  isFirst?: boolean;
  chevronStrokeWidth?: number;
}

export function AccordionStep({
  stepNumber,
  title,
  icon,
  isExpanded,
  selectedCount,
  onToggle,
  children,
  isFirst = false,
  chevronStrokeWidth = 3,
}: AccordionStepProps) {
  const stepLabelStyle = isFirst
    ? { borderBottom: '0.5px solid #1F1F1F' }
    : { borderTop: '0.5px solid #1F1F1F', borderBottom: '0.5px solid #1F1F1F' };

  return (
    <div className={isExpanded ? 'bg-[#EDF4FF]' : 'bg-white'}>
      <div className={isFirst ? 'rounded-t-xl p-4 sm:p-6' : 'px-4 sm:px-6 py-4 sm:py-5'}>
        <div className={`mb-4 ${isFirst ? 'pb-4' : 'py-4'} step-text`} style={stepLabelStyle}>
          STEP {stepNumber} OF 4
        </div>

        <div className="flex items-center justify-between cursor-pointer" onClick={onToggle}>
          <div className="flex items-center gap-3">
            <StepIcon name={icon} />
            <h2 className="step-title">{title}</h2>
          </div>
          <div className="flex items-center gap-2 text-indigo-600 font-medium">
            {selectedCount > 0 && <span>{selectedCount} selected</span>}
            <ChevronIcon isExpanded={isExpanded} strokeWidth={chevronStrokeWidth} />
          </div>
        </div>

        {isExpanded && children}
      </div>
    </div>
  );
}
