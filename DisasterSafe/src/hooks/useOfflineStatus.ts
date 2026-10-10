
import { useEffect, useState } from 'react';
import {
    isInternetAvailable,
    subscribeToNetwork,
} from '../services/offline/network';

export function useOfflineStatus() {
    const [isOnline, setIsOnline] = useState(false);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        let mounted = true;

        isInternetAvailable()
            .then((online) => {
                if (mounted) setIsOnline(online);
            })
            .catch(() => {
                if (mounted) setIsOnline(false);
            })
            .finally(() => {
                if (mounted) setChecking(false);
            });

        const unsubscribe = subscribeToNetwork(
            (online) => {
                if (!mounted) return;
                setIsOnline(online);
                setChecking(false);
            }
        );

        return () => {
            mounted = false;
            unsubscribe();
        };
    }, []);

    return { isOnline, checking };
}
