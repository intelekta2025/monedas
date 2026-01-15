import { supabase } from './supabase';

/**
 * Servicio para gestión de usuarios del sistema
 * Usa Supabase Admin API para crear usuarios con auto-confirm
 */

// URL del webhook de n8n para gestión de usuarios
const N8N_USER_ADMIN_WEBHOOK = import.meta.env.VITE_N8N_USER_ADMIN_WEBHOOK || 'https://n8n-t.intelekta.ai/webhook/user-admin';

/**
 * Función auxiliar para llamar al webhook de n8n
 */
const callUserAdminWebhook = async (action, payload) => {
    if (!N8N_USER_ADMIN_WEBHOOK) {
        throw new Error('Webhook de n8n para usuarios no configurado.');
    }

    const response = await fetch(N8N_USER_ADMIN_WEBHOOK, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            action,
            ...payload
        })
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error en la acción ${action}: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
        return await response.json();
    } else {
        return { status: 'ok', text: await response.text() };
    }
};

/**
 * Crear un nuevo usuario con auto-confirm via n8n
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña del usuario
 * @param {string} fullName - Nombre completo
 * @param {string} role - Rol del usuario (admin, operator, viewer)
 * @returns {Promise<object>} Usuario creado
 */
export const createUser = async (email, password, fullName, role = 'operator') => {
    try {
        console.log('Iniciando creación de usuario via n8n...', { email, fullName, role });
        // Usar full_name en el payload para coincidir con la base de datos
        const result = await callUserAdminWebhook('create', {
            email,
            password,
            full_name: fullName,
            role
        });

        console.log('Respuesta de n8n recibida:', result);
        return result.data || result;
    } catch (error) {
        console.error('Error detallado en createUser:', error);
        throw error;
    }
};

/**
 * Obtener lista de todos los usuarios
 * @returns {Promise<Array>} Lista de usuarios
 */
export const getUsers = async () => {
    try {
        // Usar el cliente estándar. 
        // IMPORTANTE: Asegúrate de que existan políticas RLS para que solo admins vean esto
        const { data, error } = await supabase
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
 * Actualizar datos de un usuario via n8n
 * @param {string} userId - ID del usuario
 * @param {object} updates - Datos a actualizar
 * @returns {Promise<object>} Usuario actualizado
 */
export const updateUser = async (userId, updates) => {
    try {
        const result = await callUserAdminWebhook('update', {
            id: userId,
            ...updates
        });
        return result.data || result;
    } catch (error) {
        console.error('Error actualizando usuario:', error);
        throw error;
    }
};

/**
 * Eliminar un usuario via n8n
 * @param {string} userId - ID del usuario a eliminar
 */
export const deleteUser = async (userId) => {
    try {
        await callUserAdminWebhook('delete', { userId });
        console.log('Usuario eliminado exitosamente via n8n');
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
