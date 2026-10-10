
import {
    WeatherData,
    WeatherResult,
} from './types';

import {
    getCachedWeather,
    saveWeather,
} from './weatherRepository';

const BASE_URL =
    'https://api.open-meteo.com/v1/forecast';

const CACHE_MAX_AGE_MS = 30 * 60 * 1000;

type ApiResponse = {
    latitude: number;
    longitude: number;
    timezone: string;
    current: {
        temperature_2m: number;
        apparent_temperature: number;
        relative_humidity_2m: number;
        precipitation: number;
        wind_speed_10m: number;
        wind_gusts_10m: number;
        weather_code: number;
        is_day: number;
    };
    hourly: {
        time: string[];
        temperature_2m: number[];
        precipitation_probability: number[];
        wind_speed_10m: number[];
        weather_code: number[];
    };
};

function validateCoordinates(
    latitude: number,
    longitude: number
) {
    if (
        !Number.isFinite(latitude) ||
        !Number.isFinite(longitude) ||
        Math.abs(latitude) > 90 ||
        Math.abs(longitude) > 180
    ) {
        throw new Error('Invalid weather coordinates');
    }
}

function buildUrl(
    latitude: number,
    longitude: number
) {
    const params = new URLSearchParams({
        latitude: String(latitude),
        longitude: String(longitude),
        current: [
            'temperature_2m',
            'apparent_temperature',
            'relative_humidity_2m',
            'precipitation',
            'wind_speed_10m',
            'wind_gusts_10m',
            'weather_code',
            'is_day',
        ].join(','),
        hourly: [
            'temperature_2m',
            'precipitation_probability',
            'wind_speed_10m',
            'weather_code',
        ].join(','),
        forecast_hours: '12',
        timezone: 'auto',
        wind_speed_unit: 'kmh',
        temperature_unit: 'celsius',
    });

    return `${BASE_URL}?${params.toString()}`;
}

function parseWeather(api: ApiResponse): WeatherData {
    if (
        !api.current ||
        !api.hourly ||
        !Array.isArray(api.hourly.time) ||
        !Number.isFinite(api.current.temperature_2m)
    ) {
        throw new Error('Invalid weather API response');
    }

    const current = api.current;
    const hourly = api.hourly;

    return {
        latitude: api.latitude,
        longitude: api.longitude,
        timezone: api.timezone,
        fetchedAt: new Date().toISOString(),

        current: {
            temperature: current.temperature_2m,
            feelsLike: current.apparent_temperature,
            humidity: current.relative_humidity_2m,
            precipitation: current.precipitation,
            windSpeed: current.wind_speed_10m,
            windGust: current.wind_gusts_10m,
            weatherCode: current.weather_code,
            isDay: current.is_day === 1,
        },

        hourly: hourly.time.map((time, index) => ({
            time,
            temperature: hourly.temperature_2m[index],
            precipitationProbability:
                hourly.precipitation_probability[index],
            windSpeed: hourly.wind_speed_10m[index],
            weatherCode: hourly.weather_code[index],
        })),
    };
}

export async function fetchLiveWeather(
    latitude: number,
    longitude: number
): Promise<WeatherData> {
    validateCoordinates(latitude, longitude);

    const controller = new AbortController();
    const timeout = setTimeout(
        () => controller.abort(),
        12000
    );

    try {
        const response = await fetch(
            buildUrl(latitude, longitude),
            { signal: controller.signal }
        );

        if (!response.ok) {
            throw new Error(
                `Weather API returned ${response.status}`
            );
        }

        const json =
            (await response.json()) as ApiResponse;

        return parseWeather(json);
    } finally {
        clearTimeout(timeout);
    }
}

export async function loadWeather(
    latitude: number,
    longitude: number
): Promise<WeatherResult> {
    validateCoordinates(latitude, longitude);

    try {
        const live = await fetchLiveWeather(
            latitude,
            longitude
        );

        await saveWeather(live).catch((error) => {
            console.warn('Weather cache write failed', error);
        });

        return {
            data: live,
            source: 'live',
            isStale: false,
        };
    } catch (networkError) {
        const cached = await getCachedWeather(
            latitude,
            longitude
        );

        if (!cached) {
            throw new Error(
                'Weather unavailable. Connect to the internet to download your first forecast.'
            );
        }

        const age =
            Date.now() -
            new Date(cached.fetchedAt).getTime();

        return {
            data: cached,
            source: 'cache',
            isStale:
                !Number.isFinite(age) ||
                age > CACHE_MAX_AGE_MS,
        };
    }
}
