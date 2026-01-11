import React, { useState, useEffect } from 'react';
import { X, Save, User, Loader2 } from 'lucide-react';
import { supabase } from '../services/supabase';

const ClientEditModal = ({ isOpen, onClose, clientId, currentName, onClientUpdated, isDarkMode }) => {
    const [firstName, setFirstName] = useState('');
    const [paternalSurname, setPaternalSurname] = useState('');
    const [maternalSurname, setMaternalSurname] = useState('');
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    // Cargar datos al abrir
    useEffect(() => {
        if (isOpen) {
            // Resetear estado siempre al abrir para evitar datos "fantasmas"
            setFirstName('');
            setPaternalSurname('');
            setMaternalSurname('');

            if (clientId) {
                loadClientData();
            }
        }
    }, [isOpen, clientId]);

    const loadClientData = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('clients')
                .select('first_name, paternal_surname, maternal_surname, full_name')
                .eq('id', clientId)
                .single();

            if (error) throw error;

            if (data) {
                setFirstName(data.first_name || '');
                setPaternalSurname(data.paternal_surname || '');
                setMaternalSurname(data.maternal_surname || '');

                // Si no hay campos separados pero hay full_name, intentar separarlos (heurística simple)
                if (!data.first_name && !data.paternal_surname && data.full_name) {
                    const parts = data.full_name.split(' ');
                    if (parts.length > 0) setFirstName(parts[0]);
                    if (parts.length > 1) setPaternalSurname(parts[1]);
                    if (parts.length > 2) setMaternalSurname(parts.slice(2).join(' '));
                }
            }
        } catch (err) {
            console.error('Error cargando cliente:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();

        if (!clientId) {
            alert('Error: No se encontró el ID del cliente para actualizar.');
            console.error('Error: clientId is missing for update operation.');
            return;
        }

        setSaving(true);

        // Construir full_name automáticamente
        const fullName = [firstName, paternalSurname, maternalSurname]
            .filter(Boolean)
            .join(' ')
            .trim();

        try {
            console.log('Guardando cliente:', { clientId, first_name: firstName, paternal_surname: paternalSurname, maternal_surname: maternalSurname, full_name: fullName });

            const { error } = await supabase
                .from('clients')
                .update({
                    first_name: firstName,
                    paternal_surname: paternalSurname,
                    maternal_surname: maternalSurname,
                    full_name: fullName // Mantener retro-compatibilidad
                })
                .eq('id', clientId);

            if (error) throw error;

            onClientUpdated({
                id: clientId,
                first_name: firstName,
                paternal_surname: paternalSurname,
                maternal_surname: maternalSurname,
                full_name: fullName
            });
            onClose();
        } catch (err) {
            console.error('Error guardando cliente:', err);
            alert('Error al guardar cambios: ' + (err.message || 'Error desconocido'));
        } finally {
            setSaving(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn p-4">
            <div className={`w-full max-w-md rounded-2xl shadow-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'} overflow-hidden transform transition-all`}>

                {/* Header */}
                <div className={`flex items-center justify-between p-4 border-b ${isDarkMode ? 'border-slate-800' : 'border-gray-100'}`}>
                    <h3 className={`font-bold text-lg flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        <User size={20} className="text-gold" />
                        Editar Cliente
                    </h3>
                    <button onClick={onClose} className={`p-2 rounded-full hover:bg-opacity-10 transition-colors ${isDarkMode ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-gray-100 text-gray-500'}`}>
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-8 gap-3">
                            <Loader2 size={30} className="animate-spin text-gold" />
                            <p className={`text-sm ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`}>Cargando datos...</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSave} className="space-y-4">

                            <div className="space-y-1">
                                <label className={`text-xs font-bold uppercase ${isDarkMode ? 'text-slate-500' : 'text-gray-500'}`}>Nombre(s)</label>
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className={`w-full p-3 rounded-xl border outline-none focus:ring-2 focus:ring-gold/50 transition-all ${isDarkMode
                                        ? 'bg-slate-950 border-slate-800 text-slate-200 focus:border-gold/50'
                                        : 'bg-gray-50 border-gray-200 text-gray-800 focus:border-gold'}`}
                                    placeholder="Ej. Juan Carlos"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className={`text-xs font-bold uppercase ${isDarkMode ? 'text-slate-500' : 'text-gray-500'}`}>Apellido Paterno</label>
                                    <input
                                        type="text"
                                        value={paternalSurname}
                                        onChange={(e) => setPaternalSurname(e.target.value)}
                                        className={`w-full p-3 rounded-xl border outline-none focus:ring-2 focus:ring-gold/50 transition-all ${isDarkMode
                                            ? 'bg-slate-950 border-slate-800 text-slate-200 focus:border-gold/50'
                                            : 'bg-gray-50 border-gray-200 text-gray-800 focus:border-gold'}`}
                                        placeholder="Ej. Pérez"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className={`text-xs font-bold uppercase ${isDarkMode ? 'text-slate-500' : 'text-gray-500'}`}>Apellido Materno</label>
                                    <input
                                        type="text"
                                        value={maternalSurname}
                                        onChange={(e) => setMaternalSurname(e.target.value)}
                                        className={`w-full p-3 rounded-xl border outline-none focus:ring-2 focus:ring-gold/50 transition-all ${isDarkMode
                                            ? 'bg-slate-950 border-slate-800 text-slate-200 focus:border-gold/50'
                                            : 'bg-gray-50 border-gray-200 text-gray-800 focus:border-gold'}`}
                                        placeholder="Ej. López"
                                    />
                                </div>
                            </div>

                            {/* Preview */}
                            <div className={`mt-4 p-3 rounded-lg border border-dashed text-center ${isDarkMode ? 'bg-slate-800/30 border-slate-700' : 'bg-gray-50 border-gray-200'}`}>
                                <p className={`text-xs mb-1 ${isDarkMode ? 'text-slate-500' : 'text-gray-500'}`}>Vista Previa</p>
                                <p className={`font-medium ${isDarkMode ? 'text-gold' : 'text-gold-dark'}`}>
                                    {[firstName, paternalSurname, maternalSurname].filter(Boolean).join(' ') || 'Sin nombre'}
                                </p>
                            </div>

                            <div className="pt-4 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="bg-gold-dark hover:bg-gold text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-gold/20 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                                    Guardar Cambios
                                </button>
                            </div>

                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClientEditModal;
