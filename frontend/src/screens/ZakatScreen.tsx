import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

export default function ZakatScreen({ navigation }: any) {
    const [activeTab, setActiveTab] = useState('money');
    const [amount, setAmount] = useState('');
    const [goldWeight, setGoldWeight] = useState('');
    const [silverWeight, setSilverWeight] = useState('');
    const [goldPrice] = useState(65.50); // Mocked price per gram in USD
    const [silverPrice] = useState(0.85); // Mocked price per gram in USD
    const [currency, setCurrency] = useState<{code: string, symbol: string, rate: number}>({ code: 'USD', symbol: '$', rate: 1 });

    const currencies = [
        { code: 'USD', symbol: '$', label: 'USD', rate: 1 },
        { code: 'SAR', symbol: 'ر.س', label: 'SAR', rate: 3.75 },
        { code: 'YER', symbol: 'ر.ي', label: 'YER', rate: 1600 },
    ];

    const zakatCategories = [
        { id: 'money', label: 'زكاة المال', icon: 'cash-multiple' as const },
        { id: 'gold', label: 'زكاة الذهب', icon: 'gold' as const },
        { id: 'silver', label: 'النقرة / الفضة', icon: 'circle-outline' as const },
        { id: 'trade', label: 'عروض التجارة', icon: 'store' as const },
    ];

    const calculateZakat = () => {
        let totalVal = 0;
        if (activeTab === 'money' || activeTab === 'trade') {
            totalVal = parseFloat(amount) || 0;
        } else if (activeTab === 'gold') {
            totalVal = (parseFloat(goldWeight) || 0) * goldPrice;
        } else if (activeTab === 'silver') {
            totalVal = (parseFloat(silverWeight) || 0) * silverPrice;
        }
        
        if (totalVal <= 0) return 0;
        return (totalVal * 0.025) * currency.rate;
    };

    const dueZakat = calculateZakat();
    const formattedZakat = dueZakat.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerBackBtn} onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-down" size={28} color="#111" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>حاسبة الزكاة الرقمية</Text>
                <View style={{ width: 28 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>

                {/* Categories Grid */}
                <View style={styles.categoryGrid}>
                    {zakatCategories.map(cat => (
                        <TouchableOpacity
                            key={cat.id}
                            style={[styles.catBox, activeTab === cat.id && styles.catBoxActive]}
                            onPress={() => setActiveTab(cat.id)}
                        >
                            <View style={[styles.catIconWrap, activeTab === cat.id && styles.catIconWrapActive]}>
                                <MaterialCommunityIcons
                                    name={cat.icon}
                                    size={24}
                                    color={activeTab === cat.id ? '#fff' : '#00A651'}
                                />
                            </View>
                            <Text style={[styles.catLabel, activeTab === cat.id && styles.catLabelActive]}>
                                {cat.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Currency Selector */}
                <View style={styles.currencyWrapper}>
                    {currencies.map(c => (
                        <TouchableOpacity 
                            key={c.code} 
                            style={[styles.currencyBtn, currency.code === c.code && styles.currencyBtnActive]}
                            onPress={() => setCurrency(c)}
                        >
                            <Text style={[styles.currencyText, currency.code === c.code && styles.currencyTextActive]}>{c.code}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Dynamic Input Area */}
                <View style={styles.inputCard}>
                    {activeTab === 'money' || activeTab === 'trade' ? (
                        <>
                            <Text style={styles.inputTitle}>أدخل المبلغ الإجمالي ({currency.symbol})</Text>
                            <View style={styles.inputWrapper}>
                                <Text style={styles.currencySymbol}>{currency.symbol}</Text>
                                <TextInput
                                    style={styles.amountInput}
                                    placeholder="0"
                                    keyboardType="numeric"
                                    value={amount}
                                    onChangeText={setAmount}
                                    textAlign="right"
                                />
                            </View>
                        </>
                    ) : activeTab === 'gold' ? (
                        <>
                            <View style={styles.priceInfo}>
                                <Text style={styles.priceText}>سعر الذهب الحالي: ${goldPrice}/جم</Text>
                            </View>
                            <Text style={styles.inputTitle}>وزن الذهب بالجرام (عيار 24)</Text>
                            <View style={styles.inputWrapper}>
                                <Text style={styles.currencySymbol}>جم</Text>
                                <TextInput
                                    style={styles.amountInput}
                                    placeholder="0"
                                    keyboardType="numeric"
                                    value={goldWeight}
                                    onChangeText={setGoldWeight}
                                    textAlign="right"
                                />
                            </View>
                        </>
                    ) : (
                        <>
                            <View style={styles.priceInfo}>
                                <Text style={styles.priceText}>سعر الفضة الحالي: ${silverPrice}/جم</Text>
                            </View>
                            <Text style={styles.inputTitle}>وزن الفضة بالجرام</Text>
                            <View style={styles.inputWrapper}>
                                <Text style={styles.currencySymbol}>جم</Text>
                                <TextInput
                                    style={styles.amountInput}
                                    placeholder="0"
                                    keyboardType="numeric"
                                    value={silverWeight}
                                    onChangeText={setSilverWeight}
                                    textAlign="right"
                                />
                            </View>
                        </>
                    )}
                    <View style={styles.nissabSection}>
                        <Ionicons name="information-circle-outline" size={16} color="#00A651" />
                        <Text style={styles.nissabNote}>نصاب الزكاة الحالي يقدر بما يعادل 85 جرام ذهب.</Text>
                    </View>
                </View>

                {/* Results Card */}
                <LinearGradient colors={['#00A651', '#007A3D']} style={styles.resultCard}>
                    <Text style={styles.resultTitle}>الزكاة المستحقة ({currency.code})</Text>
                    <Text style={styles.resultValue}>{currency.symbol}{formattedZakat}</Text>
                    <View style={styles.divider} />
                    <Text style={styles.resultSub}>سيتم توجيه مبلغ الزكاة لمستحقيها الشرعيين فوراً بعد الدفع.</Text>
                </LinearGradient>

                <View style={{ height: 160 }} />
            </ScrollView>

            {/* Sticky Bottom Action */}
            <View style={styles.bottomAction}>
                <TouchableOpacity
                    style={[styles.payBtn, dueZakat <= 0 && styles.payBtnDisabled]}
                    disabled={dueZakat <= 0}
                    onPress={() => navigation.navigate('DonateModal')}
                >
                    <LinearGradient colors={['#00A651', '#007A3D']} style={styles.payGradient}>
                        <MaterialCommunityIcons name="heart-plus-outline" size={20} color="#fff" style={{ marginLeft: 10 }} />
                        <Text style={styles.payBtnText}>دفع الزكاة الآن — {currency.symbol}{formattedZakat}</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA' },
    header: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', paddingTop: 55, paddingBottom: 15, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#F0F0F0', paddingHorizontal: 20 },
    headerTitle: { fontSize: 20, fontWeight: '900', color: '#111' },
    headerBackBtn: { padding: 4 },
    content: { padding: 20 },
    currencyWrapper: { flexDirection: 'row-reverse', justifyContent: 'center', gap: 10, marginBottom: 20 },
    currencyBtn: { paddingHorizontal: 20, paddingVertical: 8, borderRadius: 12, backgroundColor: '#fff', borderWidth: 1, borderColor: '#EEE' },
    currencyBtnActive: { backgroundColor: '#00A651', borderColor: '#00A651' },
    currencyText: { fontSize: 13, fontWeight: '800', color: '#666' },
    currencyTextActive: { color: '#fff' },
    categoryGrid: { flexDirection: 'row-reverse', flexWrap: 'wrap', gap: 12, marginBottom: 25 },
    catBox: { width: '22%', backgroundColor: '#fff', paddingVertical: 15, borderRadius: 16, alignItems: 'center', borderWidth: 1, borderColor: '#EEE' },
    catBoxActive: { borderColor: '#00A651', backgroundColor: '#F0FAF3' },
    catIconWrap: { width: 44, height: 44, borderRadius: 14, backgroundColor: '#F0FAF3', justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
    catIconWrapActive: { backgroundColor: '#00A651' },
    catLabel: { fontSize: 10, fontWeight: '700', color: '#666', textAlign: 'center' },
    catLabelActive: { color: '#00A651', fontWeight: '900' },
    inputCard: { backgroundColor: '#fff', borderRadius: 24, padding: 20, shadowColor: '#000', shadowOpacity: 0.04, elevation: 3, marginBottom: 25 },
    inputTitle: { fontSize: 14, fontWeight: '800', color: '#333', marginBottom: 12, textAlign: 'right' },
    inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F9FA', borderRadius: 16, paddingHorizontal: 15, height: 60, borderWidth: 1, borderColor: '#EEE', marginBottom: 12 },
    currencySymbol: { fontSize: 18, fontWeight: '800', color: '#999', marginLeft: 10 },
    amountInput: { flex: 1, height: '100%', fontSize: 24, fontWeight: '900', color: '#111' },
    priceInfo: { backgroundColor: '#FFF9E5', padding: 8, borderRadius: 10, alignSelf: 'flex-end', marginBottom: 12 },
    priceText: { color: '#D4A017', fontSize: 11, fontWeight: '800' },
    nissabSection: { flexDirection: 'row-reverse', alignItems: 'center', gap: 8 },
    nissabNote: { fontSize: 11, color: '#00A651', fontWeight: '700' },
    resultCard: { borderRadius: 28, padding: 30, alignItems: 'center', shadowColor: '#00A651', shadowOpacity: 0.3, elevation: 10 },
    resultTitle: { fontSize: 14, color: '#E5FAEB', fontWeight: '700', marginBottom: 8 },
    resultValue: { fontSize: 48, color: '#fff', fontWeight: '900', marginBottom: 15 },
    divider: { width: '40%', height: 1, backgroundColor: 'rgba(255,255,255,0.2)', marginBottom: 15 },
    resultSub: { fontSize: 12, color: '#C1F0D4', textAlign: 'center', lineHeight: 18 },
    bottomAction: { position: 'absolute', bottom: 0, width: '100%', paddingHorizontal: 20, paddingVertical: 20, paddingBottom: 40, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#EEE' },
    payBtn: { borderRadius: 18, overflow: 'hidden' },
    payBtnDisabled: { opacity: 0.5 },
    payGradient: { flexDirection: 'row-reverse', paddingVertical: 18, justifyContent: 'center', alignItems: 'center' },
    payBtnText: { color: '#fff', fontSize: 17, fontWeight: '900' },
});
