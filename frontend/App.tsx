import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { I18nManager } from 'react-native';
import { UserProvider } from './src/context/UserContext';
import AppNavigator from './src/navigation/AppNavigator';
import SplashScreen from './src/screens/SplashScreen';

// Force RTL layout for Arabic globally
I18nManager.allowRTL(true);

export default function App() {
    const [phase, setPhase] = useState<'splash' | 'app'>('splash');

    useEffect(() => {
        I18nManager.forceRTL(true);
    }, []);

    if (phase === 'splash') {
        return <SplashScreen onDone={() => setPhase('app')} />;
    }

    return (
        <UserProvider>
            <NavigationContainer>
                <AppNavigator />
            </NavigationContainer>
        </UserProvider>
    );
}
