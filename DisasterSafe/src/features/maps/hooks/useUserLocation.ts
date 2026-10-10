
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { Coordinates } from '../types';

export function useUserLocation() {
    const [location, setLocation] =
        useState<Coordinates | null>(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;
        let subscription: Location.LocationSubscription | null = null;

        async function startTracking() {
            try {
                const permission =
                    await Location.requestForegroundPermissionsAsync();

                if (permission.status !== 'granted') {
                    if (mounted) {
                        setError('Location permission was denied.');
                    }
                    return;
                }

                const lastKnown =
                    await Location.getLastKnownPositionAsync();

                if (lastKnown && mounted) {
                    setLocation({
                        latitude: lastKnown.coords.latitude,
                        longitude: lastKnown.coords.longitude,
                    });
                }

                subscription = await Location.watchPositionAsync(
                    {
                        accuracy: Location.Accuracy.High,
                        distanceInterval: 10,
                        timeInterval: 5000,
                    },
                    (position) => {
                        if (!mounted) return;

                        setLocation({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        });
                        setError(null);
                    }
                );

                if (!mounted) {
                    subscription.remove();
                }
            } catch {
                if (mounted) {
                    setError('Unable to access your location.');
                }
            } finally {
                if (mounted) setLoading(false);
            }
        }

        startTracking();

        return () => {
            mounted = false;
            subscription?.remove();
        };
    }, []);

    return { location, loading, error };
}
