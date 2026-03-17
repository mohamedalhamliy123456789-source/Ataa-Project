import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const SLIDES = [
    {
        id: '1',
        title: 'عطاء بلا حدود',
        description: 'نصل بتبرعاتكم إلى مستحقيها في كل مكان حول العالم وبكل شفافية وأمان.',
        image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop',
        icon: 'heart'
    },
    {
        id: '2',
        title: 'كفالة الأيتام',
        description: 'ساهم في رسم البسمة على وجوه الأطفال وتأمين مستقبلهم التعليمي والصحي.',
        image: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=800&auto=format&fit=crop',
        icon: 'people'
    },
    {
        id: '3',
        title: 'مشاريع تنموية',
        description: 'ندعم الاستقرار من خلال بناء المساجد، حفر الآبار، وإنشاء المدارس والمراكز الصحية.',
        image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800&auto=format&fit=crop',
        icon: 'business'
    }
];

export default function OnboardingScreen({ navigation }: any) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        if (currentIndex < SLIDES.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            navigation.replace('Login');
        }
    };

    const currentSlide = SLIDES[currentIndex];

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            
            <Image source={{ uri: currentSlide.image }} style={styles.bgImage} resizeMode="cover" />
            <LinearGradient 
                colors={['transparent', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,1)']} 
                style={styles.gradient} 
            />

            <View style={styles.content}>
                <View style={styles.iconCircle}>
                    <Ionicons name={currentSlide.icon as any} size={40} color="#00A651" />
                </View>
                
                <Text style={styles.title}>{currentSlide.title}</Text>
                <Text style={styles.description}>{currentSlide.description}</Text>

                {/* Pagination Dots */}
                <View style={styles.dotRow}>
                    {SLIDES.map((_, i) => (
                        <View 
                            key={i} 
                            style={[styles.dot, currentIndex === i && styles.dotActive]} 
                        />
                    ))}
                </View>

                <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
                    <LinearGradient 
                        colors={['#00A651', '#007A3D']} 
                        style={styles.nextGradient}
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    >
                        <Text style={styles.nextText}>
                            {currentIndex === SLIDES.length - 1 ? 'ابدأ الآن' : 'التالي'}
                        </Text>
                        <Ionicons 
                            name={currentIndex === SLIDES.length - 1 ? 'rocket-outline' : 'chevron-back'} 
                            size={20} 
                            color="#fff" 
                            style={{ marginRight: 10 }}
                        />
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity style={styles.skipBtn} onPress={() => navigation.replace('Login')}>
                    <Text style={styles.skipText}>تخطي</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },
    bgImage: { width: width, height: height * 0.7, position: 'absolute', top: 0 },
    gradient: { position: 'absolute', width: width, height: height, top: 0 },
    content: { flex: 1, justifyContent: 'flex-end', paddingHorizontal: 30, paddingBottom: 60 },
    iconCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', marginBottom: 25, shadowColor: '#00A651', shadowOpacity: 0.3, shadowRadius: 15, elevation: 10 },
    title: { fontSize: 32, fontWeight: '900', color: '#fff', textAlign: 'right', marginBottom: 15 },
    description: { fontSize: 18, color: '#DDD', textAlign: 'right', lineHeight: 28, marginBottom: 40 },
    dotRow: { flexDirection: 'row-reverse', justifyContent: 'center', gap: 8, marginBottom: 50 },
    dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.3)' },
    dotActive: { width: 24, backgroundColor: '#00A651' },
    nextBtn: { borderRadius: 20, overflow: 'hidden', marginBottom: 15 },
    nextGradient: { flexDirection: 'row-reverse', justifyContent: 'center', alignItems: 'center', paddingVertical: 20 },
    nextText: { color: '#fff', fontSize: 18, fontWeight: '900' },
    skipBtn: { paddingVertical: 10, alignItems: 'center' },
    skipText: { color: 'rgba(255,255,255,0.6)', fontSize: 16, fontWeight: '700' },
});
