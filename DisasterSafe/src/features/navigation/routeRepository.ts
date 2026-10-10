
import { getDatabase } from '../../services/offline/database';
import type { Coordinates } from '../maps/types';
import type { RouteData, TravelMode } from './types';

let initPromise: Promise<void> | null = null;

async function ensureRouteTable() {
    if (!initPromise) {
        initPromise = (async () => {
            const db = await getDatabase();

            await db.execAsync(`
        CREATE TABLE IF NOT EXISTS route_cache (
          cache_key TEXT PRIMARY KEY NOT NULL,
          payload TEXT NOT NULL,
          fetched_at TEXT NOT NULL
        );
      `);
        })().catch((error) => {
            initPromise = null;
            throw error;
        });
    }

    return initPromise;
}

// Quantize to about 11 metres in latitude.
// Cached routes are still validated against the
// requested origin and destination.
function coordinateKey(point: Coordinates) {
    return [
        point.latitude.toFixed(4),
        point.longitude.toFixed(4),
    ].join(',');
}

function cacheKey(
    origin: Coordinates,
    destination: Coordinates,
    destinationId: string,
    mode: TravelMode
) {
    return [
        mode,
        destinationId,
        coordinateKey(origin),
        coordinateKey(destination),
    ].join('|');
}

export async function saveRoute(route: RouteData) {
    await ensureRouteTable();

    const db = await getDatabase();

    await db.runAsync(
        `INSERT INTO route_cache (
      cache_key, payload, fetched_at
    ) VALUES (?, ?, ?)
    ON CONFLICT(cache_key) DO UPDATE SET
      payload = excluded.payload,
      fetched_at = excluded.fetched_at`,
        [
            cacheKey(
                route.origin,
                route.destination,
                route.destinationId,
                route.mode
            ),
            JSON.stringify(route),
            route.fetchedAt,
        ]
    );
}

export async function getCachedRoute(
    origin: Coordinates,
    destination: Coordinates,
    destinationId: string,
    mode: TravelMode
): Promise<RouteData | null> {
    await ensureRouteTable();

    const db = await getDatabase();

    const record = await db.getFirstAsync<{
        payload: string;
    }>(
        `SELECT payload FROM route_cache
     WHERE cache_key = ?`,
        [
            cacheKey(
                origin,
                destination,
                destinationId,
                mode
            ),
        ]
    );

    if (!record) return null;

    try {
        const route = JSON.parse(record.payload) as RouteData;

        if (
            route.destinationId !== destinationId ||
            route.mode !== mode ||
            !Array.isArray(route.coordinates) ||
            route.coordinates.length < 2
        ) {
            return null;
        }

        return route;
    } catch {
        return null;
    }
}
