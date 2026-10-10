
import { getDatabase } from './database';
import {
    getCachedShelters,
    saveShelters,
} from './shelterRepository';
import {
    getCachedAlerts,
    saveAlerts,
    DisasterAlert,
} from './alertRepository';
import { demoShelters } from '../../features/maps/data/demoShelters';

const demoAlerts: DisasterAlert[] = [
    {
        id: 'demo-alert-001',
        title: 'Cyclone preparedness demonstration',
        description:
            'Sample alert: Stay informed through official weather advisories.',
        severity: 'moderate',
        source: 'DisasterSafe Demo — NOT OFFICIAL',
        issuedAt: '2026-10-09T10:00:00Z',
    },
];

export async function initializeOfflineData() {
    const shelters = await getCachedShelters();

    if (shelters.length === 0) {
        await saveShelters(demoShelters);
    }

    const alerts = await getCachedAlerts();

    if (alerts.length === 0) {
        await saveAlerts(demoAlerts);
    }
}

export async function saveSyncTime(
    key: string,
    timestamp = new Date().toISOString()
) {
    const db = await getDatabase();

    await db.runAsync(
        `INSERT INTO sync_metadata (key, value)
     VALUES (?, ?)
     ON CONFLICT(key)
     DO UPDATE SET value = excluded.value`,
        [key, timestamp]
    );
}

export async function getSyncTime(
    key: string
): Promise<string | null> {
    const db = await getDatabase();

    const result = await db.getFirstAsync<{
        value: string;
    }>(
        'SELECT value FROM sync_metadata WHERE key = ?',
        [key]
    );

    return result?.value ?? null;
}
