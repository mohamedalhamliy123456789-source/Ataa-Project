import React, { useState } from 'react';
import { 
    View, Text, StyleSheet, SafeAreaView, ScrollView, 
    TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, Platform, ActivityIndicator 
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useUser } from '../context/UserContext';
import { ENDPOINTS } from '../config/api';

export default function LoginScreen({ navigation }: any) {
    const { login, setAsGuest } = useUser();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (isEmployee = false) => {
        if (!email || !password) {
            Alert.alert('تنبيه', 'يرجى إدخال البريد الإلكتروني وكلمة المرور');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(ENDPOINTS.AUTH.LOGIN, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                login(data);
                navigation.replace('MainTabs');
            } else {
                Alert.alert('خطأ في الدخول', data.error || 'حدث خطأ غير متوقع');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('خطأ في الاتصال', 'تعذر الاتصال بالخادم. يرجى المحاولة لاحقاً.');
        } finally {
            setLoading(false);
        }
    };

    const handleGuest = () => {
        setAsGuest();
        navigation.replace('MainTabs');
    };

    return (
        <SafeAreaView style={styles.root}>
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

                        <TouchableOpacity style={styles.loginBtn} onPress={() => handleLogin(false)} activeOpacity={0.85} disabled={loading}>
                            <LinearGradient colors={['#00A651', '#007A3D']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.loginGrad}>
                                {loading
                                    ? <ActivityIndicator color="#fff" />
                                    : <Text style={styles.loginBtnText}>دخول</Text>
                                }
                            </LinearGradient>
                        </TouchableOpacity>

                        <View style={styles.dividerRow}>
                            <View style={styles.dividerLine} />
                            <Text style={styles.dividerOr}>أو</Text>
                            <View style={styles.dividerLine} />
                        </View>

                        <TouchableOpacity 
                            style={styles.socialBtn} 
                            onPress={() => navigation?.navigate?.('Register')}
                        >
                            <Text style={styles.socialBtnText}>إنشاء حساب جديد</Text>
                            <Ionicons name="person-add-outline" size={20} color="#00A651" style={{ marginRight: 10 }} />
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.socialBtn, { borderColor: '#888', marginTop: -10 }]} onPress={handleGuest}>
                            <Text style={[styles.socialBtnText, { color: '#888' }]}>متابعة كضيف</Text>
                            <Ionicons name="person-outline" size={20} color="#888" style={{ marginRight: 10 }} />
                        </TouchableOpacity>
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
    input: { flex: 1, height: '100%', fontSize: 15, color: '#111', textAlign: 'right' },
    forgotBtn: { alignSelf: 'flex-start', marginVertical: 12 },
    forgotText: { color: '#00A651', fontSize: 14, fontWeight: '700' },
    loginBtn: { borderRadius: 16, overflow: 'hidden', marginTop: 15 },
    loginGrad: { paddingVertical: 18, alignItems: 'center', justifyContent: 'center' },
    loginBtnText: { color: '#fff', fontSize: 18, fontWeight: '900' },
    dividerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 20 },
    dividerLine: { flex: 1, height: 1, backgroundColor: '#EEE' },
    dividerOr: { marginHorizontal: 15, color: '#999', fontSize: 14 },
    socialBtn: { flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'center', borderWidth: 1.5, borderColor: '#00A651', borderRadius: 14, paddingVertical: 14, marginBottom: 20 },
    socialBtnText: { fontSize: 16, fontWeight: '700', color: '#00A651' },
});
