
import type { Hazard, RouteData, RouteWarning } from './types';

const EARTH_RADIUS = 6371000;

function toRadians(degrees: number) {
    return (degrees * Math.PI) / 180;
}

function toXY(
    longitude: number,
    latitude: number,
    originLat: number,
    originLon: number
) {
    return {
        x:
            EARTH_RADIUS *
            toRadians(longitude - originLon) *
            Math.cos(toRadians(originLat)),
        y:
            EARTH_RADIUS *
            toRadians(latitude - originLat),
    };
}

function segmentDistance(
    point: { x: number; y: number },
    a: { x: number; y: number },
    b: { x: number; y: number }
) {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const lengthSquared = dx * dx + dy * dy;

    if (lengthSquared === 0) {
        return Math.hypot(point.x - a.x, point.y - a.y);
    }

    const t = Math.max(
        0,
        Math.min(
            1,
            ((point.x - a.x) * dx +
                (point.y - a.y) * dy) /
            lengthSquared
        )
    );

    return Math.hypot(
        point.x - (a.x + t * dx),
        point.y - (a.y + t * dy)
    );
}

export function analyzeRouteHazards(
    route: RouteData,
    hazards: Hazard[]
): RouteWarning[] {
    const warnings: RouteWarning[] = [];

    for (const hazard of hazards) {
        const referenceLat = hazard.coordinates.latitude;
        const referenceLon = hazard.coordinates.longitude;

        const hazardPoint = { x: 0, y: 0 };
        let minimumDistance = Infinity;

        for (let i = 0; i < route.coordinates.length - 1; i++) {
            const [lonA, latA] = route.coordinates[i];
            const [lonB, latB] = route.coordinates[i + 1];

            const a = toXY(
                lonA,
                latA,
                referenceLat,
                referenceLon
            );

            const b = toXY(
                lonB,
                latB,
                referenceLat,
                referenceLon
            );

            minimumDistance = Math.min(
                minimumDistance,
                segmentDistance(hazardPoint, a, b)
            );
        }

        if (minimumDistance <= hazard.radiusMeters) {
            warnings.push({
                hazardId: hazard.id,
                title: hazard.title,
                severity: hazard.severity,
                distanceMeters: Math.round(minimumDistance),
                verified: hazard.verified,
            });
        }
    }

    const severityOrder = {
        critical: 3,
        high: 2,
        moderate: 1,
    };

    return warnings.sort(
        (a, b) =>
            severityOrder[b.severity] -
            severityOrder[a.severity]
    );
}
