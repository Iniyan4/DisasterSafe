
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    ScrollView,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
    MapPin,
    Bell,
    ShieldCheck,
    Navigation,
    CloudSun,
    ChevronRight,
    Siren,
} from 'lucide-react-native';

import { colors } from '../theme/colors';
import { BottomNav } from '../components/BottomNav';
import { ActionButton } from '../components/ActionButton';

export default function HomeScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.root} edges={['top']}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.brand}>disaster<Text style={styles.brandAccent}>safe.</Text></Text>
                    <Text style={styles.subtitle}>
                        Your safety companion
                    </Text>
                </View>

                <Pressable
                    style={styles.notificationButton}
                    onPress={() => router.push('/alerts')}
                >
                    <Bell size={21} color={colors.text} />
                </Pressable>
            </View>

            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.locationRow}>
                    <MapPin size={17} color={colors.primary} />
                    <Text style={styles.locationText}>
                        Location not yet connected
                    </Text>
                </View>

                <View style={styles.hero}>
                    <View style={styles.heroTop}>
                        <View style={styles.statusPill}>
                            <ShieldCheck size={15} color={colors.safe} />
                            <Text style={styles.statusText}>
                                Safety overview
                            </Text>
                        </View>
                        <CloudSun size={29} color={colors.primary} />
                    </View>

                    <Text style={styles.heroTitle}>
                        Stay prepared.{'\n'}Stay protected.
                    </Text>

                    <Text style={styles.heroDescription}>
                        Access emergency information, nearby
                        shelters and offline safety resources.
                    </Text>

                    <ActionButton
                        title="Explore safety map"
                        onPress={() => router.push('/map')}
                    />
                </View>

                <Text style={styles.sectionTitle}>
                    Your safety essentials
                </Text>

                <View style={styles.cardRow}>
                    <Pressable
                        style={styles.featureCard}
                        onPress={() => router.push('/map')}
                    >
                        <View style={styles.iconBubble}>
                            <Navigation size={23} color={colors.primary} />
                        </View>
                        <Text style={styles.featureTitle}>
                            Safe places
                        </Text>
                        <Text style={styles.featureSubtitle}>
                            Find nearby help
                        </Text>
                        <ChevronRight size={18} color={colors.muted} />
                    </Pressable>

                    <Pressable
                        style={styles.featureCard}
                        onPress={() => router.push('/alerts')}
                    >
                        <View style={styles.iconBubble}>
                            <Bell size={23} color={colors.primary} />
                        </View>
                        <Text style={styles.featureTitle}>
                            Live alerts
                        </Text>
                        <Text style={styles.featureSubtitle}>
                            Weather updates
                        </Text>
                        <ChevronRight size={18} color={colors.muted} />
                    </Pressable>
                </View>

                <View style={styles.sosCard}>
                    <View style={styles.sosIcon}>
                        <Siren size={25} color={colors.danger} />
                    </View>

                    <View style={styles.sosContent}>
                        <Text style={styles.sosTitle}>
                            Need emergency help?
                        </Text>
                        <Text style={styles.sosDescription}>
                            SOS messaging will be available
                            after emergency setup.
                        </Text>
                    </View>
                </View>

                <Pressable
                    style={styles.sosButton}
                    onPress={() =>
                        Alert.alert(
                            'SOS setup pending',
                            'Emergency messaging is not yet connected. In an immediate emergency, contact local emergency services.'
                        )
                    }
                >
                    <Siren size={20} color="#FFFFFF" />
                    <Text style={styles.sosButtonText}>
                        Emergency SOS
                    </Text>
                </Pressable>

                <Text style={styles.disclaimer}>
                    Preview interface — live location, weather
                    and rescue services are not yet connected.
                </Text>
            </ScrollView>

            <BottomNav />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        paddingHorizontal: 22,
        paddingTop: 12,
        paddingBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    brand: {
        fontSize: 25,
        fontWeight: '800',
        letterSpacing: -1,
        color: colors.text,
    },
    brandAccent: {
        color: colors.primary,
    },
    subtitle: {
        color: colors.muted,
        fontSize: 12,
        marginTop: 2,
    },
    notificationButton: {
        width: 44,
        height: 44,
        borderRadius: 15,
        backgroundColor: colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        paddingHorizontal: 20,
        paddingBottom: 28,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 7,
        marginVertical: 16,
    },
    locationText: {
        color: colors.muted,
        fontSize: 13,
    },
    hero: {
        backgroundColor: colors.surface,
        padding: 22,
        borderRadius: 28,
        borderWidth: 1,
        borderColor: colors.border,
    },
    heroTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    statusPill: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 7,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#EAF7F2',
    },
    statusText: {
        color: colors.safe,
        fontSize: 12,
        fontWeight: '700',
    },
    heroTitle: {
        color: colors.text,
        fontSize: 31,
        lineHeight: 37,
        letterSpacing: -1.2,
        fontWeight: '800',
    },
    heroDescription: {
        color: colors.muted,
        fontSize: 14,
        lineHeight: 21,
        marginTop: 12,
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: colors.text,
        marginTop: 29,
        marginBottom: 15,
    },
    cardRow: {
        flexDirection: 'row',
        gap: 12,
    },
    featureCard: {
        flex: 1,
        backgroundColor: colors.surface,
        borderRadius: 22,
        padding: 16,
        gap: 8,
        borderWidth: 1,
        borderColor: colors.border,
    },
    iconBubble: {
        width: 46,
        height: 46,
        borderRadius: 15,
        backgroundColor: colors.primaryLight,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 7,
    },
    featureTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: colors.text,
    },
    featureSubtitle: {
        fontSize: 12,
        color: colors.muted,
    },
    sosCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 13,
        marginTop: 25,
        marginBottom: 12,
    },
    sosIcon: {
        width: 52,
        height: 52,
        borderRadius: 17,
        backgroundColor: '#FDECEC',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sosContent: {
        flex: 1,
    },
    sosTitle: {
        color: colors.text,
        fontSize: 16,
        fontWeight: '800',
    },
    sosDescription: {
        color: colors.muted,
        fontSize: 12,
        lineHeight: 18,
        marginTop: 4,
    },
    sosButton: {
        backgroundColor: colors.danger,
        minHeight: 56,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 10,
    },
    sosButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '800',
    },
    disclaimer: {
        marginTop: 15,
        color: colors.muted,
        fontSize: 11,
        textAlign: 'center',
        lineHeight: 17,
    },
});
