import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Map, Camera, ViewAnnotation } from '@maplibre/maplibre-react-native';
import { MapMarker } from './MapMarker';

const MAP_STYLE = 'https://demotiles.maplibre.org/style.json';

interface Props {
    cameraRef: any;
    location: { latitude: number; longitude: number } | null;
    visibleShelters: any[];
    selectedId: string | null;
    onSelectShelter: (id: string) => void;
}

export default function MapViewContainer({
                                             cameraRef,
                                             location,
                                             visibleShelters,
                                             selectedId,
                                             onSelectShelter,
                                         }: Props) {
    return (
        <Map
            style={StyleSheet.absoluteFill}
            mapStyle={MAP_STYLE}
            compass={false}
            attribution
        >
            <Camera
                ref={cameraRef}
                initialViewState={{
                    center: [80.2707, 13.0827],
                    zoom: 12,
                }}
            />

            {location && (
                <ViewAnnotation
                    id="user-location"
                    lngLat={[location.longitude, location.latitude]}
                >
                    <View style={styles.userLocationOuter}>
                        <View style={styles.userLocationInner} />
                    </View>
                </ViewAnnotation>
            )}

            {visibleShelters.map((shelter) => (
                <ViewAnnotation
                    key={shelter.id}
                    id={shelter.id}
                    lngLat={[
                        shelter.coordinates.longitude,
                        shelter.coordinates.latitude,
                    ]}
                >
                    <MapMarker
                        type={shelter.type}
                        selected={selectedId === shelter.id}
                        onPress={() => onSelectShelter(shelter.id)}
                    />
                </ViewAnnotation>
            ))}
        </Map>
    );
}

const styles = StyleSheet.create({
    userLocationOuter: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'rgba(37,99,235,0.18)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    userLocationInner: {
        width: 15,
        height: 15,
        borderRadius: 8,
        backgroundColor: '#2563EB',
        borderWidth: 3,
        borderColor: '#FFFFFF',
    },
});