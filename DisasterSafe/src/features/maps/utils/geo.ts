
import { Coordinates } from '../types';

const EARTH_RADIUS_KM = 6371;

export function distanceKm(
    start: Coordinates,
    end: Coordinates
): number {
    const toRad = (degrees: number) =>
        (degrees * Math.PI) / 180;

    const latDelta =
        toRad(end.latitude - start.latitude);

    const lonDelta =
        toRad(end.longitude - start.longitude);

    const a =
        Math.sin(latDelta / 2) ** 2 +
        Math.cos(toRad(start.latitude)) *
        Math.cos(toRad(end.latitude)) *
        Math.sin(lonDelta / 2) ** 2;

    const c =
        2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return EARTH_RADIUS_KM * c;
}

export function formatDistance(km: number): string {
    if (km < 1) {
        return `${Math.round(km * 1000)} m`;
    }

    return `${km.toFixed(1)} km`;
}
