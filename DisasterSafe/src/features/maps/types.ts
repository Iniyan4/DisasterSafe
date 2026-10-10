
export type Coordinates = {
    latitude: number;
    longitude: number;
};

export type ShelterType =
    | 'shelter'
    | 'hospital'
    | 'food';

export type SafetyLocation = {
    id: string;
    name: string;
    type: ShelterType;
    address: string;
    coordinates: Coordinates;
    description: string;
    verified: boolean;
    updatedAt?: string;
};
