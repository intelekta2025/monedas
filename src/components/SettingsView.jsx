import React, { useState, useEffect } from 'react';
import {
    ArrowLeft,
    Settings,
    Phone,
    Users,
    ChevronRight,
    Plus,
    Edit2,
    Trash2,
    MessageCircle,
    Shield,
    CheckCircle,
    X,
    Loader2,
    AlertCircle,
    Save
} from 'lucide-react';
import {
    getWhatsappPhones,
    createWhatsappPhone,
    updateWhatsappPhone,
    deleteWhatsappPhone
} from '../services/whatsappService';

const SettingsView = ({ onBack, isDarkMode }) => {
    const [activeSection, setActiveSection] = useState(null);
    const [whatsappPhones, setWhatsappPhones] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Modal states
    const [showPhoneModal, setShowPhoneModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editingPhone, setEditingPhone] = useState(null);
    const [deletingPhone, setDeletingPhone] = useState(null);
    const [saving, setSaving] = useState(false);

    const theme = {
        bg: isDarkMode ? 'bg-slate-950' : 'bg-gray-50',
        text: isDarkMode ? 'text-slate-200' : 'text-gray-800',
        textMuted: isDarkMode ? 'text-slate-400' : 'text-gray-500',
        cardBg: isDarkMode ? 'bg-slate-900' : 'bg-white',
        cardBorder: isDarkMode ? 'border-slate-800' : 'border-gray-200',
        inputBg: isDarkMode ? 'bg-slate-950' : 'bg-gray-100',
        modalBg: isDarkMode ? 'bg-slate-900' : 'bg-white',
    };

    // Cargar datos de WhatsApp
    const loadWhatsappPhones = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getWhatsappPhones();
            setWhatsappPhones(data || []);
        } catch (err) {
            console.error('Error cargando teléfonos:', err);
            setError('Error al cargar los teléfonos');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (activeSection === 'whatsapp') {
            loadWhatsappPhones();
        }
    }, [activeSection]);

    // Datos de ejemplo para Usuarios (TODO: implementar servicio)
    const [users] = useState([
        { id: 1, name: 'Alva Martinez', email: 'alva@intelekta.ai', role: 'Admin', status: 'active' },
    ]);

    const menuItems = [
        {
            id: 'whatsapp',
            icon: Phone,
            title: 'Teléfonos WhatsApp',
            description: 'Gestiona los números conectados a WhatsApp Business',
            count: whatsappPhones.length,
            color: 'text-gold',
            bgColor: isDarkMode ? 'bg-gold/10' : 'bg-gold/10',
        },
        {
            id: 'users',
            icon: Users,
            title: 'Usuarios',
            description: 'Administra usuarios del sistema',
            count: users.length,
            color: 'text-blue-500',
            bgColor: isDarkMode ? 'bg-blue-500/10' : 'bg-blue-50',
        },
    ];

    // Handlers para WhatsApp CRUD
    const handleAddPhone = () => {
        setEditingPhone(null);
        setShowPhoneModal(true);
    };

    const handleEditPhone = (phone) => {
        setEditingPhone(phone);
        setShowPhoneModal(true);
    };

    const handleDeletePhone = (phone) => {
        setDeletingPhone(phone);
        setShowDeleteModal(true);
    };

    const handleSavePhone = async (phoneData) => {
        setSaving(true);
        setError(null);
        try {
            if (editingPhone) {
                await updateWhatsappPhone(editingPhone.id, phoneData);
            } else {
                await createWhatsappPhone(phoneData);
            }
            await loadWhatsappPhones();
            setShowPhoneModal(false);
            setEditingPhone(null);
        } catch (err) {
            console.error('Error guardando teléfono:', err);
            setError('Error al guardar el teléfono');
        } finally {
            setSaving(false);
        }
    };

    const handleConfirmDelete = async () => {
        if (!deletingPhone) return;
        setSaving(true);
        try {
            await deleteWhatsappPhone(deletingPhone.id);
            await loadWhatsappPhones();
            setShowDeleteModal(false);
            setDeletingPhone(null);
        } catch (err) {
            console.error('Error eliminando teléfono:', err);
            setError('Error al eliminar el teléfono');
        } finally {
            setSaving(false);
        }
    };

    // Modal de teléfono (crear/editar)
    const PhoneFormModal = () => {
        const [formData, setFormData] = useState({
            name: editingPhone?.name || '',
            phone_number: editingPhone?.phone_number || '',
            display_name: editingPhone?.display_name || '',
            twilio_account_sid: editingPhone?.twilio_account_sid || '',
            twilio_auth_token: editingPhone?.twilio_auth_token || '',
            twilio_phone_sid: editingPhone?.twilio_phone_sid || '',
            status: editingPhone?.status || 'pending',
        });

        const handleChange = (e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            handleSavePhone(formData);
        };

        return (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className={`${theme.modalBg} rounded-2xl shadow-2xl w-full max-w-lg border ${theme.cardBorder} max-h-[90vh] overflow-y-auto`}>
                    <div className={`p-5 border-b ${theme.cardBorder} flex items-center justify-between`}>
                        <h3 className={`font-bold text-lg ${theme.text}`}>
                            {editingPhone ? 'Editar Teléfono' : 'Agregar Teléfono'}
                        </h3>
                        <button
                            onClick={() => setShowPhoneModal(false)}
                            className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-gray-100'} ${theme.textMuted}`}
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-5 space-y-4">
                        {/* Nombre */}
                        <div className="space-y-1">
                            <label className={`text-xs font-bold ${theme.textMuted} uppercase`}>Nombre *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full ${theme.inputBg} border ${theme.cardBorder} ${theme.text} rounded-xl py-3 px-4 outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50`}
                                placeholder="Ej. Ventas Principal"
                                required
                            />
                        </div>

                        {/* Número de teléfono */}
                        <div className="space-y-1">
                            <label className={`text-xs font-bold ${theme.textMuted} uppercase`}>Número de Teléfono *</label>
                            <input
                                type="text"
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleChange}
                                className={`w-full ${theme.inputBg} border ${theme.cardBorder} ${theme.text} rounded-xl py-3 px-4 outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50`}
                                placeholder="+52 55 1234 5678"
                                required
                            />
                        </div>

                        {/* Nombre para mostrar */}
                        <div className="space-y-1">
                            <label className={`text-xs font-bold ${theme.textMuted} uppercase`}>Nombre para Mostrar</label>
                            <input
                                type="text"
                                name="display_name"
                                value={formData.display_name}
                                onChange={handleChange}
                                className={`w-full ${theme.inputBg} border ${theme.cardBorder} ${theme.text} rounded-xl py-3 px-4 outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50`}
                                placeholder="Nombre que verán los clientes"
                            />
                        </div>

                        {/* Sección Twilio */}
                        <div className={`p-4 rounded-xl border ${theme.cardBorder} ${isDarkMode ? 'bg-slate-950' : 'bg-gray-50'} space-y-4`}>
                            <p className={`text-xs font-bold ${theme.textMuted} uppercase flex items-center gap-2`}>
                                <MessageCircle size={14} /> Configuración Twilio
                            </p>

                            <div className="space-y-1">
                                <label className={`text-xs ${theme.textMuted}`}>Account SID</label>
                                <input
                                    type="text"
                                    name="twilio_account_sid"
                                    value={formData.twilio_account_sid}
                                    onChange={handleChange}
                                    className={`w-full ${theme.inputBg} border ${theme.cardBorder} ${theme.text} rounded-lg py-2 px-3 text-sm outline-none focus:border-gold/50`}
                                    placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className={`text-xs ${theme.textMuted}`}>Auth Token</label>
                                <input
                                    type="password"
                                    name="twilio_auth_token"
                                    value={formData.twilio_auth_token}
                                    onChange={handleChange}
                                    className={`w-full ${theme.inputBg} border ${theme.cardBorder} ${theme.text} rounded-lg py-2 px-3 text-sm outline-none focus:border-gold/50`}
                                    placeholder="••••••••••••••••"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className={`text-xs ${theme.textMuted}`}>Phone SID</label>
                                <input
                                    type="text"
                                    name="twilio_phone_sid"
                                    value={formData.twilio_phone_sid}
                                    onChange={handleChange}
                                    className={`w-full ${theme.inputBg} border ${theme.cardBorder} ${theme.text} rounded-lg py-2 px-3 text-sm outline-none focus:border-gold/50`}
                                    placeholder="PNxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                                />
                            </div>
                        </div>

                        {/* Estado */}
                        <div className="space-y-1">
                            <label className={`text-xs font-bold ${theme.textMuted} uppercase`}>Estado</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className={`w-full ${theme.inputBg} border ${theme.cardBorder} ${theme.text} rounded-xl py-3 px-4 outline-none focus:border-gold/50`}
                            >
                                <option value="pending">Pendiente</option>
                                <option value="active">Activo</option>
                                <option value="suspended">Suspendido</option>
                                <option value="disconnected">Desconectado</option>
                            </select>
                        </div>

                        {/* Botones */}
                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={() => setShowPhoneModal(false)}
                                className={`flex-1 py-3 rounded-xl font-bold text-sm border ${theme.cardBorder} ${theme.text} ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-gray-100'} transition-colors`}
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={saving}
                                className="flex-1 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-gold-dark to-gold text-white shadow-lg shadow-gold/20 hover:from-gold hover:to-gold-light transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                            >
                                {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                                {saving ? 'Guardando...' : 'Guardar'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    // Modal de confirmación de eliminación
    const DeleteConfirmModal = () => (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className={`${theme.modalBg} rounded-2xl shadow-2xl w-full max-w-md border ${theme.cardBorder}`}>
                <div className="p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                        <Trash2 size={32} className="text-red-500" />
                    </div>
                    <h3 className={`font-bold text-lg ${theme.text} mb-2`}>¿Eliminar teléfono?</h3>
                    <p className={`${theme.textMuted} text-sm mb-6`}>
                        Estás por eliminar <strong className={theme.text}>{deletingPhone?.name}</strong>.
                        Esta acción no se puede deshacer.
                    </p>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setShowDeleteModal(false)}
                            className={`flex-1 py-3 rounded-xl font-bold text-sm border ${theme.cardBorder} ${theme.text} ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-gray-100'} transition-colors`}
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleConfirmDelete}
                            disabled={saving}
                            className="flex-1 py-3 rounded-xl font-bold text-sm bg-red-500 hover:bg-red-600 text-white transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                            {saving ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                            {saving ? 'Eliminando...' : 'Eliminar'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    // Renderizar sección de WhatsApp
    const renderWhatsAppSection = () => (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={() => setActiveSection(null)}
                    className={`flex items-center gap-2 ${theme.textMuted} hover:${theme.text} transition-colors`}
                >
                    <ArrowLeft size={18} />
                    <span className="text-sm font-medium">Volver</span>
                </button>
                <button
                    onClick={handleAddPhone}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gold to-gold-dark text-white text-sm font-bold rounded-xl shadow-lg shadow-gold/20 hover:from-gold-light hover:to-gold transition-all"
                >
                    <Plus size={16} />
                    Agregar Teléfono
                </button>
            </div>

            <h2 className={`text-lg font-bold ${theme.text} flex items-center gap-2`}>
                <Phone size={20} className="text-gold" />
                Teléfonos WhatsApp
            </h2>

            {error && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                    <AlertCircle size={18} />
                    <span>{error}</span>
                </div>
            )}

            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 size={32} className="animate-spin text-gold" />
                </div>
            ) : whatsappPhones.length === 0 ? (
                <div className={`text-center py-12 ${theme.textMuted}`}>
                    <Phone size={48} className="mx-auto mb-4 opacity-30" />
                    <p className="text-sm">No hay teléfonos configurados</p>
                    <button
                        onClick={handleAddPhone}
                        className="mt-4 text-gold hover:text-gold-light text-sm font-medium"
                    >
                        + Agregar el primero
                    </button>
                </div>
            ) : (
                <div className="space-y-3">
                    {whatsappPhones.map((phone) => (
                        <div
                            key={phone.id}
                            className={`${theme.cardBg} border ${theme.cardBorder} rounded-xl p-4 flex items-center justify-between group hover:border-gold/30 transition-all`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-gold/10' : 'bg-gold/10'}`}>
                                    <MessageCircle size={20} className="text-gold" />
                                </div>
                                <div>
                                    <p className={`font-bold ${theme.text}`}>{phone.name}</p>
                                    <p className={`text-sm ${theme.textMuted}`}>{phone.phone_number}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${phone.status === 'active'
                                    ? 'text-gold bg-gold/10'
                                    : phone.status === 'pending'
                                        ? 'text-yellow-500 bg-yellow-500/10'
                                        : 'text-gray-500 bg-gray-500/10'
                                    }`}>
                                    <CheckCircle size={12} />
                                    {phone.status === 'active' ? 'Activo' : phone.status === 'pending' ? 'Pendiente' : phone.status}
                                </span>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleEditPhone(phone)}
                                        className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-gray-100'} ${theme.textMuted}`}
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDeletePhone(phone)}
                                        className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-gray-100'} text-red-400`}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    // Renderizar sección de Usuarios
    const renderUsersSection = () => (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={() => setActiveSection(null)}
                    className={`flex items-center gap-2 ${theme.textMuted} hover:${theme.text} transition-colors`}
                >
                    <ArrowLeft size={18} />
                    <span className="text-sm font-medium">Volver</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gold-dark to-gold text-white text-sm font-bold rounded-xl shadow-lg shadow-gold/20 hover:from-gold hover:to-gold-light transition-all">
                    <Plus size={16} />
                    Agregar Usuario
                </button>
            </div>

            <h2 className={`text-lg font-bold ${theme.text} flex items-center gap-2`}>
                <Users size={20} className="text-blue-500" />
                Usuarios del Sistema
            </h2>

            <div className="space-y-3">
                {users.map((user) => (
                    <div
                        key={user.id}
                        className={`${theme.cardBg} border ${theme.cardBorder} rounded-xl p-4 flex items-center justify-between group hover:border-gold/30 transition-all`}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-full ${isDarkMode ? 'bg-slate-800' : 'bg-gray-100'} flex items-center justify-center font-bold ${theme.text}`}>
                                {user.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                                <p className={`font-bold ${theme.text}`}>{user.name}</p>
                                <p className={`text-sm ${theme.textMuted}`}>{user.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${user.role === 'Admin'
                                ? 'text-purple-500 bg-purple-500/10'
                                : 'text-blue-500 bg-blue-500/10'
                                }`}>
                                <Shield size={12} />
                                {user.role}
                            </span>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-gray-100'} ${theme.textMuted}`}>
                                    <Edit2 size={16} />
                                </button>
                                <button className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-gray-100'} text-red-400`}>
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    // Renderizar menú principal
    const renderMenu = () => (
        <div className="space-y-3">
            {menuItems.map((item) => (
                <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full ${theme.cardBg} border ${theme.cardBorder} rounded-xl p-4 flex items-center justify-between group hover:border-gold/30 transition-all text-left`}
                >
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${item.bgColor}`}>
                            <item.icon size={20} className={item.color} />
                        </div>
                        <div>
                            <p className={`font-bold ${theme.text}`}>{item.title}</p>
                            <p className={`text-sm ${theme.textMuted}`}>{item.description}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${isDarkMode ? 'bg-slate-800 text-slate-400' : 'bg-gray-100 text-gray-500'}`}>
                            {item.count}
                        </span>
                        <ChevronRight size={18} className={`${theme.textMuted} group-hover:text-gold transition-colors`} />
                    </div>
                </button>
            ))}
        </div>
    );

    return (
        <div className={`flex-1 flex flex-col h-full ${theme.bg} overflow-hidden`}>
            {/* Header */}
            <div className={`p-4 lg:p-6 border-b ${theme.cardBorder} ${theme.cardBg} flex items-center gap-4`}>
                <button
                    onClick={onBack}
                    className={`p-2 rounded-xl ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-gray-100'} ${theme.textMuted} transition-colors`}
                >
                    <ArrowLeft size={20} />
                </button>
                <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-br from-gold-light to-gold-dark p-2 rounded-xl shadow-lg shadow-gold/20">
                        <Settings size={20} className="text-white" />
                    </div>
                    <div>
                        <h1 className={`font-bold text-lg ${theme.text}`}>Configuración</h1>
                        <p className={`text-xs ${theme.textMuted}`}>Gestiona las opciones del sistema</p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 lg:p-6">
                <div className="max-w-2xl mx-auto">
                    {activeSection === 'whatsapp' && renderWhatsAppSection()}
                    {activeSection === 'users' && renderUsersSection()}
                    {!activeSection && renderMenu()}
                </div>
            </div>

            {/* Modals */}
            {showPhoneModal && <PhoneFormModal />}
            {showDeleteModal && <DeleteConfirmModal />}
        </div>
    );
};

export default SettingsView;
