import React from 'react';

interface GlitchTextProps {
  children: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export function GlitchText({ children, className = '', as: Component = 'span' }: GlitchTextProps) {
  return (
    <Component className={`glitch ${className}`} data-text={children}>
      {children}
    </Component>
  );
}