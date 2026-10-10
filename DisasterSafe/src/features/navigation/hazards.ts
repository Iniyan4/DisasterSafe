
import type { Hazard } from './types';

export const demoHazards: Hazard[] = [
    {
        id: 'hazard-demo-001',
        title: 'Demo flooded road',
        description:
            'Simulated flooding for route-warning testing.',
        coordinates: {
            latitude: 13.0805,
            longitude: 80.273,
        },
        severity: 'critical',
        radiusMeters: 250,
        verified: false,
        source: 'DisasterSafe simulation',
        updatedAt: '2026-10-10T08:00:00Z',
    },
    {
        id: 'hazard-demo-002',
        title: 'Demo blocked road',
        description:
            'Simulated road obstruction. Not a live report.',
        coordinates: {
            latitude: 13.088,
            longitude: 80.268,
        },
        severity: 'high',
        radiusMeters: 150,
        verified: false,
        source: 'DisasterSafe simulation',
        updatedAt: '2026-10-10T08:00:00Z',
    },
];

export function getDemoHazards() {
    return demoHazards;
}
