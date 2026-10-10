import React from 'react';
import { Orbit, Compass, Info, Play, Pause } from 'lucide-react';

interface TopNavProps {
  isPaused: boolean;
  onTogglePlayPause: () => void;
  onOpenEarthModal: () => void;
  onSelectQuickEntity: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  isPaused,
  onTogglePlayPause,
  onOpenEarthModal,
  onSelectQuickEntity,
}) => {
  return (
    <header className="flex items-center justify-between gap-8 px-5 sm:px-8 py-3.5 border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md sticky top-0 z-40">
      {/* Zone 1: Brand Wordmark (Display Face, single text line) */}
      <div className="flex items-center gap-2.5 whitespace-nowrap shrink-0">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)]">
          <Orbit className="w-4 h-4 text-white animate-spin-slow" />
        </div>
        <div>
          <span className="text-base sm:text-lg font-extrabold tracking-tight text-white block">
            Orbital Earth
          </span>
          <span className="text-[10px] font-mono tracking-wider text-cyan-400 block -mt-1">
            2D CELESTIAL HORIZON
          </span>
        </div>
      </div>

      {/* Zone 2: Navigation Links (Clean single-line prose) */}
      <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
        <button
          onClick={onOpenEarthModal}
          className="hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
        >
          <Compass className="w-3.5 h-3.5 text-cyan-400" />
          <span>Center Anchor (Earth)</span>
        </button>
        <button
          onClick={onSelectQuickEntity}
          className="hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
        >
          <Orbit className="w-3.5 h-3.5 text-amber-400" />
          <span>Inspect Moon</span>
        </button>
        <a
          href="#missions-guide"
          className="hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
        >
          <Info className="w-3.5 h-3.5 text-indigo-400" />
          <span>Telemetry Index</span>
        </a>
      </nav>

      {/* Zone 3: Primary Action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onTogglePlayPause}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all border whitespace-nowrap shrink-0 cursor-pointer shadow-sm ${
            isPaused
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
              : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 hover:bg-cyan-500/30'
          }`}
        >
          {isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5 fill-current" />}
          <span>{isPaused ? 'Resume Orbit' : 'Pause Orbit'}</span>
        </button>
      </div>
    </header>
  );
};
