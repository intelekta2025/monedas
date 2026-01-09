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
                console.log('AuthContext: Iniciando sesión...');
                // Timeout de 30 segundos para evitar quedarse cargando infinitamente
                const timeoutPromise = new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Timeout: Supabase no respondió')), 30000)
                );

                const session = await Promise.race([getSession(), timeoutPromise]);
                console.log('AuthContext: Sesión obtenida:', session ? 'válida' : 'ninguna');

                if (session?.user) {
                    setUser(session.user);
                    await loadProfile(session.user.id);
                }
            } catch (error) {
                console.error('Error inicializando sesión:', error);
                // Aunque falle, permitir que la app continúe para mostrar login
            } finally {
                console.log('AuthContext: Finalizando carga, mostrando app');
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
        console.log('AuthContext: Iniciando cierre de sesión...');
        try {
            await authSignOut();
            console.log('AuthContext: Sesión cerrada en Supabase');
        } catch (error) {
            console.error('AuthContext: Error cerrando sesión en Supabase (ignorando):', error);
        }
        // Siempre limpiar estado local, sin importar el resultado de Supabase
        setUser(null);
        setProfile(null);
        // Limpiar localStorage también por si acaso
        localStorage.removeItem('sb-' + window.location.hostname.split('.')[0] + '-auth-token');
        // Forzar limpieza de todo lo relacionado a Supabase auth
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('sb-')) {
                localStorage.removeItem(key);
            }
        });
        console.log('AuthContext: Estado local limpiado');
        // Forzar recarga de la página para mostrar login
        window.location.reload();
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
