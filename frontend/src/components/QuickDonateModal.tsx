import React, { useState } from 'react';
import { 
    View, Text, StyleSheet, SafeAreaView, TouchableOpacity, 
    TextInput, ScrollView, Animated, Dimensions, ActivityIndicator 
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function QuickDonateModal({ visible, onClose, project, navigation }: any) {
    const [amount, setAmount] = useState('1000');
    const [loading, setLoading] = useState(false);
    const [currency, setCurrency] = useState('YER');

    if (!visible) return null;

    const handleQuickDonate = async () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            onClose();
            navigation.navigate('DonateModal', { project, amount, currency });
        }, 1000);
    };

    return (
        <View style={styles.overlay}>
            <TouchableOpacity style={styles.dismiss} onPress={onClose} activeOpacity={1} />
            <Animated.View style={styles.modal}>
                <View style={styles.handle} />
                <View style={styles.header}>
                    <Text style={styles.title}>تبرع عاجل</Text>
                    <Text style={styles.projectTitle} numberOfLines={1}>{project?.title || 'صدقة جارية'}</Text>
                </View>

                <View style={styles.amountWrap}>
                    <Text style={styles.label}>اختر أو أدخل المبلغ</Text>
                    <View style={styles.presets}>
                        {['500', '1000', '5000', '10000'].map(val => (
                            <TouchableOpacity 
                                key={val} 
                                style={[styles.preset, amount === val && styles.presetActive]}
                                onPress={() => setAmount(val)}
                            >
                                <Text style={[styles.presetText, amount === val && styles.presetTextActive]}>{val} ر.ي</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <TextInput 
                        style={styles.input} 
                        placeholder="مبلغ مخصص..." 
                        keyboardType="number-pad"
                        value={amount}
                        onChangeText={setAmount}
                        textAlign="right"
                    />
                </View>

                <TouchableOpacity style={styles.mainBtn} onPress={handleQuickDonate} disabled={loading}>
                    <LinearGradient colors={['#00A651', '#007A3D']} style={styles.btnGrad}>
                        {loading ? <ActivityIndicator color="#fff" /> : (
                            <Text style={styles.btnText}>تبرع الآن — {amount} ر.ي</Text>
                        )}
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity style={styles.moreBtn} onPress={() => { onClose(); navigation.navigate('DonateModal', { project }); }}>
                    <Text style={styles.moreText}>خيارات تبرع أكثر...</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end', zIndex: 999 },
    dismiss: { flex: 1 },
    modal: { backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25, paddingBottom: 40 },
    handle: { width: 40, height: 5, backgroundColor: '#DDD', borderRadius: 3, alignSelf: 'center', marginBottom: 20 },
    header: { alignItems: 'center', marginBottom: 25 },
    title: { fontSize: 20, fontWeight: '900', color: '#111', marginBottom: 5 },
    projectTitle: { fontSize: 14, color: '#666' },
    amountWrap: { marginBottom: 30 },
    label: { fontSize: 14, fontWeight: '800', color: '#333', textAlign: 'right', marginBottom: 15 },
    presets: { flexDirection: 'row-reverse', flexWrap: 'wrap', gap: 10, marginBottom: 15 },
    preset: { flex: 1, minWidth: '22%', paddingVertical: 12, backgroundColor: '#F5F7F8', borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#EEE' },
    presetActive: { backgroundColor: '#00A651', borderColor: '#00A651' },
    presetText: { fontSize: 13, fontWeight: '800', color: '#666' },
    presetTextActive: { color: '#fff' },
    input: { backgroundColor: '#F5F7F8', height: 55, borderRadius: 15, paddingHorizontal: 20, fontSize: 18, fontWeight: '800', color: '#111', borderWidth: 1, borderColor: '#EEE' },
    mainBtn: { borderRadius: 18, overflow: 'hidden', marginBottom: 15 },
    btnGrad: { paddingVertical: 18, alignItems: 'center' },
    btnText: { color: '#fff', fontSize: 17, fontWeight: '900' },
    moreBtn: { alignItems: 'center' },
    moreText: { fontSize: 14, color: '#00A651', fontWeight: '800' },
});
