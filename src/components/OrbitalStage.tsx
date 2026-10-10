import React, { useState, useEffect, useRef, useMemo } from 'react';
import { CelestialEntity } from '../types/orbit';
import { EarthCenter } from './EarthCenter';
import { OrbitCard } from './OrbitCard';

interface OrbitalStageProps {
  entities: CelestialEntity[];
  allEntitiesCount: number;
  isPaused: boolean;
  speedMultiplier: number;
  onSelectEntity: (entity: CelestialEntity) => void;
  hoveredEntityId: string | null;
  onHoverEntity: (id: string | null) => void;
  onEarthClick: () => void;
}

export const OrbitalStage: React.FC<OrbitalStageProps> = ({
  entities,
  isPaused,
  speedMultiplier,
  onSelectEntity,
  hoveredEntityId,
  onHoverEntity,
  onEarthClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Current base orbital rotation angle (in radians)
  const angleRef = useRef<number>(0);
  const [currentAngle, setCurrentAngle] = useState<number>(0);

  // Responsive radius calculation
  const [radius, setRadius] = useState<number>(310);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        const minDim = Math.min(width, height);

        // Adjust orbit radius based on viewport size so cards never clip
        if (minDim < 500) {
          setRadius(Math.max(140, minDim * 0.32));
        } else if (minDim < 768) {
          setRadius(Math.max(200, minDim * 0.34));
        } else if (minDim < 1100) {
          setRadius(Math.max(260, minDim * 0.36));
        } else {
          setRadius(Math.min(340, minDim * 0.38));
        }
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Continuous animation loop using requestAnimationFrame
  const isHoveredActive = hoveredEntityId !== null;
  const isOrbitHalted = isPaused || isHoveredActive;

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      // Only increment angle when neither hovered nor manually paused
      if (!isOrbitHalted) {
        // Base rotational speed: ~0.08 radians/sec (~78 seconds per full turn at 1x)
        const angularSpeed = 0.08 * speedMultiplier;
        angleRef.current = (angleRef.current + angularSpeed * delta) % (Math.PI * 2);
        setCurrentAngle(angleRef.current);
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isOrbitHalted, speedMultiplier]);

  // Generate subtle static stars for depth
  const stars = useMemo(() => {
    return Array.from({ length: 65 }).map((_, i) => ({
      id: i,
      x: (i * 37) % 100,
      y: (i * 61) % 100,
      size: (i % 3) === 0 ? 2 : 1,
      opacity: 0.15 + ((i % 5) * 0.12),
    }));
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[640px] sm:h-[720px] lg:h-[780px] overflow-hidden flex items-center justify-center select-none"
    >
      {/* Background Starfield Canvas */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
            }}
            className="absolute rounded-full bg-white"
          />
        ))}
      </div>

      {/* Orbital Guideline Rings (SVG overlay centered at Earth) */}
      <svg
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        width={radius * 2 + 180}
        height={radius * 2 + 180}
        viewBox={`0 0 ${radius * 2 + 180} ${radius * 2 + 180}`}
      >
        <defs>
          <radialGradient id="ringFade" cx="50%" cy="50%" r="50%">
            <stop offset="60%" stopColor="#38BDF8" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer and Inner Reference Orbit Guides */}
        <circle
          cx={radius + 90}
          cy={radius + 90}
          r={radius}
          fill="none"
          stroke="#38BDF8"
          strokeWidth="1.2"
          strokeDasharray="4 6"
          opacity={isHoveredActive ? "0.6" : "0.3"}
          className="transition-opacity duration-300"
        />

        <circle
          cx={radius + 90}
          cy={radius + 90}
          r={radius * 0.65}
          fill="none"
          stroke="#0284C7"
          strokeWidth="0.8"
          strokeDasharray="2 6"
          opacity="0.18"
        />

        <circle
          cx={radius + 90}
          cy={radius + 90}
          r={radius * 1.25}
          fill="none"
          stroke="#0369A1"
          strokeWidth="0.8"
          strokeDasharray="3 8"
          opacity="0.15"
        />

        {/* Subtle radial axis lines */}
        <line
          x1={radius + 90}
          y1={radius + 90 - radius - 20}
          x2={radius + 90}
          y2={radius + 90 + radius + 20}
          stroke="#0284C7"
          strokeWidth="0.5"
          opacity="0.1"
        />
        <line
          x1={radius + 90 - radius - 20}
          y1={radius + 90}
          x2={radius + 90 + radius + 20}
          y2={radius + 90}
          stroke="#0284C7"
          strokeWidth="0.5"
          opacity="0.1"
        />
      </svg>

      {/* Center Planet: Earth */}
      <EarthCenter isPaused={isOrbitHalted} onEarthClick={onEarthClick} />

      {/* Orbiting Cards: Positioned via trigonometry around the center */}
      {entities.map((entity, index) => {
        // Evenly space cards around 2*PI radians plus current continuous angle
        const cardAngle = currentAngle + (index * 2 * Math.PI) / entities.length;
        const isHovered = hoveredEntityId === entity.id;

        return (
          <OrbitCard
            key={entity.id}
            entity={entity}
            angle={cardAngle}
            radius={radius}
            isHovered={isHovered}
            onHover={onHoverEntity}
            onClick={onSelectEntity}
          />
        );
      })}

      {/* Hover Pause Status Indicator Overlay */}
      {hoveredEntityId && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-slate-900/90 border border-cyan-500/40 text-[11px] font-mono text-cyan-300 shadow-lg flex items-center gap-2 pointer-events-none transition-all duration-200">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>Orbit Frozen on Inspection Hover</span>
        </div>
      )}
    </div>
  );
};
