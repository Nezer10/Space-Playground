import { useState, useMemo } from 'react';
import { CELESTIAL_ENTITIES } from './data/entities';
import { CelestialEntity, EntityCategory } from './types/orbit';
import { TopNav } from './components/TopNav';
import { OrbitalStage } from './components/OrbitalStage';
import { ControlsBar } from './components/ControlsBar';
import { CardCloseupModal } from './components/CardCloseupModal';
import { EarthInfoModal } from './components/EarthInfoModal';
import { TelemetryGrid } from './components/TelemetryGrid';
import { Info, Sparkles, Orbit } from 'lucide-react';

export default function App() {
  const [selectedEntity, setSelectedEntity] = useState<CelestialEntity | null>(null);
  const [hoveredEntityId, setHoveredEntityId] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [activeCategory, setActiveCategory] = useState<EntityCategory>('All');
  const [isEarthModalOpen, setIsEarthModalOpen] = useState<boolean>(false);

  // Available unique categories
  const categories: EntityCategory[] = useMemo(() => {
    const set = new Set<EntityCategory>(['All']);
    CELESTIAL_ENTITIES.forEach((e) => set.add(e.category));
    return Array.from(set);
  }, []);

  // Filtered entities based on active category
  const filteredEntities = useMemo(() => {
    if (activeCategory === 'All') return CELESTIAL_ENTITIES;
    return CELESTIAL_ENTITIES.filter((e) => e.category === activeCategory);
  }, [activeCategory]);

  const handleTogglePlayPause = () => {
    setIsPaused((prev) => !prev);
  };

  const handleQuickSelectMoon = () => {
    const moon = CELESTIAL_ENTITIES.find((e) => e.id === 'moon');
    if (moon) setSelectedEntity(moon);
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Top Bar Contract Header */}
      <TopNav
        isPaused={isPaused}
        onTogglePlayPause={handleTogglePlayPause}
        onOpenEarthModal={() => setIsEarthModalOpen(true)}
        onSelectQuickEntity={handleQuickSelectMoon}
      />

      {/* Main Interactive Orbit Stage */}
      <main className="flex-1 flex flex-col items-center justify-start w-full relative">
        {/* Interactive Instruction Banner */}
        <section className="w-full max-w-5xl mx-auto px-4 pt-6 pb-2 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-3">
            <Orbit className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
            <span>Interactive 2D Circular Orbit</span>
            <span className="text-slate-500">·</span>
            <span>Hover card to freeze orbit</span>
            <span className="text-slate-500">·</span>
            <span>Click to inspect</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white max-w-2xl mx-auto">
            10 Celestial & Space Mission Cards in Earth Orbit
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mt-2 leading-relaxed">
            Watch continuously animated spacecraft and lunar bodies rotate around Earth.
            Hover over any card to hold position; click to launch the detailed telemetry inspector and uncover fascinating random facts.
          </p>
        </section>

        {/* 2D Orbital Stage */}
        <div className="w-full flex justify-center items-center py-2 relative">
          <OrbitalStage
            entities={filteredEntities}
            allEntitiesCount={CELESTIAL_ENTITIES.length}
            isPaused={isPaused}
            speedMultiplier={speedMultiplier}
            onSelectEntity={(entity) => setSelectedEntity(entity)}
            hoveredEntityId={hoveredEntityId}
            onHoverEntity={setHoveredEntityId}
            onEarthClick={() => setIsEarthModalOpen(true)}
          />
        </div>

        {/* Orbit Speed & Category Controls */}
        <div className="w-full px-4 -mt-4 mb-4">
          <ControlsBar
            isPaused={isPaused}
            onTogglePlayPause={handleTogglePlayPause}
            speedMultiplier={speedMultiplier}
            onSelectSpeed={setSpeedMultiplier}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            categories={categories}
            activeCount={filteredEntities.length}
            totalCount={CELESTIAL_ENTITIES.length}
            onResetAngle={() => {
              // Quick reset trigger
              setIsPaused(false);
            }}
          />
        </div>

        {/* Educational Registry Section */}
        <TelemetryGrid
          entities={CELESTIAL_ENTITIES}
          onSelectEntity={(entity) => setSelectedEntity(entity)}
        />
      </main>

      {/* Cinematic Telemetry & Curiosity Modal */}
      {selectedEntity && (
        <CardCloseupModal
          entity={selectedEntity}
          onClose={() => setSelectedEntity(null)}
          onSelectEntity={setSelectedEntity}
          allEntities={filteredEntities}
        />
      )}

      {/* Earth Overview Modal */}
      {isEarthModalOpen && (
        <EarthInfoModal onClose={() => setIsEarthModalOpen(false)} />
      )}

      {/* Footer */}
      <footer className="w-full border-t border-slate-900 bg-slate-950/80 px-6 py-6 text-center text-xs text-slate-500">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">Orbital Earth Explorer</span>
            <span>·</span>
            <span>Continuous Realtime Trigonometric Simulation</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>60+ Verified Scientific Facts</span>
            </span>
            <span className="flex items-center gap-1">
              <Info className="w-3 h-3 text-cyan-400" />
              <span>Full Telemetry Spec</span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
