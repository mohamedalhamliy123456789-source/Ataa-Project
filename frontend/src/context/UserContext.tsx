import React, { createContext, useState, useContext, useEffect } from 'react';

interface User {
    id: string;
    email: string;
    name?: string;
    token?: string;
    role?: string;
    [key: string]: any;
}

interface UserContextType {
    user: User | null;
    isGuest: boolean;
    login: (userData: User) => void;
    logout: () => void;
    setAsGuest: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isGuest, setIsGuest] = useState(false);

    const login = (userData: User) => {
        setUser(userData);
        setIsGuest(false);
    };

    const logout = () => {
        setUser(null);
        setIsGuest(false);
    };

    const setAsGuest = () => {
        setUser(null);
        setIsGuest(true);
    };

    return (
        <UserContext.Provider value={{ user, isGuest, login, logout, setAsGuest }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
