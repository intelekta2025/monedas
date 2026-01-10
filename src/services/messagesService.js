import { supabase } from './supabase';

/**
 * Servicio para gestionar conversaciones y mensajes de WhatsApp
 */

// Obtener todas las conversaciones de un teléfono (con datos del cliente)
export const getConversations = async (phoneId) => {
    const { data, error } = await supabase
        .from('whatsapp_conversations')
        .select(`
      *,
      client:clients(id, phone_number, full_name, status)
    `)
        .eq('phone_id', phoneId)
        .eq('status', 'open')
        .order('last_message_at', { ascending: false });

    if (error) throw error;
    return data;
};

// Obtener conversaciones cerradas
export const getClosedConversations = async (phoneId, limit = 50) => {
    const { data, error } = await supabase
        .from('whatsapp_conversations')
        .select(`
      *,
      client:clients(id, phone_number, full_name, status)
    `)
        .eq('phone_id', phoneId)
        .eq('status', 'closed')
        .order('closed_at', { ascending: false })
        .limit(limit);

    if (error) throw error;
    return data;
};

// Obtener una conversación por ID
export const getConversation = async (conversationId) => {
    const { data, error } = await supabase
        .from('whatsapp_conversations')
        .select(`
      *,
      client:clients(id, phone_number, full_name, status)
    `)
        .eq('id', conversationId)
        .single();

    if (error) throw error;
    return data;
};

// Obtener mensajes de una conversación con sus media
export const getMessages = async (conversationId, limit = 50) => {
    try {
        const { data, error } = await supabase
            .from('whatsapp_messages')
            .select(`
          *,
          media:whatsapp_message_media(id, media_index, media_url, media_content_type, ai_analysis)
        `)
            .eq('conversation_id', conversationId)
            .order('created_at', { ascending: false }) // Obtener los más recientes primero
            .limit(limit);

        if (error) {
            console.error('getMessages: Error de Supabase:', error);
            throw error;
        }

        // Invertir para mostrar cronológicamente (antiguos -> nuevos)
        return data ? data.reverse() : [];
    } catch (err) {
        console.error('getMessages: Error en la petición:', err);
        throw err;
    }
};

// Obtener TODOS los mensajes de un cliente (de todas sus conversaciones)
// status: 'open' para solo abiertas, 'closed' para solo cerradas, null para todas
export const getMessagesByClient = async (clientId, phoneId, status = null, limit = 50) => {
    // Construir query para conversaciones del cliente
    let query = supabase
        .from('whatsapp_conversations')
        .select('id')
        .eq('client_id', clientId)
        .eq('phone_id', phoneId);

    // Filtrar por status si se especifica
    if (status) {
        query = query.eq('status', status);
    }

    const { data: conversations, error: convError } = await query;

    if (convError) throw convError;
    if (!conversations || conversations.length === 0) return [];

    // Obtener mensajes de todas las conversaciones filtradas
    const conversationIds = conversations.map(c => c.id);
    const { data: messages, error: msgError } = await supabase
        .from('whatsapp_messages')
        .select(`
      *,
      media:whatsapp_message_media(id, media_index, media_url, media_content_type, ai_analysis)
    `)
        .in('conversation_id', conversationIds)
        .order('created_at', { ascending: false })
        .limit(limit);

    if (msgError) throw msgError;
    return messages ? messages.reverse() : [];
};

// Marcar conversación como leída
export const markAsRead = async (conversationId) => {
    // Marcar todos los mensajes como leídos
    await supabase
        .from('whatsapp_messages')
        .update({ read_at: new Date().toISOString() })
        .eq('conversation_id', conversationId)
        .is('read_at', null);

    // Resetear contador de no leídos
    const { data, error } = await supabase
        .from('whatsapp_conversations')
        .update({
            unread_count: 0,
            updated_at: new Date().toISOString()
        })
        .eq('id', conversationId)
        .select()
        .single();

    if (error) throw error;
    return data;
};

// Cerrar conversación
export const closeConversation = async (conversationId, reason = 'resolved', closedBy = null) => {
    const { data, error } = await supabase
        .from('whatsapp_conversations')
        .update({
            status: 'closed',
            closed_at: new Date().toISOString(),
            closed_reason: reason,
            closed_by: closedBy,
            updated_at: new Date().toISOString()
        })
        .eq('id', conversationId)
        .select()
        .single();

    if (error) throw error;
    return data;
};

// Reabrir conversación
export const reopenConversation = async (conversationId) => {
    const { data, error } = await supabase
        .from('whatsapp_conversations')
        .update({
            status: 'open',
            closed_at: null,
            closed_reason: null,
            closed_by: null,
            updated_at: new Date().toISOString()
        })
        .eq('id', conversationId)
        .select()
        .single();

    if (error) throw error;
    return data;
};

// Enviar mensaje (guardar en DB, n8n lo enviará via Twilio)
export const sendMessage = async (conversationId, phoneId, toNumber, body) => {
    // Insertar mensaje saliente
    const { data: message, error: msgError } = await supabase
        .from('whatsapp_messages')
        .insert([{
            conversation_id: conversationId,
            phone_id: phoneId,
            from_number: '', // Se llenará después con el número del phone
            to_number: toNumber,
            body,
            message_type: 'text',
            direction: 'outbound',
            status: 'pending',
        }])
        .select()
        .single();

    if (msgError) throw msgError;

    // Actualizar última mensaje de la conversación
    await supabase
        .from('whatsapp_conversations')
        .update({
            last_message: body,
            last_message_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        })
        .eq('id', conversationId);

    return message;
};

// Suscribirse a nuevas conversaciones en tiempo real
export const subscribeToConversations = (phoneId, callback) => {
    const channel = supabase
        .channel(`conversations-${phoneId}`)
        .on(
            'postgres_changes',
            {
                event: '*',
                schema: 'public',
                table: 'whatsapp_conversations',
                filter: `phone_id=eq.${phoneId}`,
            },
            (payload) => {
                callback(payload);
            }
        )
        .subscribe();

    return () => {
        supabase.removeChannel(channel);
    };
};

// Suscribirse a nuevos mensajes de una conversación
export const subscribeToMessages = (conversationId, callback) => {
    const channel = supabase
        .channel(`messages-${conversationId}`)
        .on(
            'postgres_changes',
            {
                event: 'INSERT',
                schema: 'public',
                table: 'whatsapp_messages',
                filter: `conversation_id=eq.${conversationId}`,
            },
            (payload) => {
                callback(payload.new);
            }
        )
        .subscribe();

    return () => {
        supabase.removeChannel(channel);
    };
};

/**
 * Suscribirse a TODOS los mensajes de un número de teléfono (Global)
 * Permite actualizar la lista lateral y el chat activo al mismo tiempo.
 */
export const subscribeToAllMessagesByPhone = (phoneId, callback) => {
    const channel = supabase
        .channel(`global-messages-${phoneId}`)
        .on(
            'postgres_changes',
            {
                event: 'INSERT',
                schema: 'public',
                table: 'whatsapp_messages',
                filter: `phone_id=eq.${phoneId}`,
            },
            (payload) => {
                callback(payload.new);
            }
        )
        .subscribe();

    return () => {
        supabase.removeChannel(channel);
    };
};

