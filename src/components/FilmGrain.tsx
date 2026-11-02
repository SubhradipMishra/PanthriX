import React from 'react';

export const FilmGrain: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 select-none overflow-hidden opacity-[0.035] mix-blend-screen"
    >
      <svg className="h-full w-full">
        <filter id="panthrix-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#panthrix-grain)" />
      </svg>
    </div>
  );
};

