import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagnetButtonProps {
  children: React.ReactNode;
  variant?: 'orange' | 'silver-outline' | 'ghost' | 'icon' | 'inverted-black';
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  'aria-label'?: string;
}

export const MagnetButton: React.FC<MagnetButtonProps> = ({
  children,
  variant = 'orange',
  className = '',
  onClick,
  href,
  target,
  type = 'button',
  disabled = false,
  'aria-label': ariaLabel,
}) => {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || disabled) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    // Gentle magnetic attraction
    setPosition({ x: distanceX * 0.28, y: distanceY * 0.28 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'orange':
        return 'bg-[#F55B17] text-white hover:bg-[#FF6E2E] shadow-orange-sm hover:shadow-orange-md border border-[#F55B17] px-6 py-3';
      case 'silver-outline':
        return 'bg-transparent text-[#C8CCD4] hover:text-white border border-[#C8CCD4]/30 hover:border-[#F55B17] hover:bg-[#F55B17]/10 px-6 py-3';
      case 'icon':
        return 'h-10 w-10 p-0 rounded-full border border-[#1E2025] bg-[#101114] text-[#C8CCD4] hover:border-[#F55B17] hover:text-white hover:bg-[#F55B17]/15';
      case 'ghost':
        return 'bg-transparent text-[#888E99] hover:text-white border border-transparent px-4 py-2';
      case 'inverted-black':
        return 'bg-[#08090B] text-white hover:bg-[#F55B17] hover:text-white border border-[#08090B] px-6 py-3';
      default:
        return 'bg-[#F55B17] text-white px-6 py-3';
    }
  };

  const content = (
    <motion.span
      className="relative z-10 flex items-center justify-center gap-2"
      animate={{ x: position.x * 0.5, y: position.y * 0.5 }}
      transition={{ type: 'spring', stiffness: 350, damping: 20 }}
    >
      {children}
    </motion.span>
  );

  const isIcon = variant === 'icon';
  const baseClasses = `group relative inline-flex items-center justify-center overflow-hidden rounded-full font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#F55B17]/50 active:scale-[0.98] ${getVariantStyles()} ${className}`;

  if (href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        aria-label={ariaLabel}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={baseClasses}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={baseClasses}
    >
      {content}
    </motion.button>
  );
};
