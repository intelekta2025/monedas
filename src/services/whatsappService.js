import { supabase } from './supabase';

/**
 * Servicio para gestionar teléfonos WhatsApp
 */

// Obtener todos los teléfonos
export const getWhatsappPhones = async () => {
    const { data, error } = await supabase
        .from('whatsapp_phones')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
};

// Obtener un teléfono por ID
export const getWhatsappPhone = async (id) => {
    const { data, error } = await supabase
        .from('whatsapp_phones')
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw error;
    return data;
};

// Crear un nuevo teléfono
export const createWhatsappPhone = async (phoneData) => {
    const { data, error } = await supabase
        .from('whatsapp_phones')
        .insert([{
            name: phoneData.name,
            phone_number: phoneData.phone_number,
            twilio_account_sid: phoneData.twilio_account_sid || null,
            twilio_auth_token: phoneData.twilio_auth_token || null,
            twilio_phone_sid: phoneData.twilio_phone_sid || null,
            whatsapp_business_id: phoneData.whatsapp_business_id || null,
            display_name: phoneData.display_name || phoneData.name,
            status: phoneData.status || 'pending',
            is_default: phoneData.is_default || false,
        }])
        .select()
        .single();

    if (error) throw error;
    return data;
};

// Actualizar un teléfono
export const updateWhatsappPhone = async (id, phoneData) => {
    const updateData = {
        ...phoneData,
        updated_at: new Date().toISOString(),
    };

    // Remover campos que no deben actualizarse
    delete updateData.id;
    delete updateData.created_at;
    delete updateData.created_by;

    const { data, error } = await supabase
        .from('whatsapp_phones')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data;
};

// Eliminar un teléfono
export const deleteWhatsappPhone = async (id) => {
    const { error } = await supabase
        .from('whatsapp_phones')
        .delete()
        .eq('id', id);

    if (error) throw error;
    return true;
};

// Establecer teléfono como default
export const setDefaultPhone = async (id) => {
    // Primero quitar default de todos
    await supabase
        .from('whatsapp_phones')
        .update({ is_default: false })
        .neq('id', id);

    // Luego establecer el nuevo default
    const { data, error } = await supabase
        .from('whatsapp_phones')
        .update({ is_default: true, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data;
};
