import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Skeleton from '../components/Skeleton';

export default function ReportsScreen({ navigation }: any) {
    const [isLoading, setIsLoading] = useState(true);
    const [activeYear, setActiveYear] = useState('2024');

    React.useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    const years = ['2024', '2023', '2022', '2021'];

    const reports = [
        { id: 1, title: 'التقرير السنوي لعام 2024', date: 'ديسمبر 2024', type: 'سنوي', size: '4.5 MB' },
        { id: 2, title: 'تقرير إنجازات الربع الثالث', date: 'أكتوبر 2024', type: 'دوري', size: '2.8 MB' },
        { id: 3, title: 'تقرير حملة الشتاء الدافئ', date: 'فبراير 2024', type: 'حمله', size: '3.1 MB' },
        { id: 4, title: 'تقرير مشاريع حفر الآبار', date: 'يناير 2024', type: 'مشروع', size: '5.2 MB' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>التقارير والشفافية</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
                
                {/* Intro Card */}
                <LinearGradient colors={['#007A3D', '#00A651']} style={styles.introCard}>
                    <View style={styles.introTextWrap}>
                        <Text style={styles.introTitle}>التزامنا بالشفافية</Text>
                        <Text style={styles.introDesc}>نشارككم قصص النجاح وتقارير الإنجاز لحظة بلحظة، لنبني سوياً جسور الثقة والعطاء.</Text>
                    </View>
                    <MaterialCommunityIcons name="file-document-check-outline" size={80} color="rgba(255,255,255,0.2)" style={styles.introIcon} />
                </LinearGradient>

                {/* Year Filter */}
                <View style={styles.yearRow}>
                    {years.map(y => (
                        <TouchableOpacity 
                            key={y} 
                            style={[styles.yearBtn, activeYear === y && styles.yearBtnActive]}
                            onPress={() => setActiveYear(y)}
                        >
                            <Text style={[styles.yearText, activeYear === y && styles.yearTextActive]}>{y}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Reports List */}
                <Text style={styles.sectionTitle}>التقارير المتاحة</Text>
                {isLoading ? (
                    [1, 2, 3].map(i => <Skeleton key={i} width="100%" height={90} borderRadius={20} style={{ marginBottom: 12 }} />)
                ) : (
                    reports.map(r => (
                        <TouchableOpacity key={r.id} style={styles.reportCard}>
                            <View style={styles.reportIconBg}>
                                <MaterialCommunityIcons name="file-pdf-box" size={32} color="#E12A3C" />
                            </View>
                            <View style={styles.reportInfo}>
                                <Text style={styles.reportTitle}>{r.title}</Text>
                                <Text style={styles.reportMeta}>{r.date} • {r.size}</Text>
                            </View>
                            <TouchableOpacity style={styles.downloadBtn}>
                                <Ionicons name="download-outline" size={24} color="#00A651" />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    ))
                )}

                <View style={{ height: 100 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA' },
    header: { paddingTop: 55, paddingBottom: 20, backgroundColor: '#fff', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
    headerTitle: { fontSize: 20, fontWeight: '900', color: '#111' },
    content: { padding: 20 },
    introCard: { borderRadius: 24, padding: 25, flexDirection: 'row-reverse', alignItems: 'center', overflow: 'hidden', marginBottom: 25 },
    introTextWrap: { flex: 1, zIndex: 1 },
    introTitle: { color: '#fff', fontSize: 22, fontWeight: '900', marginBottom: 8, textAlign: 'right' },
    introDesc: { color: '#E5FAEB', fontSize: 13, textAlign: 'right', lineHeight: 20 },
    introIcon: { position: 'absolute', left: -10, bottom: -10 },
    yearRow: { flexDirection: 'row-reverse', gap: 10, marginBottom: 25 },
    yearBtn: { flex: 1, backgroundColor: '#fff', borderRadius: 12, paddingVertical: 10, alignItems: 'center', borderWidth: 1, borderColor: '#EEE' },
    yearBtnActive: { backgroundColor: '#00A651', borderColor: '#00A651' },
    yearText: { fontSize: 14, fontWeight: '700', color: '#666' },
    yearTextActive: { color: '#fff' },
    sectionTitle: { fontSize: 18, fontWeight: '900', color: '#111', marginBottom: 15, textAlign: 'right' },
    reportCard: { backgroundColor: '#fff', borderRadius: 20, padding: 15, flexDirection: 'row-reverse', alignItems: 'center', marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.03, elevation: 2 },
    reportIconBg: { width: 55, height: 55, borderRadius: 15, backgroundColor: '#FFF5F5', justifyContent: 'center', alignItems: 'center', marginLeft: 15 },
    reportInfo: { flex: 1, alignItems: 'flex-end' },
    reportTitle: { fontSize: 15, fontWeight: '800', color: '#111', marginBottom: 4 },
    reportMeta: { fontSize: 12, color: '#888' },
    downloadBtn: { width: 45, height: 45, borderRadius: 12, backgroundColor: '#F0FAF3', justifyContent: 'center', alignItems: 'center' },
});
