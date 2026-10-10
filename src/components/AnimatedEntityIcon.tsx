import React from 'react';
import { CelestialEntity } from '../types/orbit';

interface AnimatedEntityIconProps {
  iconType: CelestialEntity['iconType'];
  accentColor: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const AnimatedEntityIcon: React.FC<AnimatedEntityIconProps> = ({
  iconType,
  accentColor,
  size = 'md',
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  const containerClasses = `${sizeMap[size]} flex items-center justify-center relative shrink-0 ${className}`;

  switch (iconType) {
    case 'moon':
      return (
        <div className={containerClasses} aria-label="Moon Icon">
          <svg viewBox="0 0 48 48" className="w-full h-full drop-shadow-md">
            <defs>
              <radialGradient id="moonGlow" cx="40%" cy="35%" r="60%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="60%" stopColor="#CBD5E1" />
                <stop offset="100%" stopColor="#64748B" />
              </radialGradient>
              <linearGradient id="craterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#475569" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#334155" stopOpacity="0.5" />
              </linearGradient>
            </defs>
            {/* Soft outer aura */}
            <circle cx="24" cy="24" r="22" fill="none" stroke={accentColor} strokeWidth="1" opacity="0.3" className="animate-pulse" />
            {/* Rotating Lunar Sphere with continuous subtle tilt */}
            <g className="animate-spin-slow" style={{ transformOrigin: '24px 24px', animationDuration: '32s' }}>
              <circle cx="24" cy="24" r="18" fill="url(#moonGlow)" />
              {/* Detailed Craters */}
              <circle cx="18" cy="18" r="4.5" fill="url(#craterGrad)" />
              <circle cx="29" cy="27" r="3.2" fill="url(#craterGrad)" />
              <circle cx="16" cy="31" r="2.5" fill="url(#craterGrad)" />
              <circle cx="28" cy="16" r="2" fill="url(#craterGrad)" />
              <circle cx="22" cy="24" r="1.5" fill="url(#craterGrad)" />
            </g>
            {/* Crescent shadow sweep overlay */}
            <path
              d="M24 6 A18 18 0 0 0 24 42 A14 18 0 0 1 24 6 Z"
              fill="#0F172A"
              opacity="0.35"
              className="animate-pulse-glow"
            />
          </svg>
        </div>
      );

    case 'iss':
      return (
        <div className={containerClasses} aria-label="ISS Icon">
          <svg viewBox="0 0 48 48" className="w-full h-full drop-shadow-md">
            {/* Blinking communication beacon */}
            <circle cx="24" cy="20" r="2" fill="#22D3EE">
              <animate attributeName="opacity" values="1;0.2;1" dur="1.2s" repeatCount="indefinite" />
            </circle>
            {/* Central Truss and Habitation Modules */}
            <line x1="10" y1="24" x2="38" y2="24" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
            <rect x="21" y="19" width="6" height="10" rx="1.5" fill="#E2E8F0" stroke="#06B6D4" strokeWidth="1" />
            <rect x="18" y="22" width="12" height="4" rx="1" fill="#CBD5E1" />
            {/* Rotating Solar Array Panels (Left and Right) */}
            <g style={{ transformOrigin: '12px 24px' }}>
              <g className="animate-float-subtle">
                <rect x="7" y="10" width="10" height="28" rx="1" fill="#0891B2" opacity="0.85" stroke="#22D3EE" strokeWidth="0.8" />
                <line x1="7" y1="17" x2="17" y2="17" stroke="#E0F2FE" strokeWidth="0.6" />
                <line x1="7" y1="24" x2="17" y2="24" stroke="#E0F2FE" strokeWidth="0.6" />
                <line x1="7" y1="31" x2="17" y2="31" stroke="#E0F2FE" strokeWidth="0.6" />
                <line x1="12" y1="10" x2="12" y2="38" stroke="#E0F2FE" strokeWidth="0.6" />
              </g>
            </g>
            <g style={{ transformOrigin: '36px 24px' }}>
              <g className="animate-float-subtle" style={{ animationDelay: '1s' }}>
                <rect x="31" y="10" width="10" height="28" rx="1" fill="#0891B2" opacity="0.85" stroke="#22D3EE" strokeWidth="0.8" />
                <line x1="31" y1="17" x2="41" y2="17" stroke="#E0F2FE" strokeWidth="0.6" />
                <line x1="31" y1="24" x2="41" y2="24" stroke="#E0F2FE" strokeWidth="0.6" />
                <line x1="31" y1="31" x2="41" y2="31" stroke="#E0F2FE" strokeWidth="0.6" />
                <line x1="36" y1="10" x2="36" y2="38" stroke="#E0F2FE" strokeWidth="0.6" />
              </g>
            </g>
            {/* Radiator Panel with micro rotation */}
            <rect x="22" y="13" width="4" height="6" fill="#F8FAFC" opacity="0.9" />
            <rect x="22" y="29" width="4" height="6" fill="#F8FAFC" opacity="0.9" />
          </svg>
        </div>
      );

    case 'jwst':
      return (
        <div className={containerClasses} aria-label="JWST Icon">
          <svg viewBox="0 0 48 48" className="w-full h-full drop-shadow-md">
            {/* Five-layer Sunshield Kite Shape */}
            <polygon
              points="24,4 43,24 24,44 5,24"
              fill="#78350F"
              stroke="#F59E0B"
              strokeWidth="1"
              opacity="0.85"
              className="animate-pulse-glow"
            />
            <polygon
              points="24,7 40,24 24,41 8,24"
              fill="#451A03"
              stroke="#FBBF24"
              strokeWidth="0.8"
            />
            {/* Hexagonal Gold Mirrors (JWST Honeycomb Array) */}
            <g className="animate-pulse" style={{ animationDuration: '3s' }}>
              <polygon points="24,14 28,16.5 28,21.5 24,24 20,21.5 20,16.5" fill="#F59E0B" stroke="#FEF3C7" strokeWidth="0.6" />
              <polygon points="28,21.5 32,24 32,29 28,31.5 24,29 24,24" fill="#D97706" stroke="#FEF3C7" strokeWidth="0.6" />
              <polygon points="20,21.5 24,24 24,29 20,31.5 16,29 16,24" fill="#D97706" stroke="#FEF3C7" strokeWidth="0.6" />
              <polygon points="24,29 28,31.5 28,36.5 24,39 20,36.5 20,31.5" fill="#F59E0B" stroke="#FEF3C7" strokeWidth="0.6" />
            </g>
            {/* Secondary mirror support struts & tripod focal beam */}
            <line x1="24" y1="24" x2="24" y2="12" stroke="#FEF08A" strokeWidth="1.2" strokeLinecap="round">
              <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
            </line>
            <circle cx="24" cy="24" r="1.5" fill="#FFFFFF" />
          </svg>
        </div>
      );

    case 'hubble':
      return (
        <div className={containerClasses} aria-label="Hubble Icon">
          <svg viewBox="0 0 48 48" className="w-full h-full drop-shadow-md">
            {/* Star-tracker reticle beam */}
            <circle cx="24" cy="24" r="21" fill="none" stroke="#3B82F6" strokeWidth="0.8" strokeDasharray="3 3" className="animate-spin-slow" />
            {/* Telescope Body tilted 30 degrees */}
            <g transform="rotate(-30 24 24)">
              {/* Cylindrical Main Tube */}
              <rect x="20" y="10" width="8" height="28" rx="2" fill="#E2E8F0" stroke="#3B82F6" strokeWidth="1" />
              {/* Aperture Door open */}
              <line x1="20" y1="10" x2="16" y2="6" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" />
              {/* Baffle / Primary Mirror Chamber */}
              <rect x="18" y="28" width="12" height="10" rx="1.5" fill="#1E3A8A" stroke="#93C5FD" strokeWidth="0.8" />
              {/* Dual Solar Panels with continuous shimmer */}
              <g className="animate-float-subtle">
                <rect x="6" y="20" width="12" height="8" rx="1" fill="#2563EB" stroke="#93C5FD" strokeWidth="0.7" opacity="0.9" />
                <rect x="30" y="20" width="12" height="8" rx="1" fill="#2563EB" stroke="#93C5FD" strokeWidth="0.7" opacity="0.9" />
              </g>
            </g>
            {/* Starlight photon intake gleam */}
            <circle cx="15" cy="13" r="2.5" fill="#60A5FA">
              <animate attributeName="r" values="1.5;3;1.5" dur="1.8s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;1;0.5" dur="1.8s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
      );

    case 'gps':
      return (
        <div className={containerClasses} aria-label="GPS Icon">
          <svg viewBox="0 0 48 48" className="w-full h-full drop-shadow-md">
            {/* Concentric Signal Broadcast Waves expanding outward */}
            <circle cx="24" cy="24" r="9" fill="none" stroke="#10B981" strokeWidth="1.5" className="animate-radar-ping" />
            <circle cx="24" cy="24" r="16" fill="none" stroke="#34D399" strokeWidth="1" strokeDasharray="2 2">
              <animate attributeName="opacity" values="0.2;0.8;0.2" dur="2s" repeatCount="indefinite" />
            </circle>
            {/* Satellite Core Body */}
            <rect x="20" y="20" width="8" height="8" rx="1.5" fill="#065F46" stroke="#10B981" strokeWidth="1.5" />
            <circle cx="24" cy="24" r="2" fill="#6EE7B7" />
            {/* Solar Wings extending left and right with tilt */}
            <line x1="8" y1="24" x2="20" y2="24" stroke="#34D399" strokeWidth="1.5" />
            <rect x="4" y="20" width="8" height="8" rx="1" fill="#047857" stroke="#6EE7B7" strokeWidth="0.8" />
            <line x1="28" y1="24" x2="40" y2="24" stroke="#34D399" strokeWidth="1.5" />
            <rect x="36" y="20" width="8" height="8" rx="1" fill="#047857" stroke="#6EE7B7" strokeWidth="0.8" />
            {/* Earthward L-Band broadcast antenna cone */}
            <polygon points="22,28 26,28 28,34 20,34" fill="#10B981" opacity="0.6" />
          </svg>
        </div>
      );

    case 'tiangong':
      return (
        <div className={containerClasses} aria-label="Tiangong Icon">
          <svg viewBox="0 0 48 48" className="w-full h-full drop-shadow-md">
            {/* T-Shape Modular Space Station */}
            {/* Core Module Tianhe (vertical) */}
            <rect x="21" y="12" width="6" height="24" rx="2" fill="#EA580C" stroke="#FDBA74" strokeWidth="1" />
            {/* Lab Modules Wentian & Mengtian (horizontal) */}
            <rect x="10" y="21" width="28" height="6" rx="1.5" fill="#C2410C" stroke="#FED7AA" strokeWidth="0.8" />
            {/* Robotic Arm articulating */}
            <path
              d="M24 16 L30 13 L33 16"
              fill="none"
              stroke="#FDBA74"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="0 24 16; 15 24 16; -10 24 16; 0 24 16"
                dur="6s"
                repeatCount="indefinite"
              />
            </path>
            {/* Flexible Solar Wings on ends */}
            <g className="animate-float-subtle">
              <rect x="2" y="19" width="7" height="10" rx="1" fill="#9A3412" stroke="#FB923C" strokeWidth="0.8" />
              <rect x="39" y="19" width="7" height="10" rx="1" fill="#9A3412" stroke="#FB923C" strokeWidth="0.8" />
            </g>
            {/* Ion thruster subtle plume */}
            <circle cx="24" cy="38" r="2.5" fill="#38BDF8" className="animate-pulse">
              <animate attributeName="opacity" values="0.3;0.9;0.3" dur="1s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
      );

    case 'landsat':
      return (
        <div className={containerClasses} aria-label="Landsat Icon">
          <svg viewBox="0 0 48 48" className="w-full h-full drop-shadow-md">
            {/* Ground observation target cone */}
            <polygon
              points="24,24 12,44 36,44"
              fill="none"
              stroke="#14B8A6"
              strokeWidth="1"
              strokeDasharray="2 2"
              opacity="0.4"
            />
            {/* Scanning Laser radar beam moving back and forth */}
            <line x1="16" y1="44" x2="32" y2="44" stroke="#2DD4BF" strokeWidth="2.5" strokeLinecap="round">
              <animate attributeName="x1" values="14;22;14" dur="2s" repeatCount="indefinite" />
              <animate attributeName="x2" values="26;34;26" dur="2s" repeatCount="indefinite" />
            </line>
            {/* Satellite Body with sensor apertures */}
            <rect x="18" y="14" width="12" height="14" rx="2" fill="#0F766E" stroke="#5EEAD4" strokeWidth="1.2" />
            <circle cx="24" cy="20" r="3" fill="#134E4A" stroke="#99F6E4" strokeWidth="0.8" />
            {/* Large Single Solar Array Wing */}
            <g className="animate-float-subtle">
              <rect x="5" y="16" width="11" height="10" rx="1" fill="#115E59" stroke="#2DD4BF" strokeWidth="0.8" />
              <line x1="5" y1="21" x2="16" y2="21" stroke="#99F6E4" strokeWidth="0.6" />
            </g>
          </svg>
        </div>
      );

    case 'artemis':
      return (
        <div className={containerClasses} aria-label="Artemis Icon">
          <svg viewBox="0 0 48 48" className="w-full h-full drop-shadow-md">
            {/* Lunar Trajectory Arc */}
            <path
              d="M8 40 Q24 6 40 40"
              fill="none"
              stroke="#F43F5E"
              strokeWidth="1"
              strokeDasharray="3 3"
              opacity="0.6"
            />
            {/* Orion Capsule Cone Body */}
            <polygon points="24,12 31,24 17,24" fill="#E11D48" stroke="#FECDD3" strokeWidth="1" />
            {/* European Service Module Cylinder */}
            <rect x="18" y="24" width="12" height="8" rx="1" fill="#9F1239" stroke="#FDA4AF" strokeWidth="0.8" />
            {/* X-wing Solar Arrays (ESM 4-wing layout) */}
            <g className="animate-spin-slow" style={{ transformOrigin: '24px 28px', animationDuration: '20s' }}>
              <line x1="24" y1="28" x2="36" y2="20" stroke="#FB7185" strokeWidth="2" strokeLinecap="round" />
              <line x1="24" y1="28" x2="36" y2="36" stroke="#FB7185" strokeWidth="2" strokeLinecap="round" />
              <line x1="24" y1="28" x2="12" y2="20" stroke="#FB7185" strokeWidth="2" strokeLinecap="round" />
              <line x1="24" y1="28" x2="12" y2="36" stroke="#FB7185" strokeWidth="2" strokeLinecap="round" />
            </g>
            {/* Main Engine Thruster Plume */}
            <polygon points="22,32 26,32 24,40" fill="#FF8A00">
              <animate attributeName="points" values="22,32 26,32 24,37; 22,32 26,32 24,42; 22,32 26,32 24,37" dur="0.4s" repeatCount="indefinite" />
            </polygon>
          </svg>
        </div>
      );

    case 'goes':
      return (
        <div className={containerClasses} aria-label="GOES Icon">
          <svg viewBox="0 0 48 48" className="w-full h-full drop-shadow-md">
            {/* Weather Cyclone Swirl Vortex continuously rotating */}
            <g className="animate-spin-slow" style={{ transformOrigin: '24px 24px', animationDuration: '14s' }}>
              <circle cx="24" cy="24" r="18" fill="none" stroke="#6366F1" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
              <path
                d="M24 10 C16 14 16 34 24 38 C32 34 32 14 24 10"
                fill="none"
                stroke="#818CF8"
                strokeWidth="1.5"
                opacity="0.6"
              />
            </g>
            {/* Geostationary Spacecraft platform */}
            <rect x="20" y="20" width="8" height="8" rx="1.5" fill="#4338CA" stroke="#C7D2FE" strokeWidth="1" />
            <circle cx="24" cy="24" r="2.5" fill="#A5B4FC" />
            {/* Solar Array and Solar Sail Boom */}
            <g className="animate-float-subtle">
              <rect x="6" y="21" width="12" height="6" rx="1" fill="#312E81" stroke="#818CF8" strokeWidth="0.8" />
              <line x1="28" y1="24" x2="38" y2="24" stroke="#A5B4FC" strokeWidth="1.5" />
              <polygon points="38,20 42,24 38,28" fill="#C7D2FE" />
            </g>
          </svg>
        </div>
      );

    case 'voyager':
      return (
        <div className={containerClasses} aria-label="Voyager Icon">
          <svg viewBox="0 0 48 48" className="w-full h-full drop-shadow-md">
            {/* Expanding Hyperbolic Signal Waves back to Earth */}
            <path
              d="M10 16 A16 16 0 0 1 10 32"
              fill="none"
              stroke="#A855F7"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="animate-pulse-glow"
            />
            <path
              d="M5 10 A24 24 0 0 1 5 38"
              fill="none"
              stroke="#C084FC"
              strokeWidth="1"
              strokeLinecap="round"
              strokeDasharray="2 2"
              opacity="0.7"
            />
            {/* 3.7m High-Gain Parabolic Reflector Dish */}
            <path
              d="M16 12 C24 18 24 30 16 36 Z"
              fill="#F3E8FF"
              stroke="#9333EA"
              strokeWidth="1.5"
            />
            {/* Subreflector Feed Boom */}
            <line x1="20" y1="24" x2="27" y2="24" stroke="#7E22CE" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="27" cy="24" r="1.5" fill="#A855F7" />
            {/* Science Boom and RTG Power Generator */}
            <line x1="16" y1="24" x2="40" y2="18" stroke="#9333EA" strokeWidth="1.2" />
            <rect x="36" y="15" width="6" height="5" rx="1" fill="#581C87" stroke="#D8B4FE" strokeWidth="0.8" />
            {/* Golden Record subtle gleam */}
            <circle cx="20" cy="28" r="2.5" fill="#F59E0B" stroke="#FEF08A" strokeWidth="0.5" />
          </svg>
        </div>
      );

    default:
      return null;
  }
};
