import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet, Text, View, ScrollView, Image,
    TouchableOpacity, SafeAreaView, Dimensions, Animated,
} from 'react-native';
import { FontAwesome5, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

// Local AI-Generated Campaign Images
const IMG = {
    sadaqa: require('../../assets/campaigns/sadaqa_jariya.png'),
    relief: require('../../assets/campaigns/emergency_relief.png'),
    mosque: require('../../assets/campaigns/mosque.png'),
    orphans: require('../../assets/campaigns/orphans.png'),
    education: require('../../assets/campaigns/education.png'),
    ramadan: require('../../assets/campaigns/ramadan.png'),
};

const { width } = Dimensions.get('window');

// ─── Static Data ──────────────────────────────────────────────────────────────

const BANNERS = [
    { id: 1, title: 'رمضان كريم — لا تحرم نفسك من الأجر', sub: 'أطعم صائماً واكسب ثوابه', image: IMG.ramadan, isLocal: true },
    { id: 2, title: 'حملة المياه النظيفة 2026', sub: 'بئر واحدة = 500 شخص يشربون', image: IMG.sadaqa, isLocal: true },
    { id: 3, title: 'كافل اليتيم — شريك في الأجر', sub: 'كفالة شهرية تبدأ من $30', image: IMG.orphans, isLocal: true },
];

const QUICK_ACTIONS = [
    { id: 1, title: 'حاسبة الزكاة', icon: 'calculator', lib: 'fa5', nav: 'Zakat', bg: '#E5FAEB', color: '#00A651' },
    { id: 2, title: 'سلة الخير', icon: 'cart-outline', lib: 'ion', nav: 'Cart', bg: '#FFF4E5', color: '#F5A623' },
    { id: 3, title: 'كفالة يتيم', icon: 'human-child', lib: 'mc', nav: 'Projects', bg: '#F0F0FF', color: '#7B2FBE' },
    { id: 4, title: 'تبرع سريع', icon: 'hand-holding-heart', lib: 'fa5', nav: 'DonateModal', bg: '#FFE8EA', color: '#E12A3C' },
    { id: 5, title: 'إغاثة', icon: 'charity', lib: 'mc', nav: 'Projects', bg: '#E8F4FD', color: '#0096C7' },
    { id: 6, title: 'مساجد', icon: 'mosque', lib: 'fa5', nav: 'Projects', bg: '#FFF5CC', color: '#C4970A' },
    { id: 7, title: 'تعليم', icon: 'book-open', lib: 'fa5', nav: 'Projects', bg: '#E5FAEB', color: '#00A651' },
    { id: 8, title: 'المزيد', icon: 'dots-horizontal', lib: 'mc', nav: 'Projects', bg: '#F5F5F5', color: '#888' },
];

const IMPACT_STATS = [
    { value: '2.4M+', label: 'مستفيد', icon: 'people-outline' },
    { value: '4,800+', label: 'مشروع', icon: 'rocket-outline' },
    { value: '18+', label: 'دولة', icon: 'globe-outline' },
    { value: '$12M+', label: 'تم جمعه', icon: 'cash-outline' },
];

const DONATION_TYPES = [
    { id: 1, label: 'صدقة جارية', desc: 'آبار ومشاريع دائمة', color: '#0096C7', image: IMG.sadaqa, isLocal: true },
    { id: 2, label: 'كفالة يتيم', desc: 'من $30/شهر', color: '#7B2FBE', image: IMG.orphans, isLocal: true },
    { id: 3, label: 'إغاثة فورية', desc: 'تصل في 48 ساعة', color: '#E12A3C', image: IMG.relief, isLocal: true },
    { id: 4, label: 'بناء مساجد', desc: 'بيوت الله في كل مكان', color: '#C4970A', image: IMG.mosque, isLocal: true },
];

const URGENT_PROJECTS = [
    { id: 1, title: 'إغاثة متضرري السيول — الحديدة', target: 50000, current: 32500, donors: 1240, category: 'إغاثة', daysLeft: 8, image: IMG.relief, isLocal: true },
    { id: 2, title: 'بناء 10 مساجد في قرى نائية', target: 120000, current: 45000, donors: 830, category: 'مساجد', daysLeft: 21, image: IMG.mosque, isLocal: true },
    { id: 3, title: 'كفالة 200 طفل يتيم لعام كامل', target: 72000, current: 21000, donors: 340, category: 'أيتام', daysLeft: 45, image: IMG.orphans, isLocal: true },
];

const ORPHANS = [
    { id: 1, name: 'أحمد — 8 سنوات', location: 'صنعاء، اليمن', monthly: 30, image: IMG.orphans, isLocal: true },
    { id: 2, name: 'زينب — 11 سنة', location: 'تعز، اليمن', monthly: 35, image: IMG.education, isLocal: true },
    { id: 3, name: 'محمد — 6 سنوات', location: 'عدن، اليمن', monthly: 30, image: IMG.orphans, isLocal: true },
];

const WATER_PROJECTS = [
    { id: 1, title: 'بئر مياه في تعز — اليمن', target: 2500, current: 2200, donors: 85, image: IMG.sadaqa, isLocal: true },
    { id: 2, title: 'تمديد شبكة مياه حضرية — صنعاء', target: 8000, current: 3200, donors: 44, image: IMG.sadaqa, isLocal: true },
];

const SUCCESS_STORIES = [
    { id: 1, title: 'قرية النور — وصل الماء بعد 5 سنوات', donors: 320, raised: '$12,000', image: IMG.sadaqa, isLocal: true },
    { id: 2, title: 'مسجد الرحمة — اكتمل في 8 أشهر', donors: 1100, raised: '$85,000', image: IMG.mosque, isLocal: true },
    { id: 3, title: '50 طفل يتيم حصلوا على الكفالة', donors: 50, raised: '$18,000', image: IMG.orphans, isLocal: true },
];

const NEWS = [
    { id: 1, title: 'عطاء تُطلق حملة مياه رمضان 2026 بميزانية $500K', date: '10 مارس 2026', image: IMG.sadaqa, isLocal: true },
    { id: 2, title: 'افتتاح أول مدرسة ممولة بالكامل في الحديدة', date: '5 مارس 2026', image: IMG.education, isLocal: true },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function RIcon({ lib, name, size, color }: { lib: string; name: any; size: number; color: string }) {
    if (lib === 'fa5') return <FontAwesome5 name={name} size={size} color={color} />;
    if (lib === 'mc') return <MaterialCommunityIcons name={name} size={size} color={color} />;
    return <Ionicons name={name} size={size} color={color} />;
}

function SectionHeader({ title, onPress }: { title: string; onPress?: () => void }) {
    return (
        <View style={ss.hRow}>
            {onPress && <TouchableOpacity onPress={onPress}><Text style={ss.hSeeAll}>عرض الكل</Text></TouchableOpacity>}
            <Text style={ss.hTitle}>{title}</Text>
        </View>
    );
}
const ss = StyleSheet.create({
    hRow: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 14 },
    hTitle: { fontSize: 20, fontWeight: '900', color: '#111' },
    hSeeAll: { fontSize: 14, fontWeight: '700', color: '#00A651' },
});

// ─── Home Screen ──────────────────────────────────────────────────────────────

export default function HomeScreen({ navigation }: any) {
    const [bannerIdx, setBannerIdx] = useState(0);

    return (
        <SafeAreaView style={S.root}>
            <StatusBar style="light" backgroundColor="transparent" translucent />

            {/* Top Bar */}
            <LinearGradient colors={['#007A3D', '#00A651']} style={S.topBar}>
                <TouchableOpacity style={S.topBtn}>
                    <Ionicons name="notifications-outline" size={24} color="#fff" />
                    <View style={S.notifDot} />
                </TouchableOpacity>
                <View>
                    <Text style={S.topLogo}>عطاء</Text>
                    <Text style={S.topSub}>Ata'a Charity</Text>
                </View>
                <TouchableOpacity style={S.topBtn}>
                    <Ionicons name="search-outline" size={24} color="#fff" />
                </TouchableOpacity>
            </LinearGradient>

            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>

                {/* 1. Hero Banner Carousel */}
                <View>
                    <ScrollView
                        horizontal pagingEnabled showsHorizontalScrollIndicator={false}
                        onMomentumScrollEnd={(e) => setBannerIdx(Math.round(e.nativeEvent.contentOffset.x / width))}
                    >
                        {BANNERS.map((b) => (
                            <TouchableOpacity key={b.id} activeOpacity={0.92} onPress={() => navigation.navigate('Projects')} style={{ width }}>
                                <Image source={b.image} style={S.bannerImg} />
                                <LinearGradient colors={['transparent', 'rgba(0,0,0,0.88)']} style={S.bannerOverlay}>
                                    <Text style={S.bannerSub}>{b.sub}</Text>
                                    <Text style={S.bannerTitle}>{b.title}</Text>
                                    <TouchableOpacity style={S.bannerCta} onPress={() => navigation.navigate('DonateModal')}>
                                        <Text style={S.bannerCtaTxt}>تبرع الآن</Text>
                                        <MaterialCommunityIcons name="arrow-left" size={16} color="#007A3D" />
                                    </TouchableOpacity>
                                </LinearGradient>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <View style={S.dots}>
                        {BANNERS.map((_, i) => <View key={i} style={[S.dot, i === bannerIdx && S.dotActive]} />)}
                    </View>
                </View>

                {/* 2. Quick Actions Grid (2 rows × 4 columns) */}
                <View style={S.quickGrid}>
                    {QUICK_ACTIONS.map((a) => (
                        <TouchableOpacity key={a.id} style={S.quickItem} onPress={() => navigation.navigate(a.nav as any)}>
                            <View style={[S.quickIcon, { backgroundColor: a.bg }]}>
                                <RIcon lib={a.lib} name={a.icon} size={22} color={a.color} />
                            </View>
                            <Text style={S.quickLabel}>{a.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* 3. Global Impact Counter Strip */}
                <LinearGradient colors={['#007A3D', '#00A651']} style={S.impactStrip}>
                    {IMPACT_STATS.map((s, i) => (
                        <View key={i} style={S.impactCell}>
                            <Ionicons name={s.icon as any} size={18} color="#C1F0D4" style={{ marginBottom: 3 }} />
                            <Text style={S.impactVal}>{s.value}</Text>
                            <Text style={S.impactLbl}>{s.label}</Text>
                            {i < IMPACT_STATS.length - 1 && <View style={S.impactSep} />}
                        </View>
                    ))}
                </LinearGradient>

                {/* 4. Donation Category Image Grid */}
                <View style={{ marginTop: 25 }}>
                    <SectionHeader title="مجالات العطاء" onPress={() => navigation.navigate('Projects')} />
                    <View style={S.catGrid}>
                        {DONATION_TYPES.map((d) => (
                            <TouchableOpacity key={d.id} style={S.catCard} onPress={() => navigation.navigate('Projects')} activeOpacity={0.88}>
                                <Image source={d.image} style={S.catImg} />
                                <LinearGradient colors={['transparent', 'rgba(0,0,0,0.78)']} style={S.catOverlay}>
                                    <View style={[S.catDot, { backgroundColor: d.color }]} />
                                    <Text style={S.catLabel}>{d.label}</Text>
                                    <Text style={S.catDesc}>{d.desc}</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* 5. Urgent Campaigns */}
                <View style={{ marginTop: 28 }}>
                    <SectionHeader title="حملات عاجلة" onPress={() => navigation.navigate('Projects')} />
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15 }}>
                        {URGENT_PROJECTS.map((p) => {
                            const pct = Math.round((p.current / p.target) * 100);
                            return (
                                <TouchableOpacity key={p.id} style={S.urgCard} activeOpacity={0.9}
                                    onPress={() => navigation.navigate('ProjectDetails', { project: p })}>
                                    <View>
                                        <Image source={p.image} style={S.urgImg} />
                                        <View style={S.urgBadgeRow}>
                                            <View style={S.urgBadge}>
                                                <FontAwesome5 name="fire-alt" size={9} color="#fff" />
                                                <Text style={S.urgBadgeTxt}> عاجل</Text>
                                            </View>
                                            <View style={S.daysBadge}>
                                                <Text style={S.daysTxt}>{p.daysLeft} يوم</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={S.urgBody}>
                                        <Text style={S.urgCat}>{p.category}</Text>
                                        <Text style={S.urgTitle} numberOfLines={2}>{p.title}</Text>
                                        <View style={S.urgStats}>
                                            <Text style={S.urgDonors}>{p.donors} متبرع</Text>
                                            <Text style={S.urgPct}>{pct}%</Text>
                                        </View>
                                        <View style={S.pBar}><View style={[S.pFill, { width: pct + '%' as any }]} /></View>
                                        <TouchableOpacity style={S.urgBtn} onPress={() => navigation.navigate('DonateModal')}>
                                            <Text style={S.urgBtnTxt}>تبرع الآن</Text>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>

                {/* 6. Orphan Sponsorship */}
                <View style={{ marginTop: 28 }}>
                    <SectionHeader title="كفالة يتيم" onPress={() => navigation.navigate('Projects')} />
                    <View style={S.orphanBanner}>
                        <LinearGradient colors={['#5C0099', '#7B2FBE']} style={S.orphanGrad}>
                            <MaterialCommunityIcons name="human-child" size={90} color="rgba(255,255,255,0.15)" style={S.orphanBgIcon} />
                            <View style={S.orphanText}>
                                <Text style={S.orphanTitle}>كن كافلاً لطفل يتيم</Text>
                                <Text style={S.orphanSub}>كفالة شهرية من $30 تضمن التعليم والغذاء والرعاية</Text>
                                <TouchableOpacity style={S.orphanCta} onPress={() => navigation.navigate('DonateModal')}>
                                    <Text style={S.orphanCtaTxt}>اكفل يتيماً الآن</Text>
                                </TouchableOpacity>
                            </View>
                        </LinearGradient>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15, paddingTop: 15 }}>
                        {ORPHANS.map((o) => (
                            <TouchableOpacity key={o.id} style={S.orphanCard} activeOpacity={0.85}>
                                <Image source={o.image} style={S.orphanAvatar} />
                                <View style={S.orphanCardBody}>
                                    <Text style={S.orphanName}>{o.name}</Text>
                                    <Text style={S.orphanLoc}>{o.location}</Text>
                                    <Text style={S.orphanAmt}>${o.monthly}/شهر</Text>
                                    <TouchableOpacity style={S.sponsorBtn} onPress={() => navigation.navigate('DonateModal')}>
                                        <Text style={S.sponsorBtnTxt}>اكفل الآن</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* 7. Water Projects */}
                <View style={{ marginTop: 28 }}>
                    <SectionHeader title="مشاريع المياه" onPress={() => navigation.navigate('Projects')} />
                    {WATER_PROJECTS.map((p) => {
                        const pct = Math.round((p.current / p.target) * 100);
                        return (
                            <TouchableOpacity key={p.id} style={S.waterCard} activeOpacity={0.88}
                                onPress={() => navigation.navigate('ProjectDetails', { project: p })}>
                                <Image source={p.image} style={S.waterImg} />
                                <View style={S.waterBody}>
                                    <Text style={S.waterTitle}>{p.title}</Text>
                                    <View style={S.waterStats}>
                                        <Text style={S.waterDonors}>{p.donors} متبرع</Text>
                                        <Text style={S.waterPct}>{pct}%</Text>
                                    </View>
                                    <View style={S.pBar}><View style={[S.pFillBlue, { width: pct + '%' as any }]} /></View>
                                    <View style={S.waterActions}>
                                        <TouchableOpacity style={S.waterBtn} onPress={() => navigation.navigate('DonateModal')}>
                                            <Text style={S.waterBtnTxt}>تبرع</Text>
                                        </TouchableOpacity>
                                        <Text style={S.waterGoal}>الهدف: ${p.target.toLocaleString()}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* 8. My Impact Card */}
                <View style={{ paddingHorizontal: 20, marginTop: 28, marginBottom: 4 }}>
                    <LinearGradient colors={['#F0FFF4', '#E5FAEB']} style={S.myImpact}>
                        <View style={S.myImpactHeader}>
                            <MaterialCommunityIcons name="leaf" size={22} color="#00A651" />
                            <Text style={S.myImpactTitle}>أثري في الحياة</Text>
                        </View>
                        <View style={S.myImpactRow}>
                            {[{ v: '$1,250', l: 'تبرعاتي' }, { v: '18', l: 'مشروع' }, { v: '3', l: 'أيتام' }].map((s, i, arr) => (
                                <React.Fragment key={s.l}>
                                    <View style={S.myImpactStat}><Text style={S.myImpactVal}>{s.v}</Text><Text style={S.myImpactLbl}>{s.l}</Text></View>
                                    {i < arr.length - 1 && <View style={S.myImpactDiv} />}
                                </React.Fragment>
                            ))}
                        </View>
                    </LinearGradient>
                </View>

                {/* 9. Monthly Giving (Subscription) */}
                <View style={{ paddingHorizontal: 20, marginTop: 28 }}>
                    <LinearGradient colors={['#FF6B35', '#FF8E53']} style={S.subCard}>
                        <MaterialCommunityIcons name="repeat" size={60} color="rgba(255,255,255,0.18)" style={S.subBgIcon} />
                        <View style={S.subText}>
                            <Text style={S.subBadge}>جديد — أتمتة العطاء</Text>
                            <Text style={S.subTitle}>التبرع الشهري المستمر</Text>
                            <Text style={S.subDesc}>خصص مبلغاً شهرياً تلقائياً لا ينقطع ثوابه</Text>
                            <View style={S.subBtnRow}>
                                <TouchableOpacity style={S.subBtn} onPress={() => navigation.navigate('DonateModal')}>
                                    <Text style={S.subBtnTxt}>ابدأ الآن</Text>
                                </TouchableOpacity>
                                <Text style={S.subHint}>يمكن إلغاؤه في أي وقت</Text>
                            </View>
                        </View>
                    </LinearGradient>
                </View>

                {/* 10. Success Stories */}
                <View style={{ marginTop: 28 }}>
                    <SectionHeader title="قصص النجاح" />
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15 }}>
                        {SUCCESS_STORIES.map((s) => (
                            <View key={s.id} style={S.storyCard}>
                                <Image source={s.image} style={S.storyImg} />
                                <LinearGradient colors={['transparent', 'rgba(0,0,0,0.85)']} style={S.storyOverlay}>
                                    <View style={S.storyDone}>
                                        <MaterialCommunityIcons name="check-decagram" size={13} color="#fff" />
                                        <Text style={S.storyDoneTxt}> مكتمل</Text>
                                    </View>
                                    <Text style={S.storyTitle} numberOfLines={2}>{s.title}</Text>
                                    <View style={S.storyMeta}>
                                        <Text style={S.storyMetaTxt}>{s.donors} متبرع</Text>
                                        <Text style={S.storyMetaTxt}>{s.raised}</Text>
                                    </View>
                                </LinearGradient>
                            </View>
                        ))}
                    </ScrollView>
                </View>

                {/* 11. Zakat CTA Banner */}
                <TouchableOpacity style={{ marginHorizontal: 20, marginTop: 28, borderRadius: 22, overflow: 'hidden' }} onPress={() => navigation.navigate('Zakat')} activeOpacity={0.9}>
                    <LinearGradient colors={['#005C2B', '#00A651']} style={S.zakatRow}>
                        <FontAwesome5 name="calculator" size={34} color="rgba(255,255,255,0.8)" />
                        <View style={{ flex: 1, marginRight: 18 }}>
                            <Text style={S.zakatTitle}>احسب زكاتك الآن</Text>
                            <Text style={S.zakatSub}>أدِّ فريضتك وأخرج زكاتك بسهولة وأمانة</Text>
                        </View>
                        <Ionicons name="chevron-back" size={24} color="#fff" />
                    </LinearGradient>
                </TouchableOpacity>

                {/* 12. Latest News */}
                <View style={{ marginTop: 28, marginBottom: 5 }}>
                    <SectionHeader title="آخر الأخبار" />
                    {NEWS.map((n) => (
                        <TouchableOpacity key={n.id} style={S.newsCard} activeOpacity={0.85}>
                            <Image source={n.image} style={S.newsImg} />
                            <View style={S.newsBody}>
                                <Text style={S.newsDate}>{n.date}</Text>
                                <Text style={S.newsTitle} numberOfLines={3}>{n.title}</Text>
                                <Text style={S.newsMore}>اقرأ المزيد ←</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={{ height: 110 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const S = StyleSheet.create({
    root: { flex: 1, backgroundColor: '#F5F7FA' },

    // Top bar
    topBar: { paddingTop: 50, paddingHorizontal: 20, paddingBottom: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    topBtn: { padding: 6, position: 'relative' },
    notifDot: { position: 'absolute', top: 6, right: 6, width: 8, height: 8, borderRadius: 4, backgroundColor: '#FF3B30' },
    topLogo: { fontSize: 28, fontWeight: '900', color: '#fff', textAlign: 'center' },
    topSub: { fontSize: 10, color: '#C1F0D4', letterSpacing: 3, textTransform: 'uppercase', textAlign: 'center' },

    // Banner
    bannerImg: { width, height: 230, resizeMode: 'cover' },
    bannerOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 210, padding: 22, justifyContent: 'flex-end' },
    bannerSub: { color: '#C1F0D4', fontSize: 13, fontWeight: '600', marginBottom: 4, textAlign: 'right' },
    bannerTitle: { color: '#fff', fontSize: 21, fontWeight: '900', marginBottom: 16, textAlign: 'right', lineHeight: 32 },
    bannerCta: { flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'center', backgroundColor: '#fff', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 22, gap: 6 },
    bannerCtaTxt: { color: '#007A3D', fontWeight: '900', fontSize: 15 },
    dots: { flexDirection: 'row', justifyContent: 'center', paddingVertical: 10, gap: 6 },
    dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#C0D4C8' },
    dotActive: { width: 22, backgroundColor: '#00A651' },

    // Quick actions
    quickGrid: { flexDirection: 'row-reverse', flexWrap: 'wrap', paddingHorizontal: 10, paddingVertical: 14, backgroundColor: '#fff', justifyContent: 'center' },
    quickItem: { width: '23%', alignItems: 'center', paddingVertical: 12 },
    quickIcon: { width: 52, height: 52, borderRadius: 26, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
    quickLabel: { fontSize: 11, fontWeight: '700', color: '#333', textAlign: 'center' },

    // Impact strip
    impactStrip: { flexDirection: 'row', paddingVertical: 18, paddingHorizontal: 5 },
    impactCell: { flex: 1, alignItems: 'center', position: 'relative' },
    impactVal: { fontSize: 17, fontWeight: '900', color: '#fff', marginBottom: 2 },
    impactLbl: { fontSize: 11, color: '#C1F0D4', fontWeight: '600' },
    impactSep: { position: 'absolute', right: 0, top: '20%', width: 1, height: '60%', backgroundColor: 'rgba(255,255,255,0.25)' },

    // Donation category grid
    catGrid: { flexDirection: 'row-reverse', flexWrap: 'wrap', paddingHorizontal: 12, gap: 10 },
    catCard: { width: (width - 44) / 2, height: 145, borderRadius: 18, overflow: 'hidden' },
    catImg: { width: '100%', height: '100%', position: 'absolute', resizeMode: 'cover' },
    catOverlay: { flex: 1, padding: 14, justifyContent: 'flex-end' },
    catDot: { width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginBottom: 7 },
    catLabel: { color: '#fff', fontSize: 16, fontWeight: '900', textAlign: 'right' },
    catDesc: { color: 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: '600', textAlign: 'right', marginTop: 2 },

    // Urgent cards
    urgCard: { width: width * 0.72, backgroundColor: '#fff', borderRadius: 20, marginHorizontal: 7, shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.06, shadowRadius: 12, elevation: 4, overflow: 'hidden' },
    urgImg: { width: '100%', height: 150 },
    urgBadgeRow: { position: 'absolute', top: 12, right: 12, flexDirection: 'row-reverse', gap: 6 },
    urgBadge: { flexDirection: 'row', backgroundColor: '#E12A3C', paddingHorizontal: 8, paddingVertical: 5, borderRadius: 8, alignItems: 'center' },
    urgBadgeTxt: { color: '#fff', fontSize: 10, fontWeight: '800' },
    daysBadge: { backgroundColor: 'rgba(0,0,0,0.55)', paddingHorizontal: 8, paddingVertical: 5, borderRadius: 8 },
    daysTxt: { color: '#fff', fontSize: 10, fontWeight: '700' },
    urgBody: { padding: 14 },
    urgCat: { fontSize: 11, fontWeight: '800', color: '#00A651', marginBottom: 4, textAlign: 'right' },
    urgTitle: { fontSize: 15, fontWeight: '800', color: '#111', marginBottom: 10, lineHeight: 22, textAlign: 'right' },
    urgStats: { flexDirection: 'row-reverse', justifyContent: 'space-between', marginBottom: 7 },
    urgDonors: { fontSize: 12, color: '#888', fontWeight: '600' },
    urgPct: { fontSize: 13, fontWeight: '900', color: '#00A651' },
    urgBtn: { backgroundColor: '#00A651', borderRadius: 12, paddingVertical: 12, alignItems: 'center' },
    urgBtnTxt: { color: '#fff', fontWeight: '800', fontSize: 14 },
    pBar: { height: 6, backgroundColor: '#F0F0F0', borderRadius: 3, overflow: 'hidden', marginBottom: 14 },
    pFill: { height: '100%', backgroundColor: '#00A651', borderRadius: 3 },
    pFillBlue: { height: '100%', backgroundColor: '#0096C7', borderRadius: 3 },

    // Orphan
    orphanBanner: { marginHorizontal: 20, borderRadius: 22, overflow: 'hidden' },
    orphanGrad: { padding: 24 },
    orphanBgIcon: { position: 'absolute', left: -5, bottom: -10 },
    orphanText: { alignItems: 'flex-end' },
    orphanTitle: { fontSize: 21, fontWeight: '900', color: '#fff', marginBottom: 8 },
    orphanSub: { fontSize: 13, color: 'rgba(255,255,255,0.85)', lineHeight: 22, textAlign: 'right', marginBottom: 18 },
    orphanCta: { backgroundColor: '#fff', paddingHorizontal: 22, paddingVertical: 12, borderRadius: 18, alignSelf: 'flex-end' },
    orphanCtaTxt: { color: '#7B2FBE', fontWeight: '900', fontSize: 14 },
    orphanCard: { width: 160, backgroundColor: '#fff', borderRadius: 18, marginHorizontal: 6, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
    orphanAvatar: { width: '100%', height: 115 },
    orphanCardBody: { padding: 12, alignItems: 'flex-end' },
    orphanName: { fontSize: 14, fontWeight: '800', color: '#111', marginBottom: 3 },
    orphanLoc: { fontSize: 12, color: '#888', marginBottom: 8 },
    orphanAmt: { fontSize: 14, fontWeight: '900', color: '#7B2FBE', marginBottom: 10 },
    sponsorBtn: { backgroundColor: '#7B2FBE', borderRadius: 10, paddingVertical: 9, paddingHorizontal: 16 },
    sponsorBtnTxt: { color: '#fff', fontSize: 12, fontWeight: '800' },

    // Water
    waterCard: { flexDirection: 'row-reverse', backgroundColor: '#fff', marginHorizontal: 20, borderRadius: 18, marginBottom: 14, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 10, elevation: 3 },
    waterImg: { width: 115, height: 130, resizeMode: 'cover' },
    waterBody: { flex: 1, padding: 14, justifyContent: 'space-between' },
    waterTitle: { fontSize: 14, fontWeight: '800', color: '#111', textAlign: 'right', lineHeight: 22, marginBottom: 8 },
    waterStats: { flexDirection: 'row-reverse', justifyContent: 'space-between', marginBottom: 6 },
    waterDonors: { fontSize: 12, color: '#888', fontWeight: '600' },
    waterPct: { fontSize: 13, fontWeight: '900', color: '#0096C7' },
    waterActions: { flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 },
    waterBtn: { backgroundColor: '#0096C7', paddingHorizontal: 18, paddingVertical: 9, borderRadius: 10 },
    waterBtnTxt: { color: '#fff', fontSize: 13, fontWeight: '800' },
    waterGoal: { fontSize: 12, color: '#888', fontWeight: '600' },

    // My impact
    myImpact: { borderRadius: 24, padding: 22, borderWidth: 1, borderColor: '#C1F0D4' },
    myImpactHeader: { flexDirection: 'row-reverse', alignItems: 'center', gap: 8, marginBottom: 18 },
    myImpactTitle: { fontSize: 17, fontWeight: '900', color: '#111' },
    myImpactRow: { flexDirection: 'row-reverse', justifyContent: 'space-around' },
    myImpactStat: { flex: 1, alignItems: 'center' },
    myImpactDiv: { width: 1, backgroundColor: '#D0EDD8' },
    myImpactVal: { fontSize: 22, fontWeight: '900', color: '#00A651', marginBottom: 4 },
    myImpactLbl: { fontSize: 12, color: '#666', fontWeight: '700' },

    // Subscription
    subCard: { borderRadius: 24, padding: 24, position: 'relative' },
    subBgIcon: { position: 'absolute', left: -5, bottom: -5 },
    subText: { alignItems: 'flex-end' },
    subBadge: { fontSize: 11, fontWeight: '800', color: 'rgba(255,255,255,0.9)', backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 10, marginBottom: 10 },
    subTitle: { fontSize: 22, fontWeight: '900', color: '#fff', marginBottom: 8 },
    subDesc: { fontSize: 13, color: 'rgba(255,255,255,0.87)', lineHeight: 22, textAlign: 'right', marginBottom: 20 },
    subBtnRow: { flexDirection: 'row-reverse', alignItems: 'center', gap: 16 },
    subBtn: { backgroundColor: '#fff', paddingHorizontal: 22, paddingVertical: 12, borderRadius: 14 },
    subBtnTxt: { color: '#FF6B35', fontWeight: '900', fontSize: 15 },
    subHint: { fontSize: 12, color: 'rgba(255,255,255,0.78)', fontWeight: '600' },

    // Success stories
    storyCard: { width: 245, height: 185, borderRadius: 20, marginHorizontal: 7, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.08, shadowRadius: 12, elevation: 4 },
    storyImg: { width: '100%', height: '100%', position: 'absolute', resizeMode: 'cover' },
    storyOverlay: { flex: 1, padding: 16, justifyContent: 'flex-end' },
    storyDone: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', backgroundColor: '#00A651', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10, marginBottom: 8 },
    storyDoneTxt: { color: '#fff', fontSize: 11, fontWeight: '800' },
    storyTitle: { color: '#fff', fontSize: 14, fontWeight: '800', textAlign: 'right', lineHeight: 21, marginBottom: 8 },
    storyMeta: { flexDirection: 'row-reverse', justifyContent: 'space-between' },
    storyMetaTxt: { color: 'rgba(255,255,255,0.85)', fontSize: 12, fontWeight: '600' },

    // Zakat
    zakatRow: { flexDirection: 'row-reverse', alignItems: 'center', padding: 22, gap: 16 },
    zakatTitle: { fontSize: 18, fontWeight: '900', color: '#fff', marginBottom: 5 },
    zakatSub: { fontSize: 13, color: '#C1F0D4' },

    // News
    newsCard: { flexDirection: 'row-reverse', backgroundColor: '#fff', marginHorizontal: 20, borderRadius: 16, marginBottom: 14, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.04, shadowRadius: 8, elevation: 2 },
    newsImg: { width: 105, height: 100, resizeMode: 'cover' },
    newsBody: { flex: 1, padding: 14, justifyContent: 'space-between', alignItems: 'flex-end' },
    newsDate: { fontSize: 11, color: '#888', fontWeight: '600' },
    newsTitle: { fontSize: 14, fontWeight: '800', color: '#111', textAlign: 'right', lineHeight: 22 },
    newsMore: { fontSize: 13, color: '#00A651', fontWeight: '700' },
});
