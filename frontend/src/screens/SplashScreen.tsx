import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function SplashScreen({ onDone }: { onDone: () => void }) {
    const logoScale = useRef(new Animated.Value(0.4)).current;
    const logoOpacity = useRef(new Animated.Value(0)).current;
    const textOpacity = useRef(new Animated.Value(0)).current;
    const taglineOpacity = useRef(new Animated.Value(0)).current;
    const circleScale = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.parallel([
                Animated.spring(logoScale, { toValue: 1, tension: 60, friction: 7, useNativeDriver: true }),
                Animated.timing(logoOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
                Animated.spring(circleScale, { toValue: 1, tension: 40, friction: 8, useNativeDriver: true }),
            ]),
            Animated.timing(textOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
            Animated.timing(taglineOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
            Animated.delay(1000),
        ]).start(() => onDone());
    }, []);

    return (
        <LinearGradient colors={['#005C2B', '#00A651', '#34C759']} style={styles.container}>
            {/* Decorative circles */}
            <Animated.View style={[styles.bigCircle, { transform: [{ scale: circleScale }] }]} />
            <Animated.View style={[styles.smallCircle, { transform: [{ scale: circleScale }] }]} />

            {/* Logo */}
            <Animated.View style={[styles.logoWrap, { opacity: logoOpacity, transform: [{ scale: logoScale }] }]}>
                <View style={styles.logoRing}>
                    <MaterialCommunityIcons name="hand-heart" size={64} color="#fff" />
                </View>
            </Animated.View>

            {/* Brand name */}
            <Animated.Text style={[styles.brandAr, { opacity: textOpacity }]}>عطاء</Animated.Text>
            <Animated.Text style={[styles.brandEn, { opacity: textOpacity }]}>Ata'a Charity</Animated.Text>

            {/* Tagline */}
            <Animated.Text style={[styles.tagline, { opacity: taglineOpacity }]}>
                اجعل لعطائك أثراً يبقى
            </Animated.Text>

            {/* Bottom decorator */}
            <View style={styles.bottomBar}>
                <View style={styles.bottomDot} />
                <View style={[styles.bottomDot, styles.bottomDotWide]} />
                <View style={styles.bottomDot} />
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    bigCircle: { position: 'absolute', top: -100, right: -100, width: 350, height: 350, borderRadius: 175, backgroundColor: 'rgba(255,255,255,0.07)' },
    smallCircle: { position: 'absolute', bottom: -60, left: -60, width: 240, height: 240, borderRadius: 120, backgroundColor: 'rgba(255,255,255,0.07)' },
    logoWrap: { marginBottom: 28 },
    logoRing: { width: 120, height: 120, borderRadius: 60, backgroundColor: 'rgba(255,255,255,0.2)', borderWidth: 3, borderColor: 'rgba(255,255,255,0.5)', justifyContent: 'center', alignItems: 'center' },
    brandAr: { fontSize: 56, fontWeight: '900', color: '#fff', letterSpacing: 2, marginBottom: 4 },
    brandEn: { fontSize: 14, color: '#C1F0D4', letterSpacing: 5, textTransform: 'uppercase', marginBottom: 24 },
    tagline: { fontSize: 17, color: 'rgba(255,255,255,0.85)', fontWeight: '600' },
    bottomBar: { position: 'absolute', bottom: 60, flexDirection: 'row', gap: 8 },
    bottomDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.4)' },
    bottomDotWide: { width: 24, backgroundColor: '#fff' },
});
