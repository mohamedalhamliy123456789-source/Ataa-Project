import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function CartScreen({ navigation }: any) {
    // Mock Cart Data
    const cartItems = [
        {
            id: 1,
            title: 'إغاثة عاجلة لمتضرري السيول',
            amount: 150,
            image: 'https://images.unsplash.com/photo-1593113589914-07599018dd05?q=80&w=200&auto=format&fit=crop',
        },
        {
            id: 2,
            title: 'حفر بئر مياه سطحي بالغاطس',
            amount: 50,
            image: 'https://images.unsplash.com/photo-1541819068018-8f53941459ff?q=80&w=200&auto=format&fit=crop',
        }
    ];

    const totalAmount = cartItems.reduce((sum, item) => sum + item.amount, 0);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" backgroundColor="#fff" />

            <View style={styles.header}>
                <Text style={styles.headerTitle}>سلة الخير</Text>
                <TouchableOpacity style={styles.headerBackBtn} onPress={() => navigation.goBack()}>
                    <Ionicons name="close" size={28} color="#111" />
                </TouchableOpacity>
            </View>

            {cartItems.length > 0 ? (
                <>
                    <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
                        <Text style={styles.itemsCount}>تحتوي سلتك على {cartItems.length} مشروعات</Text>

                        {cartItems.map(item => (
                            <View key={item.id} style={styles.cartItemCard}>
                                <Image source={{ uri: item.image }} style={styles.itemImage} />
                                <View style={styles.itemDetails}>
                                    <Text style={styles.itemTitle} numberOfLines={2}>{item.title}</Text>
                                    <Text style={styles.itemAmount}>${item.amount}</Text>
                                </View>
                                <TouchableOpacity style={styles.deleteBtn}>
                                    <Ionicons name="trash-outline" size={20} color="#E12A3C" />
                                </TouchableOpacity>
                            </View>
                        ))}

                        <TouchableOpacity style={styles.addMoreBtn} onPress={() => navigation.navigate('Projects')}>
                            <Ionicons name="add-circle-outline" size={24} color="#00A651" style={{ marginRight: 8 }} />
                            <Text style={styles.addMoreText}>إضافة تبرع آخر للسلة</Text>
                        </TouchableOpacity>

                        <View style={{ height: 120 }} />
                    </ScrollView>

                    {/* Sticky Checkout Summary */}
                    <View style={styles.checkoutBar}>
                        <View style={styles.checkoutSummary}>
                            <Text style={styles.checkoutLabel}>الإجمالي النهائي</Text>
                            <Text style={styles.checkoutTotal}>${totalAmount}</Text>
                        </View>
                        <TouchableOpacity style={styles.checkoutBtn} onPress={() => navigation.navigate('DonateModal', { amount: totalAmount })}>
                            <Text style={styles.checkoutBtnText}>إتمام الدفع</Text>
                            <MaterialCommunityIcons name="shield-check" size={20} color="#fff" style={{ marginLeft: 8 }} />
                        </TouchableOpacity>
                    </View>
                </>
            ) : (
                <View style={styles.emptyState}>
                    <Ionicons name="cart-outline" size={80} color="#E0E0E0" />
                    <Text style={styles.emptyTitle}>سلة الخير فارغة</Text>
                    <Text style={styles.emptySub}>تصفح المشاريع المتاحة وابدأ مسيرة العطاء</Text>
                    <TouchableOpacity style={styles.browseBtn} onPress={() => navigation.navigate('Projects')}>
                        <Text style={styles.browseBtnText}>تصفح المشاريع</Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FAFBFC' },
    header: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 50, paddingBottom: 15, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#EEE' },
    headerTitle: { fontSize: 20, fontWeight: '800', color: '#111' },
    headerBackBtn: { position: 'absolute', right: 20, top: 48, padding: 4 },
    content: { padding: 20 },
    itemsCount: { fontSize: 16, fontWeight: '700', color: '#111', marginBottom: 20, textAlign: 'right' },
    cartItemCard: { flexDirection: 'row-reverse', backgroundColor: '#fff', borderRadius: 16, padding: 15, marginBottom: 15, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 8, elevation: 2, borderWidth: 1, borderColor: '#F5F5F5' },
    itemImage: { width: 70, height: 70, borderRadius: 12, marginLeft: 15 },
    itemDetails: { flex: 1, alignItems: 'flex-end' },
    itemTitle: { fontSize: 15, fontWeight: '800', color: '#222', marginBottom: 8, textAlign: 'right' },
    itemAmount: { fontSize: 18, fontWeight: '900', color: '#00A651' },
    deleteBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFF0F1', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
    addMoreBtn: { flexDirection: 'row-reverse', justifyContent: 'center', alignItems: 'center', paddingVertical: 18, borderRadius: 16, borderStyle: 'dashed', borderWidth: 2, borderColor: '#A3E4C1', backgroundColor: '#F0FFF4', marginTop: 10 },
    addMoreText: { color: '#00A651', fontSize: 16, fontWeight: '700' },
    checkoutBar: { position: 'absolute', bottom: 0, width: '100%', backgroundColor: '#fff', paddingHorizontal: 20, paddingTop: 15, paddingBottom: 35, borderTopWidth: 1, borderTopColor: '#EEE', shadowColor: '#000', shadowOffset: { width: 0, height: -10 }, shadowOpacity: 0.06, shadowRadius: 15, elevation: 15, flexDirection: 'row-reverse', alignItems: 'center' },
    checkoutSummary: { flex: 1, alignItems: 'flex-end', paddingRight: 20 },
    checkoutLabel: { fontSize: 13, color: '#888', fontWeight: '600', marginBottom: 4 },
    checkoutTotal: { fontSize: 24, fontWeight: '900', color: '#111' },
    checkoutBtn: { flex: 1.5, flexDirection: 'row', backgroundColor: '#00A651', paddingVertical: 18, borderRadius: 16, justifyContent: 'center', alignItems: 'center', shadowColor: '#00A651', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 5 },
    checkoutBtnText: { color: '#fff', fontSize: 18, fontWeight: '800' },
    emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40 },
    emptyTitle: { fontSize: 22, fontWeight: '900', color: '#111', marginTop: 20, marginBottom: 10 },
    emptySub: { fontSize: 15, color: '#888', textAlign: 'center', lineHeight: 24, marginBottom: 30 },
    browseBtn: { backgroundColor: '#00A651', paddingHorizontal: 30, paddingVertical: 16, borderRadius: 16, shadowColor: '#00A651', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 5 },
    browseBtnText: { color: '#fff', fontSize: 16, fontWeight: '800' }
});
