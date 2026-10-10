import React from 'react';
import { CelestialEntity } from '../types/orbit';
import { AnimatedEntityIcon } from './AnimatedEntityIcon';
import { ExternalLink, Compass } from 'lucide-react';

interface TelemetryGridProps {
  entities: CelestialEntity[];
  onSelectEntity: (entity: CelestialEntity) => void;
}

export const TelemetryGrid: React.FC<TelemetryGridProps> = ({
  entities,
  onSelectEntity,
}) => {
  return (
    <section id="missions-guide" className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-cyan-400" />
            <span>Orbital Telemetry Registry</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Complete roster of 10 celestial bodies, crewed laboratories, and deep space probes orbiting around Earth.
          </p>
        </div>
        <div className="text-xs font-mono text-slate-400">
          Showing <span className="text-cyan-300 font-semibold">{entities.length}</span> active orbital tracks
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 mt-6">
        {entities.map((entity) => (
          <div
            key={entity.id}
            onClick={() => onSelectEntity(entity)}
            className={`p-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border ${entity.borderStyle} transition-all duration-200 cursor-pointer flex flex-col justify-between group shadow-sm`}
          >
            <div>
              <div className="flex items-center justify-between">
                <AnimatedEntityIcon
                  iconType={entity.iconType}
                  accentColor={entity.accentColor}
                  size="md"
                />
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-300 transition-colors" />
              </div>

              <h3 className="mt-2.5 text-sm font-bold text-slate-100 group-hover:text-white truncate">
                {entity.name}
              </h3>
              <p className="text-[10px] font-mono uppercase tracking-wider" style={{ color: entity.accentColor }}>
                {entity.category}
              </p>
              <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                {entity.summary}
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono tabular-nums text-slate-300">
              <span className="text-slate-400">ALTITUDE</span>
              <span className="font-semibold text-slate-200">
                {entity.telemetry.altitude.split(' ')[0]} {entity.telemetry.altitude.split(' ')[1] || ''}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
