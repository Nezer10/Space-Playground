# Orbital Earth: Celestial Orbit & Mission Explorer

An interactive space exploration web application featuring a calibrated 2D circular orbit around planet Earth with 10 animated celestial and space mission cards. The orbital motion halts on card hover and expands into a cinematic inspection modal upon selection, displaying telemetry data and dynamic curiosity facts.

> [!IMPORTANT]
> **User Clarifications Incorporated**:
> - **Theme**: Celestial bodies and space missions (Moon, ISS, James Webb, Hubble, GPS Constellation, Tiangong, Landsat-9, Artemis Orion, GOES Weather, Voyager Earth-Relay).
> - **Orbital Perspective**: Flat 2D circular orbit with responsive radius, smooth continuous orbital rotation via requestAnimationFrame, and hover-to-pause mechanics.
> - **Closeup Experience**: Cinematic zoom-in inspection modal with detailed orbital telemetry, operational stats, and an interactive "Discover Another Fact" random fact generator.

---

## 1. Overview & Core Concept

- **What It Does**: Renders Earth at the center of a celestial canvas surrounded by 10 distinct, colorful orbiting cards. Each card features a continuously animating domain icon (e.g. rotating Moon phase, solar sweep on ISS, pulsing sensor beam on GPS). Hovering any card halts the orbital revolution immediately. Clicking a card initiates an inspection view that zooms into that entity, revealing classified specifications, orbital telemetry, and an endless stream of fascinating curated facts.
- **Target Audience**: Astronomy enthusiasts, students, STEM educators, and curious explorers looking for a tactile, visual interface to discover Earth's orbital neighborhood.
- **Key Value**: Provides an intuitive, visual sense of scale and orbital presence while offering rich, accessible educational information with instant interactive feedback.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Orbital Observation**: On launch, the user sees planet Earth glowing at the center of the orbital plane with concentric orbital guideline rings. 10 colorful cards orbit uniformly in a 2D circular path.
2. **Hover Pause**: Moving the mouse over any card freezes the orbital rotation smoothly, highlights the card with a vibrant aura, and displays a quick glance telemetry chip. Moving the cursor away resumes the orbit seamlessly.
3. **Card Inspection**: Clicking any card smoothly halts orbit and transitions into a full-scale cinematic modal. The modal presents high-resolution telemetry (altitude, orbital speed, orbital period, inclination, mass/size), mission background, and a dedicated "Curiosity Transmissions" card with random facts and a shuffle button.
4. **Interactive Controls**: Users can adjust orbit speed (0.5x, 1x, 2x), pause/play orbital motion manually via a bottom control bar, toggle orbital trails, or filter cards by category (Natural Satellites, Space Observatories, Human Habitats, Earth Observation).

### Visual Identity & Theme
- **Color Palette (60-30-10 Rule)**:
  - **60% Primary Canvas**: Deep obsidian cosmos (`#07090e` to `#0d111c`) with subtle SVG starlight dust.
  - **30% Structural Surfaces**: Dark slate panels (`#111827`, `#1e293b`), crisp hairline borders (`#334155`), and semi-translucent backdrop blurs.
  - **10% Entity-Specific Vivid Accents**:
    - *The Moon*: Silvery Lunar glow (`#E2E8F0`, `#94A3B8`)
    - *ISS*: Solar Cyan (`#06B6D4`)
    - *James Webb*: Deep Infrared Gold (`#F59E0B`)
    - *Hubble Space Telescope*: Deep Ultramarine (`#3B82F6`)
    - *GPS Satellite*: Telemetry Emerald (`#10B981`)
    - *Tiangong Station*: Crimson Orange (`#F97316`)
    - *Landsat-9*: Biosphere Teal (`#14B8A6`)
    - *Artemis Orion*: Deep Rose (`#F43F5E`)
    - *GOES-18 Weather*: Atmospheric Indigo (`#6366F1`)
    - *Voyager Relay*: Cosmic Violet (`#8B5CF6`)
- **Typography**:
  - Primary UI & Titles: `Plus Jakarta Sans` / modern geometric sans.
  - Telemetry & Measurements: `font-mono tabular-nums` for precise alignment of velocities, kilometers, and timestamps.
