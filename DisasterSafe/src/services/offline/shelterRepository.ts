
import { getDatabase } from './database';
import { SafetyLocation } from '../../features/maps/types';

type ShelterRow = {
    id: string;
    name: string;
    type: SafetyLocation['type'];
    address: string;
    latitude: number;
    longitude: number;
    description: string;
    verified: number;
    updated_at: string | null;
};

export async function saveShelters(
    shelters: SafetyLocation[]
) {
    const db = await getDatabase();

    await db.withTransactionAsync(async () => {
        for (const shelter of shelters) {
            await db.runAsync(
                `INSERT INTO shelters (
          id, name, type, address,
          latitude, longitude, description,
          verified, updated_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
          name = excluded.name,
          type = excluded.type,
          address = excluded.address,
          latitude = excluded.latitude,
          longitude = excluded.longitude,
          description = excluded.description,
          verified = excluded.verified,
          updated_at = excluded.updated_at`,
                [
                    shelter.id,
                    shelter.name,
                    shelter.type,
                    shelter.address,
                    shelter.coordinates.latitude,
                    shelter.coordinates.longitude,
                    shelter.description,
                    shelter.verified ? 1 : 0,
                    shelter.updatedAt ?? null,
                ]
            );
        }
    });
}

export async function getCachedShelters():
    Promise<SafetyLocation[]> {
    const db = await getDatabase();

    const rows = await db.getAllAsync<ShelterRow>(
        'SELECT * FROM shelters'
    );

    return rows.map((row) => ({
        id: row.id,
        name: row.name,
        type: row.type,
        address: row.address,
        coordinates: {
            latitude: row.latitude,
            longitude: row.longitude,
        },
        description: row.description,
        verified: row.verified === 1,
        updatedAt: row.updated_at ?? undefined,
    }));
}
