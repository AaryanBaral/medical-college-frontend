import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className = '', onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`rounded-xl bg-card p-6 card-shadow transition-smooth ${
        onClick ? 'cursor-pointer hover:shadow-lg hover:-translate-y-1' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
