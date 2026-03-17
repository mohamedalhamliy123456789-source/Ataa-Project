import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function LoginInvitation({ navigation }: any) {
    return (
        <View style={styles.card}>
            <LinearGradient colors={['#F9F9F9', '#F0F0F0']} style={styles.gradient}>
                <View style={styles.iconCircle}>
                    <MaterialCommunityIcons name="account-lock-outline" size={32} color="#00A651" />
                </View>
                <Text style={styles.title}>سجل دخولك لتجربة كاملة</Text>
                <Text style={styles.sub}>تابع تبرعاتك، تقاريرك، وكفالاتك من مكان واحد بكل سهولة وأمان.</Text>
                
                <TouchableOpacity 
                    style={styles.loginBtn}
                    onPress={() => navigation.navigate('Login')}
                >
                    <LinearGradient colors={['#00A651', '#007A3D']} style={styles.btnGradient}>
                        <Text style={styles.btnText}>تسجيل الدخول</Text>
                        <Ionicons name="log-in-outline" size={20} color="#fff" style={{ marginLeft: 8 }} />
                    </LinearGradient>
                </TouchableOpacity>

                <View style={styles.registerRow}>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.registerLink}>أنشئ حساباً الآن</Text>
                    </TouchableOpacity>
                    <Text style={styles.registerText}>ليس لديك حساب؟ </Text>
                </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    card: { marginHorizontal: 20, marginTop: 20, borderRadius: 24, overflow: 'hidden', backgroundColor: '#fff', elevation: 4, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10 },
    gradient: { padding: 25, alignItems: 'center' },
    iconCircle: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#E5FAEB', justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
    title: { fontSize: 18, fontWeight: '900', color: '#111', marginBottom: 8, textAlign: 'center' },
    sub: { fontSize: 13, color: '#666', textAlign: 'center', lineHeight: 20, marginBottom: 20, paddingHorizontal: 10 },
    loginBtn: { width: '100%', borderRadius: 14, overflow: 'hidden' },
    btnGradient: { flexDirection: 'row-reverse', justifyContent: 'center', alignItems: 'center', paddingVertical: 14 },
    btnText: { color: '#fff', fontSize: 16, fontWeight: '800' },
    registerRow: { flexDirection: 'row-reverse', marginTop: 15 },
    registerText: { fontSize: 13, color: '#888' },
    registerLink: { fontSize: 13, color: '#00A651', fontWeight: '800' },
});
