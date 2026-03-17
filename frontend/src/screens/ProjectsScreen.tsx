import React, { useState, useEffect } from 'react';
import { 
    View, Text, StyleSheet, SafeAreaView, ScrollView, 
    TouchableOpacity, Image, TextInput, ActivityIndicator 
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Skeleton from '../components/Skeleton';
import QuickDonateModal from '../components/QuickDonateModal';

export default function ProjectsScreen({ navigation }: any) {
    const [step, setStep] = useState(1); // 1: Main Categories, 2: Sub Categories, 3: Project List
    const [selectedCategory, setSelectedCategory] = useState<any>(null);
    const [selectedSub, setSelectedSub] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [quickDonateVisible, setQuickDonateVisible] = useState(false);
    const [activeProject, setActiveProject] = useState<any>(null);

    const mainCategories = [
        { id: 'charity', title: 'صدقات', icon: 'heart-outline', color: '#00A651' },
        { id: 'atonements', title: 'كفارات', icon: 'shield-checkmark-outline', color: '#7B2FBE' },
        { id: 'vows', title: 'نذور', icon: 'ribbon-outline', color: '#FF9800' },
        { id: 'projects', title: 'مشاريع', icon: 'business-outline', color: '#0096C7' },
        { id: 'sponsorships', title: 'كفالات', icon: 'people-outline', color: '#E91E63' },
    ];

    const subFiltersMap: any = {
        'charity': [
            { id: 'c1', title: 'صدقة جارية', icon: 'water-outline' },
            { id: 'c2', title: 'إطعام مسكين', icon: 'fast-food-outline' },
            { id: 'c3', title: 'سقيا ماء', icon: 'water-outline' },
        ],
        'atonements': [
            { id: 'a1', title: 'كفارة يمين', icon: 'document-text-outline' },
            { id: 'a2', title: 'كفارة صيام', icon: 'calendar-outline' },
        ],
        'vows': [
            { id: 'v1', title: 'نذر عام', icon: 'star-outline' },
        ],
        'projects': [
            { id: 'p1', title: 'مساجد', icon: 'mosque-outline' },
            { id: 'p2', title: 'آبار مياه', icon: 'water-outline' },
            { id: 'p3', title: 'تعليم', icon: 'school-outline' },
        ],
        'sponsorships': [
            { id: 's1', title: 'كفالة يتيم', icon: 'people-outline' },
            { id: 's2', title: 'كفالة أسرة', icon: 'home-outline' },
            { id: 's3', title: 'كفالة طالب', icon: 'book-outline' },
        ],
    };

    const handleMainCategoryPress = (cat: any) => {
        setSelectedCategory(cat);
        setStep(2);
    };

    const handleSubCategoryPress = (sub: any) => {
        setSelectedSub(sub);
        setIsLoading(true);
        setStep(3);
        setTimeout(() => setIsLoading(false), 1000);
    };

    const reset = () => {
        setStep(1);
        setSelectedCategory(null);
        setSelectedSub(null);
    };

    const projects = [
        {
            id: 1,
            title: 'بناء مسجد في قرية نائية',
            category: 'مساجد',
            target: 5000000,
            current: 1250000,
            image: 'https://images.unsplash.com/photo-1542644265-d05ea11a51c4?q=80&w=800&auto=format&fit=crop',
            donors: 156,
            isUrgent: true,
        },
        {
            id: 2,
            title: 'كفالة يتيم متفوق دراسياً',
            category: 'أيتام',
            target: 250000,
            current: 250000,
            image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop',
            donors: 42,
            isUrgent: false,
        }
    ];

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />
            
            {/* Header */}
            <LinearGradient colors={['#007A3D', '#00A651']} style={styles.header}>
                <View style={styles.headerRow}>
                    <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
                        <Ionicons name="notifications-outline" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>
                        {step === 1 ? 'المشاريع' : (selectedCategory?.title || 'المشاريع')}
                    </Text>
                    <TouchableOpacity onPress={() => step > 1 ? setStep(step - 1) : navigation.goBack()}>
                        <Ionicons name={step > 1 ? "chevron-forward" : "arrow-forward"} size={26} color="#fff" />
                    </TouchableOpacity>
                </View>

                {step === 3 && (
                    <View style={styles.searchBar}>
                        <Ionicons name="search-outline" size={20} color="#888" />
                        <TextInput style={styles.searchInput} placeholder="ابحث في المشاريع..." textAlign="right" />
                    </View>
                )}
            </LinearGradient>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
                
                {/* Step 1: Main Categories Grid */}
                {step === 1 && (
                    <View style={styles.container}>
                        <Text style={styles.sectionTitle}>اختر نوع التبرع</Text>
                        <View style={styles.grid}>
                            {mainCategories.map(cat => (
                                <TouchableOpacity key={cat.id} style={styles.catCard} onPress={() => handleMainCategoryPress(cat)}>
                                    <View style={[styles.catIcon, { backgroundColor: cat.color + '15' }]}>
                                        <Ionicons name={cat.icon as any} size={32} color={cat.color} />
                                    </View>
                                    <Text style={styles.catTitle}>{cat.title}</Text>
                                    <View style={styles.countBadge}>
                                        <Text style={styles.countText}>12 مشروع</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                )}

                {/* Step 2: Sub Categories List */}
                {step === 2 && (
                    <View style={styles.subContainer}>
                        <View style={styles.breadcrumb}>
                            <Text style={styles.breadText}>{selectedCategory?.title}</Text>
                            <Ionicons name="chevron-back" size={14} color="#888" style={{ marginHorizontal: 8 }} />
                            <Text style={[styles.breadText, { color: '#00A651' }]}>الأقسام</Text>
                        </View>
                        {subFiltersMap[selectedCategory?.id]?.map((sub: any) => (
                            <TouchableOpacity key={sub.id} style={styles.subRow} onPress={() => handleSubCategoryPress(sub)}>
                                <Ionicons name="chevron-back" size={20} color="#DDD" />
                                <View style={styles.subContent}>
                                    <View style={styles.subTextWrap}>
                                        <Text style={styles.subTitle}>{sub.title}</Text>
                                        <Text style={styles.subDesc}>تصفح جميع التبرعات المتاحة في هذا القسم</Text>
                                    </View>
                                    <View style={styles.subIcon}>
                                        <Ionicons name={sub.icon} size={24} color="#00A651" />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                {/* Step 3: Projects List */}
                {step === 3 && (
                    <View style={styles.projectsContainer}>
                        <View style={styles.breadcrumb}>
                            <TouchableOpacity onPress={() => setStep(1)}><Text style={styles.breadText}>{selectedCategory?.title}</Text></TouchableOpacity>
                            <Ionicons name="chevron-back" size={14} color="#888" style={{ marginHorizontal: 8 }} />
                            <TouchableOpacity onPress={() => setStep(2)}><Text style={styles.breadText}>{selectedSub?.title}</Text></TouchableOpacity>
                        </View>

                        {isLoading ? (
                            [1, 2].map(i => <View key={i} style={styles.skeletonCard}><Skeleton width="100%" height={200} borderRadius={20} /></View>)
                        ) : projects.map(project => {
                             const progress = (project.current / project.target) * 100;
                             return (
                                <View key={project.id} style={styles.projectCard}>
                                    <Image source={{ uri: project.image }} style={styles.cardImage} />
                                    {project.isUrgent && (
                                        <View style={styles.urgentBadge}>
                                            <FontAwesome5 name="fire-alt" size={12} color="#fff" />
                                            <Text style={styles.urgentText}>عاجل</Text>
                                        </View>
                                    )}
                                    <View style={styles.cardBody}>
                                        <Text style={styles.projectTitle}>{project.title}</Text>
                                        <View style={styles.statsRow}>
                                            <View style={styles.stat}>
                                                <Text style={styles.statLabel}>المتبقي</Text>
                                                <Text style={[styles.statValue, { color: '#00A651' }]}>{(project.target - project.current).toLocaleString()} ر.ي</Text>
                                            </View>
                                            <View style={styles.stat}>
                                                <Text style={styles.statLabel}>الهدف</Text>
                                                <Text style={styles.statValue}>{project.target.toLocaleString()} ر.ي</Text>
                                            </View>
                                        </View>
                                        <View style={styles.progressBg}>
                                            <View style={[styles.progressFill, { width: `${progress}%` }]} />
                                        </View>
                                        <View style={styles.cardActions}>
                                            <TouchableOpacity 
                                                style={styles.donateBtn} 
                                                onPress={() => { setActiveProject(project); setQuickDonateVisible(true); }}
                                            >
                                                <Text style={styles.donateBtnText}>تبرع الآن</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.detailsBtn} onPress={() => navigation.navigate('ProjectDetails', { project })}>
                                                <Ionicons name="information-circle-outline" size={24} color="#888" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                             );
                        })}
                    </View>
                )}
                
                <View style={{ height: 100 }} />
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
    container: { flex: 1, backgroundColor: '#F9FAFB' },
    header: { paddingBottom: 20, paddingTop: 50, paddingHorizontal: 20, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
    headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    headerTitle: { fontSize: 20, fontWeight: '900', color: '#fff' },
    searchBar: { flexDirection: 'row-reverse', backgroundColor: '#fff', borderRadius: 15, paddingHorizontal: 15, height: 48, alignItems: 'center' },
    searchInput: { flex: 1, marginRight: 10, fontSize: 14 },
    
    content: { padding: 20 },
    sectionTitle: { fontSize: 18, fontWeight: '900', color: '#111', textAlign: 'right', marginBottom: 20 },
    grid: { flexDirection: 'row-reverse', flexWrap: 'wrap', gap: 15 },
    catCard: { width: '47%', backgroundColor: '#fff', borderRadius: 24, padding: 15, alignItems: 'center', elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10 },
    catIcon: { width: 70, height: 70, borderRadius: 35, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
    catTitle: { fontSize: 16, fontWeight: '800', color: '#111', marginBottom: 6 },
    countBadge: { backgroundColor: '#F0FAF3', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
    countText: { fontSize: 11, color: '#00A651', fontWeight: '700' },

    subContainer: { marginTop: 10 },
    breadcrumb: { flexDirection: 'row-reverse', alignItems: 'center', marginBottom: 20 },
    breadText: { fontSize: 14, fontWeight: '700', color: '#888' },
    subRow: { backgroundColor: '#fff', borderRadius: 20, padding: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 12, elevation: 1 },
    subContent: { flex: 1, flexDirection: 'row-reverse', alignItems: 'center' },
    subIcon: { width: 50, height: 50, borderRadius: 15, backgroundColor: '#F0FAF3', justifyContent: 'center', alignItems: 'center', marginLeft: 15 },
    subTextWrap: { flex: 1, alignItems: 'flex-end' },
    subTitle: { fontSize: 16, fontWeight: '800', color: '#111', marginBottom: 4 },
    subDesc: { fontSize: 12, color: '#999', textAlign: 'right' },

    projectsContainer: { marginTop: 10 },
    skeletonCard: { marginBottom: 20 },
    projectCard: { backgroundColor: '#fff', borderRadius: 25, overflow: 'hidden', marginBottom: 20, elevation: 3, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 15 },
    cardImage: { width: '100%', height: 200 },
    urgentBadge: { position: 'absolute', top: 15, right: 15, backgroundColor: '#E12A3C', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10, gap: 5 },
    urgentText: { color: '#fff', fontSize: 12, fontWeight: '900' },
    cardBody: { padding: 20 },
    projectTitle: { fontSize: 17, fontWeight: '900', color: '#111', textAlign: 'right', marginBottom: 15 },
    statsRow: { flexDirection: 'row-reverse', justifyContent: 'space-between', marginBottom: 12 },
    stat: { alignItems: 'flex-end' },
    statLabel: { fontSize: 11, color: '#999', marginBottom: 4 },
    statValue: { fontSize: 14, fontWeight: '800' },
    progressBg: { height: 8, backgroundColor: '#F0F0F0', borderRadius: 4, marginBottom: 20, overflow: 'hidden' },
    progressFill: { height: '100%', backgroundColor: '#00A651' },
    cardActions: { flexDirection: 'row-reverse', gap: 12 },
    donateBtn: { flex: 1, backgroundColor: '#00A651', borderRadius: 15, paddingVertical: 14, alignItems: 'center' },
    donateBtnText: { color: '#fff', fontSize: 15, fontWeight: '900' },
    detailsBtn: { width: 50, height: 50, borderRadius: 15, backgroundColor: '#F8F9FA', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#EEE' },
});
