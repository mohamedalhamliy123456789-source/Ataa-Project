import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfileScreen({ navigation }: any) {
    const [bookmarks] = useState(3);

    const accountOptions = [
        { id: 1, title: 'المعلومات الشخصية', sub: 'الاسم والبريد والهاتف', icon: 'person-outline' as const, color: '#4A90E2', bg: '#EBF5FF' },
        { id: 2, title: 'طرق الدفع المحفوظة', sub: 'Visa •••• 4321', icon: 'card-outline' as const, color: '#F5A623', bg: '#FFF8EB' },
        { id: 3, title: 'المشاريع المحفوظة', sub: bookmarks + ' مشاريع في المفضلة', icon: 'bookmark-outline' as const, color: '#9B59B6', bg: '#F9F0FF' },
        { id: 4, title: 'تنبيهات الحملات', sub: 'مُفعَّل', icon: 'notifications-outline' as const, color: '#E12A3C', bg: '#FFEBEE' },
        { id: 5, title: 'التحقق الثنائي (OTP)', sub: 'لمزيد من الأمان', icon: 'shield-checkmark-outline' as const, color: '#00A651', bg: '#E5FAEB' },
        { id: 6, title: 'اللغة', sub: 'العربية', icon: 'globe-outline' as const, color: '#888', bg: '#F4F4F4' },
        { id: 7, title: 'مساعدة ودعم', sub: 'تواصل معنا', icon: 'help-circle-outline' as const, color: '#888', bg: '#F4F4F4' },
    ];

    const achievements = [
        { label: 'صاحب الأثر', icon: 'star', color: '#F5A623' },
        { label: 'متبرع أول', icon: 'verified', color: '#4A90E2' },
        { label: 'ولي أيتام', icon: 'emoji-events', color: '#00A651' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" backgroundColor="transparent" translucent />
            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>

                {/* Gradient Header */}
                <LinearGradient colors={['#007A3D', '#00A651']} style={styles.headerGradient}>
                    <View style={styles.headerRow}>
                        <Text style={styles.pageTitle}>حسابي</Text>
                        <TouchableOpacity>
                            <Ionicons name="settings-outline" size={26} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    {/* Profile Card */}
                    <View style={styles.profileCard}>
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop' }}
                            style={styles.avatar}
                        />
                        <View style={styles.profileInfo}>
                            <Text style={styles.userName}>أحمد عبد الله</Text>
                            <Text style={styles.userEmail}>ahmed@example.com</Text>
                            <View style={styles.badgeRow}>
                                <MaterialIcons name="verified" size={14} color="#00A651" />
                                <Text style={styles.badgeText}>متبرع موثق</Text>
                            </View>
                        </View>
                    </View>
                </LinearGradient>

                {/* Achievement Badges */}
                <View style={styles.achievementsSection}>
                    <Text style={styles.sectionTitle}>الشارات والإنجازات</Text>
                    <View style={styles.achievementsRow}>
                        {achievements.map((a, i) => (
                            <View key={i} style={styles.achievementItem}>
                                <View style={[styles.achieveBadge, { backgroundColor: a.color + '20' }]}>
                                    <MaterialIcons name={a.icon as any} size={28} color={a.color} />
                                </View>
                                <Text style={styles.achieveLabel}>{a.label}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Statistics */}
                <View style={styles.statsSection}>
                    <LinearGradient colors={['#F0FFF4', '#FFFFFF']} style={styles.statsCard}>
                        <View style={styles.statBox}>
                            <Text style={styles.statValue}>$1,250</Text>
                            <Text style={styles.statLabel}>إجمالي التبرعات</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statBox}>
                            <Text style={styles.statValue}>18</Text>
                            <Text style={styles.statLabel}>مشروع ممول</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statBox}>
                            <Text style={styles.statValue}>3</Text>
                            <Text style={styles.statLabel}>أيتام مكفولون</Text>
                        </View>
                    </LinearGradient>
                </View>

                {/* Settings List */}
                <View style={styles.settingsSection}>
                    <Text style={styles.sectionTitle}>إعدادات الحساب</Text>
                    <View style={styles.settingsList}>
                        {accountOptions.map((opt, i) => (
                            <TouchableOpacity
                                key={opt.id}
                                style={[styles.settingItem, i === accountOptions.length - 1 && { borderBottomWidth: 0 }]}
                            >
                                <Ionicons name="chevron-back" size={18} color="#CCC" />
                                <View style={styles.settingContent}>
                                    <View>
                                        <Text style={styles.settingTitle}>{opt.title}</Text>
                                        <Text style={styles.settingSub}>{opt.sub}</Text>
                                    </View>
                                    <View style={[styles.settingIconBg, { backgroundColor: opt.bg }]}>
                                        <Ionicons name={opt.icon} size={20} color={opt.color} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Logout */}
                <TouchableOpacity style={styles.logoutBtn}>
                    <Ionicons name="log-out-outline" size={22} color="#E12A3C" />
                    <Text style={styles.logoutText}>تسجيل الخروج</Text>
                </TouchableOpacity>
                <View style={{ height: 100 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA' },
    headerGradient: { paddingTop: 55, paddingHorizontal: 20, paddingBottom: 30, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
    headerRow: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
    pageTitle: { fontSize: 22, fontWeight: '900', color: '#fff' },
    profileCard: { flexDirection: 'row-reverse', alignItems: 'center' },
    avatar: { width: 80, height: 80, borderRadius: 40, borderWidth: 3, borderColor: '#fff', marginLeft: 20 },
    profileInfo: { flex: 1, alignItems: 'flex-end' },
    userName: { fontSize: 22, fontWeight: '900', color: '#fff', marginBottom: 4 },
    userEmail: { fontSize: 14, color: '#C1F0D4', marginBottom: 10 },
    badgeRow: { flexDirection: 'row-reverse', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 12 },
    badgeText: { color: '#fff', fontSize: 12, fontWeight: '700', marginRight: 5 },
    achievementsSection: { paddingHorizontal: 20, marginTop: 25, marginBottom: 10 },
    sectionTitle: { fontSize: 18, fontWeight: '900', color: '#111', marginBottom: 15, textAlign: 'right' },
    achievementsRow: { flexDirection: 'row-reverse', gap: 15, justifyContent: 'flex-start' },
    achievementItem: { alignItems: 'center' },
    achieveBadge: { width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
    achieveLabel: { fontSize: 12, fontWeight: '700', color: '#333' },
    statsSection: { paddingHorizontal: 20, marginBottom: 25 },
    statsCard: { borderRadius: 24, padding: 20, flexDirection: 'row-reverse', justifyContent: 'space-between', borderWidth: 1, borderColor: '#E5FAEB', shadowColor: '#00A651', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.06, shadowRadius: 15, elevation: 3 },
    statBox: { flex: 1, alignItems: 'center' },
    statDivider: { width: 1, backgroundColor: '#E0E0E0' },
    statValue: { fontSize: 22, fontWeight: '900', color: '#00A651', marginBottom: 4 },
    statLabel: { fontSize: 12, color: '#666', fontWeight: '600' },
    settingsSection: { paddingHorizontal: 20, marginBottom: 20 },
    settingsList: { backgroundColor: '#fff', borderRadius: 20, paddingHorizontal: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.02, shadowRadius: 8, elevation: 2 },
    settingItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
    settingContent: { flex: 1, flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', marginRight: 5 },
    settingTitle: { fontSize: 16, fontWeight: '700', color: '#222', textAlign: 'right', marginBottom: 3 },
    settingSub: { fontSize: 12, color: '#888', textAlign: 'right' },
    settingIconBg: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginLeft: 10 },
    logoutBtn: { flexDirection: 'row-reverse', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF0F1', paddingVertical: 18, borderRadius: 16, marginHorizontal: 20, marginBottom: 20 },
    logoutText: { color: '#E12A3C', fontSize: 16, fontWeight: '900', marginRight: 10 },
});
