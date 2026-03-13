import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function ProjectDetailsScreen({ route, navigation }: any) {
    // Mock data for display if not passed via route
    const project = route.params?.project || {
        id: 1,
        title: 'إغاثة عاجلة لمتضرري السيول - الحديدة',
        target: 50000,
        current: 32500,
        donors: 1240,
        category: 'إغاثة عاجلة',
        image: 'https://images.unsplash.com/photo-1593113589914-07599018dd05?q=80&w=800&auto=format&fit=crop',
        description: 'تهدف هذه الحملة العاجلة إلى توفير المأوى المؤقت، الغذاء، والرعاية الصحية لمئات الأسر التي شردتها السيول الأخيرة في محافظة الحديدة. تبرعك اليوم ينقذ حياة ويأوي أسرة بلا مأوى.',
    };

    const progressPercent = Math.min(100, (project.current / project.target) * 100);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" backgroundColor="transparent" translucent />

            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                {/* Immersive Header Image */}
                <View style={styles.imageHeader}>
                    <Image source={{ uri: project.image }} style={styles.heroImage} />
                    <LinearGradient colors={['rgba(0,0,0,0.6)', 'transparent', 'rgba(0,0,0,0.8)']} style={styles.imageOverlay}>
                        <SafeAreaView>
                            <View style={styles.headerNav}>
                                <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.goBack()}>
                                    <Ionicons name="arrow-back" size={24} color="#fff" />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.headerBtn}>
                                    <Ionicons name="share-social" size={24} color="#fff" />
                                </TouchableOpacity>
                            </View>
                        </SafeAreaView>

                        <View style={styles.headerTitleBox}>
                            <View style={styles.categoryBadge}>
                                <Text style={styles.categoryText}>{project.category}</Text>
                            </View>
                            <Text style={styles.projectTitle}>{project.title}</Text>
                        </View>
                    </LinearGradient>
                </View>

                {/* Content Body */}
                <View style={styles.contentBody}>

                    {/* Progress Card (Floating over image) */}
                    <View style={styles.progressCard}>
                        <View style={styles.statsRow}>
                            <View style={styles.statBox}>
                                <Text style={styles.statLabel}>تم جمع</Text>
                                <Text style={styles.statValueCollected}>${project.current.toLocaleString()}</Text>
                            </View>
                            <View style={styles.statBoxCenter}>
                                <Text style={styles.statLabel}>المتبقي</Text>
                                <Text style={styles.statValueRemaining}>${(project.target - project.current).toLocaleString()}</Text>
                            </View>
                            <View style={styles.statBox}>
                                <Text style={styles.statLabel}>المتبرعون</Text>
                                <Text style={styles.statValueDonors}>{project.donors}</Text>
                            </View>
                        </View>

                        <View style={styles.progressContainer}>
                            <View style={styles.progressBarBg}>
                                <View style={[styles.progressBarFill, { width: progressPercent.toString() + '%' as any }]} />
                            </View>
                            <Text style={styles.progressPercentText}>{Math.round(progressPercent)}%</Text>
                        </View>
                    </View>

                    {/* Quick Info Tags */}
                    <View style={styles.tagsContainer}>
                        <View style={styles.infoTag}>
                            <MaterialCommunityIcons name="map-marker-outline" size={18} color="#00A651" />
                            <Text style={styles.tagText}>اليمن</Text>
                        </View>
                        <View style={styles.infoTag}>
                            <MaterialCommunityIcons name="shield-check-outline" size={18} color="#00A651" />
                            <Text style={styles.tagText}>مشروع معتمد</Text>
                        </View>
                        <View style={styles.infoTag}>
                            <MaterialCommunityIcons name="clock-outline" size={18} color="#F5A623" />
                            <Text style={[styles.tagText, { color: '#F5A623' }]}>ينتهي قريباً</Text>
                        </View>
                    </View>

                    {/* About Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>قصة المشروع</Text>
                        <Text style={styles.descriptionText}>{project.description}</Text>
                        <TouchableOpacity style={styles.readMoreBtn}>
                            <Text style={styles.readMoreText}>قراءة المزيد</Text>
                            <Ionicons name="chevron-down" size={16} color="#00A651" />
                        </TouchableOpacity>
                    </View>

                    {/* Organizer Info */}
                    <View style={styles.organizerCard}>
                        <View style={styles.orgAvatarBg}>
                            <FontAwesome5 name="hand-holding-heart" size={24} color="#00A651" />
                        </View>
                        <View style={styles.orgInfo}>
                            <Text style={styles.orgTitle}>جمعية عطاء الخيرية</Text>
                            <Text style={styles.orgSub}>مؤسسة مرخصة - إغاثة وتنمية</Text>
                        </View>
                        <TouchableOpacity style={styles.followBtn}>
                            <Text style={styles.followBtnText}>متابعة</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={{ height: 120 }} />
            </ScrollView>

            {/* Sticky Bottom Action Bar */}
            <View style={styles.stickyBottomBar}>
                <TouchableOpacity style={styles.donateNowBtn} onPress={() => navigation.navigate('DonateModal')}>
                    <Text style={styles.donateNowText}>تبرع الآن لفعل الخير</Text>
                    <FontAwesome5 name="heart" size={16} color="#fff" style={{ marginLeft: 10 }} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.addToCartBtn} onPress={() => navigation.navigate('Cart')}>
                    <Ionicons name="cart-outline" size={28} color="#00A651" />
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FAFBFC' },
    imageHeader: { width: width, height: 350, position: 'relative' },
    heroImage: { width: '100%', height: '100%', position: 'absolute' },
    imageOverlay: { flex: 1, justifyContent: 'space-between' },
    headerNav: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 10 },
    headerBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
    headerTitleBox: { padding: 25, paddingBottom: 50 },
    categoryBadge: { alignSelf: 'flex-start', backgroundColor: '#00A651', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, marginBottom: 15 },
    categoryText: { color: '#fff', fontSize: 13, fontWeight: '800' },
    projectTitle: { color: '#fff', fontSize: 26, fontWeight: '900', lineHeight: 36, textAlign: 'right' },
    contentBody: { paddingHorizontal: 20, marginTop: -35 },
    progressCard: { backgroundColor: '#fff', borderRadius: 20, padding: 25, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.08, shadowRadius: 20, elevation: 8, marginBottom: 25 },
    statsRow: { flexDirection: 'row-reverse', justifyContent: 'space-between', marginBottom: 20 },
    statBox: { flex: 1, alignItems: 'center' },
    statBoxCenter: { flex: 1, alignItems: 'center', borderLeftWidth: 1, borderRightWidth: 1, borderColor: '#F0F0F0' },
    statLabel: { fontSize: 12, color: '#888', fontWeight: '600', marginBottom: 8 },
    statValueCollected: { fontSize: 18, fontWeight: '900', color: '#00A651' },
    statValueRemaining: { fontSize: 18, fontWeight: '900', color: '#111' },
    statValueDonors: { fontSize: 18, fontWeight: '900', color: '#4A90E2' },
    progressContainer: { flexDirection: 'row-reverse', alignItems: 'center' },
    progressBarBg: { flex: 1, height: 8, backgroundColor: '#F0F0F0', borderRadius: 4, overflow: 'hidden', marginLeft: 15 },
    progressBarFill: { height: '100%', backgroundColor: '#00A651', borderRadius: 4 },
    progressPercentText: { fontSize: 14, fontWeight: '800', color: '#00A651' },
    tagsContainer: { flexDirection: 'row-reverse', flexWrap: 'wrap', gap: 10, marginBottom: 30 },
    infoTag: { flexDirection: 'row-reverse', alignItems: 'center', backgroundColor: '#fff', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 12, borderWidth: 1, borderColor: '#EEE' },
    tagText: { fontSize: 13, fontWeight: '700', color: '#444', marginRight: 8 },
    section: { marginBottom: 30 },
    sectionTitle: { fontSize: 22, fontWeight: '900', color: '#111', marginBottom: 15, textAlign: 'right' },
    descriptionText: { fontSize: 15, color: '#555', lineHeight: 28, textAlign: 'right' },
    readMoreBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 15 },
    readMoreText: { color: '#00A651', fontSize: 14, fontWeight: '800', marginRight: 5 },
    organizerCard: { flexDirection: 'row-reverse', alignItems: 'center', backgroundColor: '#fff', padding: 20, borderRadius: 20, borderWidth: 1, borderColor: '#F0F0F0' },
    orgAvatarBg: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#E5FAEB', justifyContent: 'center', alignItems: 'center', marginLeft: 15 },
    orgInfo: { flex: 1 },
    orgTitle: { fontSize: 16, fontWeight: '800', color: '#111', marginBottom: 4, textAlign: 'right' },
    orgSub: { fontSize: 12, color: '#888', textAlign: 'right' },
    followBtn: { backgroundColor: '#F5F6F8', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 12 },
    followBtnText: { color: '#333', fontSize: 12, fontWeight: '700' },
    stickyBottomBar: { position: 'absolute', bottom: 0, width: '100%', paddingHorizontal: 20, paddingVertical: 15, paddingBottom: 35, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#EEE', flexDirection: 'row-reverse', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: -10 }, shadowOpacity: 0.05, shadowRadius: 15, elevation: 15 },
    donateNowBtn: { flex: 1, flexDirection: 'row', backgroundColor: '#00A651', paddingVertical: 18, borderRadius: 16, justifyContent: 'center', alignItems: 'center', shadowColor: '#00A651', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 12, elevation: 6 },
    donateNowText: { color: '#fff', fontSize: 18, fontWeight: '900' },
    addToCartBtn: { width: 60, height: 60, borderRadius: 16, borderWidth: 2, borderColor: '#00A651', justifyContent: 'center', alignItems: 'center', marginRight: 15, backgroundColor: '#FAFFF0' },
});
