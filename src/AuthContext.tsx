// AuthContext.tsx

import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

type AuthContextType = {
    isLoggedIn: boolean;
    setLoggedIn: Dispatch<SetStateAction<boolean>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoggedIn, setLoggedIn] = useState(false);

    const contextValue: AuthContextType = {
        isLoggedIn,
        setLoggedIn: (value: boolean) => {
            setLoggedIn(value);
        },
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
