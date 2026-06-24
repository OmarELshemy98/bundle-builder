import { useCallback, useState } from 'react';

export function useAccordion(initialStepId = 1) {
  const [expandedStepId, setExpandedStepId] = useState(initialStepId);

  const toggleStep = useCallback((stepId: number) => {
    setExpandedStepId((current) => (current === stepId ? 0 : stepId));
  }, []);

  const goToStep = useCallback((stepId: number) => {
    setExpandedStepId(stepId);
  }, []);

  return { expandedStepId, toggleStep, goToStep };
}
