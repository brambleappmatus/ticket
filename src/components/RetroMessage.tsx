import React, { useEffect, useState } from 'react';

interface RetroMessageProps {
  type: 'success' | 'error';
  message: string;
}

export function RetroMessage({ type, message }: RetroMessageProps) {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const fullText = `${type === 'success' ? '> ' : '! '}${message}`;
  
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (!isDeleting) {
      if (displayText.length < fullText.length) {
        timeout = setTimeout(() => {
          setDisplayText(fullText.slice(0, displayText.length + 1));
        }, 100);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 50);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, fullText, isDeleting]);

  const typeClasses = {
    success: "text-green-500 dark:text-green-400",
    error: "text-red-500 dark:text-red-400"
  };

  return (
    <div className={`font-mono text-sm p-3 ${typeClasses[type]}`}>
      <span>{displayText}</span>
      <span className="animate-[blink_1s_step-end_infinite]">_</span>
    </div>
  );
}