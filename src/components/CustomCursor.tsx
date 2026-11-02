import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [cursorType, setCursorType] = useState<'default' | 'hover' | 'view' | 'drag'>('default');
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for the trailing ring
  const ringX = useSpring(mouseX, { stiffness: 450, damping: 28 });
  const ringY = useSpring(mouseY, { stiffness: 450, damping: 28 });

  useEffect(() => {
    // Only enable custom cursor for precise pointer devices (desktop/mouse)
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handlePointerOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const viewTarget = target.closest('[data-cursor="view"]');
      const dragTarget = target.closest('[data-cursor="drag"]');
      const interactiveTarget = target.closest(
        'button, a, input, textarea, select, [role="button"], [data-cursor="hover"]'
      );

      if (viewTarget) {
        setCursorType('view');
      } else if (dragTarget) {
        setCursorType('drag');
      } else if (interactiveTarget) {
        setCursorType('hover');
      } else {
        setCursorType('default');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handlePointerOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handlePointerOver);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Predator Orange Core Dot */}
      {cursorType !== 'view' && (
        <motion.div
          className="fixed left-0 top-0 h-2 w-2 rounded-full bg-[#F55B17] shadow-orange-sm"
          style={{
            x: mouseX,
            y: mouseY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          transition={{ duration: 0 }}
        />
      )}

      {/* Titanium Silver / Orange Trailing Outer Ring */}
      <motion.div
        className="fixed left-0 top-0 flex items-center justify-center rounded-full pointer-events-none"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: cursorType === 'view' ? 84 : cursorType === 'hover' ? 44 : 26,
          height: cursorType === 'view' ? 84 : cursorType === 'hover' ? 44 : 26,
          backgroundColor:
            cursorType === 'view'
              ? '#F55B17'
              : cursorType === 'hover'
              ? 'rgba(245, 91, 23, 0.12)'
              : 'transparent',
          borderColor:
            cursorType === 'view'
              ? '#F55B17'
              : cursorType === 'hover'
              ? '#F55B17'
              : 'rgba(200, 204, 212, 0.45)',
          borderWidth: cursorType === 'view' ? 0 : 1.5,
          scale: cursorType === 'hover' ? 1.15 : 1,
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      >
        {cursorType === 'view' && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="font-mono text-xs font-bold uppercase tracking-widest text-white"
          >
            STRIKE
          </motion.span>
        )}
      </motion.div>
    </div>
  );
};

