
import { SafetyLocation } from '../types';

// Demonstration coordinates near central Chennai.
// These are NOT verified emergency facilities.
export const demoShelters: SafetyLocation[] = [
    {
        id: 'demo-001',
        name: 'Demo Community Shelter',
        type: 'shelter',
        address: 'Central Chennai demonstration area',
        coordinates: {
            latitude: 13.086,
            longitude: 80.276,
        },
        description: 'Sample evacuation shelter marker.',
        verified: false,
    },
    {
        id: 'demo-002',
        name: 'Demo Medical Assistance',
        type: 'hospital',
        address: 'Central Chennai demonstration area',
        coordinates: {
            latitude: 13.073,
            longitude: 80.265,
        },
        description: 'Sample medical assistance marker.',
        verified: false,
    },
    {
        id: 'demo-003',
        name: 'Demo Food Distribution',
        type: 'food',
        address: 'Central Chennai demonstration area',
        coordinates: {
            latitude: 13.094,
            longitude: 80.263,
        },
        description: 'Sample food distribution marker.',
        verified: false,
    },
];
