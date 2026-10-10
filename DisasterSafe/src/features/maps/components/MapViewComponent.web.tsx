import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MapViewContainer(props: any) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Map preview is only available on mobile devices.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFill,
        backgroundColor: '#e5e7eb',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: { color: '#4b5563', fontSize: 14 },
});