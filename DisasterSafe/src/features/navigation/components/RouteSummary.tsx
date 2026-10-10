
import React from 'react';
import {
    View,
    Text,
    Pressable,
    StyleSheet,
} from 'react-native';

import {
    Navigation,
    Clock3,
    AlertTriangle,
    X,
    WifiOff,
} from 'lucide-react-native';

import { colors } from '../../../theme/colors';
import type {
    RouteResult,
    RouteWarning,
} from '../types';

type Props = {
    result: RouteResult;
    warnings: RouteWarning[];
    onClose: () => void;
};

export function RouteSummary({
                                 result,
                                 warnings,
                                 onClose,
                             }: Props) {
    const { route, source, stale } = result;

    const km = (route.distanceMeters / 1000).toFixed(1);
    const minutes = Math.max(
        1,
        Math.round(route.durationSeconds / 60)
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.titleRow}>
                    <Navigation size={20} color={colors.primary} />
                    <Text style={styles.title}>Suggested route</Text>
                </View>

                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Close route"
                    onPress={onClose}
                >
                    <X size={21} color={colors.muted} />
                </Pressable>
            </View>

            <View style={styles.metrics}>
                <View>
                    <Text style={styles.metricValue}>{km} km</Text>
                    <Text style={styles.metricLabel}>Road distance</Text>
                </View>

                <View style={styles.divider} />

                <View>
                    <View style={styles.timeRow}>
                        <Clock3 size={17} color={colors.primary} />
                        <Text style={styles.metricValue}>
                            {minutes} min
                        </Text>
                    </View>
                    <Text style={styles.metricLabel}>
                        Estimated drive
                    </Text>
                </View>
            </View>

            {source === 'cache' && (
                <View style={styles.cachedBanner}>
                    <WifiOff size={16} color="#9A6700" />
                    <Text style={styles.cachedText}>
                        Cached route · {stale ? 'Outdated · ' : ''}
                        Not verified for current conditions
                    </Text>
                </View>
            )}

            {warnings.map((warning) => (
                <View
                    key={warning.hazardId}
                    style={styles.warning}
                >
                    <AlertTriangle
                        size={18}
                        color={colors.danger}
                    />

                    <View style={{ flex: 1 }}>
                        <Text style={styles.warningTitle}>
                            {warning.title}
                        </Text>
                        <Text style={styles.warningText}>
                            Mapped hazard near route
                            {' · '}
                            {warning.distanceMeters} m away
                            {!warning.verified
                                ? ' · Unverified simulation'
                                : ''}
                        </Text>
                    </View>
                </View>
            ))}

            <Text style={styles.disclaimer}>
                This is a road-network suggestion, not a
                verified evacuation route. Missing hazard
                reports do not mean the road is safe.
                Follow official evacuation instructions.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.surface,
        borderRadius: 22,
        padding: 18,
        borderWidth: 1,
        borderColor: colors.border,
        marginBottom: 12,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 9,
    },
    title: {
        fontSize: 16,
        fontWeight: '800',
        color: colors.text,
    },
    metrics: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 22,
        marginTop: 22,
        marginBottom: 18,
    },
    metricValue: {
        fontSize: 22,
        fontWeight: '800',
        color: colors.text,
    },
    metricLabel: {
        fontSize: 11,
        color: colors.muted,
        marginTop: 5,
    },
    divider: {
        height: 37,
        width: 1,
        backgroundColor: colors.border,
    },
    timeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 7,
    },
    cachedBanner: {
        backgroundColor: '#FFF4D8',
        borderRadius: 12,
        padding: 11,
        flexDirection: 'row',
        gap: 9,
        alignItems: 'center',
        marginBottom: 12,
    },
    cachedText: {
        color: '#9A6700',
        fontSize: 11,
        flex: 1,
    },
    warning: {
        backgroundColor: '#FFF0EF',
        borderRadius: 12,
        padding: 12,
        flexDirection: 'row',
        gap: 9,
        marginBottom: 10,
    },
    warningTitle: {
        color: colors.danger,
        fontSize: 12,
        fontWeight: '800',
    },
    warningText: {
        color: colors.muted,
        fontSize: 11,
        lineHeight: 17,
        marginTop: 4,
    },
    disclaimer: {
        color: colors.muted,
        fontSize: 11,
        lineHeight: 18,
    },
});
