import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
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
