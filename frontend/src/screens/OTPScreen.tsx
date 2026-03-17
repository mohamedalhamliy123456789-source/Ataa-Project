import React, { useState, useRef, useEffect } from 'react';
import {
    View, Text, StyleSheet, SafeAreaView, TouchableOpacity,
    TextInput, KeyboardAvoidingView, Platform, Alert
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function OTPScreen({ route, navigation }: any) {
    const { phone = '05xxxxxxx' } = route.params || {};
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(59);
    const inputs = useRef<any>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (timer > 0) setTimer(timer - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timer]);

    const handleOtpChange = (value: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputs.current[index + 1].focus();
        }
    };

    const handleVerify = () => {
        const code = otp.join('');
        if (code.length < 6) {
            Alert.alert('خطأ', 'يرجى إدخال رمز التحقق كاملاً');
            return;
        }
        Alert.alert('نجاح', 'تم التحقق من الرمز بنجاح!');
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.root}>
            <LinearGradient colors={['#005C2B', '#00A651']} style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-forward" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>التحقق من الهوية</Text>
            </LinearGradient>

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.content}>
                <View style={styles.iconCircle}>
                    <MaterialCommunityIcons name="shield-lock-outline" size={50} color="#00A651" />
                </View>
                <Text style={styles.title}>رمز التحقق</Text>
                <Text style={styles.subTitle}>أدخل الرمز المكون من 6 أرقام المرسل إلى{'\n'}{phone}</Text>

                <View style={styles.otpRow}>
                    {otp.map((digit, i) => (
                        <TextInput
                            key={i}
                            ref={(el) => { inputs.current[i] = el; }}
                            style={styles.otpInput}
                            keyboardType="number-pad"
                            maxLength={1}
                            value={digit}
                            onChangeText={v => handleOtpChange(v, i)}
                            onKeyPress={({ nativeEvent }) => {
                                if (nativeEvent.key === 'Backspace' && !otp[i] && i > 0) {
                                    inputs.current[i - 1].focus();
                                }
                            }}
                        />
                    ))}
                </View>

                <TouchableOpacity style={styles.verifyBtn} onPress={handleVerify}>
                    <LinearGradient colors={['#00A651', '#007A3D']} style={styles.btnGrad}>
                        <Text style={styles.btnText}>تحقق</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <View style={styles.resendRow}>
                    {timer > 0 ? (
                        <Text style={styles.timerText}>إعادة الإرسال خلال {timer} ثانية</Text>
                    ) : (
                        <TouchableOpacity onPress={() => setTimer(59)}>
                            <Text style={styles.resendText}>إعادة إرسال الرمز</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: '#fff' },
    header: { paddingTop: 50, paddingBottom: 20, paddingHorizontal: 20, flexDirection: 'row-reverse', alignItems: 'center' },
    backBtn: { padding: 5 },
    headerTitle: { flex: 1, textAlign: 'center', color: '#fff', fontSize: 18, fontWeight: '800', marginRight: 24 },
    content: { flex: 1, alignItems: 'center', paddingTop: 40, paddingHorizontal: 30 },
    iconCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#E5FAEB', justifyContent: 'center', alignItems: 'center', marginBottom: 25 },
    title: { fontSize: 24, fontWeight: '900', color: '#111', marginBottom: 10 },
    subTitle: { fontSize: 15, color: '#666', textAlign: 'center', lineHeight: 22, marginBottom: 40 },
    otpRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 40 },
    otpInput: { width: 45, height: 55, backgroundColor: '#F5F7FA', borderRadius: 12, borderWidth: 1, borderColor: '#DDD', textAlign: 'center', fontSize: 22, fontWeight: '800', color: '#00A651' },
    verifyBtn: { width: '100%', borderRadius: 16, overflow: 'hidden', marginBottom: 25 },
    btnGrad: { paddingVertical: 18, alignItems: 'center' },
    btnText: { color: '#fff', fontSize: 18, fontWeight: '800' },
    resendRow: { flexDirection: 'row', alignItems: 'center' },
    timerText: { color: '#888', fontSize: 14 },
    resendText: { color: '#00A651', fontSize: 14, fontWeight: '800' },
});
