
import type { Coordinates } from '../maps/types';
import type { RouteData, TravelMode } from './types';

const ROUTING_URL =
    process.env.EXPO_PUBLIC_ROUTING_URL ??
    'https://router.project-osrm.org';

type OSRMResponse = {
    code: string;
    routes?: Array<{
        distance: number;
        duration: number;
        geometry: {
            type: string;
            coordinates: [number, number][];
        };
    }>;
};

function validPoint(point: Coordinates) {
    return (
        Number.isFinite(point.latitude) &&
        Number.isFinite(point.longitude) &&
        Math.abs(point.latitude) <= 90 &&
        Math.abs(point.longitude) <= 180
    );
}

export async function fetchRoute(
    origin: Coordinates,
    destination: Coordinates,
    destinationId: string,
    mode: TravelMode = 'driving'
): Promise<RouteData> {
    if (!validPoint(origin) || !validPoint(destination)) {
        throw new Error('Invalid route coordinates');
    }

    if (!destinationId.trim()) {
        throw new Error('Destination ID is required');
    }

    // The public OSRM demo server only provides a
    // driving profile. Walking needs a separate service.
    if (mode !== 'driving') {
        throw new Error(
            'Walking routes require a walking-enabled routing service.'
        );
    }

    const points =
        `${origin.longitude},${origin.latitude};` +
        `${destination.longitude},${destination.latitude}`;

    const url =
        `${ROUTING_URL}/route/v1/driving/${points}` +
        '?overview=full&geometries=geojson&steps=false';

    const controller = new AbortController();
    const timeout = setTimeout(
        () => controller.abort(),
        12000
    );

    try {
        const response = await fetch(url, {
            signal: controller.signal,
        });

        if (!response.ok) {
            throw new Error(
                `Routing server error: ${response.status}`
            );
        }

        const data =
            (await response.json()) as OSRMResponse;

        const first = data.routes?.[0];

        if (
            data.code !== 'Ok' ||
            !first ||
            first.geometry?.type !== 'LineString' ||
            !Array.isArray(first.geometry.coordinates) ||
            first.geometry.coordinates.length < 2 ||
            !Number.isFinite(first.distance) ||
            !Number.isFinite(first.duration) ||
            !first.geometry.coordinates.every(
                (point) =>
                    Array.isArray(point) &&
                    point.length >= 2 &&
                    Number.isFinite(point[0]) &&
                    Number.isFinite(point[1])
            )
        ) {
            throw new Error('No valid route was returned');
        }

        return {
            id: `${destinationId}-${Date.now()}`,
            origin,
            destination,
            destinationId,
            mode,
            distanceMeters: first.distance,
            durationSeconds: first.duration,
            coordinates: first.geometry.coordinates,
            fetchedAt: new Date().toISOString(),
        };
    } finally {
        clearTimeout(timeout);
    }
}
