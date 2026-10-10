
import { getDatabase } from './database';

export type QueuedSOS = {
    id: string;
    latitude: number;
    longitude: number;
    message: string;
    createdAt: string;
    status: 'pending' | 'sending' | 'sent';
    attempts: number;
};

export async function queueSOS(
    request: Omit<
        QueuedSOS,
        'status' | 'attempts'
    >
) {
    if (
        !request.id ||
        !Number.isFinite(request.latitude) ||
        !Number.isFinite(request.longitude) ||
        Math.abs(request.latitude) > 90 ||
        Math.abs(request.longitude) > 180 ||
        !request.message.trim()
    ) {
        throw new Error('Invalid SOS request');
    }

    const db = await getDatabase();

    await db.runAsync(
        `INSERT OR IGNORE INTO sos_queue (
      id, latitude, longitude, message,
      created_at, status, attempts
    ) VALUES (?, ?, ?, ?, ?, 'pending', 0)`,
        [
            request.id,
            request.latitude,
            request.longitude,
            request.message.trim(),
            request.createdAt,
        ]
    );
}

export async function getPendingSOS() {
    const db = await getDatabase();

    return db.getAllAsync<{
        id: string;
        latitude: number;
        longitude: number;
        message: string;
        created_at: string;
        status: string;
        attempts: number;
    }>(
        `SELECT * FROM sos_queue
     WHERE status IN ('pending', 'sending')
     ORDER BY created_at ASC`
    );
}

export async function markSOSSent(id: string) {
    const db = await getDatabase();

    await db.runAsync(
        `UPDATE sos_queue
     SET status = 'sent'
     WHERE id = ?`,
        [id]
    );
}

export async function markSOSRetry(id: string) {
    const db = await getDatabase();

    await db.runAsync(
        `UPDATE sos_queue
     SET status = 'pending',
         attempts = attempts + 1
     WHERE id = ?`,
        [id]
    );
}
