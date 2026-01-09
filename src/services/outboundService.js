// Servicio para enviar mensajes salientes a través de n8n/Twilio
import { supabase } from './supabase';

// URL del webhook de n8n para mensajes salientes
// Configura esta URL con tu webhook real de n8n
const N8N_OUTBOUND_WEBHOOK = import.meta.env.VITE_N8N_OUTBOUND_WEBHOOK || '';

/**
 * Envía un mensaje a través de WhatsApp via n8n/Twilio
 * @param {Object} params - Parámetros del mensaje
 * @param {string} params.conversationId - ID de la conversación
 * @param {string} params.phoneId - ID del teléfono que envía
 * @param {string} params.toNumber - Número del destinatario (cliente)
 * @param {string} params.fromNumber - Número del remitente (teléfono WhatsApp Business)
 * @param {string} params.body - Contenido del mensaje
 * @returns {Promise<Object>} - Resultado del envío
 */
export const sendWhatsAppMessage = async ({ conversationId, phoneId, toNumber, fromNumber, body }) => {
    if (!N8N_OUTBOUND_WEBHOOK) {
        throw new Error('Webhook de n8n no configurado. Agrega VITE_N8N_OUTBOUND_WEBHOOK a tu .env');
    }

    if (!body || !body.trim()) {
        throw new Error('El mensaje no puede estar vacío');
    }

    // Llamar al webhook de n8n
    const response = await fetch(N8N_OUTBOUND_WEBHOOK, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            conversation_id: conversationId,
            phone_id: phoneId,
            to_number: toNumber,
            from_number: fromNumber,
            body: body.trim(),
            direction: 'outbound',
            timestamp: new Date().toISOString()
        })
    });

    if (!response.ok) {
        throw new Error(`Error enviando mensaje: ${response.status}`);
    }

    const result = await response.json();
    return result;
};

/**
 * Guarda un mensaje enviado directamente en Supabase (fallback si n8n no está disponible)
 */
export const saveOutboundMessage = async ({ conversationId, phoneId, toNumber, fromNumber, body }) => {
    const { data, error } = await supabase
        .from('whatsapp_messages')
        .insert({
            conversation_id: conversationId,
            phone_id: phoneId,
            to_number: toNumber,
            from_number: fromNumber,
            body: body,
            direction: 'outbound',
            status: 'sent'
        })
        .select()
        .single();

    if (error) throw error;

    // Actualizar last_message en la conversación
    await supabase
        .from('whatsapp_conversations')
        .update({
            last_message: body,
            last_message_at: new Date().toISOString()
        })
        .eq('id', conversationId);

    return data;
};
