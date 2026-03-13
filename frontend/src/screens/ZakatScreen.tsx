import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function ZakatScreen({ navigation }: any) {
    const [activeTab, setActiveTab] = useState('money');
    const [amount, setAmount] = useState('');

    const zakatCategories = [
        { id: 'money', label: 'زكاة المال', icon: 'cash-multiple' as const },
        { id: 'gold', label: 'زكاة الذهب', icon: 'gold' as const },
        { id: 'trade', label: 'عروض التجارة', icon: 'store' as const },
        { id: 'farm', label: 'زكاة الزروع', icon: 'sprout' as const },
    ];

    const calculateZakat = () => {
        const val = parseFloat(amount);
        if (isNaN(val) || val <= 0) return 0;
        return val * 0.025;
    };

    const dueZakat = calculateZakat();
    const formattedZakat = dueZakat.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" backgroundColor="#fff" />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>حاسبة الزكاة الدقيقة</Text>
                <TouchableOpacity style={styles.headerBackBtn} onPress={() => navigation.goBack()}>
                    <Ionicons name="close" size={28} color="#111" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>

                {/* Categories Grid */}
                <Text style={styles.sectionTitle}>اختر نوع الزكاة</Text>
                <View style={styles.categoryGrid}>
                    {zakatCategories.map(cat => (
                        <TouchableOpacity
                            key={cat.id}
                            style={[styles.catBox, activeTab === cat.id && styles.catBoxActive]}
                            onPress={() => setActiveTab(cat.id)}
                        >
                            <MaterialCommunityIcons
                                name={cat.icon}
                                size={28}
                                color={activeTab === cat.id ? '#00A651' : '#888'}
                                style={{ marginBottom: 10 }}
                            />
                            <Text style={[styles.catLabel, activeTab === cat.id && styles.catLabelActive]}>
                                {cat.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Input Area */}
                <View style={styles.inputCard}>
                    <Text style={styles.inputTitle}>أدخل المبلغ الإجمالي المتوفر لديك ($)</Text>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.currencySymbol}>$</Text>
                        <TextInput
                            style={styles.amountInput}
                            placeholder="0"
                            keyboardType="numeric"
                            value={amount}
                            onChangeText={setAmount}
                            textAlign="right"
                        />
                    </View>
                    <Text style={styles.nissabNote}>* نصاب زكاة المال الحالي يقدر بحوالي $4,500</Text>
                </View>

                {/* Results Card */}
                <View style={styles.resultCard}>
                    <Text style={styles.resultTitle}>الزكاة المستحقة عليك</Text>
                    <Text style={styles.resultValue}>${formattedZakat}</Text>
                    <Text style={styles.resultSub}>تم الحساب بنسبة 2.5% (ربع العشر)</Text>
                </View>

                <View style={{ height: 140 }} />
            </ScrollView>

            {/* Sticky Bottom Action */}
            <View style={styles.bottomAction}>
                <TouchableOpacity
                    style={[styles.payBtn, dueZakat <= 0 && styles.payBtnDisabled]}
                    disabled={dueZakat <= 0}
                    onPress={() => navigation.navigate('DonateModal')}
                >
                    <MaterialCommunityIcons name="heart-plus-outline" size={20} color="#fff" style={{ marginLeft: 10 }} />
                    <Text style={styles.payBtnText}>إخراج الزكاة الآن (${formattedZakat})</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FAFBFC' },
    header: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 50, paddingBottom: 15, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#EEE' },
    headerTitle: { fontSize: 20, fontWeight: '800', color: '#111' },
    headerBackBtn: { position: 'absolute', right: 20, top: 48, padding: 4 },
    content: { padding: 20 },
    sectionTitle: { fontSize: 18, fontWeight: '800', color: '#111', marginBottom: 15, textAlign: 'right' },
    categoryGrid: { flexDirection: 'row-reverse', flexWrap: 'wrap', gap: 15, marginBottom: 30 },
    catBox: { width: '47%', backgroundColor: '#fff', paddingVertical: 24, borderRadius: 20, alignItems: 'center', borderWidth: 1, borderColor: '#EEE', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 5, elevation: 2 },
    catBoxActive: { borderColor: '#00A651', backgroundColor: '#F0FFF4' },
    catLabel: { fontSize: 14, fontWeight: '600', color: '#666' },
    catLabelActive: { color: '#00A651', fontWeight: '800' },
    inputCard: { backgroundColor: '#fff', borderRadius: 20, padding: 25, shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.05, shadowRadius: 15, elevation: 4, marginBottom: 25 },
    inputTitle: { fontSize: 15, fontWeight: '700', color: '#333', marginBottom: 15, textAlign: 'right' },
    inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F9FA', borderRadius: 16, paddingHorizontal: 20, height: 70, borderWidth: 1, borderColor: '#EEE', marginBottom: 15 },
    currencySymbol: { fontSize: 24, fontWeight: '800', color: '#888', marginLeft: 15 },
    amountInput: { flex: 1, height: '100%', fontSize: 32, fontWeight: '800', color: '#111' },
    nissabNote: { fontSize: 12, color: '#888', textAlign: 'right' },
    resultCard: { backgroundColor: '#00A651', borderRadius: 24, padding: 35, alignItems: 'center', shadowColor: '#00A651', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 15, elevation: 8 },
    resultTitle: { fontSize: 16, color: '#E5FAEB', fontWeight: '600', marginBottom: 10 },
    resultValue: { fontSize: 48, color: '#fff', fontWeight: '900', marginBottom: 10 },
    resultSub: { fontSize: 13, color: '#C1F0D4', textAlign: 'center' },
    bottomAction: { position: 'absolute', bottom: 0, width: '100%', paddingHorizontal: 20, paddingVertical: 20, paddingBottom: 35, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#EEE', shadowColor: '#000', shadowOffset: { width: 0, height: -10 }, shadowOpacity: 0.05, shadowRadius: 15, elevation: 15 },
    payBtn: { flexDirection: 'row-reverse', backgroundColor: '#00A651', paddingVertical: 18, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
    payBtnDisabled: { backgroundColor: '#CCC' },
    payBtnText: { color: '#fff', fontSize: 17, fontWeight: '900' },
});
