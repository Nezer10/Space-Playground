import React from 'react';
import { CelestialEntity } from '../types/orbit';
import { AnimatedEntityIcon } from './AnimatedEntityIcon';
import { ArrowUpRight } from 'lucide-react';

interface OrbitCardProps {
  entity: CelestialEntity;
  angle: number; // in radians
  radius: number; // in pixels
  isHovered: boolean;
  onHover: (id: string | null) => void;
  onClick: (entity: CelestialEntity) => void;
}

export const OrbitCard: React.FC<OrbitCardProps> = ({
  entity,
  angle,
  radius,
  isHovered,
  onHover,
  onClick,
}) => {
  // Trigonometric positioning in 2D circular orbit
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`View details for ${entity.name}`}
      onClick={() => onClick(entity)}
      onMouseEnter={() => onHover(entity.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(entity.id)}
      onBlur={() => onHover(null)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(entity);
        }
      }}
      style={{
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${isHovered ? 1.08 : 1})`,
        boxShadow: isHovered
          ? `0 0 25px ${entity.glowColor}, 0 10px 25px -5px rgba(0,0,0,0.8)`
          : '0 4px 16px -2px rgba(0,0,0,0.6)',
        transition: 'transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease, border-color 0.2s ease',
      }}
      className={`absolute top-1/2 left-1/2 z-30 cursor-pointer select-none rounded-xl bg-gradient-to-br ${entity.accentBg} backdrop-blur-md border ${entity.borderStyle} p-3 w-40 sm:w-44 flex flex-col items-center gap-2 text-center group outline-none focus-visible:ring-2 focus-visible:ring-cyan-400`}
    >
      {/* Entity continuous animated icon */}
      <div className="relative">
        <AnimatedEntityIcon
          iconType={entity.iconType}
          accentColor={entity.accentColor}
          size="md"
        />
        {/* Subtle hover pulse */}
        {isHovered && (
          <div
            className="absolute -inset-1 rounded-full blur-md opacity-40 pointer-events-none"
            style={{ backgroundColor: entity.accentColor }}
          />
        )}
      </div>

      {/* Entity Label & Category */}
      <div className="w-full">
        <div className="flex items-center justify-center gap-1">
          <span
            className="text-xs font-bold tracking-tight text-slate-100 truncate max-w-[120px]"
            title={entity.name}
          >
            {entity.name}
          </span>
          <ArrowUpRight
            className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${
              isHovered ? 'translate-x-0.5 -translate-y-0.5 text-cyan-300' : 'text-slate-400 opacity-60'
            }`}
          />
        </div>

        <p className="text-[10px] uppercase font-mono tracking-wider mt-0.5" style={{ color: entity.accentColor }}>
          {entity.shortTag}
        </p>
      </div>

      {/* Quick Telemetry Chip */}
      <div className="w-full pt-1.5 border-t border-slate-700/50 flex items-center justify-between text-[10px] font-mono tabular-nums text-slate-300">
        <span className="text-slate-400 text-[9px] uppercase">ALT</span>
        <span className="font-semibold text-slate-200 truncate ml-1">
          {entity.telemetry.altitude.split(' ')[0]} {entity.telemetry.altitude.split(' ')[1] || ''}
        </span>
      </div>

      {/* Click / Hover cue indicator */}
      {isHovered && (
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded bg-slate-900/90 border border-slate-700 text-[9px] font-mono text-cyan-300 shadow-md">
          Click to inspect
        </div>
      )}
    </div>
  );
};
