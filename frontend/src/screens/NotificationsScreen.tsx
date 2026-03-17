import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const NOTIFICATIONS = [
    { id: '1', title: 'تبرع ناجح', body: 'شكراً لك! تم استلام تبرعك لمشروع "إغاثة غزة" بنجاح.', time: 'منذ ساعتين', icon: 'checkmark-circle', color: '#00A651' },
    { id: '2', title: 'حملة عاجلة', body: 'هناك حاجة ماسة لتوفير مياه نظيفة في المناطق المتضررة.', time: 'منذ 5 ساعات', icon: 'alert-circle', color: '#E12A3C' },
    { id: '3', title: 'تحديث المشروع', body: 'تم الانتهاء من بناء بئر المياه الذي ساهمت فيه. شاهد الصور الآن.', time: 'أمس', icon: 'business', color: '#4A90E2' },
];

export default function NotificationsScreen({ navigation }: any) {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-forward" size={26} color="#111" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>التنبيهات</Text>
                <TouchableOpacity>
                    <Text style={styles.markRead}>تحديد الكل كمقروء</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={NOTIFICATIONS}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.notifItem}>
                        <View style={[styles.iconBg, { backgroundColor: item.color + '15' }]}>
                            <Ionicons name={item.icon as any} size={24} color={item.color} />
                        </View>
                        <View style={styles.notifContent}>
                            <View style={styles.notifHeader}>
                                <Text style={styles.notifTitle}>{item.title}</Text>
                                <Text style={styles.notifTime}>{item.time}</Text>
                            </View>
                            <Text style={styles.notifBody} numberOfLines={2}>{item.body}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                contentContainerStyle={styles.list}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA' },
    header: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 20, backgroundColor: '#fff' },
    headerTitle: { fontSize: 20, fontWeight: '900', color: '#111' },
    markRead: { fontSize: 13, color: '#00A651', fontWeight: '700' },
    list: { padding: 20 },
    notifItem: { flexDirection: 'row-reverse', backgroundColor: '#fff', borderRadius: 16, padding: 15, marginBottom: 12, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
    iconBg: { width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginLeft: 15 },
    notifContent: { flex: 1, alignItems: 'flex-end' },
    notifHeader: { flexDirection: 'row-reverse', justifyContent: 'space-between', width: '100%', marginBottom: 5 },
    notifTitle: { fontSize: 16, fontWeight: '800', color: '#111' },
    notifTime: { fontSize: 12, color: '#999' },
    notifBody: { fontSize: 14, color: '#666', lineHeight: 20, textAlign: 'right' },
});
