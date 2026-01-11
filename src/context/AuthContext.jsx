import React, { createContext, useContext, useState, useEffect } from 'react';
import { signIn as authSignIn, signOut as authSignOut, getSession, getProfile, onAuthStateChange } from '../services/authService';
import { supabase, startSessionHeartbeat, stopSessionHeartbeat } from '../services/supabase';

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
        // 1. Verificar sesión SIN timeout
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session?.user) {
                setUser(session.user);
                loadProfile(session.user.id);
                startSessionHeartbeat(); // Tu heartbeat es buena idea, mantenlo.
            }
            setLoading(false); // La app carga, tenga o no usuario.
        }).catch(err => {
            console.error("Error crítico de sesión", err);
            setLoading(false);
        });

        // 2. Escuchar cambios
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                setUser(session.user);
            } else if (event === 'SIGNED_OUT') {
                // Solo aquí limpiamos el estado
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

        // Detener heartbeat ANTES de cerrar sesión
        stopSessionHeartbeat();

        // Timeout de 3 segundos para el signOut de Supabase
        const signOutWithTimeout = new Promise((resolve) => {
            const timeout = setTimeout(() => {
                console.log('AuthContext: Timeout en signOut, continuando...');
                resolve();
            }, 3000);

            authSignOut()
                .then(() => {
                    clearTimeout(timeout);
                    console.log('AuthContext: Sesión cerrada en Supabase');
                    resolve();
                })
                .catch((error) => {
                    clearTimeout(timeout);
                    console.error('AuthContext: Error cerrando sesión (ignorando):', error);
                    resolve();
                });
        });

        await signOutWithTimeout;

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
        console.log('AuthContext: Estado local limpiado, recargando...');
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
