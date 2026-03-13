import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

export default function DonationScreen({ route, navigation }: any) {
    const presetAmounts = ['10', '25', '50', '100', '250', '500'];

    const [amount, setAmount] = useState(route.params?.amount?.toString() || '50');
    const [customAmount, setCustomAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState<'apple' | 'card' | 'wallet'>('card');
    const [step, setStep] = useState<1 | 2>(1);
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');

    const finalAmount = customAmount || amount;

    const handleConfirm = () => {
        Alert.alert(
            '🌟 تمت عملية التبرع بنجاح!',
            `شكراً لك، لقد ساهمت بمبلغ $${finalAmount} في إحداث فارق حقيقي.\n\nبارك الله في عطائك وجعله في ميزان حسناتك.`,
            [{ text: 'حسناً، شكراً', onPress: () => navigation.goBack?.() ?? null }]
        );
    };

    const paymentMethods = [
        { id: 'apple' as const, label: 'Apple Pay', sub: 'دفع سريع بمس واحد', icon: 'apple' as const },
        { id: 'card' as const, label: 'بطاقة ائتمانية', sub: 'Visa • MasterCard • Mada', icon: 'credit-card-outline' as const },
        { id: 'wallet' as const, label: 'المحفظة الإلكترونية', sub: 'رصيدك: $35.00', icon: 'wallet-outline' as const },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" backgroundColor="#fff" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack?.()}>
                    <Ionicons name="chevron-down" size={28} color="#111" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>إتمام التبرع</Text>
                <View style={{ width: 28 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 160 }}>

                {/* Amount Picker */}
                <View style={styles.amountSection}>
                    <Text style={styles.sectionLabel}>اختر مبلغ التبرع بالدولار</Text>
                    <View style={styles.presetGrid}>
                        {presetAmounts.map(val => (
                            <TouchableOpacity
                                key={val}
                                style={[styles.presetBox, amount === val && !customAmount && styles.presetBoxActive]}
                                onPress={() => { setAmount(val); setCustomAmount(''); }}
                            >
                                <Text style={[styles.presetText, amount === val && !customAmount && styles.presetTextActive]}>${val}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View style={styles.customRow}>
                        <Text style={styles.customLabel}>مبلغ مخصص</Text>
                        <View style={styles.customInputBox}>
                            <Text style={styles.currencyMark}>$</Text>
                            <TextInput
                                style={styles.customInput}
                                placeholder="0.00"
                                keyboardType="decimal-pad"
                                value={customAmount}
                                onChangeText={setCustomAmount}
                                textAlign="right"
                            />
                        </View>
                    </View>
                </View>

                {/* Payment Method */}
                <View style={styles.paySection}>
                    <Text style={styles.sectionLabel}>طريقة الدفع</Text>
                    {paymentMethods.map(m => (
                        <TouchableOpacity
                            key={m.id}
                            style={[styles.methodCard, paymentMethod === m.id && styles.methodCardActive]}
                            onPress={() => setPaymentMethod(m.id)}
                        >
                            <View style={[styles.radioBtn, paymentMethod === m.id && styles.radioBtnActive]}>
                                {paymentMethod === m.id && <View style={styles.radioBtnInner} />}
                            </View>
                            <View style={styles.methodInfo}>
                                <Text style={[styles.methodTitle, paymentMethod === m.id && { color: '#00A651' }]}>{m.label}</Text>
                                <Text style={styles.methodSub}>{m.sub}</Text>
                            </View>
                            <MaterialCommunityIcons
                                name={m.icon}
                                size={28}
                                color={paymentMethod === m.id ? '#00A651' : '#999'}
                            />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Card Details (credit card only) */}
                {paymentMethod === 'card' && (
                    <View style={styles.cardSection}>
                        <Text style={styles.sectionLabel}>تفاصيل البطاقة</Text>
                        <TextInput style={styles.field} placeholder="الاسم على البطاقة" value={cardName} onChangeText={setCardName} textAlign="right" />
                        <TextInput style={styles.field} placeholder="•••• •••• •••• ••••" value={cardNumber} onChangeText={setCardNumber} keyboardType="number-pad" maxLength={19} textAlign="right" />
                        <View style={{ flexDirection: 'row', gap: 12 }}>
                            <TextInput style={[styles.field, { flex: 1 }]} placeholder="MM/YY" value={expiry} onChangeText={setExpiry} keyboardType="number-pad" maxLength={5} textAlign="center" />
                            <TextInput style={[styles.field, { flex: 1 }]} placeholder="CVV" value={cvv} onChangeText={setCvv} keyboardType="number-pad" maxLength={3} secureTextEntry textAlign="center" />
                        </View>
                    </View>
                )}

                {/* Summary */}
                <View style={styles.summaryCard}>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryVal}>${finalAmount}</Text>
                        <Text style={styles.summaryKey}>المبلغ المتبرع به</Text>
                    </View>
                    <View style={styles.lineDivider} />
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryVal}>$0.00</Text>
                        <Text style={styles.summaryKey}>رسوم المعالجة (مجاني)</Text>
                    </View>
                    <View style={styles.lineDivider} />
                    <View style={styles.summaryRow}>
                        <Text style={[styles.summaryVal, { color: '#00A651', fontSize: 22 }]}>${finalAmount}</Text>
                        <Text style={[styles.summaryKey, { fontWeight: '900', color: '#111' }]}>الإجمالي</Text>
                    </View>
                </View>
            </ScrollView>

            {/* Sticky Confirm Button */}
            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm} activeOpacity={0.85}>
                    <LinearGradient colors={['#00A651', '#007A3D']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.confirmGradient}>
                        <MaterialCommunityIcons name="shield-lock-outline" size={20} color="#fff" style={{ marginLeft: 12 }} />
                        <Text style={styles.confirmText}>تأكيد الدفع الآمن — ${finalAmount}</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <Text style={styles.secureNote}>🔒 جميع المعاملات مشفرة ومحمية بالكامل</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA' },
    header: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 55, paddingBottom: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
    headerTitle: { fontSize: 20, fontWeight: '900', color: '#111' },
    amountSection: { backgroundColor: '#fff', padding: 20, marginBottom: 12 },
    sectionLabel: { fontSize: 16, fontWeight: '800', color: '#333', marginBottom: 15, textAlign: 'right' },
    presetGrid: { flexDirection: 'row-reverse', flexWrap: 'wrap', gap: 10, marginBottom: 15 },
    presetBox: { width: '30%', paddingVertical: 14, borderRadius: 16, alignItems: 'center', backgroundColor: '#F5F6F8', borderWidth: 1, borderColor: '#EEE' },
    presetBoxActive: { backgroundColor: '#E5FAEB', borderColor: '#00A651' },
    presetText: { fontSize: 18, fontWeight: '700', color: '#555' },
    presetTextActive: { color: '#00A651', fontWeight: '900' },
    customRow: { flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between' },
    customLabel: { fontSize: 14, fontWeight: '700', color: '#555' },
    customInputBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F6F8', borderRadius: 14, paddingHorizontal: 15, height: 52, borderWidth: 1, borderColor: '#DDD', width: '60%' },
    currencyMark: { fontSize: 20, fontWeight: '800', color: '#888', marginLeft: 8 },
    customInput: { flex: 1, height: '100%', fontSize: 20, fontWeight: '800', color: '#111' },
    paySection: { backgroundColor: '#fff', padding: 20, marginBottom: 12 },
    methodCard: { flexDirection: 'row-reverse', alignItems: 'center', padding: 18, borderRadius: 16, borderWidth: 1, borderColor: '#EEE', marginBottom: 12, backgroundColor: '#FAFAFA' },
    methodCardActive: { borderColor: '#00A651', backgroundColor: '#F9FFF9' },
    methodInfo: { flex: 1, paddingRight: 15, alignItems: 'flex-end' },
    methodTitle: { fontSize: 16, fontWeight: '800', color: '#111', marginBottom: 3 },
    methodSub: { fontSize: 12, color: '#888' },
    radioBtn: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: '#DDD', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
    radioBtnActive: { borderColor: '#00A651' },
    radioBtnInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#00A651' },
    cardSection: { backgroundColor: '#fff', padding: 20, marginBottom: 12 },
    field: { backgroundColor: '#F5F6F8', borderRadius: 14, height: 55, paddingHorizontal: 18, borderWidth: 1, borderColor: '#EEE', fontSize: 15, color: '#111', marginBottom: 12 },
    summaryCard: { backgroundColor: '#fff', margin: 20, borderRadius: 20, padding: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 12, elevation: 3 },
    summaryRow: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 },
    summaryKey: { fontSize: 15, color: '#666', fontWeight: '600' },
    summaryVal: { fontSize: 17, fontWeight: '800', color: '#111' },
    lineDivider: { height: 1, backgroundColor: '#F0F0F0' },
    bottomBar: { position: 'absolute', bottom: 0, width: '100%', paddingHorizontal: 20, paddingTop: 15, paddingBottom: 35, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#EEE', shadowColor: '#000', shadowOffset: { width: 0, height: -10 }, shadowOpacity: 0.06, shadowRadius: 20, elevation: 20, alignItems: 'center' },
    confirmBtn: { width: '100%', borderRadius: 18, overflow: 'hidden', marginBottom: 10 },
    confirmGradient: { flexDirection: 'row-reverse', justifyContent: 'center', alignItems: 'center', paddingVertical: 20 },
    confirmText: { color: '#fff', fontSize: 18, fontWeight: '900' },
    secureNote: { fontSize: 12, color: '#888', fontWeight: '600' },
});
