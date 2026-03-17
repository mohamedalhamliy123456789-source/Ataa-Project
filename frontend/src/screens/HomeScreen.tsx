import React, { useState, useEffect, useRef } from 'react';
import { useUser } from '../context/UserContext';
import {
    View, Text, ScrollView, Image, TouchableOpacity, SafeAreaView, Dimensions, Alert, Share, TextInput, ActivityIndicator, StyleSheet
} from 'react-native';
import { FontAwesome5, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Skeleton from '../components/Skeleton';
import QuickDonateModal from '../components/QuickDonateModal';

// Imported Data & Styles
import { 
    BANNERS, QUICK_ACTIONS, IMPACT_STATS, 
    CURRENT_CAMPAIGNS, URGENT_PROJECTS, SADAQAH_KAFFARAH,
} from './HomeScreen/data';
import { styles as S } from './HomeScreen/styles';

const { width } = Dimensions.get('window');

function SectionHeader({ title, onPress, btnLabel = "عرض الكل" }: { title: string; onPress?: () => void, btnLabel?: string }) {
    return (
        <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 15, marginTop: 30 }}>
            <Text style={{ fontSize: 19, fontWeight: '900', color: '#111' }}>{title}</Text>
            {onPress && <TouchableOpacity onPress={onPress}><Text style={{ fontSize: 13, fontWeight: '700', color: '#00A651' }}>{btnLabel} ←</Text></TouchableOpacity>}
        </View>
    );
}

