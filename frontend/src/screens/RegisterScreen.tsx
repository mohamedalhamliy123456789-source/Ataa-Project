import React, { useState } from 'react';
import {
    View, Text, StyleSheet, SafeAreaView, TouchableOpacity,
    TextInput, ScrollView, KeyboardAvoidingView, Platform
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function RegisterScreen({ onLogin, navigation }: any) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [agree, setAgree] = useState(false);

    const handleRegister = () => {
        setTimeout(() => onLogin?.(), 1200);
    };

    return (
        <SafeAreaView style={styles.root}>
            <LinearGradient colors={['#005C2B', '#00A651']} style={styles.hero}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation?.goBack?.()}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.heroTitle}>حساب جديد</Text>
                <Text style={styles.heroSub}>انضم لآلاف المتبرعين وكن جزءاً من التغيير</Text>
            </LinearGradient>

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.formWrap} keyboardShouldPersistTaps="handled">
                    <View style={styles.card}>

                        {[
                            { label: 'الاسم الكامل', placeholder: 'محمد أحمد', value: name, setter: setName, icon: 'person-outline', kb: 'default' },
                            { label: 'البريد الإلكتروني', placeholder: 'example@email.com', value: email, setter: setEmail, icon: 'mail-outline', kb: 'email-address' },
                            { label: 'رقم الهاتف', placeholder: '+967 7XX XXX XXX', value: phone, setter: setPhone, icon: 'call-outline', kb: 'phone-pad' },
                        ].map((f) => (
                            <View key={f.label}>
                                <Text style={styles.fieldLabel}>{f.label}</Text>
                                <View style={styles.inputRow}>
                                    <Ionicons name={f.icon as any} size={20} color="#888" style={styles.inputIcon} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder={f.placeholder}
                                        value={f.value}
                                        onChangeText={f.setter}
                                        keyboardType={f.kb as any}
                                        autoCapitalize="none"
                                        textAlign="right"
                                    />
                                </View>
                            </View>
                        ))}

                        <Text style={styles.fieldLabel}>كلمة المرور</Text>
                        <View style={styles.inputRow}>
                            <TouchableOpacity onPress={() => setShowPass(!showPass)} style={styles.inputIcon}>
                                <Ionicons name={showPass ? 'eye-off-outline' : 'eye-outline'} size={20} color="#888" />
                            </TouchableOpacity>
                            <TextInput
                                style={styles.input}
                                placeholder="8 أحرف على الأقل"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPass}
                                textAlign="right"
                            />
                        </View>

                        <Text style={styles.fieldLabel}>تأكيد كلمة المرور</Text>
                        <View style={[styles.inputRow, confirmPass && confirmPass !== password && styles.inputError]}>
                            <Ionicons name="lock-closed-outline" size={20} color="#888" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="••••••••"
                                value={confirmPass}
                                onChangeText={setConfirmPass}
                                secureTextEntry
                                textAlign="right"
                            />
                        </View>
                        {confirmPass && confirmPass !== password && (
                            <Text style={styles.errorText}>كلمة المرور غير متطابقة</Text>
                        )}

                        {/* Terms */}
                        <TouchableOpacity style={styles.termsRow} onPress={() => setAgree(!agree)}>
                            <Text style={styles.termsText}>أوافق على سياسة الخصوصية وشروط الاستخدام</Text>
                            <View style={[styles.checkbox, agree && styles.checkboxChecked]}>
                                {agree && <Ionicons name="checkmark" size={14} color="#fff" />}
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.registerBtn, !agree && styles.registerBtnDisabled]} onPress={handleRegister} disabled={!agree} activeOpacity={0.85}>
                            <LinearGradient colors={agree ? ['#00A651', '#007A3D'] : ['#CCC', '#BBB']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.registerGrad}>
                                <Text style={styles.registerBtnText}>إنشاء الحساب</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <View style={styles.loginRow}>
                            <TouchableOpacity onPress={() => navigation?.goBack?.()}>
                                <Text style={styles.loginLink}>تسجيل الدخول</Text>
                            </TouchableOpacity>
                            <Text style={styles.loginPrompt}>لديك حساب؟ </Text>
                        </View>
                    </View>
                    <View style={{ height: 40 }} />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: '#F5F7FA' },
    hero: { paddingTop: 55, paddingBottom: 45, paddingHorizontal: 25 },
    backBtn: { marginBottom: 20 },
    heroTitle: { fontSize: 28, fontWeight: '900', color: '#fff', marginBottom: 8 },
    heroSub: { fontSize: 15, color: '#C1F0D4', fontWeight: '600', lineHeight: 24 },
    formWrap: { padding: 20 },
    card: { backgroundColor: '#fff', borderRadius: 28, padding: 25, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.06, shadowRadius: 20, elevation: 8, marginTop: -30 },
    fieldLabel: { fontSize: 14, fontWeight: '700', color: '#555', textAlign: 'right', marginBottom: 8, marginTop: 12 },
    inputRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F6F8', borderRadius: 14, paddingHorizontal: 15, height: 55, borderWidth: 1, borderColor: '#EEE' },
    inputError: { borderColor: '#E12A3C', backgroundColor: '#FFF5F5' },
    inputIcon: { marginLeft: 10 },
    input: { flex: 1, height: '100%', fontSize: 15, color: '#111' },
    errorText: { fontSize: 12, color: '#E12A3C', textAlign: 'right', marginTop: 4, fontWeight: '600' },
    termsRow: { flexDirection: 'row-reverse', alignItems: 'center', marginVertical: 20 },
    termsText: { flex: 1, fontSize: 13, color: '#555', textAlign: 'right', lineHeight: 20 },
    checkbox: { width: 24, height: 24, borderRadius: 8, borderWidth: 2, borderColor: '#DDD', justifyContent: 'center', alignItems: 'center', marginLeft: 12, flexShrink: 0 },
    checkboxChecked: { backgroundColor: '#00A651', borderColor: '#00A651' },
    registerBtn: { borderRadius: 16, overflow: 'hidden', marginBottom: 20 },
    registerBtnDisabled: {},
    registerGrad: { paddingVertical: 18, alignItems: 'center' },
    registerBtnText: { color: '#fff', fontSize: 18, fontWeight: '900' },
    loginRow: { flexDirection: 'row-reverse', justifyContent: 'center', alignItems: 'center' },
    loginPrompt: { fontSize: 14, color: '#888' },
    loginLink: { fontSize: 14, color: '#00A651', fontWeight: '800' },
});
