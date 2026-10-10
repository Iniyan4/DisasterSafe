
import type { Coordinates } from '../maps/types';

export type TravelMode = 'driving' | 'walking';

export type HazardSeverity =
    | 'moderate'
    | 'high'
    | 'critical';

export type Hazard = {
    id: string;
    title: string;
    description: string;
    coordinates: Coordinates;
    severity: HazardSeverity;
    radiusMeters: number;
    verified: boolean;
    source: string;
    updatedAt: string;
};

export type RouteData = {
    id: string;
    origin: Coordinates;
    destination: Coordinates;
    destinationId: string;
    mode: TravelMode;
    distanceMeters: number;
    durationSeconds: number;
    coordinates: [number, number][];
    fetchedAt: string;
};

export type RouteResult = {
    route: RouteData;
    source: 'live' | 'cache';
    stale: boolean;
};

export type RouteWarning = {
    hazardId: string;
    title: string;
    severity: HazardSeverity;
    distanceMeters: number;
    verified: boolean;
};

export type NavigationState = {
    result: RouteResult | null;
    warnings: RouteWarning[];
    loading: boolean;
    error: string | null;
};
