import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function ReportsScreen({ navigation }: any) {
    const [activeTab, setActiveTab] = useState('reports');

    const reports = [
        {
            id: 1,
            projectId: 1,
            title: 'تقرير إنجاز: بئر قرية النور',
            date: '15 مارس 2026',
            content: 'بفضل الله ثم تبرعاتكم، اكتمل حفر البئر وتمديد الأنابيب لخدمة أكثر من 500 نسمة.',
            image: 'https://images.unsplash.com/photo-1541819068018-8f53941459ff?q=80&w=800&auto=format&fit=crop',
            status: 'مكتمل'
        },
        {
            id: 2,
            projectId: 3,
            title: 'توزيع السلال الغذائية لشهر رمضان',
            date: '10 مارس 2026',
            content: 'تم توزيع 150 سلة غذائية على الأسر المتعففة في العاصمة صنعاء.',
            image: 'https://images.unsplash.com/photo-1593113589914-07599018dd05?q=80&w=800&auto=format&fit=crop',
            status: 'قيد التنفيذ'
        }
    ];

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" backgroundColor="#fff" />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>تقارير ومتابعة</Text>
                <TouchableOpacity style={styles.headerBackBtn} onPress={() => navigation.goBack()}>
                    <Ionicons name="filter" size={24} color="#111" />
                </TouchableOpacity>
            </View>

            {/* Custom Tabs */}
            <View style={styles.tabsContainer}>
                <TouchableOpacity
                    style={[styles.tabBtn, activeTab === 'reports' && styles.tabBtnActive]}
                    onPress={() => setActiveTab('reports')}
                >
                    <Text style={[styles.tabText, activeTab === 'reports' && styles.tabTextActive]}>تقارير التنفيذ</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tabBtn, activeTab === 'history' && styles.tabBtnActive]}
                    onPress={() => setActiveTab('history')}
                >
                    <Text style={[styles.tabText, activeTab === 'history' && styles.tabTextActive]}>سجل التبرعات</Text>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>

                {activeTab === 'reports' ? (
                    <View>
                        <Text style={styles.infoText}>تابع أثر تبرعاتك بشفافية كاملة عبر التقارير الميدانية.</Text>

                        {reports.map(report => (
                            <View key={report.id} style={styles.reportCard}>
                                <View style={styles.reportHeader}>
                                    <View style={styles.reportDateBadge}>
                                        <MaterialCommunityIcons name="calendar-check" size={14} color="#00A651" />
                                        <Text style={styles.reportDate}>{report.date}</Text>
                                    </View>
                                    <View style={[styles.statusBadge, report.status === 'قيد التنفيذ' && { backgroundColor: '#FFF4E5' }]}>
                                        <Text style={[styles.statusText, report.status === 'قيد التنفيذ' && { color: '#F5A623' }]}>{report.status}</Text>
                                    </View>
                                </View>

                                <Text style={styles.reportTitle}>{report.title}</Text>
                                <Text style={styles.reportContent}>{report.content}</Text>

                                <Image source={{ uri: report.image }} style={styles.reportImage} />

                                <TouchableOpacity style={styles.downloadBtn}>
                                    <Ionicons name="download-outline" size={18} color="#00A651" />
                                    <Text style={styles.downloadBtnText}>تحميل التقرير الكامل (PDF)</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                ) : (
                    <View style={styles.emptyState}>
                        <Ionicons name="receipt-outline" size={60} color="#E0E0E0" />
                        <Text style={styles.emptyTitle}>لا توجد تبرعات سابقة</Text>
                        <Text style={styles.emptySub}>عطاؤك يزرع الأمل، بادر بالتبرع الآن</Text>
                        <TouchableOpacity style={styles.donateNowBtn} onPress={() => navigation.navigate('Projects')}>
                            <Text style={styles.donateNowText}>تصفح المشاريع</Text>
                        </TouchableOpacity>
                    </View>
                )}

                <View style={{ height: 100 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA' },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
        position: 'relative'
    },
    headerTitle: { fontSize: 20, fontWeight: '800', color: '#111' },
    headerBackBtn: { position: 'absolute', right: 20, top: 48, padding: 4 },
    tabsContainer: { flexDirection: 'row-reverse', backgroundColor: '#fff', paddingHorizontal: 20, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
    tabBtn: { flex: 1, paddingVertical: 12, alignItems: 'center', borderBottomWidth: 3, borderBottomColor: 'transparent' },
    tabBtnActive: { borderBottomColor: '#00A651' },
    tabText: { fontSize: 15, fontWeight: '600', color: '#888' },
    tabTextActive: { color: '#00A651', fontWeight: '800' },
    content: { padding: 20 },
    infoText: { fontSize: 13, color: '#666', marginBottom: 20, textAlign: 'right', lineHeight: 22 },
    reportCard: { backgroundColor: '#fff', borderRadius: 20, padding: 20, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 10, elevation: 3 },
    reportHeader: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
    reportDateBadge: { flexDirection: 'row-reverse', alignItems: 'center', backgroundColor: '#E5FAEB', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
    reportDate: { color: '#00A651', fontSize: 12, fontWeight: '700', marginRight: 5 },
    statusBadge: { backgroundColor: '#E5FAEB', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20 },
    statusText: { color: '#00A651', fontSize: 11, fontWeight: '800' },
    reportTitle: { fontSize: 18, fontWeight: '800', color: '#111', marginBottom: 10, textAlign: 'right' },
    reportContent: { fontSize: 14, color: '#666', lineHeight: 24, marginBottom: 15, textAlign: 'right' },
    reportImage: { width: '100%', height: 160, borderRadius: 12, marginBottom: 15 },
    downloadBtn: { flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'center', paddingVertical: 14, backgroundColor: '#F8F9FA', borderRadius: 12, borderWidth: 1, borderColor: '#EEE' },
    downloadBtnText: { color: '#00A651', fontSize: 14, fontWeight: '700', marginRight: 8 },
    emptyState: { alignItems: 'center', justifyContent: 'center', marginTop: 60 },
    emptyTitle: { fontSize: 18, fontWeight: '800', color: '#111', marginTop: 20, marginBottom: 8 },
    emptySub: { fontSize: 14, color: '#888', marginBottom: 25 },
    donateNowBtn: { backgroundColor: '#00A651', paddingHorizontal: 30, paddingVertical: 14, borderRadius: 12 },
    donateNowText: { color: '#fff', fontSize: 16, fontWeight: '800' }
});
