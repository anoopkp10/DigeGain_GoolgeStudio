import React, { useEffect, useState } from 'react';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if touch device or reduced motion
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (isTouch || prefersReducedMotion) {
      setIsTouchDevice(true);
      return;
    }

    document.documentElement.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('button, a, input, select, textarea, [role="button"]');
      const portfolioCard = target.closest('[data-cursor="view"]');
      const ctaBtn = target.closest('[data-cursor="start"]');

      if (portfolioCard) {
        setIsPointer(true);
        setCursorText('VIEW');
      } else if (ctaBtn) {
        setIsPointer(true);
        setCursorText('START');
      } else if (interactive) {
        setIsPointer(true);
        setCursorText('');
      } else {
        setIsPointer(false);
        setCursorText('');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Outer Follower Ring */}
      <div
        className="pointer-events-none fixed z-50 transition-transform duration-100 ease-out will-change-transform"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isPointer ? 1.6 : 1})`,
        }}
      >
        <div
          className={`flex items-center justify-center rounded-full transition-all duration-200 ${
            cursorText
              ? 'h-16 w-16 bg-[#1E89C1] text-white shadow-lg'
              : isPointer
              ? 'h-10 w-10 border-2 border-[#F37B20] bg-[rgba(243,123,32,0.12)]'
              : 'h-8 w-8 border border-[#1E89C1] bg-[rgba(30,137,193,0.08)]'
          }`}
        >
          {cursorText && (
            <span className="text-[10px] font-bold tracking-widest text-white uppercase">
              {cursorText}
            </span>
          )}
        </div>
      </div>

      {/* Center Precision Dot */}
      <div
        className="pointer-events-none fixed z-50 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1E89C1] shadow-sm transition-opacity duration-150 will-change-transform"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          opacity: cursorText ? 0 : 1,
        }}
      />
    </>
  );
}
