export type EntityCategory =
  | 'All'
  | 'Natural Satellite'
  | 'Space Station'
  | 'Observatory'
  | 'Earth & Navigation'
  | 'Deep Space & Exploration';

export interface TelemetryData {
  altitude: string;
  orbitalVelocity: string;
  orbitalPeriod: string;
  inclination: string;
  operator: string;
  launchYear: string;
  status: string;
  massOrDiameter: string;
}

export interface CelestialEntity {
  id: string;
  name: string;
  category: EntityCategory;
  iconType:
    | 'moon'
    | 'iss'
    | 'jwst'
    | 'hubble'
    | 'gps'
    | 'tiangong'
    | 'landsat'
    | 'artemis'
    | 'goes'
    | 'voyager';
  accentColor: string;
  accentBg: string;
  borderStyle: string;
  glowColor: string;
  shortTag: string;
  subtitle: string;
  summary: string;
  telemetry: TelemetryData;
  detailedOverview: string;
  facts: string[];
  scientificSignificance: string;
}

export interface OrbitState {
  currentAngle: number;
  isPaused: boolean;
  speedMultiplier: number;
  hoveredEntityId: string | null;
  selectedEntity: CelestialEntity | null;
}
