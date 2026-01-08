import React, { createContext, useContext, useState, useEffect } from 'react';
import { signIn as authSignIn, signOut as authSignOut, getSession, getProfile, onAuthStateChange } from '../services/authService';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    // Cargar perfil del usuario
    const loadProfile = async (userId) => {
        try {
            const profileData = await getProfile(userId);
            setProfile(profileData);
        } catch (error) {
            console.error('Error cargando perfil:', error);
        }
    };

    // Inicializar sesión
    useEffect(() => {
        const initSession = async () => {
            try {
                const session = await getSession();
                if (session?.user) {
                    setUser(session.user);
                    await loadProfile(session.user.id);
                }
            } catch (error) {
                console.error('Error inicializando sesión:', error);
            } finally {
                setLoading(false);
            }
        };

        initSession();

        // Escuchar cambios de autenticación
        const { data: { subscription } } = onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_IN' && session?.user) {
                setUser(session.user);
                await loadProfile(session.user.id);
            } else if (event === 'SIGNED_OUT') {
                setUser(null);
                setProfile(null);
            }
        });

        return () => subscription?.unsubscribe();
    }, []);

    // Login
    const signIn = async (email, password) => {
        const { user } = await authSignIn(email, password);
        setUser(user);
        if (user) {
            await loadProfile(user.id);
        }
        return user;
    };

    // Logout
    const signOut = async () => {
        await authSignOut();
        setUser(null);
        setProfile(null);
    };

    const value = {
        user,
        profile,
        loading,
        signIn,
        signOut,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
