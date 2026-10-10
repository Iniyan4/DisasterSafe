
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import {
    AlertTriangle,
    Clock3,
    ShieldAlert,
} from 'lucide-react-native';

import { colors } from '../../../theme/colors';
import { AlertDisplay } from '../alertService';

type Props = {
    alert: AlertDisplay;
};

const severityColors = {
    low: '#16A085',
    moderate: '#D39B27',
    high: '#E87722',
    critical: '#E74C3C',
};

export function DisasterAlertCard({
                                      alert,
                                  }: Props) {
    const accent = severityColors[alert.severity];

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <View
                    style={[
                        styles.iconBox,
                        { backgroundColor: `${accent}15` },
                    ]}
                >
                    {alert.severity === 'critical' ? (
                        <ShieldAlert size={21} color={accent} />
                    ) : (
                        <AlertTriangle size={21} color={accent} />
                    )}
                </View>

                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>
                        {alert.title}
                    </Text>
                    <Text style={styles.source}>
                        {alert.source}
                    </Text>
                </View>

                <View
                    style={[
                        styles.badge,
                        { backgroundColor: `${accent}15` },
                    ]}
                >
                    <Text
                        style={[
                            styles.badgeText,
                            { color: accent },
                        ]}
                    >
                        {alert.severity.toUpperCase()}
                    </Text>
                </View>
            </View>

            <Text style={styles.description}>
                {alert.description}
            </Text>

            <View style={styles.footer}>
                <Clock3 size={13} color={colors.muted} />
                <Text style={styles.date}>
                    {new Date(alert.issuedAt).toLocaleString()}
                </Text>

                {alert.expired && (
                    <Text style={styles.expired}>Expired</Text>
                )}

                {alert.isDemo && (
                    <Text style={styles.demo}>DEMO</Text>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.surface,
        borderRadius: 22,
        padding: 17,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: colors.border,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 11,
    },
    iconBox: {
        width: 44,
        height: 44,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 14,
        fontWeight: '800',
        color: colors.text,
    },
    source: {
        fontSize: 11,
        color: colors.muted,
        marginTop: 4,
    },
    badge: {
        borderRadius: 8,
        paddingHorizontal: 7,
        paddingVertical: 6,
    },
    badgeText: {
        fontSize: 9,
        fontWeight: '800',
    },
    description: {
        fontSize: 13,
        color: colors.muted,
        lineHeight: 20,
        marginTop: 15,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 16,
        flexWrap: 'wrap',
    },
    date: {
        color: colors.muted,
        fontSize: 11,
    },
    expired: {
        color: colors.danger,
        fontSize: 10,
        fontWeight: '800',
        marginLeft: 6,
    },
    demo: {
        color: '#A16207',
        fontSize: 10,
        fontWeight: '800',
        marginLeft: 6,
    },
});
