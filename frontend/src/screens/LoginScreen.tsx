import React, { useState } from 'react';
import {
    View, Text, StyleSheet, SafeAreaView, TouchableOpacity,
    TextInput, Image, ScrollView, KeyboardAvoidingView, Platform
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function LoginScreen({ onLogin, navigation }: any) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        setLoading(true);
        // Simulate auth
        setTimeout(() => { setLoading(false); onLogin?.(); }, 1200);
    };

    return (
        <SafeAreaView style={styles.root}>
            {/* Top Gradient Header */}
            <LinearGradient colors={['#005C2B', '#00A651']} style={styles.heroWrap}>
                <View style={styles.logoRow}>
                    <MaterialCommunityIcons name="hand-heart" size={40} color="#fff" style={{ marginLeft: 12 }} />
                    <View>
                        <Text style={styles.logoAr}>عطاء</Text>
                        <Text style={styles.logoEn}>Ata'a Charity</Text>
                    </View>
                </View>
                <Text style={styles.heroText}>مرحباً بعودتك{'\n'}سعيدون بتبرعك وأثرك 🌱</Text>
            </LinearGradient>

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.formWrap} keyboardShouldPersistTaps="handled">
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>تسجيل الدخول</Text>

                        {/* Email */}
                        <Text style={styles.fieldLabel}>البريد الإلكتروني أو الهاتف</Text>
                        <View style={styles.inputRow}>
                            <Ionicons name="mail-outline" size={20} color="#888" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="example@email.com"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                textAlign="right"
                            />
                        </View>

                        {/* Password */}
                        <Text style={styles.fieldLabel}>كلمة المرور</Text>
                        <View style={styles.inputRow}>
                            <TouchableOpacity onPress={() => setShowPass(!showPass)} style={styles.inputIcon}>
                                <Ionicons name={showPass ? 'eye-off-outline' : 'eye-outline'} size={20} color="#888" />
                            </TouchableOpacity>
                            <TextInput
                                style={styles.input}
                                placeholder="••••••••"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPass}
                                textAlign="right"
                            />
                        </View>

                        <TouchableOpacity style={styles.forgotBtn}>
                            <Text style={styles.forgotText}>نسيت كلمة المرور؟</Text>
                        </TouchableOpacity>

                        {/* Login CTA */}
                        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin} activeOpacity={0.85}>
                            <LinearGradient colors={['#00A651', '#007A3D']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.loginGrad}>
                                {loading
                                    ? <MaterialCommunityIcons name="loading" size={24} color="#fff" />
                                    : <Text style={styles.loginBtnText}>دخول</Text>
                                }
                            </LinearGradient>
                        </TouchableOpacity>

                        {/* Divider */}
                        <View style={styles.dividerRow}>
                            <View style={styles.dividerLine} />
                            <Text style={styles.dividerOr}>أو</Text>
                            <View style={styles.dividerLine} />
                        </View>

                        {/* Social Login */}
                        <TouchableOpacity style={styles.socialBtn}>
                            <Text style={styles.socialBtnText}>متابعة كضيف</Text>
                            <Ionicons name="person-outline" size={20} color="#00A651" style={{ marginRight: 10 }} />
                        </TouchableOpacity>

                        {/* Register link */}
                        <View style={styles.registerRow}>
                            <TouchableOpacity onPress={() => navigation?.navigate?.('Register')}>
                                <Text style={styles.registerLink}>إنشاء حساب جديد</Text>
                            </TouchableOpacity>
                            <Text style={styles.registerPrompt}>ليس لديك حساب؟ </Text>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: '#F5F7FA' },
    heroWrap: { paddingTop: 55, paddingBottom: 45, paddingHorizontal: 25 },
    logoRow: { flexDirection: 'row-reverse', alignItems: 'center', marginBottom: 25 },
    logoAr: { fontSize: 28, fontWeight: '900', color: '#fff' },
    logoEn: { fontSize: 11, color: '#C1F0D4', letterSpacing: 3 },
    heroText: { fontSize: 22, fontWeight: '900', color: '#fff', lineHeight: 34, textAlign: 'right' },
    formWrap: { padding: 20 },
    card: { backgroundColor: '#fff', borderRadius: 28, padding: 25, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.06, shadowRadius: 20, elevation: 8, marginTop: -30 },
    cardTitle: { fontSize: 22, fontWeight: '900', color: '#111', textAlign: 'right', marginBottom: 25 },
    fieldLabel: { fontSize: 14, fontWeight: '700', color: '#555', textAlign: 'right', marginBottom: 8, marginTop: 10 },
    inputRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F6F8', borderRadius: 14, paddingHorizontal: 15, height: 55, borderWidth: 1, borderColor: '#EEE', marginBottom: 4 },
    inputIcon: { marginLeft: 10 },
    input: { flex: 1, height: '100%', fontSize: 15, color: '#111' },
    forgotBtn: { alignSelf: 'flex-start', marginVertical: 12 },
    forgotText: { color: '#00A651', fontSize: 14, fontWeight: '700' },
    loginBtn: { borderRadius: 16, overflow: 'hidden', marginTop: 5 },
    loginGrad: { paddingVertical: 18, alignItems: 'center', justifyContent: 'center' },
    loginBtnText: { color: '#fff', fontSize: 18, fontWeight: '900' },
    dividerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 20 },
    dividerLine: { flex: 1, height: 1, backgroundColor: '#EEE' },
    dividerOr: { marginHorizontal: 15, color: '#999', fontSize: 14 },
    socialBtn: { flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'center', borderWidth: 1.5, borderColor: '#00A651', borderRadius: 14, paddingVertical: 14, marginBottom: 20 },
    socialBtnText: { fontSize: 16, fontWeight: '700', color: '#00A651' },
    registerRow: { flexDirection: 'row-reverse', justifyContent: 'center', alignItems: 'center' },
    registerPrompt: { fontSize: 14, color: '#888' },
    registerLink: { fontSize: 14, color: '#00A651', fontWeight: '800' },
});
