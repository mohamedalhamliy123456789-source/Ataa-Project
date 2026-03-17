import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function SettingsScreen({ navigation }: any) {
    const [notifs, setNotifs] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [marketing, setMarketing] = useState(true);

    const SettingItem = ({ icon, title, value, onToggle, showToggle = true, onPress }: any) => (
        <TouchableOpacity style={styles.item} onPress={onPress} disabled={showToggle}>
            <View style={styles.itemRight}>
                <View style={styles.iconBg}>
                    <Ionicons name={icon} size={22} color="#00A651" />
                </View>
                <Text style={styles.itemTitle}>{title}</Text>
            </View>
            {showToggle ? (
                <Switch 
                    value={value} 
                    onValueChange={onToggle}
                    trackColor={{ false: '#DDD', true: '#A3E4C1' }}
                    thumbColor={value ? '#00A651' : '#F4F4F4'}
                />
            ) : (
                <Ionicons name="chevron-back" size={20} color="#CCC" />
            )}
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-forward" size={26} color="#111" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>الإعدادات</Text>
                <View style={{ width: 26 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.sectionTitle}>العام</Text>
                <View style={styles.section}>
                    <SettingItem icon="notifications-outline" title="تنبيهات الحملات" value={notifs} onToggle={setNotifs} />
                    <SettingItem icon="moon-outline" title="الوضع الليلي" value={darkMode} onToggle={setDarkMode} />
                    <SettingItem icon="language-outline" title="اللغة" showToggle={false} onPress={() => {}} />
                </View>

                <Text style={styles.sectionTitle}>الأمان</Text>
                <View style={styles.section}>
                    <SettingItem icon="lock-closed-outline" title="تغيير كلمة المرور" showToggle={false} onPress={() => {}} />
                    <SettingItem icon="shield-checkmark-outline" title="التحقق الثنائي" showToggle={false} onPress={() => navigation.navigate('OTP')} />
                </View>

                <Text style={styles.sectionTitle}>التطبيق</Text>
                <View style={styles.section}>
                    <SettingItem icon="mail-outline" title="اشترك في النشرة الإخبارية" value={marketing} onToggle={setMarketing} />
                    <SettingItem icon="information-circle-outline" title="عن عطاء" showToggle={false} onPress={() => {}} />
                    <SettingItem icon="help-buoy-outline" title="المساعدة والدعم" showToggle={false} onPress={() => {}} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA' },
    header: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 20, backgroundColor: '#fff' },
    headerTitle: { fontSize: 20, fontWeight: '900', color: '#111' },
    content: { padding: 20 },
    sectionTitle: { fontSize: 15, fontWeight: '800', color: '#888', marginBottom: 10, textAlign: 'right', paddingRight: 5 },
    section: { backgroundColor: '#fff', borderRadius: 20, paddingHorizontal: 15, marginBottom: 25, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
    item: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
    itemRight: { flexDirection: 'row-reverse', alignItems: 'center' },
    iconBg: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#E5FAEB', justifyContent: 'center', alignItems: 'center', marginLeft: 15 },
    itemTitle: { fontSize: 16, fontWeight: '700', color: '#333' }
});
