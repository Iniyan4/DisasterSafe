
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import {
    CloudSun,
    Droplets,
    Wind,
    Thermometer,
    CloudRain,
} from 'lucide-react-native';

import { colors } from '../../../theme/colors';
import {
    WeatherData,
    WeatherRisk,
} from '../types';

type Props = {
    weather: WeatherData;
    risk: WeatherRisk;
    offline: boolean;
    stale: boolean;
};

const riskColors = {
    low: '#16A085',
    moderate: '#C58A16',
    high: '#E87722',
    critical: '#E74C3C',
};

export function WeatherCard({
                                weather,
                                risk,
                                offline,
                                stale,
                            }: Props) {
    const current = weather.current;
    const accent = riskColors[risk.level];

    return (
        <View style={styles.card}>
            <View style={styles.topRow}>
                <View>
                    <Text style={styles.eyebrow}>
                        CURRENT WEATHER
                    </Text>
                    <Text style={styles.temperature}>
                        {Math.round(current.temperature)}°
                    </Text>
                    <Text style={styles.feelsLike}>
                        Feels like {Math.round(current.feelsLike)}°C
                    </Text>
                </View>

                <View style={styles.weatherIcon}>
                    <CloudSun
                        size={46}
                        color={colors.primary}
                        strokeWidth={1.6}
                    />
                </View>
            </View>

            <View
                style={[
                    styles.riskBanner,
                    { borderLeftColor: accent },
                ]}
            >
                <View
                    style={[
                        styles.riskDot,
                        { backgroundColor: accent },
                    ]}
                />

                <View style={{ flex: 1 }}>
                    <Text style={styles.riskTitle}>
                        {risk.title}
                    </Text>
                    <Text style={styles.riskDescription}>
                        {risk.description}
                    </Text>
                </View>
            </View>

            <View style={styles.metrics}>
                <Metric
                    icon={<Droplets size={18} color={colors.primary} />}
                    label="Humidity"
                    value={`${current.humidity}%`}
                />

                <Metric
                    icon={<Wind size={18} color={colors.primary} />}
                    label="Wind"
                    value={`${Math.round(current.windSpeed)} km/h`}
                />

                <Metric
                    icon={<CloudRain size={18} color={colors.primary} />}
                    label="Rain"
                    value={`${current.precipitation} mm`}
                />

                <Metric
                    icon={
                        <Thermometer
                            size={18}
                            color={colors.primary}
                        />
                    }
                    label="Feels like"
                    value={`${Math.round(current.feelsLike)}°C`}
                />
            </View>

            <Text style={styles.footer}>
                {offline ? 'Cached forecast' : 'Live forecast'}
                {stale ? ' · May be outdated' : ''}
                {' · '}
                {new Date(weather.fetchedAt).toLocaleString()}
            </Text>
        </View>
    );
}

function Metric({
                    icon,
                    label,
                    value,
                }: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) {
    return (
        <View style={styles.metric}>
            {icon}
            <Text style={styles.metricLabel}>{label}</Text>
            <Text style={styles.metricValue}>{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.surface,
        borderRadius: 28,
        padding: 22,
        borderWidth: 1,
        borderColor: colors.border,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    eyebrow: {
        fontSize: 11,
        letterSpacing: 1.3,
        color: colors.muted,
        fontWeight: '700',
    },
    temperature: {
        fontSize: 72,
        fontWeight: '700',
        letterSpacing: -4,
        color: colors.text,
        marginTop: 8,
    },
    feelsLike: {
        fontSize: 13,
        color: colors.muted,
    },
    weatherIcon: {
        width: 76,
        height: 76,
        borderRadius: 24,
        backgroundColor: colors.primaryLight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    riskBanner: {
        marginTop: 24,
        padding: 14,
        borderRadius: 14,
        borderLeftWidth: 4,
        backgroundColor: colors.background,
        flexDirection: 'row',
        gap: 10,
    },
    riskDot: {
        width: 9,
        height: 9,
        borderRadius: 5,
        marginTop: 4,
    },
    riskTitle: {
        color: colors.text,
        fontSize: 14,
        fontWeight: '800',
    },
    riskDescription: {
        color: colors.muted,
        fontSize: 12,
        lineHeight: 18,
        marginTop: 5,
    },
    metrics: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 22,
        gap: 12,
    },
    metric: {
        width: '47%',
        backgroundColor: colors.background,
        borderRadius: 16,
        padding: 14,
        gap: 7,
    },
    metricLabel: {
        fontSize: 11,
        color: colors.muted,
    },
    metricValue: {
        fontSize: 16,
        fontWeight: '800',
        color: colors.text,
    },
    footer: {
        marginTop: 20,
        fontSize: 10,
        color: colors.muted,
        lineHeight: 16,
    },
});
