
import React from 'react';
import {
    View,
    Text,
    Pressable,
    StyleSheet,
} from 'react-native';
import {
    MapPin,
    Navigation,
    ChevronRight,
} from 'lucide-react-native';

import { colors } from '../../../theme/colors';
import { SafetyLocation } from '../types';

type Props = {
    shelter: SafetyLocation;
    distance?: string;
    selected?: boolean;
    onPress: () => void;
    onNavigate: () => void;
};

export function ShelterCard({
                                shelter,
                                distance,
                                selected,
                                onPress,
                                onNavigate,
                            }: Props) {
    return (
        <Pressable
            onPress={onPress}
            style={[
                styles.card,
                selected && styles.selected,
            ]}
        >
            <View style={styles.row}>
                <View style={styles.iconBox}>
                    <MapPin size={21} color={colors.primary} />
                </View>

                <View style={styles.content}>
                    <Text style={styles.title}>
                        {shelter.name}
                    </Text>

                    <Text style={styles.address} numberOfLines={1}>
                        {shelter.address}
                    </Text>

                    <Text style={styles.meta}>
                        {distance ?? 'Distance unavailable'}
                        {'  ·  '}
                        {shelter.type.toUpperCase()}
                    </Text>
                </View>

                <ChevronRight size={18} color={colors.muted} />
            </View>

            <View style={styles.footer}>
                <Text style={styles.unverified}>
                    Demonstration location · Unverified
                </Text>

                <Pressable
                    accessibilityRole="button"
                    onPress={onNavigate}
                    style={styles.routeButton}
                >
                    <Navigation size={14} color="#FFFFFF" />
                    <Text style={styles.routeText}>Directions</Text>
                </Pressable>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 20,
        padding: 14,
        marginBottom: 10,
    },
    selected: {
        borderColor: colors.primary,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    iconBox: {
        width: 44,
        height: 44,
        backgroundColor: colors.primaryLight,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flex: 1,
    },
    title: {
        color: colors.text,
        fontSize: 14,
        fontWeight: '700',
    },
    address: {
        color: colors.muted,
        fontSize: 12,
        marginTop: 4,
    },
    meta: {
        color: colors.text,
        fontSize: 11,
        fontWeight: '600',
        marginTop: 6,
    },
    footer: {
        marginTop: 14,
        paddingTop: 12,
        borderTopWidth: 1,
        borderColor: colors.border,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
    },
    unverified: {
        color: colors.muted,
        fontSize: 10,
        flex: 1,
    },
    routeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        paddingHorizontal: 12,
        paddingVertical: 9,
        backgroundColor: colors.primary,
        borderRadius: 11,
    },
    routeText: {
        color: '#FFFFFF',
        fontSize: 11,
        fontWeight: '700',
    },
});
