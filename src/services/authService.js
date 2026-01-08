import { supabase } from './supabase';

/**
 * Servicio de autenticación usando Supabase Auth
 */

// Login con email y password
export const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) throw error;
    return data;
};

// Cerrar sesión
export const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
};

// Obtener usuario actual
export const getCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
};

// Obtener sesión actual
export const getSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
};

// Obtener perfil del usuario desde la tabla profiles
export const getProfile = async (userId) => {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
};

// Escuchar cambios de estado de autenticación
export const onAuthStateChange = (callback) => {
    return supabase.auth.onAuthStateChange(callback);
};
