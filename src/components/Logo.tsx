import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 28 }) => {
  return (
    <div
      className={`relative flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-110 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 48 48"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]"
      >
        <defs>
          <linearGradient id="auraGeminiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="35%" stopColor="#818CF8" />
            <stop offset="70%" stopColor="#C084FC" />
            <stop offset="100%" stopColor="#F472B6" />
          </linearGradient>
          <radialGradient id="auraCenterGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#67E8F9" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 4-point Organic Curved Spark Logo (Matching the multi-colored Gemini spark) */}
        <path
          d="M24 2 C24 14.15 14.15 24 2 24 C14.15 24 24 33.85 24 46 C24 33.85 33.85 24 46 24 C33.85 24 24 14.15 24 2 Z"
          fill="url(#auraGeminiGrad)"
        />

        {/* Inner Soft Core Highlight */}
        <path
          d="M24 10 C24 17.73 17.73 24 10 24 C17.73 24 24 30.27 24 38 C24 30.27 30.27 24 38 24 C30.27 24 24 17.73 24 10 Z"
          fill="url(#auraCenterGlow)"
        />

        {/* Tiny Sparkle Accent */}
        <circle cx="36" cy="12" r="2.5" fill="#FDE047" opacity="0.9" />
      </svg>
    </div>
  );
};
