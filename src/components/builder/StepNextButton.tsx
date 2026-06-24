interface StepNextButtonProps {
  label: string;
  onClick: () => void;
}

export function StepNextButton({ label, onClick }: StepNextButtonProps) {
  return (
    <div className="mt-6 flex justify-center">
      <button
        type="button"
        className="px-6 sm:px-8 py-2 bg-white text-indigo-600 font-medium border border-indigo-600 rounded-xl hover:bg-indigo-50 transition-colors"
        onClick={onClick}
      >
        Next: {label}
      </button>
    </div>
  );
}
