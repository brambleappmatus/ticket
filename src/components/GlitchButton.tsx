import React from 'react';

interface GlitchButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function GlitchButton({ children, className = '', ...props }: GlitchButtonProps) {
  return (
    <button
      {...props}
      className={`glitch ${className}`}
      data-text={typeof children === 'string' ? children : undefined}
    >
      {children}
    </button>
  );
}