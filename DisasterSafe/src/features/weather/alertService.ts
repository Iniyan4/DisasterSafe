
import {
    DisasterAlert,
    getCachedAlerts,
} from '../../services/offline/alertRepository';

export type AlertDisplay = DisasterAlert & {
    expired: boolean;
    isDemo: boolean;
};

export async function loadDisasterAlerts():
    Promise<AlertDisplay[]> {
    const alerts = await getCachedAlerts();
    const now = Date.now();

    return alerts.map((alert) => {
        const expires = alert.expiresAt
            ? Date.parse(alert.expiresAt)
            : null;

        return {
            ...alert,
            expired:
                expires !== null &&
                (Number.isNaN(expires) || expires <= now),
            isDemo:
                alert.source.toLowerCase().includes('demo'),
        };
    });
}

export function severityLabel(
    severity: DisasterAlert['severity']
): string {
    switch (severity) {
        case 'critical':
            return 'Critical';
        case 'high':
            return 'High';
        case 'moderate':
            return 'Moderate';
        default:
            return 'Low';
    }
}