- **Continuous Card Animations**:
  - Moon: Continuous gentle axial tilt and phase illumination sweep.
  - ISS: Rotating solar array panels and blinking comm beacon.
  - James Webb: Hexagonal primary mirror shimmer and sunshield micro-flutter.
  - Hubble: Aperture door glimmer and gyroscopic stability beam.
  - GPS: Concentric radio broadcast pulse expanding outwards.
  - Tiangong: Orbital robotic arm articulation and solar cycle pulse.
  - Landsat: Multispectral scanning line sweeping across Earth surface.
  - Artemis Orion: European Service Module thruster plume micro-glow.
  - GOES Weather: Atmospheric cyclone swirl icon rotation.
  - Voyager Relay: Deep space signal dish wave emitter.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Trigonometric Animation Loop (`requestAnimationFrame`) vs CSS Keyframe Orbit**
  - *Chosen Approach*: Driven by a React `useRef` animation loop updating an orbital angle state.
  - *Why*: CSS keyframe animations cannot be smoothly paused on individual card hover without abrupt angle jumps or desynchronization across cards. With an rAF loop, pausing holds the exact floating-point radians; resuming continues seamlessly.
  - *Alternatives Considered*: CSS `animation-play-state: paused` (prone to z-index fighting and transform collisions with Tailwind).
- **Decision 2: 2D Circular Geometry with Dynamic Viewport Responsiveness**
  - *Chosen Approach*: Orbit radius scales dynamically based on `Math.min(window.innerWidth, window.innerHeight)` (e.g. 260px on desktop, scaling down on smaller screens) so cards stay completely within viewport bounds without clipping.
  - *Why*: Ensures all 10 cards and the central Earth remain fully visible, clickable, and legible across standard resolutions.
- **Decision 3: Rich Pre-Computed Curiosity Engine with Random Generator**
  - *Chosen Approach*: Each entity carries 5–8 verified, fascinating real-world scientific facts that shuffle randomly when clicked or upon clicking "Discover Next Fact".
  - *Why*: Delivers instant, zero-latency interesting knowledge without external API failure risks or empty placeholders.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                          App.tsx (Main Stage)                          │
├────────────────────────────────┬───────────────────────────────────────┤
│ Top Bar Contract               │ Mission & Speed Toolbar               │
│ - Wordmark: "ORBITAL EARTH"    │ - Play / Pause Toggle                 │
│ - Active Track Count (10)      │ - Speed Selector (0.5x, 1x, 2x)       │
│ - Reset View button            │ - Category Filter (All/Crew/Science)  │
└────────────────────────────────┴───────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   OrbitalCanvas (Center Earth + Orbit)                 │
│                                                                        │
│                      [ Orbital Guideline Rings ]                       │
│                                   │                                    │
│        [ Card 10 ]          [ Card 1 ]          [ Card 2 ]             │
│              \                   │                   /                 │
│   [ Card 9 ] ──       ● Center: "EARTH"        ── [ Card 3 ]           │
│              /        (Atmosphere Glow)              \                 │
│        [ Card 8 ]          [ Card 6 ]           [ Card 4 ]             │
│                                   │                                    │
│                              [ Card 5 ]                                │
└────────────────────────────────────────────────────────────────────────┘
                                    │
                        (Card Click Event)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   CardCloseupModal (Cinematic Dialog)                  │
│ ┌─────────────────────────┬──────────────────────────────────────────┐ │
│ │ Entity Hero & Icon      │ Telemetry Matrix (Tabular figures)       │ │
│ │ - Color banner & badge  │ - Velocity, Altitude, Period, Operator   │ │
│ ├─────────────────────────┴──────────────────────────────────────────┤ │
│ │ Curiosity Fact Engine:                                             │ │
│ │ "Did you know? [Random generated interesting facts]"               │ │
│ │ [ Shuffle / Next Fact ] button                                     │ │
│ └────────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
```

### Component Breakdown
1. `src/types/orbit.ts`: Type definitions for `CelestialEntity`, `TelemetryData`, `OrbitConfig`.
2. `src/data/entities.ts`: Comprehensive dataset of 10 entities with vivid colors, continuous animation configurations, technical telemetry, and 60+ fascinating facts.
3. `src/components/EarthCenter.tsx`: Center Earth globe element with atmospheric glow, dynamic cloud rotation, and prominent "Earth" label.
4. `src/components/OrbitCard.tsx`: Individual orbital card with dynamic angular placement, colorful styling, animated icon component, hover detector, and click trigger.
5. `src/components/CardCloseupModal.tsx`: Modal displaying telemetry specs, launch history, animated icon hero, and the random curiosity fact generator.
6. `src/components/ControlsBar.tsx`: Speed scrubber, pause/resume button, and category filters.
