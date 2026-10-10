
import type { Coordinates } from '../maps/types';
import type {
    Hazard,
    RouteResult,
    RouteWarning,
    TravelMode,
} from './types';

import { fetchRoute } from './routeService';
import {
    getCachedRoute,
    saveRoute,
} from './routeRepository';

import { analyzeRouteHazards } from './hazardAnalysis';

const ROUTE_FRESHNESS_MS = 30 * 60 * 1000;

export async function getNavigationRoute(
    origin: Coordinates,
    destination: Coordinates,
    destinationId: string,
    hazards: Hazard[],
    mode: TravelMode = 'driving'
): Promise<{
    result: RouteResult;
    warnings: RouteWarning[];
}> {
    let result: RouteResult;

    try {
        const route = await fetchRoute(
            origin,
            destination,
            destinationId,
            mode
        );

        try {
            await saveRoute(route);
        } catch (error) {
            console.warn('Route cache write failed', error);
        }

        result = {
            route,
            source: 'live',
            stale: false,
        };
    } catch (error) {
        const cached = await getCachedRoute(
            origin,
            destination,
            destinationId,
            mode
        );

        if (!cached) {
            throw new Error(
                'No route is available. Connect to the internet to calculate a route.'
            );
        }

        const age =
            Date.now() -
            Date.parse(cached.fetchedAt);

        result = {
            route: cached,
            source: 'cache',
            stale:
                !Number.isFinite(age) ||
                age > ROUTE_FRESHNESS_MS,
        };
    }

    const warnings = analyzeRouteHazards(
        result.route,
        hazards
    );

    return { result, warnings };
}
