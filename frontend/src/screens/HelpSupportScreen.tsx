import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Linking, Alert } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

export default function HelpSupportScreen({ navigation }: any) {
    const [message, setMessage] = useState('');

    const contactMethods = [
        { id: 'phone', label: 'اتصل بنا', value: '+974 4466 7711', icon: 'call-outline', color: '#00A651' },
        { id: 'whatsapp', label: 'واتساب', value: '+974 5555 4444', icon: 'logo-whatsapp', color: '#25D366' },
        { id: 'email', label: 'البريد الإلكتروني', value: 'support@ataa.org', icon: 'mail-outline', color: '#007A3D' },
    ];

    const faqs = [
        { q: 'كيف يمكنني التبرع؟', a: 'يمكنك التبرع عبر اختيار المشروع المناسب والضغط على "تبرع الآن" واختيار طريقة الدفع المفضلة لديك.' },
        { q: 'هل تبرعاتي تصل لمستحقيها؟', a: 'نعم، نحن نضمن وصول 100% من التبرعات المخصصة للمشاريع إلى مستحقيها مع تقديم تقارير دورية.' },
        { q: 'كيف أحصل على إيصال التبرع؟', a: 'بعد كل عملية تبرع ناجحة، سيتم إرسال إيصال إلكتروني إلى بريدك المسجل، كما يمكنك تحميله من قسم "تبرعاتي".' },
    ];

    const sendMessage = () => {
        if (!message) return;
        Alert.alert('شكراً لك', 'تم استلام رسالتك، وسيقوم فريق الدعم بالرد عليك في أقرب وقت ممكن.');
        setMessage('');
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />
            
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-forward" size={28} color="#111" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>المساعدة والدعم</Text>
                <View style={{ width: 28 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                
                {/* Contact Section */}
                <Text style={styles.sectionTitle}>تواصل معنا مباشرة</Text>
                <View style={styles.contactGrid}>
                    {contactMethods.map(m => (
                        <TouchableOpacity key={m.id} style={styles.contactItem} onPress={() => Alert.alert(m.label, m.value)}>
                            <View style={[styles.contactIconBg, { backgroundColor: m.color + '15' }]}>
                                <Ionicons name={m.icon as any} size={28} color={m.color} />
                            </View>
                            <Text style={styles.contactLabel}>{m.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Quick Message */}
                <View style={styles.messageCard}>
                    <Text style={styles.cardTitle}>أرسل لنا استفسارك</Text>
                    <TextInput 
                        style={styles.messageInput} 
                        placeholder="اكتب رسالتك هنا..." 
                        multiline 
                        numberOfLines={4}
                        value={message}
                        onChangeText={setMessage}
                        textAlign="right"
                    />
                    <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
                        <LinearGradient colors={['#00A651', '#007A3D']} style={styles.sendGradient}>
                            <Text style={styles.sendText}>إرسال الرسالة</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                {/* FAQ Section */}
                <Text style={styles.sectionTitle}>الأسئلة الشائعة</Text>
                {faqs.map((f, i) => (
                    <View key={i} style={styles.faqCard}>
                        <Text style={styles.faqQ}>{f.q}</Text>
                        <Text style={styles.faqA}>{f.a}</Text>
                    </View>
                ))}

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA' },
    header: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 55, paddingBottom: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
    headerTitle: { fontSize: 20, fontWeight: '900', color: '#111' },
    scrollContent: { padding: 20 },
    sectionTitle: { fontSize: 18, fontWeight: '900', color: '#111', marginBottom: 15, textAlign: 'right' },
    contactGrid: { flexDirection: 'row-reverse', justifyContent: 'space-between', marginBottom: 30 },
    contactItem: { width: '30%', backgroundColor: '#fff', borderRadius: 20, paddingVertical: 20, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.03, elevation: 2 },
    contactIconBg: { width: 55, height: 55, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
    contactLabel: { fontSize: 13, fontWeight: '800', color: '#444' },
    messageCard: { backgroundColor: '#fff', borderRadius: 24, padding: 20, shadowColor: '#000', shadowOpacity: 0.05, elevation: 3, marginBottom: 30 },
    cardTitle: { fontSize: 16, fontWeight: '900', color: '#111', marginBottom: 15, textAlign: 'right' },
    messageInput: { backgroundColor: '#F8F9FA', borderRadius: 16, padding: 15, height: 120, textAlignVertical: 'top', borderWidth: 1, borderColor: '#EEE', fontSize: 15, marginBottom: 15 },
    sendBtn: { borderRadius: 16, overflow: 'hidden' },
    sendGradient: { paddingVertical: 16, alignItems: 'center' },
    sendText: { color: '#fff', fontSize: 16, fontWeight: '900' },
    faqCard: { backgroundColor: '#fff', borderRadius: 18, padding: 18, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.02, elevation: 1 },
    faqQ: { fontSize: 15, fontWeight: '900', color: '#111', marginBottom: 8, textAlign: 'right' },
    faqA: { fontSize: 14, color: '#666', lineHeight: 22, textAlign: 'right' },
});
