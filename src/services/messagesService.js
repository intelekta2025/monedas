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
export const getMessages = async (conversationId) => {
    const { data, error } = await supabase
        .from('whatsapp_messages')
        .select(`
      *,
      media:whatsapp_message_media(id, media_index, media_url, media_content_type)
    `)
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

    if (error) throw error;
    return data;
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
