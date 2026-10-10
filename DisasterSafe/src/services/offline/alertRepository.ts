
import { getDatabase } from './database';

export type DisasterAlert = {
    id: string;
    title: string;
    description: string;
    severity: 'low' | 'moderate' | 'high' | 'critical';
    source: string;
    issuedAt: string;
    expiresAt?: string;
};

export async function saveAlerts(
    alerts: DisasterAlert[]
) {
    const db = await getDatabase();

    await db.withTransactionAsync(async () => {
        for (const alert of alerts) {
            await db.runAsync(
                `INSERT INTO alerts (
          id, title, description, severity,
          source, issued_at, expires_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
          title = excluded.title,
          description = excluded.description,
          severity = excluded.severity,
          source = excluded.source,
          issued_at = excluded.issued_at,
          expires_at = excluded.expires_at`,
                [
                    alert.id,
                    alert.title,
                    alert.description,
                    alert.severity,
                    alert.source,
                    alert.issuedAt,
                    alert.expiresAt ?? null,
                ]
            );
        }
    });
}

export async function getCachedAlerts() {
    const db = await getDatabase();

    const rows = await db.getAllAsync<{
        id: string;
        title: string;
        description: string;
        severity: DisasterAlert['severity'];
        source: string;
        issued_at: string;
        expires_at: string | null;
    }>(
        `SELECT * FROM alerts
     ORDER BY issued_at DESC`
    );

    return rows.map((row): DisasterAlert => ({
        id: row.id,
        title: row.title,
        description: row.description,
        severity: row.severity,
        source: row.source,
        issuedAt: row.issued_at,
        expiresAt: row.expires_at ?? undefined,
    }));
}
