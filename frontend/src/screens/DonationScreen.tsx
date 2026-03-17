import React, { useState } from 'react';
import { 
    View, Text, StyleSheet, SafeAreaView, TouchableOpacity, 
    ScrollView, TextInput, Alert, ActivityIndicator 
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { useUser } from '../context/UserContext';
import { ENDPOINTS } from '../config/api';

export default function DonationScreen({ route, navigation }: any) {
    const { user, isGuest } = useUser();
    const { project } = route.params || {};
    const [donationMode, setDonationMode] = useState<'one-time' | 'recurring'>('one-time');
    const [selectedCategory, setSelectedCategory] = useState('صدقة');
    const [recurrence, setRecurrence] = useState('شهري');
    const [amount, setAmount] = useState('1000');
    const [customAmount, setCustomAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState<'apple' | 'card' | 'wallet'>('card');
    const [loading, setLoading] = useState(false);
    const [currency, setCurrency] = useState<{code: string, symbol: string, label: string, rate: number}>({ 
        code: 'YER', symbol: 'ر.ي', label: 'ريال يمني', rate: 1 
    });

    const currencies = [
        { code: 'YER', symbol: 'ر.ي', label: 'ريال يمني', rate: 1 },
        { code: 'SAR', symbol: 'ر.س', label: 'ريال سعودي', rate: 0.0023 },
        { code: 'USD', symbol: '$', label: 'دولار أمريكي', rate: 0.00062 },
    ];

    // Card state
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');

    const categories = [
        { id: 'zakat', label: 'زكاة', icon: 'mosque-outline' },
        { id: 'sadaqah', label: 'صدقة', icon: 'heart-outline' },
        { id: 'orphans', label: 'كفالة أيتام', icon: 'people-outline' },
        { id: 'water', label: 'سقيا ماء', icon: 'water-outline' },
        { id: 'food', label: 'إطعام', icon: 'fast-food-outline' },
        { id: 'general', label: 'تبرعات عامة', icon: 'gift-outline' },
    ];

    const recurrenceOptions = [
        { id: 'daily', label: 'يومي' },
        { id: 'weekly', label: 'أسبوعي' },
        { id: 'monthly', label: 'شهري' },
    ];

    const finalAmount = parseFloat(customAmount || amount);

    const handleConfirm = async () => {
        if (isGuest) {
            Alert.alert(
                'تسجيل الدخول مطلوب',
                'يجب عليك تسجيل الدخول أولاً لتتمكن من التبرع.',
                [
                    { text: 'إلغاء', style: 'cancel' },
                    { text: 'تسجيل الدخول', onPress: () => navigation.navigate('Login') }
                ]
            );
            return;
        }

        if (!user?.token) {
            Alert.alert('تنبيه', 'يرجى تسجيل الدخول أولاً لتنفيذ عملية التبرع');
            return;
        }

        if (!finalAmount || finalAmount <= 0) {
            Alert.alert('خطأ', 'يرجى إدخال مبلغ تبرع صحيح');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(ENDPOINTS.DONATIONS.CREATE, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    project_id: project?.id && typeof project.id === 'number' ? project.id : 1, // Fallback to Project ID 1
                    amount: finalAmount,
                    currency: currency.code
                }),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert(
                    '🌟 تمت عملية التبرع بنجاح!',
                    `شكراً لك، لقد ساهمت بمبلغ ${currency.symbol}${finalAmount} في إحداث فارق حقيقي.\n\nبارك الله في عطائك وجعله في ميزان حسناتك.`,
                    [{ text: 'حسناً، شكراً', onPress: () => navigation.goBack?.() }]
                );
            } else {
                Alert.alert('خطأ في العملية', data.error || 'فشل معالجة التبرع');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('خطأ في الاتصال', 'تعذر الاتصال بالخادم. يرجى المحاولة لاحقاً.');
        } finally {
            setLoading(false);
        }
    };

    const paymentMethods = [
        { id: 'apple' as const, label: 'Apple Pay', sub: 'دفع سريع بمس واحد', icon: 'apple' as const },
        { id: 'card' as const, label: 'بطاقة ائتمانية', sub: 'Visa • MasterCard • Mada', icon: 'credit-card-outline' as const },
        { id: 'wallet' as const, label: 'المحفظة الإلكترونية', sub: 'رصيدك: 0.00 ر.ي', icon: 'wallet-outline' as const },
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

                {/* Mode Selector Tabs */}
                <View style={styles.modeTabs}>
                    <TouchableOpacity 
                        style={[styles.modeTab, donationMode === 'recurring' && styles.modeTabActive]} 
                        onPress={() => setDonationMode('recurring')}
                    >
                        <Ionicons name="repeat" size={20} color={donationMode === 'recurring' ? '#fff' : '#666'} />
                        <Text style={[styles.modeTabText, donationMode === 'recurring' && styles.modeTabTextActive]}>تبرع دوري</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.modeTab, donationMode === 'one-time' && styles.modeTabActive]} 
                        onPress={() => setDonationMode('one-time')}
                    >
                        <Ionicons name="flash-outline" size={20} color={donationMode === 'one-time' ? '#fff' : '#666'} />
                        <Text style={[styles.modeTabText, donationMode === 'one-time' && styles.modeTabTextActive]}>تبرع لمرة واحدة</Text>
                    </TouchableOpacity>
                </View>

                {/* Category Selection */}
                <View style={styles.sectionCard}>
                    <Text style={styles.sectionLabel}>اختر مجال التبرع</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
                        {categories.map(cat => (
                            <TouchableOpacity 
                                key={cat.id} 
                                style={[styles.categoryBtn]}
                                onPress={() => setSelectedCategory(cat.label)}
                            >
                                <View style={[styles.categoryIcon, selectedCategory === cat.label && styles.categoryIconActive]}>
                                    <Ionicons name={cat.icon as any} size={24} color={selectedCategory === cat.label ? '#fff' : '#00A651'} />
                                </View>
                                <Text style={[styles.categoryLabel, selectedCategory === cat.label && styles.categoryLabelActive]}>{cat.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Recurrence Options (Only for Recurring mode) */}
                {donationMode === 'recurring' && (
                    <View style={styles.sectionCard}>
                        <Text style={styles.sectionLabel}>تكرار التبرع</Text>
                        <View style={styles.recurrenceGrid}>
                            {recurrenceOptions.map(opt => (
                                <TouchableOpacity 
                                    key={opt.id} 
                                    style={[styles.recurrenceBtn, recurrence === opt.label && styles.recurrenceBtnActive]}
                                    onPress={() => setRecurrence(opt.label)}
                                >
                                    <Text style={[styles.recurrenceText, recurrence === opt.label && styles.recurrenceTextActive]}>{opt.label}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                )}

                {/* Currency Selector */}
                <View style={styles.sectionCard}>
                    <Text style={styles.sectionLabel}>عملة الدفع</Text>
                    <View style={styles.currencyRow}>
                        {currencies.map(c => (
                            <TouchableOpacity 
                                key={c.code} 
                                style={[styles.currencyBtn, currency.code === c.code && styles.currencyBtnActive]}
                                onPress={() => setCurrency(c)}
                            >
                                <Text style={[styles.currencyLabelBtn, currency.code === c.code && styles.currencyLabelBtnActive]}>{c.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Amount Picker */}
                <View style={styles.sectionCard}>
                    <Text style={styles.sectionLabel}>مبلغ التبرع ({currency.code})</Text>
                    <View style={styles.presetGrid}>
                        {['1000', '2500', '5000', '10000', '25000', '50000'].map(val => {
                            const converted = Math.round(parseInt(val) * currency.rate);
                            return (
                                <TouchableOpacity
                                    key={val}
                                    style={[styles.presetBox, amount === val && !customAmount && styles.presetBoxActive]}
                                    onPress={() => { setAmount(val); setCustomAmount(''); }}
                                >
                                    <Text style={[styles.presetText, amount === val && !customAmount && styles.presetTextActive]}>{currency.symbol}{converted}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                    <View style={styles.customRow}>
                        <View style={styles.customInputBox}>
                            <Text style={styles.currencyMark}>{currency.symbol}</Text>
                            <TextInput
                                style={styles.customInput}
                                placeholder="0.00"
                                keyboardType="decimal-pad"
                                value={customAmount}
                                onChangeText={(v) => { setCustomAmount(v); if(v) setAmount('0'); }}
                                textAlign="right"
                            />
                        </View>
                        <Text style={styles.customLabel}>أو أدخل مبلغاً مخصصاً</Text>
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
                        <Text style={styles.summaryVal}>{currency.symbol}{finalAmount}</Text>
                        <Text style={styles.summaryKey}>المبلغ المتبرع به</Text>
                    </View>
                    <View style={styles.lineDivider} />
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryVal}>{currency.symbol}0.00</Text>
                        <Text style={styles.summaryKey}>رسوم المعالجة (مجاني)</Text>
                    </View>
                    <View style={styles.lineDivider} />
                    <View style={styles.summaryRow}>
                        <Text style={[styles.summaryVal, { color: '#00A651', fontSize: 22 }]}>{currency.symbol}{finalAmount}</Text>
                        <Text style={[styles.summaryKey, { fontWeight: '900', color: '#111' }]}>الإجمالي</Text>
                    </View>
                </View>
            </ScrollView>

            {/* Sticky Confirm Button */}
            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm} activeOpacity={0.85} disabled={loading}>
                    <LinearGradient colors={['#00A651', '#007A3D']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.confirmGradient}>
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <>
                                <MaterialCommunityIcons name="shield-lock-outline" size={20} color="#fff" style={{ marginLeft: 12 }} />
                                <Text style={styles.confirmText}>تأكيد الدفع الآمن — {currency.symbol}{finalAmount}</Text>
                            </>
                        )}
                    </LinearGradient>
                </TouchableOpacity>
                <Text style={styles.secureNote}>🔒 جميع المعاملات مشفرة ومحمية بالكامل</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F4F7F5' },
    header: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 55, paddingBottom: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
    headerTitle: { fontSize: 20, fontWeight: '900', color: '#111' },

    modeTabs: { flexDirection: 'row-reverse', backgroundColor: '#fff', margin: 15, borderRadius: 16, padding: 6, gap: 6, shadowColor: '#000', shadowOpacity: 0.05, elevation: 2 },
    modeTab: { flex: 1, flexDirection: 'row-reverse', justifyContent: 'center', alignItems: 'center', paddingVertical: 12, borderRadius: 12, gap: 8 },
    modeTabActive: { backgroundColor: '#00A651' },
    modeTabText: { fontSize: 14, fontWeight: '800', color: '#666' },
    modeTabTextActive: { color: '#fff' },

    currencyRow: { flexDirection: 'row-reverse', gap: 10 },
    currencyBtn: { flex: 1, paddingVertical: 12, borderRadius: 12, backgroundColor: '#F8F9FA', alignItems: 'center', borderWidth: 1, borderColor: '#EEE' },
    currencyBtnActive: { backgroundColor: '#00A651', borderColor: '#00A651' },
    currencyLabelBtn: { fontSize: 13, fontWeight: '800', color: '#666' },
    currencyLabelBtnActive: { color: '#fff' },

    sectionCard: { backgroundColor: '#fff', padding: 20, marginBottom: 15, borderRadius: 20, marginHorizontal: 15, shadowColor: '#000', shadowOpacity: 0.03, elevation: 1 },
    sectionLabel: { fontSize: 16, fontWeight: '900', color: '#111', marginBottom: 15, textAlign: 'right' },
    
    categoryScroll: { flexDirection: 'row-reverse' },
    categoryBtn: { alignItems: 'center', marginLeft: 15, width: 80 },
    categoryIcon: { width: 55, height: 55, borderRadius: 18, backgroundColor: '#F0FAF3', justifyContent: 'center', alignItems: 'center', marginBottom: 8, borderWidth: 1, borderColor: '#E5F3EB' },
    categoryIconActive: { backgroundColor: '#00A651', borderColor: '#00A651' },
    categoryLabel: { fontSize: 12, fontWeight: '700', color: '#666', textAlign: 'center' },
    categoryLabelActive: { color: '#00A651', fontWeight: '900' },

    recurrenceGrid: { flexDirection: 'row-reverse', gap: 10 },
    recurrenceBtn: { flex: 1, paddingVertical: 12, borderRadius: 12, backgroundColor: '#F8F9FA', alignItems: 'center', borderWidth: 1, borderColor: '#EEE' },
    recurrenceBtnActive: { backgroundColor: '#E5FAEB', borderColor: '#00A651' },
    recurrenceText: { fontSize: 14, fontWeight: '800', color: '#666' },
    recurrenceTextActive: { color: '#00A651' },

    presetGrid: { flexDirection: 'row-reverse', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
    presetBox: { width: '31%', paddingVertical: 14, borderRadius: 12, alignItems: 'center', backgroundColor: '#F8F9FA', borderWidth: 1, borderColor: '#EEE' },
    presetBoxActive: { backgroundColor: '#00A651', borderColor: '#00A651' },
    presetText: { fontSize: 16, fontWeight: '800', color: '#555' },
    presetTextActive: { color: '#fff' },

    customRow: { flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between' },
    customLabel: { fontSize: 13, fontWeight: '700', color: '#888' },
    customInputBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F9FA', borderRadius: 12, paddingHorizontal: 12, height: 48, borderWidth: 1, borderColor: '#DDD', width: '45%' },
    currencyMark: { fontSize: 18, fontWeight: '800', color: '#888', marginLeft: 5 },
    customInput: { flex: 1, height: '100%', fontSize: 18, fontWeight: '800', color: '#111' },

    paySection: { backgroundColor: '#fff', padding: 20, marginBottom: 15, borderRadius: 20, marginHorizontal: 15 },
    methodCard: { flexDirection: 'row-reverse', alignItems: 'center', padding: 15, borderRadius: 16, borderWidth: 1, borderColor: '#EEE', marginBottom: 10, backgroundColor: '#FAFBFB' },
    methodCardActive: { borderColor: '#00A651', backgroundColor: '#F4FAF6' },
    methodInfo: { flex: 1, paddingRight: 12, alignItems: 'flex-end' },
    methodTitle: { fontSize: 15, fontWeight: '800', color: '#111', marginBottom: 2 },
    methodSub: { fontSize: 11, color: '#999' },
    radioBtn: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#DDD', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
    radioBtnActive: { borderColor: '#00A651' },
    radioBtnInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#00A651' },

    cardSection: { backgroundColor: '#fff', padding: 20, marginBottom: 15, borderRadius: 20, marginHorizontal: 15 },
    field: { backgroundColor: '#F8F9FA', borderRadius: 12, height: 50, paddingHorizontal: 15, borderWidth: 1, borderColor: '#EEE', fontSize: 14, color: '#111', marginBottom: 10 },
    
    summaryCard: { backgroundColor: '#fff', margin: 15, borderRadius: 20, padding: 20, shadowColor: '#000', shadowOpacity: 0.05, elevation: 3 },
    summaryRow: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
    summaryKey: { fontSize: 14, color: '#777', fontWeight: '700' },
    summaryVal: { fontSize: 16, fontWeight: '900', color: '#111' },
    lineDivider: { height: 1, backgroundColor: '#F5F5F5', marginVertical: 5 },

    bottomBar: { position: 'absolute', bottom: 0, width: '100%', paddingHorizontal: 20, paddingTop: 15, paddingBottom: 35, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#EEE', shadowColor: '#000', shadowOffset: { width: 0, height: -10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 25 },
    confirmBtn: { width: '100%', borderRadius: 18, overflow: 'hidden', marginBottom: 8 },
    confirmGradient: { flexDirection: 'row-reverse', justifyContent: 'center', alignItems: 'center', paddingVertical: 18 },
    confirmText: { color: '#fff', fontSize: 17, fontWeight: '900' },
    secureNote: { fontSize: 11, color: '#999', textAlign: 'center', fontWeight: '700' },
});
