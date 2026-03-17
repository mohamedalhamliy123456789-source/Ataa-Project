import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Alert, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

export default function AdminDashboardScreen({ navigation }: any) {
    const [activeTab, setActiveTab] = useState('projects');
    const [projectName, setProjectName] = useState('');
    const [projectTarget, setProjectTarget] = useState('');

    const stats = [
        { label: 'إجمالي التبرعات', value: '$124,500', icon: 'cash', color: '#00A651' },
        { label: 'عدد المتبرعين', value: '1,240', icon: 'account-group', color: '#007A3D' },
        { label: 'المشاريع النشطة', value: '12', icon: 'briefcase', color: '#0096C7' },
    ];

    const handleAddProject = () => {
        if (!projectName || !projectTarget) {
            Alert.alert('خطأ', 'يرجى ملء جميع الحقول المطلوبة.');
            return;
        }
        Alert.alert('نجاح', `تمت إضافة المشروع "${projectName}" بنجاح! سيظهر في التطبيق فوراً.`);
        setProjectName('');
        setProjectTarget('');
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            
            {/* Admin Header */}
            <LinearGradient colors={['#111', '#333']} style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="close" size={28} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>لوحة تحكم المالك</Text>
                <View style={styles.adminBadge}><Text style={styles.adminBadgeTxt}>ADMIN</Text></View>
            </LinearGradient>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
                
                {/* Stats Grid */}
                <View style={styles.statsGrid}>
                    {stats.map((s, i) => (
                        <View key={i} style={styles.statCard}>
                            <MaterialCommunityIcons name={s.icon as any} size={24} color={s.color} />
                            <Text style={styles.statValue}>{s.value}</Text>
                            <Text style={styles.statLabel}>{s.label}</Text>
                        </View>
                    ))}
                </View>

                {/* Quick Add Project */}
                <View style={styles.actionCard}>
                    <Text style={styles.cardTitle}>إضافة مشروع جديد سريع</Text>
                    
                    <Text style={styles.inputLabel}>اسم المشروع</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="مثال: حفر بئر مياه" 
                        value={projectName}
                        onChangeText={setProjectName}
                        textAlign="right"
                    />

                    <Text style={styles.inputLabel}>المبلغ المستهدف ($)</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="0.00" 
                        keyboardType="numeric"
                        value={projectTarget}
                        onChangeText={setProjectTarget}
                        textAlign="right"
                    />

                    <TouchableOpacity style={styles.addBtn} onPress={handleAddProject}>
                        <LinearGradient colors={['#00A651', '#007A3D']} style={styles.addGradient}>
                            <Text style={styles.addBtnText}>نشر المشروع الآن</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                {/* Management Links */}
                <Text style={styles.sectionTitle}>إدارة الأقسام</Text>
                <TouchableOpacity style={styles.manageItem}>
                    <Ionicons name="chevron-back" size={20} color="#999" />
                    <View style={styles.manageInfo}>
                        <Text style={styles.manageTitle}>إدارة البنرات الإعلانية</Text>
                        <Text style={styles.manageSub}>تغيير صور الشاشة الرئيسية</Text>
                    </View>
                    <View style={[styles.iconBg, { backgroundColor: '#E3F2FD' }]}>
                        <Ionicons name="images-outline" size={22} color="#1976D2" />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.manageItem}>
                    <Ionicons name="chevron-back" size={20} color="#999" />
                    <View style={styles.manageInfo}>
                        <Text style={styles.manageTitle}>تعديل أسعار الزكاة</Text>
                        <Text style={styles.manageSub}>الذهب، الفضة، والعملات</Text>
                    </View>
                    <View style={[styles.iconBg, { backgroundColor: '#FFF8E1' }]}>
                        <Ionicons name="calculator-outline" size={22} color="#FFA000" />
                    </View>
                </TouchableOpacity>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F4F7F5' },
    header: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 55, paddingBottom: 25 },
    headerTitle: { fontSize: 20, fontWeight: '900', color: '#fff' },
    adminBadge: { backgroundColor: '#E12A3C', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
    adminBadgeTxt: { color: '#fff', fontSize: 10, fontWeight: '900' },
    content: { padding: 20 },
    statsGrid: { flexDirection: 'row-reverse', justifyContent: 'space-between', marginBottom: 25 },
    statCard: { width: '31%', backgroundColor: '#fff', borderRadius: 20, padding: 15, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.05, elevation: 2 },
    statValue: { fontSize: 16, fontWeight: '900', color: '#111', marginTop: 8 },
    statLabel: { fontSize: 10, color: '#888', marginTop: 4, textAlign: 'center' },
    actionCard: { backgroundColor: '#fff', borderRadius: 24, padding: 20, shadowColor: '#000', shadowOpacity: 0.06, elevation: 4, marginBottom: 30 },
    cardTitle: { fontSize: 17, fontWeight: '900', color: '#111', marginBottom: 20, textAlign: 'right' },
    inputLabel: { fontSize: 13, fontWeight: '700', color: '#666', marginBottom: 8, textAlign: 'right' },
    input: { backgroundColor: '#F8F9FA', borderRadius: 12, padding: 15, marginBottom: 15, borderWidth: 1, borderColor: '#EEE', fontSize: 15 },
    addBtn: { borderRadius: 16, overflow: 'hidden', marginTop: 10 },
    addGradient: { paddingVertical: 18, alignItems: 'center' },
    addBtnText: { color: '#fff', fontSize: 16, fontWeight: '900' },
    sectionTitle: { fontSize: 18, fontWeight: '900', color: '#111', marginBottom: 15, textAlign: 'right' },
    manageItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 20, padding: 15, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.02, elevation: 1 },
    manageInfo: { flex: 1, marginRight: 15, alignItems: 'flex-end' },
    manageTitle: { fontSize: 15, fontWeight: '800', color: '#111' },
    manageSub: { fontSize: 12, color: '#888', marginTop: 2 },
    iconBg: { width: 50, height: 50, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
});
