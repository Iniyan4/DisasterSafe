
import { useCallback, useEffect, useState } from 'react';
import * as Location from 'expo-location';

import {
    WeatherResult,
    WeatherRisk,
} from './types';
import { loadWeather } from './weatherService';
import { classifyWeatherRisk } from './riskClassifier';

type WeatherState = {
    result: WeatherResult | null;
    risk: WeatherRisk | null;
    loading: boolean;
    refreshing: boolean;
    error: string | null;
    refresh: () => Promise<void>;
};

export function useWeather(): WeatherState {
    const [result, setResult] =
        useState<WeatherResult | null>(null);

    const [risk, setRisk] =
        useState<WeatherRisk | null>(null);

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] =
        useState<string | null>(null);

    const refresh = useCallback(async () => {
        setRefreshing(true);
        setError(null);

        try {
            const permission =
                await Location.requestForegroundPermissionsAsync();

            if (permission.status !== 'granted') {
                throw new Error(
                    'Location permission is required to load local weather.'
                );
            }

            let position =
                await Location.getLastKnownPositionAsync({
                    maxAge: 10 * 60 * 1000,
                });

            if (!position) {
                position =
                    await Location.getCurrentPositionAsync({
                        accuracy: Location.Accuracy.Balanced,
                    });
            }

            const weather = await loadWeather(
                position.coords.latitude,
                position.coords.longitude
            );

            setResult(weather);
            setRisk(
                classifyWeatherRisk(weather.data.current)
            );
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Unable to load weather information.'
            );
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        refresh();
    }, [refresh]);

    return {
        result,
        risk,
        loading,
        refreshing,
        error,
        refresh,
    };
}
