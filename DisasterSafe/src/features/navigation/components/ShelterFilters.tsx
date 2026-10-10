
import React from 'react';
import {
    ScrollView,
    Pressable,
    Text,
    StyleSheet,
    View,
} from 'react-native';

import { colors } from '../../../theme/colors';
import type { ShelterType } from '../../maps/types';

export type ShelterFilter = ShelterType | 'all';

type Props = {
    selected: ShelterFilter;
    onChange: (filter: ShelterFilter) => void;
    radiusKm: number;
    onRadiusChange: (radius: number) => void;
};

const filters: {
    label: string;
    value: ShelterFilter;
}[] = [
    { label: 'All', value: 'all' },
    { label: 'Shelters', value: 'shelter' },
    { label: 'Hospitals', value: 'hospital' },
    { label: 'Food & Water', value: 'food' },
];

export function ShelterFilters({
                                   selected,
                                   onChange,
                                   radiusKm,
                                   onRadiusChange,
                               }: Props) {
    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.row}
            >
                {filters.map((filter) => (
                    <Pressable
                        key={filter.value}
                        accessibilityRole="button"
                        onPress={() => onChange(filter.value)}
                        style={[
                            styles.chip,
                            selected === filter.value && styles.activeChip,
                        ]}
                    >
                        <Text
                            style={[
                                styles.label,
                                selected === filter.value &&
                                styles.activeLabel,
                            ]}
                        >
                            {filter.label}
                        </Text>
                    </Pressable>
                ))}
            </ScrollView>

            <View style={styles.radiusRow}>
                <Text style={styles.radiusLabel}>
                    Search radius
                </Text>

                <View style={styles.radiusOptions}>
                    {[5, 10, 20].map((radius) => (
                        <Pressable
                            key={radius}
                            accessibilityRole="button"
                            onPress={() => onRadiusChange(radius)}
                            style={[
                                styles.radiusChip,
                                radiusKm === radius &&
                                styles.activeRadius,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.radiusText,
                                    radiusKm === radius &&
                                    styles.activeRadiusText,
                                ]}
                            >
                                {radius} km
                            </Text>
                        </Pressable>
                    ))}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 13,
        marginBottom: 14,
    },
    row: {
        gap: 8,
    },
    chip: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 13,
        backgroundColor: colors.background,
    },
    activeChip: {
        backgroundColor: colors.primary,
    },
    label: {
        color: colors.text,
        fontSize: 12,
        fontWeight: '700',
    },
    activeLabel: {
        color: '#FFFFFF',
    },
    radiusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    radiusLabel: {
        color: colors.muted,
        fontSize: 11,
        fontWeight: '600',
    },
    radiusOptions: {
        flexDirection: 'row',
        gap: 5,
    },
    radiusChip: {
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 9,
        backgroundColor: colors.background,
    },
    activeRadius: {
        backgroundColor: colors.primaryLight,
    },
    radiusText: {
        color: colors.muted,
        fontSize: 11,
        fontWeight: '600',
    },
    activeRadiusText: {
        color: colors.primary,
    },
});
