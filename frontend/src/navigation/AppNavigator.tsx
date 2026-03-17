import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, TouchableOpacity, Animated, StyleSheet, Dimensions } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

// Screens
import HomeScreen from '../screens/HomeScreen';
import ProjectsScreen from '../screens/ProjectsScreen';
import ReportsScreen from '../screens/ReportsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProjectDetailsScreen from '../screens/ProjectDetailsScreen';
import ZakatScreen from '../screens/ZakatScreen';
import CartScreen from '../screens/CartScreen';
import DonationScreen from '../screens/DonationScreen';
import OTPScreen from '../screens/OTPScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import HelpSupportScreen from '../screens/HelpSupportScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AdminDashboardScreen from '../screens/AdminDashboardScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const { width } = Dimensions.get('window');

// ─── Custom Tab Bar ───────────────────────────────────────────────────────────

function CustomTabBar({ state, descriptors, navigation }: any) {
    const tabs = [
        { label: 'الرئيسية', activeIcon: 'home', inactiveIcon: 'home-outline', lib: 'ion' },
        { label: 'المشاريع', activeIcon: 'grid', inactiveIcon: 'grid-outline', lib: 'ion' },
        { label: 'تبرع', activeIcon: null, inactiveIcon: null, lib: 'center' }, // center donate button
        { label: 'تقاريري', activeIcon: 'bar-chart', inactiveIcon: 'bar-chart-outline', lib: 'ion' },
        { label: 'حسابي', activeIcon: 'person', inactiveIcon: 'person-outline', lib: 'ion' },
    ];

    return (
        <View style={tabStyles.tabBar}>
            {state.routes.map((route: any, index: number) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;
                const tab = tabs[index];

                const onPress = () => {
                    const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                // Center donate button
                if (index === 2) {
                    return (
                        <TouchableOpacity key={route.key} onPress={() => navigation.navigate('DonateModal')} style={tabStyles.centerBtnWrap} activeOpacity={0.85}>
                            <LinearGradient colors={['#00A651', '#007A3D']} style={tabStyles.centerBtn}>
                                <MaterialCommunityIcons name="hand-heart" size={28} color="#fff" />
                            </LinearGradient>
                            <Text style={tabStyles.centerLabel}>تبرع</Text>
                        </TouchableOpacity>
                    );
                }

                return (
                    <TouchableOpacity key={route.key} onPress={onPress} style={tabStyles.tabItem}>
                        <View style={[tabStyles.tabIconWrap, isFocused && tabStyles.tabIconWrapActive]}>
                            <Ionicons
                                name={(isFocused ? tab.activeIcon : tab.inactiveIcon) as any}
                                size={22}
                                color={isFocused ? '#00A651' : '#A0A0A0'}
                            />
                        </View>
                        <Text style={[tabStyles.tabLabel, isFocused && tabStyles.tabLabelActive]}>
                            {tab.label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const tabStyles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        paddingBottom: 20,
        paddingTop: 10,
        paddingHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -6 },
        shadowOpacity: 0.06,
        shadowRadius: 16,
        elevation: 18,
        alignItems: 'center',
    },
    tabItem: { flex: 1, alignItems: 'center', paddingTop: 2 },
    tabIconWrap: { width: 40, height: 28, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center', borderRadius: 14 },
    tabIconWrapActive: { backgroundColor: '#E5FAEB' },
    tabLabel: { fontSize: 11, fontWeight: '600', color: '#A0A0A0', marginTop: 4 },
    tabLabelActive: { color: '#00A651', fontWeight: '800' },
    centerBtnWrap: { flex: 1, alignItems: 'center', marginTop: -20 },
    centerBtn: { width: 62, height: 62, borderRadius: 31, justifyContent: 'center', alignItems: 'center', shadowColor: '#00A651', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 12, elevation: 8, borderWidth: 3, borderColor: '#fff' },
    centerLabel: { fontSize: 11, fontWeight: '800', color: '#00A651', marginTop: 4 },
});

// ─── Bottom Tab Navigator ─────────────────────────────────────────────────────

function MainTabs({ route }: any) {
    return (
        <Tab.Navigator
            tabBar={(props) => <CustomTabBar {...props} />}
            screenOptions={{ headerShown: false }}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Projects" component={ProjectsScreen} />
            <Tab.Screen name="DonatePlaceholder" component={HomeScreen} />
            <Tab.Screen name="Reports" component={ReportsScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

// ─── Root Stack Navigator ─────────────────────────────────────────────────────

export default function AppNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
                animationDuration: 300,
            }}
        >
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen
                name="ProjectDetails"
                component={ProjectDetailsScreen}
                options={{
                    animation: 'slide_from_bottom',
                    animationDuration: 320,
                }}
            />
            <Stack.Screen
                name="Zakat"
                component={ZakatScreen}
                options={{
                    presentation: 'modal',
                    animation: 'slide_from_bottom',
                    animationDuration: 350,
                }}
            />
            <Stack.Screen
                name="Cart"
                component={CartScreen}
                options={{
                    presentation: 'modal',
                    animation: 'slide_from_bottom',
                    animationDuration: 350,
                }}
            />
            <Stack.Screen
                name="DonateModal"
                component={DonationScreen}
                options={{
                    presentation: 'modal',
                    animation: 'slide_from_bottom',
                    animationDuration: 400,
                }}
            />
            <Stack.Screen
                name="OTP"
                component={OTPScreen}
                options={{
                    animation: 'slide_from_right',
                }}
            />
            <Stack.Screen
                name="Notifications"
                component={NotificationsScreen}
                options={{
                    animation: 'slide_from_left',
                }}
            />
            <Stack.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    animation: 'slide_from_bottom',
                }}
            />
            <Stack.Screen
                name="HelpSupport"
                component={HelpSupportScreen}
                options={{
                    animation: 'slide_from_right',
                }}
            />
            <Stack.Screen
                name="AdminDashboard"
                component={AdminDashboardScreen}
                options={{
                    animation: 'slide_from_bottom',
                }}
            />
        </Stack.Navigator>
    );
}
