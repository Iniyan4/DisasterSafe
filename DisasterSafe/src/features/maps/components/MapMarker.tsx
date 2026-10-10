
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import {
    House,
    Cross,
    Utensils,
} from 'lucide-react-native';

import { ShelterType } from '../types';

type Props = {
    type: ShelterType;
    selected?: boolean;
    onPress: () => void;
};

const markerColors = {
    shelter: '#16A085',
    hospital: '#E74C3C',
    food: '#F97345',
};

const markerIcons = {
    shelter: House,
    hospital: Cross,
    food: Utensils,
};

export function MapMarker({
                              type,
                              selected = false,
                              onPress,
                          }: Props) {
    const Icon = markerIcons[type];

    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={`${type} map marker`}
            onPress={onPress}
            style={[
                styles.marker,
                { backgroundColor: markerColors[type] },
                selected && styles.selected,
            ]}
        >
            <Icon size={20} color="#FFFFFF" strokeWidth={2.5} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    marker: {
        width: 44,
        height: 44,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#FFFFFF',
        elevation: 4,
    },
    selected: {
        width: 50,
        height: 50,
        borderRadius: 18,
        borderColor: '#172B36',
    },
});
