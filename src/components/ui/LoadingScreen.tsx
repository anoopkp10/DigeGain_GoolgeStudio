import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFade(true);
      const exitTimer = setTimeout(onComplete, 400);
      return () => clearTimeout(exitTimer);
    }, 700);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white transition-opacity duration-400 ${
        fade ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center">
        <div className="relative mb-3 flex items-center justify-center">
          <img
            src="/logo-stacked.svg"
            alt="DIGEGAIN"
            className="h-28 w-auto animate-pulse-subtle"
          />
        </div>
        <span className="mt-1 text-xs font-medium tracking-widest text-slate-400 uppercase">
          Modern Websites · Business Growth
        </span>
      </div>
    </div>
  );
}
