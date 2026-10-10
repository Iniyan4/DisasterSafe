
import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { colors } from '../theme/colors';
import {
    initializeOfflineData,
} from '../services/offline/syncService';

export default function RootLayout() {
    useEffect(() => {
        initializeOfflineData().catch((error) => {
            console.error(
                'Offline database initialization failed:',
                error
            );
        });
    }, []);

    return (
        <>
            <StatusBar style="dark" />
            <Stack
                screenOptions={{
                    headerShown: false,
                    contentStyle: {
                        backgroundColor: colors.background,
                    },
                }}
            />
        </>
    );
}
