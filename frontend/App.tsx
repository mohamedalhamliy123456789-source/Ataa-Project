import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { I18nManager } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';

// Force RTL layout for Arabic globally
I18nManager.forceRTL(true);
I18nManager.allowRTL(true);

type Phase = 'splash' | 'login' | 'app';

export default function App() {
    const [phase, setPhase] = useState<Phase>('splash');

    if (phase === 'splash') {
        return <SplashScreen onDone={() => setPhase('login')} />;
    }

    if (phase === 'login') {
        return (
            <NavigationContainer>
                <LoginScreen onLogin={() => setPhase('app')} />
            </NavigationContainer>
        );
    }

    return (
        <NavigationContainer>
            <AppNavigator />
        </NavigationContainer>
    );
}