export default function HomeScreen({ navigation }: any) {
    const { user, isGuest } = useUser();
    const [bannerIdx, setBannerIdx] = useState(0);
    const scrollRef = useRef<ScrollView>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [quickDonateVisible, setQuickDonateVisible] = useState(false);
    const [activeProject, setActiveProject] = useState<any>(null);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            let nextIdx = (bannerIdx + 1) % BANNERS.length;
            setBannerIdx(nextIdx);
            scrollRef.current?.scrollTo({ x: nextIdx * width, animated: true });
        }, 4000);
        return () => clearInterval(interval);
    }, [bannerIdx]);

    const handleQuickAction = (action: any) => {
        if (action.nav) navigation.navigate(action.nav);
    };

    return (
        <SafeAreaView style={S.root}>
            <StatusBar style="light" backgroundColor="transparent" translucent />

            {/* Premium Header */}
            <LinearGradient colors={['#007A3D', '#00A651']} style={S.topBar}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: 35 }}>
                    <TouchableOpacity style={S.topBtn} onPress={() => navigation.navigate('Notifications')}>
                        <Ionicons name="notifications-outline" size={24} color="#fff" />
                        <View style={S.notifDot} />
                    </TouchableOpacity>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={S.topLogo}>عطاء</Text>
                        <Text style={S.topSub}>Ata'a Charity</Text>
                    </View>
                    <TouchableOpacity style={S.topBtn} onPress={() => navigation.navigate('Projects')}>
                        <Ionicons name="search-outline" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            </LinearGradient>

            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                
                {/* 1. Hero Banners */}
                <View>
                    <ScrollView
                        ref={scrollRef}
                        horizontal pagingEnabled showsHorizontalScrollIndicator={false}
                        onMomentumScrollEnd={(e) => setBannerIdx(Math.round(e.nativeEvent.contentOffset.x / width))}
                    >
                        {BANNERS.map((b) => (
                            <TouchableOpacity key={b.id} activeOpacity={0.9} onPress={() => navigation.navigate('Projects')} style={{ width }}>
                                <Image source={{ uri: b.image }} style={S.bannerImg} />
                                <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={S.bannerOverlay}>
                                    <Text style={S.bannerSub}>{b.sub}</Text>
                                    <Text style={S.bannerTitle}>{b.title}</Text>
                                    <TouchableOpacity 
                                        style={S.bannerCta} 
                                        onPress={() => { setActiveProject(b); setQuickDonateVisible(true); }}
                                    >
                                        <Text style={S.bannerCtaTxt}>تبرع الآن</Text>
                                        <Ionicons name="flash" size={16} color="#007A3D" />
                                    </TouchableOpacity>
                                </LinearGradient>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <View style={S.dots}>
                        {BANNERS.map((_, i) => <View key={i} style={[S.dot, i === bannerIdx && S.dotActive]} />)}
                    </View>
                </View>

                {/* 2. Impact Meters (Guest or User) */}
                <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
                    <View style={S.myImpact}>
                        <View style={S.myImpactHeader}>
                            <Ionicons name="analytics" size={20} color="#00A651" />
                            <Text style={S.myImpactTitle}>{isGuest ? 'أثرنا حول العالم' : 'أثرك في عطاء'}</Text>
                        </View>
                        <View style={S.myImpactRow}>
                            {IMPACT_STATS.map((stat, i) => (
                                <React.Fragment key={i}>
                                    <View style={S.myImpactStat}>
                                        <Text style={[S.myImpactVal, { color: stat.color }]}>{isGuest ? stat.value : '0'}</Text>
                                        <Text style={S.myImpactLbl}>{stat.label}</Text>
                                    </View>
                                    {i < IMPACT_STATS.length - 1 && <View style={S.myImpactDiv} />}
                                </React.Fragment>
                            ))}
                        </View>
                    </View>
                </View>

                {/* 3. Quick Actions */}
                <View style={S.quickGrid}>
                    {QUICK_ACTIONS.map(action => (
                        <TouchableOpacity key={action.id} style={S.quickItem} onPress={() => handleQuickAction(action)}>
                            <View style={[S.quickIcon, { backgroundColor: action.bg }]}>
                                {action.lib === 'fa5' ? <FontAwesome5 name={action.icon} size={22} color={action.color} /> : 
                                 action.lib === 'mc' ? <MaterialCommunityIcons name={action.icon as any} size={24} color={action.color} /> :
                                 <Ionicons name={action.icon as any} size={24} color={action.color} />}
                            </View>
                            <Text style={S.quickLabel}>{action.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* 4. Urgent Campaigns */}
                <SectionHeader title="حملات عاجلة جداً" onPress={() => navigation.navigate('Projects')} />
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15, paddingBottom: 10 }}>
                    {URGENT_PROJECTS.map(u => {
                        const progress = (u.current / u.target) * 100;
                        return (
                            <TouchableOpacity key={u.id} style={S.urgCard} activeOpacity={0.9} onPress={() => navigation.navigate('ProjectDetails', { project: u })}>
                                <Image source={{ uri: u.image }} style={S.urgImg} />
                                <View style={S.urgBadgeRow}>
                                    <View style={S.urgBadge}><Text style={S.urgBadgeTxt}>{u.category}</Text></View>
                                    <View style={S.daysBadge}><Text style={S.daysTxt}>{u.daysLeft} أيام متبقية</Text></View>
                                </View>
                                <View style={S.urgBody}>
                                    <Text style={S.urgTitle} numberOfLines={2}>{u.title}</Text>
                                    <View style={S.pBar}><View style={[S.pFill, { width: `${progress}%` }]} /></View>
                                    <View style={S.urgStats}>
                                        <Text style={S.urgPct}>{Math.round(progress)}%</Text>
                                        <Text style={S.urgDonors}>{u.donors} متبرع</Text>
                                    </View>
                                    <TouchableOpacity 
                                        style={S.urgBtn} 
                                        onPress={() => { setActiveProject(u); setQuickDonateVisible(true); }}
                                    >
                                        <Text style={S.urgBtnTxt}>تبرع عاجل</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>

                {/* 5. Recurring Donation / Sadaqah */}
                <SectionHeader title="صدقة الموقف" btnLabel="تصفح الكل" onPress={() => navigation.navigate('Projects')} />
                <View style={{ paddingHorizontal: 20 }}>
                     {SADAQAH_KAFFARAH.map(item => (
                         <TouchableOpacity key={item.id} style={S.waterCard} onPress={() => { setActiveProject(item); setQuickDonateVisible(true); }}>
                             <View style={[S.waterImg, { backgroundColor: item.color + '10', justifyContent: 'center', alignItems: 'center' }]}>
                                 <Ionicons name={item.icon as any} size={40} color={item.color} />
                             </View>
                             <View style={S.waterBody}>
                                 <Text style={styles.localTitle}>{item.title}</Text>
                                 <Text style={styles.localDesc}>{item.desc}</Text>
                                 <TouchableOpacity style={[S.waterBtn, { backgroundColor: item.color }]} onPress={() => { setActiveProject(item); setQuickDonateVisible(true); }}>
                                     <Text style={S.waterBtnTxt}>تبرع الآن</Text>
                                 </TouchableOpacity>
                             </View>
                         </TouchableOpacity>
                     ))}
                </View>

                <View style={{ height: 120 }} />
            </ScrollView>

            <QuickDonateModal 
                visible={quickDonateVisible} 
                onClose={() => setQuickDonateVisible(false)}
                project={activeProject}
                navigation={navigation}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    localTitle: { fontSize: 16, fontWeight: '900', color: '#111', textAlign: 'right', marginBottom: 5 },
    localDesc: { fontSize: 13, color: '#888', textAlign: 'right', marginBottom: 15 },
});
