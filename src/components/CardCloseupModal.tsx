import React, { useState, useEffect } from 'react';
import { CelestialEntity } from '../types/orbit';
import { AnimatedEntityIcon } from './AnimatedEntityIcon';
import {
  X,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Gauge,
  Compass,
  Clock,
  Rocket,
  ShieldCheck,
  Scale,
  RefreshCw,
} from 'lucide-react';

interface CardCloseupModalProps {
  entity: CelestialEntity;
  onClose: () => void;
  onSelectEntity: (entity: CelestialEntity) => void;
  allEntities: CelestialEntity[];
}

export const CardCloseupModal: React.FC<CardCloseupModalProps> = ({
  entity,
  onClose,
  onSelectEntity,
  allEntities,
}) => {
  // Current fact index in the entity's fact collection
  const [factIndex, setFactIndex] = useState<number>(0);
  const [isFactShuffling, setIsFactShuffling] = useState<boolean>(false);

  // Initialize random fact index whenever entity changes
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * entity.facts.length);
    setFactIndex(randomIndex);
  }, [entity]);

  // Handle Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [entity, allEntities]);

  // Shuffle / generate next random interesting fact
  const handleGenerateNextFact = () => {
    setIsFactShuffling(true);
    setTimeout(() => {
      let nextIndex = Math.floor(Math.random() * entity.facts.length);
      // Ensure we don't repeat the exact same fact if multiple exist
      if (entity.facts.length > 1 && nextIndex === factIndex) {
        nextIndex = (factIndex + 1) % entity.facts.length;
      }
      setFactIndex(nextIndex);
      setIsFactShuffling(false);
    }, 150);
  };

  const currentIndex = allEntities.findIndex((item) => item.id === entity.id);

  const goToPrevious = () => {
    const prevIdx = (currentIndex - 1 + allEntities.length) % allEntities.length;
    onSelectEntity(allEntities[prevIdx]);
  };

  const goToNext = () => {
    const nextIdx = (currentIndex + 1) % allEntities.length;
    onSelectEntity(allEntities[nextIdx]);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-entity-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md transition-all duration-300"
      onClick={onClose}
    >
      {/* Modal Dialog Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: `0 0 60px ${entity.glowColor}, 0 25px 50px -12px rgba(0, 0, 0, 0.9)`,
        }}
        className="relative w-full max-w-3xl rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-slate-700/80 p-5 sm:p-7 text-slate-100 max-h-[92vh] overflow-y-auto"
      >
        {/* Top Header Row with Navigation and Close Button */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span
              className="text-[11px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full border"
              style={{
                color: entity.accentColor,
                borderColor: `${entity.accentColor}40`,
                backgroundColor: `${entity.accentColor}15`,
              }}
            >
              {entity.category}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Entity {currentIndex + 1} of {allEntities.length}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Previous Entity */}
            <button
              onClick={goToPrevious}
              aria-label="Previous orbital entity"
              className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Next Entity */}
            <button
              onClick={goToNext}
              aria-label="Next orbital entity"
              className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close telemetry inspection"
              className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-rose-900/60 text-slate-300 hover:text-rose-200 transition-colors border border-slate-700 ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Hero Section: Animated Icon + Title & Overview */}
        <div className="mt-5 flex flex-col sm:flex-row items-center sm:items-start gap-5">
          {/* Animated Icon Hero Container */}
          <div
            className={`p-4 rounded-2xl bg-gradient-to-br ${entity.accentBg} border ${entity.borderStyle} shrink-0 flex items-center justify-center relative shadow-lg`}
          >
            <AnimatedEntityIcon
              iconType={entity.iconType}
              accentColor={entity.accentColor}
              size="xl"
            />
          </div>

          {/* Titles & Mission Profile */}
          <div className="flex-1 text-center sm:text-left">
            <h2
              id="modal-entity-title"
              className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white"
            >
              {entity.name}
            </h2>
            <p className="text-sm font-medium text-cyan-300/90 mt-0.5">
              {entity.subtitle}
            </p>
            <p className="text-sm text-slate-300 mt-2.5 leading-relaxed">
              {entity.detailedOverview}
            </p>
          </div>
        </div>

        {/* Random Curiosity Fact Generator Box (Highlighted Feature) */}
        <div
          className="mt-6 rounded-xl border p-4 bg-slate-950/70 relative overflow-hidden transition-all duration-300"
          style={{ borderColor: `${entity.accentColor}50` }}
        >
          {/* Subtle background glow */}
          <div
            className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-15 pointer-events-none"
            style={{ backgroundColor: entity.accentColor }}
          />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Curiosity Transmission #{factIndex + 1}
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                ({factIndex + 1} of {entity.facts.length} available)
              </span>
            </div>

            <button
              onClick={handleGenerateNextFact}
              disabled={isFactShuffling}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 active:scale-95 transition-all border border-slate-600 shadow-sm whitespace-nowrap cursor-pointer"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 text-cyan-400 ${
                  isFactShuffling ? 'animate-spin' : ''
                }`}
              />
              <span>Generate Next Fact</span>
            </button>
          </div>

          <div className="mt-3 min-h-[56px] flex items-center">
            <p
              className={`text-sm text-slate-200 leading-relaxed font-medium transition-opacity duration-200 ${
                isFactShuffling ? 'opacity-30' : 'opacity-100'
              }`}
            >
              &ldquo;{entity.facts[factIndex]}&rdquo;
            </p>
          </div>
        </div>

        {/* Telemetry Matrix Grid */}
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-3">
            <Gauge className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
              Orbital Telemetry & Specifications
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {/* Altitude */}
            <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-800">
              <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-mono uppercase">
                <Compass className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Altitude</span>
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-100 font-mono tabular-nums">
                {entity.telemetry.altitude}
              </div>
            </div>

            {/* Velocity */}
            <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-800">
              <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-mono uppercase">
                <Gauge className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Velocity</span>
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-100 font-mono tabular-nums">
                {entity.telemetry.orbitalVelocity}
              </div>
            </div>

            {/* Orbital Period */}
            <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-800">
              <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-mono uppercase">
                <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Period</span>
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-100 font-mono tabular-nums">
                {entity.telemetry.orbitalPeriod}
              </div>
            </div>

            {/* Inclination */}
            <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-800">
              <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-mono uppercase">
                <Compass className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>Inclination</span>
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-100 font-mono tabular-nums">
                {entity.telemetry.inclination}
              </div>
            </div>

            {/* Operator */}
            <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-800">
              <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-mono uppercase">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Operator</span>
              </div>
              <div className="mt-1 text-xs font-semibold text-slate-100 truncate">
                {entity.telemetry.operator}
              </div>
            </div>

            {/* Launch / Origin */}
            <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-800">
              <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-mono uppercase">
                <Rocket className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>Launch Era</span>
              </div>
              <div className="mt-1 text-xs font-semibold text-slate-100 truncate">
                {entity.telemetry.launchYear}
              </div>
            </div>

            {/* Status */}
            <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-800">
              <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-mono uppercase">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Status</span>
              </div>
              <div className="mt-1 text-xs font-semibold text-emerald-300 truncate">
                {entity.telemetry.status}
              </div>
            </div>

            {/* Mass / Dimensions */}
            <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-800">
              <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-mono uppercase">
                <Scale className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>Dimension / Mass</span>
              </div>
              <div className="mt-1 text-xs font-semibold text-slate-100 truncate">
                {entity.telemetry.massOrDiameter}
              </div>
            </div>
          </div>
        </div>

        {/* Scientific Significance Footer Note */}
        <div className="mt-5 p-3 rounded-xl bg-slate-950/40 border border-slate-800/80 text-xs text-slate-400 leading-relaxed">
          <strong className="text-slate-300 font-semibold">Key Significance: </strong>
          {entity.scientificSignificance}
        </div>

        {/* Bottom Actions */}
        <div className="mt-6 flex items-center justify-between pt-3 border-t border-slate-800">
          <span className="text-[11px] font-mono text-slate-500">
            Use ← → arrow keys to navigate or Esc to return to orbit
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors cursor-pointer border border-slate-700"
          >
            Return to Orbit
          </button>
        </div>
      </div>
    </div>
  );
};
