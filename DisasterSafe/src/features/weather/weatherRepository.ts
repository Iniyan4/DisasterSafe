
import { getDatabase } from '../../services/offline/database';
import { WeatherData } from './types';

let tablePromise: Promise<void> | null = null;

async function ensureTable() {
    if (!tablePromise) {
        tablePromise = (async () => {
            const db = await getDatabase();

            await db.execAsync(`
        CREATE TABLE IF NOT EXISTS weather_cache (
          location_key TEXT PRIMARY KEY NOT NULL,
          payload TEXT NOT NULL,
          fetched_at TEXT NOT NULL
        );
      `);
        })().catch((error) => {
            tablePromise = null;
            throw error;
        });
    }

    return tablePromise;
}

// Approximate grid: about 1.1 km latitude spacing.
// This is a cache key, not a distance calculation.
function locationKey(
    latitude: number,
    longitude: number
) {
    return [
        latitude.toFixed(2),
        longitude.toFixed(2),
    ].join(':');
}

export async function saveWeather(
    weather: WeatherData
) {
    await ensureTable();

    const db = await getDatabase();

    await db.runAsync(
        `INSERT INTO weather_cache (
      location_key, payload, fetched_at
    ) VALUES (?, ?, ?)
    ON CONFLICT(location_key)
    DO UPDATE SET
      payload = excluded.payload,
      fetched_at = excluded.fetched_at`,
        [
            locationKey(
                weather.latitude,
                weather.longitude
            ),
            JSON.stringify(weather),
            weather.fetchedAt,
        ]
    );
}

export async function getCachedWeather(
    latitude: number,
    longitude: number
): Promise<WeatherData | null> {
    await ensureTable();

    const db = await getDatabase();

    const result = await db.getFirstAsync<{
        payload: string;
    }>(
        `SELECT payload
     FROM weather_cache
     WHERE location_key = ?`,
        [locationKey(latitude, longitude)]
    );

    if (!result) return null;

    try {
        return JSON.parse(result.payload) as WeatherData;
    } catch {
        return null;
    }
}
