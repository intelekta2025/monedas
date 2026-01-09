import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from './context/AuthContext';
import SettingsView from './components/SettingsView';
import { getWhatsappPhones } from './services/whatsappService';
import { getConversations, getMessages, subscribeToConversations, closeConversation, markAsRead } from './services/messagesService';
import {
  MessageCircle,
  Trash2,
  Star,
  Search,
  Coins,
  User,
  Settings,
  Send,
  MoreVertical,
  ShieldCheck,
  CheckCircle,
  Image as ImageIcon,
  Calendar,
  LayoutGrid,
  ShoppingBag,
  Sun,
  Moon,
  ExternalLink,
  Eye,
  Inbox,
  Filter as FilterIcon,
  Clock,
  X,
  ArrowLeft,
  Menu,
  Smartphone,
  Tablet,
  Monitor,
  ThumbsUp,
  ThumbsDown,
  Lock,
  ArrowRight,
  Loader2,
  AlertCircle,
  Phone,
  XCircle
} from 'lucide-react';

// --- COMPONENTE DE LOGIN ---
const LoginScreen = () => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await signIn(email, password);
    } catch (err) {
      console.error('Error de autenticación:', err);
      setError(err.message === 'Invalid login credentials'
        ? 'Credenciales inválidas. Verifica tu email y contraseña.'
        : 'Error al iniciar sesión. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Fondo decorativo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl relative z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 p-3 rounded-2xl shadow-lg shadow-emerald-500/20 mb-4">
            <Coins className="text-white" size={32} />
          </div>
          <h1 className="font-serif font-bold text-2xl text-white tracking-wide">Bazar de moneda</h1>
          <p className="text-xs uppercase tracking-[0.2em] font-bold text-emerald-500 mt-2">Acceso Administrativo</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 ml-1 uppercase">Email</label>
            <div className="relative group">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-500 transition-colors" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl py-3 pl-10 pr-4 outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder:text-slate-600"
                placeholder="tu@email.com"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 ml-1 uppercase">Contraseña</label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-500 transition-colors" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl py-3 pl-10 pr-4 outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder:text-slate-600"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
            <label className="flex items-center gap-2 cursor-pointer hover:text-slate-300">
              <input type="checkbox" className="rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-emerald-500/20" />
              Recordarme
            </label>
            <a href="#" className="hover:text-emerald-500 transition-colors">¿Olvidaste tu contraseña?</a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-emerald-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" /> Verificando...
              </>
            ) : (
              <>
                Entrar al Sistema <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-800 text-center">
          <p className="text-[10px] text-slate-600 uppercase font-medium">Sistema Potenciado por IA V2.4</p>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL APP ---
const App = () => {
  // ESTADO DE AUTENTICACIÓN (desde Supabase)
  const { isAuthenticated, loading, profile } = useAuth();

  // CONFIGURACIÓN INICIAL PARA DEMO
  const [activeTab, setActiveTab] = useState('oportunidades');
  const [dateFilter, setDateFilter] = useState('any');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showMobileInfo, setShowMobileInfo] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const [simulatedDevice, setSimulatedDevice] = useState('desktop');
  const [currentView, setCurrentView] = useState('main'); // 'main' | 'settings'
  const chatContainerRef = useRef(null);

  // Estado para teléfonos WhatsApp
  const [whatsappPhones, setWhatsappPhones] = useState([]);
  const [selectedPhone, setSelectedPhone] = useState(null);
  const [phonesLoading, setPhonesLoading] = useState(true);

  // Estado para conversaciones reales
  const [conversations, setConversations] = useState([]);
  const [conversationsLoading, setConversationsLoading] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);

  // Helper para fechas
  const getTodayDate = () => new Date().toISOString().split('T')[0];
  const todayStr = '24/10';
  const yesterdayStr = '23/10';

  // Cargar teléfonos WhatsApp al autenticarse
  useEffect(() => {
    const loadPhones = async () => {
      if (!isAuthenticated) return;
      setPhonesLoading(true);
      try {
        const phones = await getWhatsappPhones();
        setWhatsappPhones(phones || []);
        // Seleccionar el default o el primero
        const defaultPhone = phones?.find(p => p.is_default) || phones?.[0];
        if (defaultPhone) setSelectedPhone(defaultPhone);
      } catch (err) {
        console.error('Error cargando teléfonos:', err);
      } finally {
        setPhonesLoading(false);
      }
    };
    loadPhones();
  }, [isAuthenticated]);

  // Cargar conversaciones cuando cambia el teléfono seleccionado
  useEffect(() => {
    const loadConversations = async () => {
      if (!selectedPhone?.id) {
        setConversations([]);
        return;
      }
      setConversationsLoading(true);
      try {
        const convs = await getConversations(selectedPhone.id);
        setConversations(convs || []);
        // Seleccionar la primera conversación si hay
        if (convs?.length > 0 && !selectedConversation) {
          setSelectedConversation(convs[0]);
        }
      } catch (err) {
        console.error('Error cargando conversaciones:', err);
      } finally {
        setConversationsLoading(false);
      }
    };
    loadConversations();

    // Suscribirse a cambios en tiempo real
    if (selectedPhone?.id) {
      const unsubscribe = subscribeToConversations(selectedPhone.id, (payload) => {
        if (payload.eventType === 'INSERT') {
          setConversations(prev => [payload.new, ...prev]);
        } else if (payload.eventType === 'UPDATE') {
          setConversations(prev =>
            prev.map(c => c.id === payload.new.id ? payload.new : c)
          );
        }
      });
      return unsubscribe;
    }
  }, [selectedPhone?.id]);

  // Cargar mensajes cuando cambia la conversación seleccionada
  useEffect(() => {
    const loadMessages = async () => {
      if (!selectedConversation?.id) {
        setChatMessages([]);
        return;
      }
      try {
        const msgs = await getMessages(selectedConversation.id);
        setChatMessages(msgs || []);
      } catch (err) {
        console.error('Error cargando mensajes:', err);
      }
    };
    loadMessages();
  }, [selectedConversation?.id]);

  const chats = [
    {
      id: 1,
      name: 'Javier (Nieto)',
      lastMsg: '¡Ahí estaré! Muchas gracias.',
      time: `${todayStr} 11:05 AM`,
      date: getTodayDate(),
      type: 'Oportunidad',
      priority: 'Alta',
      avatar: 'JV',
      history: [
        { sender: 'user', text: 'Hola, buenos días. Me dieron su contacto porque quería saber si me podrían ayudar a tasar una moneda que me encontré en la casa de mi abuelo.', time: `${todayStr} 09:15 AM` },
        { sender: 'bot', text: '¡Hola! Buenos días. Con gusto. Para poder darte un estimado, necesitaríamos fotos nítidas de ambos lados de la moneda (frente y dorso) y, si es posible, una foto del canto (el borde).', time: `${todayStr} 09:16 AM` },
        { sender: 'user', text: 'Dale, ahí les paso. La moneda se ve bastante vieja, es de plata me parece.', time: `${todayStr} 09:25 AM` },
        { sender: 'user', type: 'image', img: 'https://images.unsplash.com/photo-1584652868574-0669f4292976?auto=format&fit=crop&q=80&w=600', text: 'Adjunto foto 1 (Anverso)', time: `${todayStr} 09:26 AM` },
        { sender: 'bot', text: 'Gracias por las fotos, Javier. Se ve interesante. A simple vista parece una pieza de 8 reales de la ceca de México, año 1760.', time: `${todayStr} 09:30 AM` },
        { sender: 'bot', text: '¿Podrías decirnos cuánto pesa en una balanza de cocina? El peso exacto es clave para descartar réplicas, ya que estas piezas son muy buscadas.', time: `${todayStr} 09:30 AM` },
        { sender: 'user', text: 'Dejenme ver... pesa 26.8 gramos. ¿Es bueno eso?', time: `${todayStr} 09:45 AM` },
        { sender: 'bot', text: 'Es un peso excelente. El estándar teórico es de 27.07 gramos, pero con el desgaste natural por el tiempo, 26.8g está dentro del rango de una pieza auténtica.', time: `${todayStr} 09:48 AM` },
        { sender: 'user', text: '¡Buenísimo! ¿Y cuánto puede valer? Tiene algunos rayones y está un poco negra.', time: `${todayStr} 10:10 AM` },
        { sender: 'bot', text: 'Un consejo importante: ¡No la limpies! La "pátina" (lo negro) es muy valorada. En estado VF (Very Fine), podría rondar entre 250 y 350 USD.', time: `${todayStr} 10:12 AM` },
        { sender: 'user', text: 'Uff, ¡bastante más de lo que pensaba! ¿Ustedes compran o solo tasan?', time: `${todayStr} 10:15 AM` },
        { sender: 'bot', text: 'Nosotros compramos. Tendríamos que verla en persona. Si te interesa, puedes pasar por el local de lunes a viernes de 10 a 18 hs.', time: `${todayStr} 10:18 AM` },
        { sender: 'user', text: 'Dale, me queda cerca. ¿Mañana a las 11 les queda bien?', time: `${todayStr} 10:50 AM` },
        { sender: 'bot', text: 'Perfecto, te agendamos con Carlos. ¡Traela protegida en papel, nada de plástico adherente!', time: `${todayStr} 10:55 AM` },
        { sender: 'user', text: '¡Ahí estaré! Muchas gracias.', time: `${todayStr} 11:05 AM` }
      ],
      aiAnalysis: {
        category: 'valuation',
        item: '8 Reales "Columnario" 1760, Plata .917, Condición VF.',
        verdict: 'OPORTUNIDAD'
      },
      suggestedReply: 'Conversación cerrada. Cita agendada para mañana 11:00 AM.'
    },
    {
      id: 4,
      name: 'Roberto (Coleccionista)',
      lastMsg: 'Busco unas 5 onzas libertad.',
      time: `${todayStr} 12:30 PM`,
      date: getTodayDate(),
      type: 'Consulta',
      priority: 'Media',
      avatar: 'RC',
      history: [
        { sender: 'user', text: 'Hola, ¿qué tal?', time: `${todayStr} 12:28 PM` },
        { sender: 'user', text: 'Oigan, ¿de casualidad manejan la Onza Libertad de este año? Busco unas 5.', time: `${todayStr} 12:30 PM` }
      ],
      aiAnalysis: {
        category: 'inquiry',
        intent: 'Solicitud de Compra',
        keywords: ['Onza Libertad', '2024', 'Lote x5'],
        stockStatus: 'Disponible (45 piezas)',
        verdict: 'VENTA POTENCIAL'
      },
      suggestedReply: 'Hola Roberto. Sí las manejamos. Ahorita tenemos la 2024 en $650 MXN c/u. Si te llevas las 5 te las puedo dejar en $640. ¿Te aparto el lote?'
    },
    {
      id: 2,
      name: 'Juan Pérez',
      lastMsg: '¿Cuánto vale esta de un peso?',
      time: '23/10 09:45 AM',
      date: '2023-10-23',
      type: 'Basura',
      priority: 'Baja',
      avatar: 'JP',
      history: [
        { sender: 'user', text: '¿Cuánto vale esta de un peso?', time: '23/10 09:45 AM' },
        { sender: 'user', type: 'image', img: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&q=80&w=600', text: 'Foto adjunta', time: '23/10 09:45 AM' }
      ],
      aiAnalysis: {
        category: 'valuation',
        item: 'Peso Morelos 1980 (Industrial)',
        verdict: 'BASURA'
      },
      suggestedReply: 'Hola Juan. Esa pieza es muy común (se acuñaron millones en los 80s) y su material es industrial. Solo tiene valor por kilo para reciclaje. Saludos.'
    },
    {
      id: 3,
      name: 'María G.',
      lastMsg: 'Encontré este costal.',
      time: `${todayStr} 08:30 AM`,
      date: getTodayDate(),
      type: 'Oportunidad',
      priority: 'Media',
      avatar: 'MG',
      history: [
        { sender: 'user', text: 'Encontré este costal en la alacena.', time: `${todayStr} 08:30 AM` },
        { sender: 'user', type: 'image', img: 'https://images.unsplash.com/photo-1515276422659-19537142fa54?auto=format&fit=crop&q=80&w=600', text: 'Foto del lote', time: `${todayStr} 08:31 AM` }
      ],
      aiAnalysis: {
        category: 'valuation',
        item: 'Lote Mixto Plata / Cobre',
        verdict: 'OPORTUNIDAD'
      },
      suggestedReply: 'Hola María. Veo piezas interesantes de plata en el lote. Para darle una cotización exacta necesitamos verlas físicamente. ¿Puede traerlas a la tienda?'
    }
  ];

  // Inicializar con chat seleccionado
  const [selectedChat, setSelectedChat] = useState(chats[0]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [selectedChat]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const cycleDateFilter = () => {
    const modes = ['any', 'today', 'week'];
    const nextIndex = (modes.indexOf(dateFilter) + 1) % modes.length;
    setDateFilter(modes[nextIndex]);
  };

  const getAnalysisImage = (chat) => {
    if (!chat || !chat.history) return null;
    const imageMsg = chat.history.find(m => m.type === 'image');
    return imageMsg ? imageMsg.img : null;
  };

  const isMobileView = simulatedDevice === 'mobile';

  const handleChatSelect = async (chat) => {
    setSelectedChat(chat);
    setShowMobileInfo(false);
    setFeedback(null);

    // Si es una conversación real, cargar los mensajes
    if (chat.conversationId) {
      setSelectedConversation({ id: chat.conversationId });
      try {
        const msgs = await getMessages(chat.conversationId);
        setChatMessages(msgs || []);
      } catch (err) {
        console.error('Error cargando mensajes:', err);
      }
    }
  };

  const handleBackToList = () => {
    setSelectedChat(null);
    setShowMobileInfo(false);
  };

  // Cerrar conversación
  const handleCloseConversation = async (reason = 'resolved') => {
    if (!selectedChat?.conversationId) return;
    try {
      await closeConversation(selectedChat.conversationId, reason, profile?.id);
      // Refrescar lista de conversaciones
      const convs = await getConversations(selectedPhone.id);
      setConversations(convs || []);
      setSelectedChat(null);
    } catch (err) {
      console.error('Error cerrando conversación:', err);
    }
  };

  const theme = {
    bg: isDarkMode ? 'bg-slate-950' : 'bg-gray-50',
    text: isDarkMode ? 'text-slate-200' : 'text-gray-800',
    textMuted: isDarkMode ? 'text-slate-400' : 'text-gray-500',
    cardBg: isDarkMode ? 'bg-slate-900' : 'bg-white',
    cardBorder: isDarkMode ? 'border-slate-800' : 'border-gray-200',
    headerBg: isDarkMode ? 'bg-slate-900' : 'bg-white',
    inputBg: isDarkMode ? 'bg-slate-950' : 'bg-gray-100',
    accent: 'text-emerald-500',
    chatBubbleUser: isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200 shadow-sm',
    chatBubbleBot: isDarkMode ? 'bg-emerald-900/20 border-emerald-500/20' : 'bg-emerald-50 border-emerald-200',
  };

  // Transformar conversaciones reales al formato del UI
  const realChatsFormatted = conversations.map(conv => ({
    id: conv.id,
    name: conv.client?.full_name || conv.client?.phone_number || 'Sin nombre',
    lastMsg: conv.last_message || 'Sin mensajes',
    time: conv.last_message_at
      ? new Date(conv.last_message_at).toLocaleString('es-MX', {
        day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true
      })
      : '',
    date: conv.last_message_at ? conv.last_message_at.split('T')[0] : '',
    type: 'Oportunidad', // Por ahora todo como oportunidad, la IA lo clasificará después
    priority: conv.unread_count > 0 ? 'Alta' : 'Media',
    avatar: (conv.client?.full_name || conv.client?.phone_number || '??').slice(0, 2).toUpperCase(),
    unreadCount: conv.unread_count || 0,
    contactNumber: conv.client?.phone_number,
    conversationId: conv.id,
    clientId: conv.client?.id,
    windowExpiresAt: conv.window_expires_at,
    // Los mensajes se cargan por separado
    history: chatMessages.filter(m => m.conversation_id === conv.id).map(m => ({
      sender: m.direction === 'inbound' ? 'user' : 'bot',
      text: m.body,
      time: new Date(m.created_at).toLocaleString('es-MX', {
        day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true
      }),
      type: m.num_media > 0 ? 'image' : 'text',
      // Usar media array si existe, sino el media_url directo
      img: m.media?.[0]?.media_url || null,
      allMedia: m.media || []
    })),
    aiAnalysis: null, // Se agregará con la integración de IA
    suggestedReply: ''
  }));

  // Usar conversaciones reales si hay, sino demo
  const displayChats = realChatsFormatted.length > 0 ? realChatsFormatted : chats;

  const filteredChats = displayChats.filter(chat => {
    let typeMatch = false;
    if (activeTab === 'todos') typeMatch = true;
    else if (activeTab === 'oportunidades') typeMatch = chat.type === 'Oportunidad';
    else if (activeTab === 'consultas') typeMatch = chat.type === 'Consulta';
    else if (activeTab === 'basura') typeMatch = chat.type === 'Basura';

    let dateMatch = true;
    const today = getTodayDate();
    if (dateFilter === 'today') {
      dateMatch = chat.date === today || chat.date?.startsWith(today);
    } else if (dateFilter === 'week') {
      dateMatch = true;
    }

    let searchMatch = true;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      searchMatch =
        (chat.name?.toLowerCase().includes(q)) ||
        (chat.lastMsg?.toLowerCase().includes(q)) ||
        (chat.aiAnalysis?.item && chat.aiAnalysis.item.toLowerCase().includes(q)) ||
        (chat.aiAnalysis?.intent && chat.aiAnalysis.intent.toLowerCase().includes(q));
    }

    return typeMatch && dateMatch && searchMatch;
  });

  const analysisImage = getAnalysisImage(selectedChat);

  // --- Componente de Editor de Respuesta (Reutilizable) ---
  const ReplyEditor = ({ chat }) => (
    <div className={`flex-shrink-0 p-3 lg:p-5 pt-2 border-t z-20 ${isDarkMode ? 'border-slate-800 bg-slate-900' : 'border-gray-100 bg-white'}`}>
      <div className="flex items-center justify-between mb-2 lg:mb-3">
        <p className={`text-[10px] uppercase font-bold flex items-center gap-2 ${theme.textMuted}`}>
          <MessageCircle size={12} /> Borrador de Respuesta
        </p>
        {chat.suggestedReply.includes('Cita') && (
          <span className="text-[9px] text-green-600 font-bold flex items-center gap-1 bg-green-100 px-2 py-0.5 rounded-full">
            <Calendar size={10} /> AGENDADO
          </span>
        )}
      </div>

      <div className={`rounded-xl border shadow-inner overflow-hidden flex flex-col ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-gray-50 border-gray-200'}`}>
        <textarea
          className={`w-full p-3 lg:p-4 bg-transparent border-none outline-none text-sm resize-none font-medium leading-relaxed custom-scrollbar h-20 lg:h-40 ${theme.text}`}
          defaultValue={chat.suggestedReply}
          placeholder="Escribe tu respuesta aquí..."
        />
        <div className={`p-2 border-t ${isDarkMode ? 'border-slate-800' : 'border-gray-200'} bg-opacity-50 flex justify-end`}>
          <button className={`py-2 px-4 lg:px-6 rounded-lg font-bold text-xs shadow-lg transition-transform active:scale-95 flex items-center gap-2 text-white ${chat.aiAnalysis.category === 'inquiry'
            ? 'bg-gradient-to-r from-blue-600 to-blue-500 shadow-blue-500/20'
            : 'bg-gradient-to-r from-emerald-600 to-emerald-500 shadow-emerald-500/20'
            }`}>
            <Send size={14} /> Enviar
          </button>
        </div>
      </div>
    </div>
  );

  const getContainerStyle = () => {
    switch (simulatedDevice) {
      case 'mobile':
        return 'w-[375px] h-[750px] rounded-[30px] border-[8px] border-slate-800 shadow-2xl';
      case 'tablet':
        return 'w-[768px] h-[900px] rounded-[24px] border-[8px] border-slate-800 shadow-2xl';
      case 'desktop':
      default:
        return 'w-full h-full rounded-none border-0';
    }
  };

  // --- RENDER CONDICIONAL ---
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 size={48} className="animate-spin text-emerald-500" />
          <p className="text-slate-400 text-sm">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  return (
    <div className="flex flex-col h-screen bg-neutral-900 font-sans overflow-hidden">

      {/* BARRA DE SIMULACIÓN */}
      <div className="flex items-center justify-center gap-4 bg-black/80 text-slate-400 py-2 border-b border-white/10 z-50 flex-shrink-0">
        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Vista Previa:</span>
        <button onClick={() => setSimulatedDevice('mobile')} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${simulatedDevice === 'mobile' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'hover:bg-white/10'}`}><Smartphone size={14} /> Celular</button>
        <button onClick={() => setSimulatedDevice('tablet')} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${simulatedDevice === 'tablet' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'hover:bg-white/10'}`}><Tablet size={14} /> Tablet</button>
        <button onClick={() => setSimulatedDevice('desktop')} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${simulatedDevice === 'desktop' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'hover:bg-white/10'}`}><Monitor size={14} /> PC</button>
      </div>

      <div className="flex-1 flex justify-center items-center overflow-hidden bg-neutral-800/50 backdrop-blur-sm relative">
        <div className={`${getContainerStyle()} overflow-hidden flex flex-col relative transition-all duration-500 bg-black`}>

          <div className={`flex flex-col h-full ${theme.bg} ${theme.text} w-full transition-colors duration-300`}>

            <header className={`h-14 lg:h-16 ${theme.headerBg} border-b ${theme.cardBorder} flex items-center justify-between px-4 lg:px-6 flex-shrink-0 z-20 shadow-sm transition-colors duration-300`}>
              <div className="flex items-center gap-2 lg:gap-3">
                <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 p-1.5 rounded-xl shadow-lg shadow-emerald-500/20">
                  <Coins className="text-white" size={simulatedDevice === 'mobile' ? 18 : 20} />
                </div>
                <div className="flex flex-col">
                  <span className={`font-serif font-bold ${simulatedDevice === 'mobile' ? 'text-base' : 'text-lg'} tracking-wide ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    Bazar de moneda
                  </span>
                  {!isMobileView && (
                    <span className={`text-[10px] uppercase tracking-widest font-bold ${theme.accent}`}>
                      Inteligencia Numismática
                    </span>
                  )}
                </div>
              </div>

              {!isMobileView && (
                <div className={`flex items-center ${theme.inputBg} rounded-xl px-4 py-2 w-1/3 border border-transparent focus-within:border-emerald-500/50 transition-all group`}>
                  <Search size={18} className={`${theme.textMuted} group-focus-within:text-emerald-500 transition-colors`} />
                  <input type="text" placeholder="Buscar..." className={`bg-transparent border-none outline-none ml-3 w-full text-sm ${theme.text} placeholder-opacity-50`} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                  {searchQuery && <button onClick={() => setSearchQuery('')} className="text-gray-500 hover:text-white"><X size={14} /></button>}
                </div>
              )}

              {/* Selector de Teléfono WhatsApp */}
              {!isMobileView && whatsappPhones.length > 0 && (
                <div className={`flex items-center gap-2 ${theme.inputBg} rounded-xl px-3 py-2 border ${theme.cardBorder}`}>
                  <Phone size={16} className="text-green-500" />
                  <select
                    value={selectedPhone?.id || ''}
                    onChange={(e) => {
                      const phone = whatsappPhones.find(p => p.id === e.target.value);
                      setSelectedPhone(phone);
                    }}
                    className={`bg-transparent border-none outline-none text-sm font-medium ${theme.text} cursor-pointer pr-2`}
                  >
                    {whatsappPhones.map((phone) => (
                      <option key={phone.id} value={phone.id} className="bg-slate-900 text-white">
                        {phone.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="flex items-center gap-2">
                <button onClick={toggleTheme} className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-800 text-emerald-400' : 'hover:bg-gray-100 text-slate-600'}`}>{isDarkMode ? <Sun size={18} /> : <Moon size={18} />}</button>
                {isMobileView && <button className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-gray-100'}`}><Menu size={20} className={theme.textMuted} /></button>}
                {!isMobileView && (
                  <>
                    <button className={`hidden sm:flex items-center gap-2 text-xs font-bold px-3 py-2 rounded-lg transition-colors ${isDarkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-gray-100'}`}><LayoutGrid size={16} /> <span className="hidden xl:inline">Dashboard</span></button>
                    <button onClick={() => setCurrentView('settings')} className={`hidden sm:flex items-center gap-2 text-xs font-bold px-3 py-2 rounded-lg transition-colors ${isDarkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-gray-100'}`}><Settings size={16} /></button>
                    <div className={`w-9 h-9 rounded-full ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-gray-200 border-gray-300'} flex items-center justify-center border cursor-pointer`}><User size={18} className={theme.textMuted} /></div>
                  </>
                )}
              </div>
            </header>

            {/* Conditional View Rendering */}
            {currentView === 'settings' ? (
              <SettingsView
                onBack={() => setCurrentView('main')}
                isDarkMode={isDarkMode}
              />
            ) : (
              <main className={`flex-1 flex overflow-hidden ${isMobileView ? 'p-0' : 'p-4 lg:p-6 lg:gap-6'} relative`}>

                {/* COLUMNA 1: LISTA */}
                <div className={`
                ${isMobileView && selectedChat ? 'hidden' : 'flex'} 
                ${isMobileView ? 'w-full' : 'w-80'} flex-shrink-0 flex-col 
                ${theme.cardBg} ${!isMobileView && `rounded-2xl border ${theme.cardBorder} shadow-xl`} transition-colors duration-300
              `}>
                  <div className={`p-4 border-b ${theme.cardBorder} flex items-center justify-between`}>
                    <h2 className={`font-bold text-sm ${theme.text} flex items-center gap-2`}><MessageCircle size={18} className={theme.accent} /> Mensajes</h2>
                    <div className="flex items-center gap-2">
                      <button onClick={cycleDateFilter} className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-bold uppercase transition-all ${dateFilter !== 'any' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : `${theme.textMuted} hover:bg-slate-800/50`}`}><Calendar size={12} /><span className={`${isMobileView ? 'hidden' : 'hidden sm:inline'}`}>{dateFilter === 'today' ? 'Hoy' : dateFilter === 'week' ? '7 Días' : 'Fecha'}</span></button>
                      <div className={`text-[10px] font-bold px-2 py-1 rounded-full ${isDarkMode ? 'bg-slate-800 text-slate-400' : 'bg-gray-100 text-gray-500'}`}>{filteredChats.length}</div>
                    </div>
                  </div>
                  <div className="p-3">
                    <div className={`flex justify-between items-center p-1.5 rounded-xl ${isDarkMode ? 'bg-slate-950' : 'bg-gray-100'}`}>
                      <FilterIconButton active={activeTab === 'todos'} onClick={() => setActiveTab('todos')} icon={<Inbox size={16} />} title="Todos" isDark={isDarkMode} />
                      <div className="w-px h-4 bg-gray-500/20 mx-1"></div>
                      <FilterIconButton active={activeTab === 'oportunidades'} onClick={() => setActiveTab('oportunidades')} icon={<Star size={16} />} title="Oportunidades" color="text-emerald-500" isDark={isDarkMode} />
                      <FilterIconButton active={activeTab === 'consultas'} onClick={() => setActiveTab('consultas')} icon={<ShoppingBag size={16} />} title="Intención" color="text-blue-500" isDark={isDarkMode} />
                      <FilterIconButton active={activeTab === 'basura'} onClick={() => setActiveTab('basura')} icon={<Trash2 size={16} />} title="Papelera" color="text-gray-500" isDark={isDarkMode} />
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-2 custom-scrollbar">
                    {filteredChats.map((chat) => (
                      <div key={chat.id} onClick={() => handleChatSelect(chat)} className={`p-3 rounded-xl cursor-pointer transition-all border group relative ${selectedChat?.id === chat.id && !isMobileView ? `${isDarkMode ? 'bg-slate-800 border-emerald-500/40' : 'bg-emerald-50 border-emerald-200'} shadow-md` : `${isDarkMode ? 'hover:bg-slate-800/50' : 'hover:bg-gray-50'} border-transparent`}`}>
                        <div className="flex gap-3">
                          <div className="relative">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm border shadow-sm ${isDarkMode ? 'bg-slate-700 border-slate-600 text-slate-300' : 'bg-white border-gray-100 text-gray-600'}`}>{chat.avatar}</div>
                            <div className={`absolute -top-1 -right-1 p-1 rounded-full border ${isDarkMode ? 'border-slate-900' : 'border-white'} shadow-sm ${chat.type === 'Oportunidad' ? 'bg-emerald-500 text-white' : chat.type === 'Consulta' ? 'bg-blue-500 text-white' : 'bg-gray-400 text-white'}`}>
                              {chat.type === 'Oportunidad' ? <Star size={10} fill="currentColor" /> : chat.type === 'Consulta' ? <ShoppingBag size={10} /> : <Trash2 size={10} />}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center mb-0.5">
                              <span className={`text-sm font-bold truncate ${selectedChat?.id === chat.id && !isMobileView ? theme.text : theme.textMuted}`}>{chat.name}</span>
                              <span className="text-[10px] opacity-60 flex items-center gap-1">{chat.date === getTodayDate() && <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>}{chat.time.split(' ')[1]} {chat.time.split(' ')[2]}</span>
                            </div>
                            <p className={`text-xs truncate ${theme.textMuted}`}>{chat.lastMsg}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* COLUMNA 2: CHAT */}
                <div className={`
                ${isMobileView ? (selectedChat && !showMobileInfo ? 'flex' : 'hidden') : 'flex'} 
                flex-1 flex-col 
                ${theme.cardBg} ${!isMobileView && `rounded-2xl border ${theme.cardBorder} shadow-xl`} overflow-hidden relative transition-colors duration-300 z-10
              `}>
                  {selectedChat ? (
                    <>
                      <div className={`p-3 lg:p-4 border-b ${theme.cardBorder} flex items-center justify-between z-10 shadow-sm ${theme.headerBg}`}>
                        <div className="flex items-center gap-2 lg:gap-3">
                          {isMobileView && <button onClick={handleBackToList} className="p-2 -ml-2 rounded-full hover:bg-slate-800 text-slate-400"><ArrowLeft size={20} /></button>}
                          <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center text-xs lg:text-sm font-bold ${isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-gray-100 text-gray-600'}`}>{selectedChat.avatar}</div>
                          <div><h3 className={`font-bold text-sm ${theme.text}`}>{selectedChat.name}</h3><p className={`text-[10px] ${theme.textMuted} flex items-center gap-1`}><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Business</p></div>
                        </div>
                        <div className="flex gap-1">
                          {isMobileView && <button onClick={() => setShowMobileInfo(true)} className={`p-2 rounded-lg text-emerald-500 hover:bg-emerald-500/10`}><ShieldCheck size={20} /></button>}
                          {/* Botón cerrar conversación (solo para conversaciones reales) */}
                          {selectedChat.conversationId && (
                            <button
                              onClick={() => handleCloseConversation('resolved')}
                              className={`p-2 rounded-lg transition-colors text-red-400 hover:bg-red-500/10`}
                              title="Cerrar conversación"
                            >
                              <XCircle size={18} />
                            </button>
                          )}
                          <button className={`p-2 rounded-lg hover:bg-opacity-10 transition-colors ${theme.textMuted} hover:bg-slate-500`}><MoreVertical size={18} /></button>
                        </div>
                      </div>

                      <div ref={chatContainerRef} className={`flex-1 ${isDarkMode ? 'bg-slate-950/50' : 'bg-gray-50/50'} p-4 lg:p-6 overflow-y-auto custom-scrollbar flex flex-col gap-4`}>
                        {selectedChat.history ? (
                          selectedChat.history.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-start' : 'justify-end'}`}>
                              <div className={`max-w-[85%] lg:max-w-[80%] rounded-2xl p-3 lg:p-4 text-sm leading-relaxed relative group transition-all ${msg.sender === 'user' ? theme.chatBubbleUser : theme.chatBubbleBot} ${msg.sender === 'user' ? 'rounded-tl-none' : 'rounded-tr-none'}`}>
                                {msg.type === 'image' ? <div className="space-y-2"><div className="relative rounded-lg overflow-hidden shadow-md"><img src={msg.img} alt="Evidencia" className="w-full h-auto object-cover max-h-[300px]" /></div>{msg.text && <p className={`text-xs ${theme.textMuted} italic`}>{msg.text}</p>}</div> : <p className={isDarkMode || msg.sender === 'bot' ? theme.text : 'text-gray-700'}>{msg.text}</p>}
                                <div className={`flex items-center gap-1 mt-1.5 opacity-40 text-[9px] font-bold uppercase ${msg.sender === 'user' ? 'justify-start' : 'justify-end'}`}>{msg.time.split(' ')[1]} {msg.time.split(' ')[2]}{msg.sender === 'bot' && <CheckCircle size={10} />}</div>
                              </div>
                            </div>
                          ))
                        ) : null}
                      </div>

                      {/* EDITOR DE RESPUESTA (Aquí para Móvil) */}
                      {isMobileView && <ReplyEditor chat={selectedChat} />}
                    </>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center opacity-40"><MessageCircle size={64} className="mb-4 text-gray-400" /><p className={`text-sm font-medium ${theme.textMuted}`}>Selecciona una conversación</p></div>
                  )}
                </div>

                {/* COLUMNA 3: IA */}
                <div className={`
                ${isMobileView ? (showMobileInfo ? 'flex absolute inset-0 z-50' : 'hidden') : 'flex'} 
                ${isMobileView ? 'w-full h-full' : 'w-96 flex-shrink-0'} flex-col 
                ${theme.cardBg} ${!isMobileView && `rounded-2xl border ${theme.cardBorder} shadow-xl`} transition-colors duration-300 overflow-hidden
              `}>
                  {isMobileView && <div className={`p-4 border-b ${theme.cardBorder} flex items-center justify-between`}><div className="flex items-center gap-2"><ShieldCheck size={18} className="text-emerald-500" /><h2 className="font-bold text-sm text-emerald-500">Análisis IA</h2></div><button onClick={() => setShowMobileInfo(false)}><X size={24} className={theme.textMuted} /></button></div>}
                  {!isMobileView && <div className={`p-4 border-b ${theme.cardBorder} ${isDarkMode ? 'bg-emerald-900/10' : 'bg-emerald-50'} flex items-center gap-2 flex-shrink-0`}><ShieldCheck size={18} className="text-emerald-500" /><h2 className="font-bold text-sm text-emerald-600 uppercase tracking-wider">{selectedChat?.aiAnalysis.category === 'inquiry' ? 'Intención' : 'Análisis'}</h2></div>}

                  {selectedChat ? (
                    <>
                      <div className="flex-1 overflow-y-auto custom-scrollbar p-5 pb-0">
                        <div className={`rounded-xl p-5 mb-5 relative overflow-hidden border shadow-sm ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-gray-100'}`}>
                          <div className={`absolute top-0 right-0 w-24 h-24 transform translate-x-8 -translate-y-8 rotate-45 opacity-10 ${['Oportunidad', 'Consulta'].includes(selectedChat.type) ? (selectedChat.type === 'Consulta' ? 'bg-blue-500' : 'bg-emerald-500') : 'bg-gray-500'}`}></div>
                          {selectedChat.aiAnalysis.category === 'inquiry' ? (
                            <div className="relative z-10"><p className={`text-[10px] uppercase font-bold mb-2 tracking-widest ${theme.textMuted}`}>Cliente busca:</p><h3 className={`text-xl font-serif font-bold leading-tight mb-4 flex items-center gap-2 ${theme.text}`}><ShoppingBag size={20} className="text-blue-500" /> {selectedChat.aiAnalysis.intent}</h3><div className="space-y-4"><div><p className={`text-[10px] uppercase font-bold mb-1 ${theme.textMuted}`}>Keywords Detectadas</p><div className="flex flex-wrap gap-1.5">{selectedChat.aiAnalysis.keywords.map((k, i) => (<span key={i} className={`px-2 py-1 rounded-md text-[10px] font-medium border ${isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-300' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>{k}</span>))}</div></div></div></div>
                          ) : (
                            <div className="relative z-10"><p className={`text-[10px] uppercase font-bold mb-2 tracking-widest ${theme.textMuted}`}>Identificación IA</p>{analysisImage && (<div className={`mb-4 group relative rounded-lg overflow-hidden border ${isDarkMode ? 'border-slate-700 bg-slate-800' : 'border-gray-200 bg-gray-100'} shadow-sm w-full h-32`}><img src={analysisImage} alt="Pieza analizada" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" /><div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]"><a href={analysisImage} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-colors border border-white/20"><Eye size={16} /></a></div></div>)}<h3 className={`text-lg font-serif font-bold leading-tight mb-4 ${theme.text}`}>{selectedChat.aiAnalysis.item}</h3>{analysisImage && (<a href={analysisImage} target="_blank" rel="noopener noreferrer" className={`text-[10px] flex items-center gap-1 hover:underline mb-2 opacity-60 hover:opacity-100 transition-opacity ${theme.accent}`}><ExternalLink size={10} /> Ver imagen original</a>)}</div>
                          )}
                          <div className={`pt-4 mt-2 border-t ${isDarkMode ? 'border-slate-800' : 'border-gray-100'} flex items-center justify-between`}><div><p className={`text-[10px] uppercase font-bold mb-1 ${theme.textMuted}`}>Veredicto IA</p><div className="flex items-center gap-2"><span className={`w-2 h-2 rounded-full ${selectedChat.type === 'Basura' ? 'bg-gray-400' : (selectedChat.type === 'Consulta' ? 'bg-blue-500' : 'bg-emerald-500')}`}></span><p className={`text-sm font-bold ${selectedChat.type === 'Basura' ? 'text-gray-400' : (selectedChat.type === 'Consulta' ? 'text-blue-500' : 'text-emerald-500')}`}>{selectedChat.aiAnalysis.verdict}</p></div></div><div className="flex flex-col items-end gap-1"><p className={`text-[9px] uppercase font-bold ${theme.textMuted}`}>¿Correcto?</p><div className="flex gap-1"><button onClick={() => setFeedback('up')} className={`p-1.5 rounded transition-colors ${feedback === 'up' ? 'text-green-500 bg-green-500/10' : 'text-gray-400 hover:text-green-500'}`}><ThumbsUp size={14} /></button><button onClick={() => setFeedback('down')} className={`p-1.5 rounded transition-colors ${feedback === 'down' ? 'text-red-500 bg-red-500/10' : 'text-gray-400 hover:text-red-500'}`}><ThumbsDown size={14} /></button></div></div></div>
                        </div>
                      </div>

                      {/* EDITOR DE RESPUESTA (Aquí para Desktop) */}
                      {!isMobileView && <ReplyEditor chat={selectedChat} />}
                    </>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center opacity-40 p-8 text-center"><ShieldCheck size={48} className="mb-4 text-gray-400" /><p className={`text-xs font-bold uppercase tracking-widest ${theme.textMuted}`}>Esperando análisis...</p></div>
                  )}
                </div>

              </main>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const FilterIconButton = ({ active, onClick, icon, title, color, isDark }) => (
  <button onClick={onClick} title={title} className={`flex-1 py-2 rounded-lg transition-all flex justify-center items-center ${active ? `${isDark ? 'bg-slate-800 shadow-sm' : 'bg-white shadow-md ring-1 ring-black/5'} ${color || 'text-slate-200'}` : `text-slate-500 hover:bg-opacity-50 hover:text-slate-400`}`}>{icon}</button>
);

export default App;