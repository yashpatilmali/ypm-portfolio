import React from 'react';

/**
 * MarioCharacter - Official High-Resolution Super Mario Character
 * Features:
 * - Authentic, official 3D Mario Artwork Render with transparent background
 * - Responsive sizing and aspect ratio preservation
 * - Dynamic animations for 'idle', 'jumping', 'running', and 'celebrating'
 * - GitHub Pages compatible base URL resolution
 */
export default function MarioCharacter({
  state = 'idle',
  size = 80,
  flip = false,
  className = '',
  onClick = null
}) {
  const marioImgSrc = `${import.meta.env.BASE_URL}mario.png`;

  const getAnimationClass = () => {
    switch (state) {
      case 'jumping':
        return 'animate-bounce -translate-y-2';
      case 'running':
        return 'animate-bounce-gentle';
      case 'celebrating':
        return 'animate-pulse scale-105';
      case 'idle':
      default:
        return 'animate-float';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex items-center justify-center select-none cursor-pointer filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] transition-all duration-200 ${flip ? 'scale-x-[-1]' : ''} ${getAnimationClass()} ${className}`}
      style={{ width: size, height: size * 1.1 }}
    >
      <img
        src={marioImgSrc}
        alt="Super Mario"
        className="w-full h-full object-contain pointer-events-none select-none transition-transform hover:scale-105"
        style={{ imageRendering: 'auto' }}
        loading="eager"
      />
    </div>
  );
}
