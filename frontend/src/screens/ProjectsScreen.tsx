import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function ProjectsScreen({ navigation }: any) {
    const [activeFilter, setActiveFilter] = useState('الكل');

    const filters = ['الكل', 'إغاثة عاجلة', 'مياه', 'مساجد', 'أيتام', 'تعليم'];

    const allProjects = [
        {
            id: 1,
            title: 'حفر بئر مياه سطحي بالغاطس - تعز',
            category: 'مياه',
            target: 2500,
            current: 1200,
            image: 'https://images.unsplash.com/photo-1541819068018-8f53941459ff?q=80&w=800&auto=format&fit=crop',
            donors: 85,
            isUrgent: true,
        },
        {
            id: 2,
            title: 'كفالة أسرة يتيم لمدة عام',
            category: 'أيتام',
            target: 3600,
            current: 3600,
            image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop',
            donors: 142,
            isUrgent: false,
        },
        {
            id: 3,
            title: 'سلة غذائية للأسر المتعففة - صنعاء',
            category: 'إغاثة عاجلة',
            target: 50,
            current: 15,
            image: 'https://images.unsplash.com/photo-1593113589914-07599018dd05?q=80&w=800&auto=format&fit=crop',
            donors: 3,
            isUrgent: true,
        },
        {
            id: 4,
            title: 'بناء مسجد قرية السعادة العظيم',
            category: 'مساجد',
            target: 45000,
            current: 12500,
            image: 'https://images.unsplash.com/photo-1542644265-d05ea11a51c4?q=80&w=800&auto=format&fit=crop',
            donors: 310,
            isUrgent: false,
        }
    ];

    const filteredProjects = activeFilter === 'الكل'
        ? allProjects
        : allProjects.filter(p => p.category === activeFilter);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" backgroundColor="#fff" />

            {/* Custom Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>المشاريع الخيرية</Text>
                <TouchableOpacity style={styles.headerBackBtn} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#111" />
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <View style={styles.searchBox}>
                    <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="ابحث عن مشروع للتبّرع له..."
                        placeholderTextColor="#999"
                    />
                </View>
                <TouchableOpacity style={styles.filterBtn}>
                    <Ionicons name="options-outline" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* Filter Chips */}
            <View style={styles.filtersWrapper}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersScroll}>
                    {filters.map(filter => (
                        <TouchableOpacity
                            key={filter}
                            style={[styles.filterChip, activeFilter === filter && styles.filterChipActive]}
                            onPress={() => setActiveFilter(filter)}
                        >
                            <Text style={[styles.filterText, activeFilter === filter && styles.filterTextActive]}>{filter}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Projects List */}
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContainer}>
                <Text style={styles.resultsText}>عرض {filteredProjects.length} مشروع متاح</Text>

                {filteredProjects.map(project => {
                    const progressPercent = Math.min(100, (project.current / project.target) * 100);
                    const widthStr = progressPercent.toString() + '%';
                    const isCompleted = project.current >= project.target;

                    return (
                        <TouchableOpacity
                            key={project.id}
                            style={styles.projectCard}
                            activeOpacity={0.9}
                            onPress={() => { }} // Navigation to Details to be added later
                        >
                            <View style={styles.imageContainer}>
                                <Image source={{ uri: project.image }} style={styles.projectImage} />

                                {/* Badges */}
                                <View style={styles.badgesWrapper}>
                                    {project.isUrgent && (
                                        <View style={styles.urgentBadge}>
                                            <FontAwesome5 name="fire-alt" size={10} color="#fff" style={{ marginRight: 4 }} />
                                            <Text style={styles.badgeText}>عاجل جداً</Text>
                                        </View>
                                    )}
                                    <View style={styles.categoryBadge}>
                                        <Text style={styles.badgeText}>{project.category}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.projectInfo}>
                                <Text style={styles.projectTitle}>{project.title}</Text>

                                <View style={styles.statsRow}>
                                    <View style={styles.statItem}>
                                        <Text style={styles.statLabel}>المطلوب</Text>
                                        <Text style={styles.statValue}>${project.target.toLocaleString()}</Text>
                                    </View>
                                    <View style={styles.statItemCenter}>
                                        <Text style={styles.statLabel}>المتبقي</Text>
                                        <Text style={[styles.statValue, { color: '#00A651' }]}>
                                            ${Math.max(0, project.target - project.current).toLocaleString()}
                                        </Text>
                                    </View>
                                    <View style={styles.statItemRight}>
                                        <Text style={styles.statLabel}>المتبرعون</Text>
                                        <Text style={styles.statValue}>{project.donors}</Text>
                                    </View>
                                </View>

                                {/* Progress Bar Area */}
                                <View style={styles.progressContainer}>
                                    <View style={styles.progressBarBg}>
                                        <View style={[styles.progressBarFill, { width: widthStr as any }]} />
                                    </View>
                                </View>

                                {/* Bottom Actions */}
                                <View style={styles.cardActions}>
                                    <TouchableOpacity style={[styles.donateBtn, isCompleted && styles.donateBtnDisabled]} disabled={isCompleted} onPress={() => navigation.navigate('Donate')}>
                                        <Text style={styles.donateBtnText}>{isCompleted ? 'مكتمل بحمد الله' : 'تبرع الآن'}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.cartBtn}>
                                        <Ionicons name="cart-outline" size={24} color="#00A651" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.cartBtn}>
                                        <Ionicons name="share-social-outline" size={24} color="#888" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                })}
                <View style={{ height: 120 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA' },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
        position: 'relative'
    },
    headerTitle: { fontSize: 20, fontWeight: '800', color: '#111' },
    headerBackBtn: { position: 'absolute', right: 20, top: 48, padding: 4 },
    searchContainer: { flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#fff', gap: 10 },
    searchBox: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F6F8', borderRadius: 12, paddingHorizontal: 15, height: 50 },
    searchIcon: { marginRight: 10 },
    searchInput: { flex: 1, height: '100%', textAlign: 'right', fontSize: 14, fontFamily: 'System' },
    filterBtn: { width: 50, height: 50, backgroundColor: '#00A651', borderRadius: 12, justifyContent: 'center', alignItems: 'center', shadowColor: '#00A651', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 4 },
    filtersWrapper: { backgroundColor: '#fff', paddingBottom: 15 },
    filtersScroll: { paddingHorizontal: 15 },
    filterChip: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, backgroundColor: '#F5F6F8', marginHorizontal: 5, borderWidth: 1, borderColor: '#EEE' },
    filterChipActive: { backgroundColor: '#E5FAEB', borderColor: '#00A651' },
    filterText: { fontSize: 14, fontWeight: '600', color: '#666' },
    filterTextActive: { color: '#00A651', fontWeight: '800' },
    listContainer: { paddingHorizontal: 20, paddingTop: 15 },
    resultsText: { fontSize: 14, color: '#888', fontWeight: '600', marginBottom: 15, textAlign: 'right' },
    projectCard: { backgroundColor: '#fff', borderRadius: 20, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.04, shadowRadius: 10, elevation: 3 },
    imageContainer: { position: 'relative' },
    projectImage: { width: '100%', height: 180, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
    badgesWrapper: { position: 'absolute', top: 15, right: 15, flexDirection: 'row', gap: 8 },
    categoryBadge: { backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
    urgentBadge: { backgroundColor: '#E12A3C', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, flexDirection: 'row', alignItems: 'center' },
    badgeText: { color: '#fff', fontSize: 11, fontWeight: '800' },
    projectInfo: { padding: 18 },
    projectTitle: { fontSize: 18, fontWeight: '800', color: '#222', marginBottom: 15, lineHeight: 26 },
    statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
    statItem: { flex: 1 },
    statItemCenter: { flex: 1, alignItems: 'center', borderLeftWidth: 1, borderRightWidth: 1, borderColor: '#EEE' },
    statItemRight: { flex: 1, alignItems: 'flex-end' },
    statLabel: { fontSize: 12, color: '#888', marginBottom: 6, fontWeight: '500' },
    statValue: { fontSize: 15, fontWeight: '800', color: '#333' },
    progressContainer: { marginBottom: 15 },
    progressBarBg: { height: 8, backgroundColor: '#F0F0F0', borderRadius: 4, overflow: 'hidden' },
    progressBarFill: { height: '100%', backgroundColor: '#00A651', borderRadius: 4 },
    cardActions: { flexDirection: 'row', gap: 10 },
    donateBtn: { flex: 1, backgroundColor: '#00A651', borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
    donateBtnDisabled: { backgroundColor: '#E0E0E0' },
    donateBtnText: { color: '#fff', fontWeight: '800', fontSize: 15 },
    cartBtn: { width: 50, height: 50, borderRadius: 12, borderWidth: 1, borderColor: '#E5E5E5', justifyContent: 'center', alignItems: 'center' },
});
