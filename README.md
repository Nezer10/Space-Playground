# Orbital Earth

An interactive space exploration web application featuring a calibrated 2D circular orbital field around planet Earth with 10 animated celestial and space mission cards. The orbital rotation pauses smoothly on card hover and expands into a cinematic inspection modal upon click, displaying detailed telemetry data and dynamic curiosity facts.

---

## Features

- **Central Earth Anchor**: Glowing planet Earth at the gravitational center displaying continuous atmospheric cloud motion, day-night gradient, and an "Earth" label with clickable planetary baseline specifications.
- **10 Orbiting Entity Cards**: Evenly spaced across a 2D circular plane:
  - **The Moon (Luna)**: Earth's tidally locked natural satellite stabilizing axial tilt.
  - **International Space Station (ISS)**: Multinational microgravity laboratory orbiting in Low Earth Orbit at 7.66 km/s.
  - **James Webb Space Telescope (JWST)**: Gold-mirror infrared observatory stationed at Sun-Earth L2.
  - **Hubble Space Telescope (HST)**: Veteran optical telescope in Low Earth Orbit unhindered by atmospheric distortion.
  - **GPS III Constellation**: Atomic-clock timing satellites providing real-time 3D positioning.
  - **Tiangong Space Station**: T-shaped modular space laboratory operating with taikonaut crews.
  - **Landsat 9**: Sun-synchronous polar satellite imaging Earth's surface and climate variables.
  - **Artemis Orion Spacecraft**: Deep-space human exploration vehicle engineered for lunar return.
  - **GOES-18 Weather Eye**: Geostationary satellite monitoring weather, storms, and solar flares.
  - **Voyager Earth-Relay Link**: The most distant human-made artifact in interstellar space.
- **Continuous Animated Icons**: Each card includes an individual vector SVG icon that animates continuously (e.g. rotating solar arrays, lunar phase cycles, scanning radar pulses, and rotating storm cyclones).
- **Hover-to-Pause Orbit Mechanics**: Hovering any card halts the `requestAnimationFrame` trigonometric orbital revolution without desynchronization, resuming seamlessly when the cursor leaves.
- **Cinematic Closeup Inspection Modal**: Clicking any card smoothly zooms into that entity, revealing:
  - Technical telemetry (orbital velocity, altitude, orbital period, inclination, mass/dimensions).
  - Mission profile, operator, launch era, and scientific significance.
  - Keyboard navigation (left/right arrows to cycle entities, Escape to return).
- **Curiosity Fact Generator**: Each entity contains a verified bank of intriguing scientific facts. A random fact is revealed upon opening the card, with a "Generate Next Fact" shuffle button.
- **Interactive Controls**:
  - Play / Pause orbital rotation toggle.
  - Speed selector (0.5x, 1x, 1.5x, 2x).
  - Category filters (*Natural Satellite*, *Space Station*, *Observatory*, *Earth & Navigation*, *Deep Space & Exploration*).
- **Orbital Telemetry Registry**: Grid index displaying all 10 cards with quick inspection access.

---

## Tech Stack

- **Framework**: React 19 (Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React + Custom Animated SVGs
- **Animation**: Native `requestAnimationFrame` continuous trigonometric physics & CSS Keyframes

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# Clone the repository and install dependencies
npm install
```

### Running Locally

```bash
# Start the Vite development server
npm run dev
```

The application will be accessible at `http://localhost:3000` (or the configured dev server port).

### Building for Production

```bash
# Create optimized production build
npm run build
```

### Linting & Type Checking

```bash
npm run lint
```

---

## Project Structure

```
├── index.html                   # HTML entry point with synchronized metadata
├── metadata.json                # AI Studio application metadata
├── package.json                 # Project dependencies & scripts
├── tsconfig.json                # TypeScript compiler configuration
├── vite.config.ts               # Vite bundler configuration
└── src/
    ├── App.tsx                  # Main application orchestrator & layout
    ├── index.css                # Global styles, fonts, and animation keyframes
    ├── main.tsx                 # React DOM mount point
    ├── types/
    │   └── orbit.ts             # TypeScript interfaces for entities & telemetry
    ├── data/
    │   └── entities.ts          # Dataset of 10 celestial entities & 60+ facts
    └── components/
        ├── TopNav.tsx           # Header bar adhering to Top Bar Contract
        ├── EarthCenter.tsx      # Central Earth globe with clouds & aura
        ├── OrbitCard.tsx        # Individual orbiting card with hover pause
        ├── OrbitalStage.tsx     # Trigonometric 2D orbit loop & guidelines
        ├── AnimatedEntityIcon.tsx # Continuous SVG animations per entity
        ├── CardCloseupModal.tsx # Inspection dialog with telemetry & fact shuffle
        ├── EarthInfoModal.tsx   # Planetary reference data dialog
        ├── ControlsBar.tsx      # Speed scrubber, play/pause & filter tabs
        └── TelemetryGrid.tsx    # Bottom registry indexing all 10 tracks
```

---

## License

Apache-2.0
