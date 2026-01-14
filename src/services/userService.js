import { supabase } from './supabase';
import { createClient } from '@supabase/supabase-js';

/**
 * Servicio para gestión de usuarios del sistema
 * Usa Supabase Admin API para crear usuarios con auto-confirm
 */

// Obtener Service Role Key del .env
const getServiceRoleKey = () => {
    const key = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;
    if (!key) {
        throw new Error('VITE_SUPABASE_SERVICE_ROLE_KEY no está configurado en .env');
    }
    return key;
};

// Crear cliente admin de Supabase
const getAdminClient = () => {
    const supabaseUrl = 'https://xuylkjkgfztfelsseyvh.supabase.co';
    const serviceRoleKey = getServiceRoleKey();

    return createClient(supabaseUrl, serviceRoleKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    });
};

/**
 * Crear un nuevo usuario con auto-confirm
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña del usuario
 * @param {string} fullName - Nombre completo
 * @param {string} role - Rol del usuario (admin, operator, viewer)
 * @returns {Promise<object>} Usuario creado
 */
export const createUser = async (email, password, fullName, role = 'operator') => {
    try {
        const adminClient = getAdminClient();

        // 1. Crear usuario en auth.users con auto-confirm
        const { data: authData, error: authError } = await adminClient.auth.admin.createUser({
            email,
            password,
            email_confirm: true, // Auto-confirm, no envía email
            user_metadata: {
                full_name: fullName
            }
        });

        if (authError) {
            console.error('Error creando usuario en auth:', authError);
            throw authError;
        }

        const userId = authData.user.id;

        // 2. Insertar registro en tabla profiles
        // USAR adminClient para evitar bloqueo RLS
        const { data: profileData, error: profileError } = await adminClient
            .from('profiles')
            .insert([{
                id: userId,
                email,
                full_name: fullName,
                role,
                status: 'active'
            }])
            .select()
            .single();

        if (profileError) {
            console.error('Error creando perfil:', profileError);
            // Si falla la creación del perfil, eliminar el usuario de auth
            await adminClient.auth.admin.deleteUser(userId);
            throw profileError;
        }

        console.log('Usuario creado exitosamente:', profileData);
        return profileData;

    } catch (error) {
        console.error('Error en createUser:', error);
        throw error;
    }
};

/**
 * Obtener lista de todos los usuarios
 * @returns {Promise<Array>} Lista de usuarios
 */
export const getUsers = async () => {
    try {
        const adminClient = getAdminClient();
        // Usar adminClient para ver todos los usuarios sin restricciones RLS
        const { data, error } = await adminClient
            .from('profiles')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Error obteniendo usuarios:', error);
        throw error;
    }
};

/**
 * Actualizar datos de un usuario
 * @param {string} userId - ID del usuario
 * @param {object} updates - Datos a actualizar
 * @returns {Promise<object>} Usuario actualizado
 */
export const updateUser = async (userId, updates) => {
    try {
        const adminClient = getAdminClient();
        const { data, error } = await adminClient
            .from('profiles')
            .update(updates)
            .eq('id', userId)
            .select()
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error actualizando usuario:', error);
        throw error;
    }
};

/**
 * Eliminar un usuario
 * El constraint ON DELETE CASCADE eliminará automáticamente el perfil
 * @param {string} userId - ID del usuario a eliminar
 */
export const deleteUser = async (userId) => {
    try {
        const adminClient = getAdminClient();

        // Eliminar usuario de auth.users
        // El CASCADE eliminará automáticamente el registro en profiles
        const { error } = await adminClient.auth.admin.deleteUser(userId);

        if (error) throw error;
        console.log('Usuario eliminado exitosamente');
    } catch (error) {
        console.error('Error eliminando usuario:', error);
        throw error;
    }
};

/**
 * Enviar email de recuperación de contraseña
 * @param {string} email - Email del usuario
 */
export const resetPassword = async (email) => {
    try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`
        });

        if (error) throw error;
        console.log('Email de recuperación enviado');
    } catch (error) {
        console.error('Error enviando email de recuperación:', error);
        throw error;
    }
};
