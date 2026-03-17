import React from 'react';
import { 
    View, Text, StyleSheet, SafeAreaView, ScrollView, 
    TouchableOpacity, Image, Alert 
} from 'react-native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { useUser } from '../context/UserContext';
import LoginInvitation from '../components/Profile/LoginInvitation';

export default function ProfileScreen({ navigation }: any) {
    const { user, isGuest, logout } = useUser();

    const sections = [
        {
            title: 'تقارير',
            icon: 'document-text-outline',
            items: [
                { id: '1-1', title: 'التقارير', icon: 'file-tray-full-outline', color: '#00A651' },
                { id: '1-2', title: 'التقارير السنوية', icon: 'calendar-outline', color: '#007A3D' },
            ]
        },
        {
            title: 'تبرعاتي',
            icon: 'heart-outline',
            items: [
                { id: '2-1', title: 'الإيصالات', icon: 'receipt-outline', color: '#FFD700' },
                { id: '2-2', title: 'الكفالات', icon: 'people-outline', color: '#7B2FBE' },
                { id: '2-3', title: 'المشاريع', icon: 'business-outline', color: '#0096C7' },
                { id: '2-4', title: 'التبرعات الدورية', icon: 'repeat-outline', color: '#4CAF50' },
            ]
        },
        {
            title: 'المبادرات',
            icon: 'rocket-outline',
            items: [
                { id: '3-1', title: 'مشاريع ثوابي', icon: 'star-outline', color: '#E91E63' },
                { id: '3-2', title: 'هديتي', icon: 'gift-outline', color: '#FF9800' },
                { id: '3-3', title: 'لوحة أعمال الخير', icon: 'stats-chart-outline', color: '#2196F3' },
            ]
        },
        {
            title: 'روابط أخرى',
            icon: 'link-outline',
            items: [
                { id: '4-1', title: 'تطبيقاتنا', icon: 'apps-outline', color: '#9C27B0' },
                { id: '4-2', title: 'عن جمعية عطاء', icon: 'information-circle-outline', color: '#607D8B' },
                { id: '4-3', title: 'قيم التطبيق', icon: 'thumbs-up-outline', color: '#FFEB3B' },
                { id: '4-4', title: 'شارك مع الأصدقاء', icon: 'share-social-outline', color: '#00BCD4' },
            ]
        },
        {
            title: 'الإعدادات',
            icon: 'settings-outline',
            items: [
                { id: '5-1', title: 'الإعدادات', icon: 'construct-outline', color: '#455A64', nav: 'Settings' },
                { id: '5-2', title: 'خدمة العملاء', icon: 'headset-outline', color: '#00A651', nav: 'HelpSupport' },
            ]
        }
    ];

    const handleOptionPress = (item: any) => {
        if (item.nav) {
            navigation.navigate(item.nav);
        } else {
            Alert.alert(item.title, `سيتم تفعيل ميزة "${item.title}" قريباً في التحديث القادم.`);
        }
    };

    const handleLogout = () => {
        Alert.alert(
            'تسجيل الخروج',
            'هل أنت متأكد من رغبتك في تسجيل الخروج؟',
            [
                { text: 'إلغاء', style: 'cancel' },
                { text: 'خروج', style: 'destructive', onPress: () => {
                    logout();
                    navigation.replace('Login');
                }}
            ]
        );
    };

    if (isGuest) {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar style="dark" backgroundColor="#F8F9FA" />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ paddingTop: 60, paddingHorizontal: 20 }}>
                        <Text style={[styles.pageTitle, { color: '#111', textAlign: 'right' }]}>حسابي</Text>
                    </View>
                    <LoginInvitation navigation={navigation} />
                    <View style={{ marginTop: 30 }}>
                        <TouchableOpacity 
                            style={[styles.itemRow, { paddingHorizontal: 20 }]}
                            onPress={() => navigation.navigate('HelpSupport')}
                        >
                            <Ionicons name="chevron-back" size={16} color="#DDD" />
                            <View style={styles.itemContent}>
                                <Text style={styles.itemTitleAr}>خدمة العملاء</Text>
                                <View style={[styles.itemIconBg, { backgroundColor: '#00A65115' }]}>
                                    <Ionicons name="headset-outline" size={18} color="#00A651" />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.itemRow, { paddingHorizontal: 20 }]}
                            onPress={() => navigation.navigate('Settings')}
                        >
                            <Ionicons name="chevron-back" size={16} color="#DDD" />
                            <View style={styles.itemContent}>
                                <Text style={styles.itemTitleAr}>الإعدادات</Text>
                                <View style={[styles.itemIconBg, { backgroundColor: '#455A6415' }]}>
                                    <Ionicons name="construct-outline" size={18} color="#455A64" />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 120 }} />
                </ScrollView>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" backgroundColor="transparent" translucent />
            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>

                {/* Gradient Header */}
                <LinearGradient colors={['#007A3D', '#00A651']} style={styles.headerGradient}>
                    <View style={styles.headerRow}>
                        <Text style={styles.pageTitle}>ملفي الشخصي</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                            <Ionicons name="settings-outline" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    {/* Profile Header Card */}
                    <View style={styles.profileHeaderCard}>
                        <Image
                            source={{ uri: user?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop' }}
                            style={styles.avatar}
                        />
                        <View style={styles.profileInfo}>
                            <TouchableOpacity onLongPress={() => navigation.navigate('AdminDashboard')}>
                                <Text style={styles.userName}>{user?.name || 'مستخدم عطاء'}</Text>
                            </TouchableOpacity>
                            <Text style={styles.userEmail}>{user?.email || 'ahmed@ata-charity.org'}</Text>
                            <View style={styles.badgeRow}>
                                <MaterialIcons name="verified" size={14} color="#FFD700" />
                                <Text style={styles.badgeText}>متبرع متميز</Text>
                            </View>
                        </View>
                    </View>
                </LinearGradient>

                {/* Activity Summary Stats */}
                <View style={styles.summaryStats}>
                    <View style={styles.statCell}>
                        <Text style={styles.statVal}>0</Text>
                        <Text style={styles.statLbl}>تبرعاتي</Text>
                    </View>
                    <View style={styles.statSep} />
                    <View style={styles.statCell}>
                        <Text style={styles.statVal}>0</Text>
                        <Text style={styles.statLbl}>مشروع</Text>
                    </View>
                    <View style={styles.statSep} />
                    <View style={styles.statCell}>
                        <Text style={styles.statVal}>0</Text>
                        <Text style={styles.statLbl}>أيتام</Text>
                    </View>
                </View>

                {/* Render Sections */}
                {sections.map((section, idx) => (
                    <View key={idx} style={styles.sectionContainer}>
                        <View style={styles.sectionHeader}>
                            <Ionicons name={section.icon as any} size={20} color="#00A651" />
                            <Text style={styles.sectionTitleAr}>{section.title}</Text>
                        </View>
                        <View style={styles.itemsCard}>
                            {section.items.map((item, i) => (
                                <TouchableOpacity 
                                    key={item.id} 
                                    style={[styles.itemRow, i === section.items.length - 1 && { borderBottomWidth: 0 }]}
                                    onPress={() => handleOptionPress(item)}
                                >
                                    <Ionicons name="chevron-back" size={16} color="#DDD" />
                                    <View style={styles.itemContent}>
                                        <Text style={styles.itemTitleAr}>{item.title}</Text>
                                        <View style={[styles.itemIconBg, { backgroundColor: item.color + '15' }]}>
                                            <Ionicons name={item.icon as any} size={18} color={item.color} />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                ))}

                {/* Logout Button */}
                <TouchableOpacity style={styles.logoutButton} activeOpacity={0.8} onPress={handleLogout}>
                    <LinearGradient 
                        colors={['#FFF1F1', '#FFE5E5']} 
                        style={styles.logoutGradient}
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    >
                        <Ionicons name="log-out-outline" size={20} color="#E12A3C" />
                        <Text style={styles.logoutLabel}>تسجيل الخروج</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <View style={{ height: 120 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA' },
    headerGradient: { paddingTop: 60, paddingHorizontal: 25, paddingBottom: 40, borderBottomLeftRadius: 35, borderBottomRightRadius: 35 },
    headerRow: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
    pageTitle: { fontSize: 24, fontWeight: '900', color: '#fff' },
    profileHeaderCard: { flexDirection: 'row-reverse', alignItems: 'center' },
    avatar: { width: 85, height: 85, borderRadius: 42.5, borderWidth: 3, borderColor: '#fff', marginLeft: 15 },
    profileInfo: { flex: 1, alignItems: 'flex-end' },
    userName: { fontSize: 24, fontWeight: '900', color: '#fff', marginBottom: 4 },
    userEmail: { fontSize: 13, color: '#C1F0D4', marginBottom: 12 },
    badgeRow: { flexDirection: 'row-reverse', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.15)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
    badgeText: { color: '#fff', fontSize: 11, fontWeight: '800', marginRight: 5 },

    summaryStats: { flexDirection: 'row-reverse', backgroundColor: '#fff', marginHorizontal: 20, marginTop: -25, borderRadius: 20, padding: 20, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 4 },
    statCell: { flex: 1, alignItems: 'center' },
    statVal: { fontSize: 18, fontWeight: '900', color: '#00A651', marginBottom: 2 },
    statLbl: { fontSize: 12, color: '#888', fontWeight: '700' },
    statSep: { width: 1, height: 25, backgroundColor: '#EEE' },

    sectionContainer: { marginTop: 25, paddingHorizontal: 20 },
    sectionHeader: { flexDirection: 'row-reverse', alignItems: 'center', marginBottom: 12, marginRight: 5 },
    sectionTitleAr: { fontSize: 16, fontWeight: '900', color: '#111', marginRight: 10 },
    itemsCard: { backgroundColor: '#fff', borderRadius: 20, paddingHorizontal: 15, shadowColor: '#000', shadowOpacity: 0.02, shadowRadius: 5, elevation: 1 },
    itemRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#F7F7F7' },
    itemContent: { flex: 1, flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', marginRight: 5 },
    itemTitleAr: { fontSize: 15, fontWeight: '700', color: '#333', textAlign: 'right' },
    itemIconBg: { width: 38, height: 38, borderRadius: 11, justifyContent: 'center', alignItems: 'center', marginLeft: 12 },

    logoutButton: { marginTop: 35, marginHorizontal: 20, borderRadius: 18, overflow: 'hidden' },
    logoutGradient: { flexDirection: 'row-reverse', justifyContent: 'center', alignItems: 'center', paddingVertical: 18, gap: 10 },
    logoutLabel: { color: '#E12A3C', fontSize: 16, fontWeight: '900' },
});
