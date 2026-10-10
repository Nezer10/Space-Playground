import React from 'react';

interface EarthCenterProps {
  isPaused: boolean;
  onEarthClick?: () => void;
}

export const EarthCenter: React.FC<EarthCenterProps> = ({ isPaused, onEarthClick }) => {
  return (
    <div
      onClick={onEarthClick}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center cursor-pointer group"
      title="Planet Earth (Center of Reference)"
    >
      {/* Outer Atmospheric Aura (Glow Layers) */}
      <div className="absolute w-44 h-44 rounded-full bg-cyan-500/10 blur-2xl pointer-events-none group-hover:bg-cyan-400/20 transition-all duration-700" />
      <div className="absolute w-36 h-36 rounded-full bg-blue-600/15 blur-xl pointer-events-none" />

      {/* Earth Globe Sphere */}
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden shadow-[0_0_50px_rgba(34,211,238,0.35)] border border-cyan-400/30 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
        {/* Ocean Base Gradient */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#021B38] via-[#034078] to-[#0D5C75]" />

        {/* Continents and Landmass Layer (Stylized SVG vector continents) */}
        <div
          className="absolute inset-0 opacity-80 mix-blend-screen pointer-events-none"
          style={{
            animation: isPaused ? 'none' : 'earth-clouds 60s linear infinite',
            backgroundImage: `radial-gradient(circle at 35% 30%, #15803d 0%, #047857 25%, transparent 60%),
                              radial-gradient(circle at 75% 65%, #15803d 0%, #0f766e 30%, transparent 65%),
                              radial-gradient(circle at 25% 75%, #047857 0%, transparent 40%)`,
          }}
        />

        {/* Continuous Swirling Cloud Layer */}
        <div
          className="absolute inset-0 opacity-60 mix-blend-overlay pointer-events-none"
          style={{
            animation: isPaused ? 'none' : 'spin-slow 48s linear infinite',
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.7) 10%, transparent 40%),
                              radial-gradient(circle at 20% 40%, rgba(255,255,255,0.5) 5%, transparent 30%),
                              radial-gradient(circle at 80% 60%, rgba(255,255,255,0.6) 8%, transparent 35%)`,
          }}
        />

        {/* Photosphere / Day-Night Terminator Shadow */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/75 pointer-events-none" />

        {/* Rim Atmospheric Blue Glow */}
        <div className="absolute inset-0 rounded-full shadow-[inset_0_0_18px_rgba(56,189,248,0.85)] pointer-events-none" />

        {/* Central Label: "Earth" */}
        <div className="relative z-10 text-center px-2 py-0.5 rounded-full bg-slate-950/60 backdrop-blur-md border border-cyan-300/40 shadow-lg">
          <span className="block text-xs uppercase tracking-widest text-cyan-200 font-extrabold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Earth
          </span>
          <span className="block text-[9px] font-mono tracking-wider text-cyan-300/80 -mt-0.5">
            1.00 AU
          </span>
        </div>
      </div>

      {/* Orbit coordinate badge below */}
      <div className="mt-2 text-[10px] tracking-widest uppercase font-mono text-cyan-400/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Gravitational Anchor
      </div>
    </div>
  );
};
