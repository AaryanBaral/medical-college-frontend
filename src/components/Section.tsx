import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  alternate?: boolean;
}

export function Section({ children, className = '', alternate = false }: SectionProps) {
  return (
    <section className={`py-16 ${alternate ? 'section-alt' : ''} ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
