export const steps = [
  { id: 1, title: 'Choose your cameras', icon: 'camera' as const },
  { id: 2, title: 'Choose your plan', icon: 'shield' as const },
  { id: 3, title: 'Choose your sensors', icon: 'sensor' as const },
  { id: 4, title: 'Add extra protection', icon: 'extra' as const },
];

export const NEXT_STEP_LABELS: Record<number, string> = {
  1: 'Choose your plan',
  2: 'Choose your sensors',
  3: 'Add extra protection',
};
