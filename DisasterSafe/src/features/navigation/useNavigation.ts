
import { useCallback, useRef, useState } from 'react';
import type { Coordinates } from '../maps/types';
import type {
    Hazard,
    NavigationState,
    TravelMode,
} from './types';

import { getNavigationRoute } from './navigationService';

export function useNavigation() {
    const [state, setState] = useState<NavigationState>({
        result: null,
        warnings: [],
        loading: false,
        error: null,
    });

    const requestId = useRef(0);

    const calculateRoute = useCallback(
        async (
            origin: Coordinates,
            destination: Coordinates,
            destinationId: string,
            hazards: Hazard[],
            mode: TravelMode = 'driving'
        ) => {
            const currentId = ++requestId.current;

            setState({
                result: null,
                warnings: [],
                loading: true,
                error: null,
            });

            try {
                const navigation = await getNavigationRoute(
                    origin,
                    destination,
                    destinationId,
                    hazards,
                    mode
                );

                if (currentId !== requestId.current) return;

                setState({
                    result: navigation.result,
                    warnings: navigation.warnings,
                    loading: false,
                    error: null,
                });
            } catch (error) {
                if (currentId !== requestId.current) return;

                setState({
                    result: null,
                    warnings: [],
                    loading: false,
                    error:
                        error instanceof Error
                            ? error.message
                            : 'Unable to calculate route',
                });
            }
        },
        []
    );

    const clearRoute = useCallback(() => {
        requestId.current++;

        setState({
            result: null,
            warnings: [],
            loading: false,
            error: null,
        });
    }, []);

    return {
        ...state,
        calculateRoute,
        clearRoute,
    };
}
