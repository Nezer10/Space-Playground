import React from 'react';
import { EntityCategory } from '../types/orbit';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface ControlsBarProps {
  isPaused: boolean;
  onTogglePlayPause: () => void;
  speedMultiplier: number;
  onSelectSpeed: (speed: number) => void;
  activeCategory: EntityCategory;
  onSelectCategory: (cat: EntityCategory) => void;
  categories: EntityCategory[];
  activeCount: number;
  totalCount: number;
  onResetAngle: () => void;
}

export const ControlsBar: React.FC<ControlsBarProps> = ({
  isPaused,
  onTogglePlayPause,
  speedMultiplier,
  onSelectSpeed,
  activeCategory,
  onSelectCategory,
  categories,
  activeCount,
  totalCount,
  onResetAngle,
}) => {
  const speeds = [0.5, 1, 1.5, 2];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-3 bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-xl shadow-xl z-20">
      {/* Left: Play/Pause and Speed Control */}
      <div className="flex items-center gap-3">
        {/* Play / Pause Toggle */}
        <button
          onClick={onTogglePlayPause}
          aria-label={isPaused ? 'Resume orbital rotation' : 'Pause orbital rotation'}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border cursor-pointer ${
            isPaused
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 hover:bg-amber-500/30'
              : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 hover:bg-cyan-500/30'
          }`}
        >
          {isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5 fill-current" />}
          <span>{isPaused ? 'Orbit Paused' : 'Orbiting'}</span>
        </button>

        {/* Speed Selector */}
        <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-lg border border-slate-800">
          <span className="text-[10px] font-mono uppercase text-slate-400 px-1.5">Speed:</span>
          {speeds.map((s) => (
            <button
              key={s}
              onClick={() => onSelectSpeed(s)}
              className={`px-2 py-0.5 text-xs font-mono rounded transition-colors cursor-pointer ${
                speedMultiplier === s
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>

        {/* Reset Angle Button */}
        <button
          onClick={onResetAngle}
          title="Reset orbital alignment"
          className="p-1.5 rounded-lg bg-slate-950/80 text-slate-400 hover:text-slate-200 border border-slate-800 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Right: Category Filter Pills / Tabs */}
      <div className="flex items-center gap-1.5 flex-wrap justify-center">
        <span className="text-[10px] font-mono text-slate-400 mr-1 hidden lg:inline">
          Filter ({activeCount}/{totalCount}):
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`px-2.5 py-1 text-xs rounded-md transition-colors cursor-pointer whitespace-nowrap font-medium ${
              activeCategory === cat
                ? 'bg-slate-700 text-white shadow-sm border border-slate-600'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};
