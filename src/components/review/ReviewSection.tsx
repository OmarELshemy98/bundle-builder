import { ReactNode } from 'react';

interface ReviewSectionProps {
  title: string;
  children: ReactNode;
}

export function ReviewSection({ title, children }: ReviewSectionProps) {
  return (
    <div className="review-block">
      <div className="review-section-header mb-2">{title}</div>
      {children}
    </div>
  );
}
