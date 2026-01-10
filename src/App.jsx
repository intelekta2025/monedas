import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from './context/AuthContext';
import SettingsView from './components/SettingsView';
import { getWhatsappPhones } from './services/whatsappService';
import { getConversations, getClosedConversations, getMessages, getMessagesByClient, subscribeToConversations, subscribeToMessages, closeConversation, reopenConversation, markAsRead } from './services/messagesService';
import { forceSessionRefresh, forceLogout, surgicalConnectionReset } from './services/supabase';

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
  LogOut,
  XCircle,

  Archive,
  RefreshCw
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
  const { isAuthenticated, loading, profile, signOut } = useAuth();

  // CONFIGURACIÓN INICIAL PARA DEMO
  const [activeTab, setActiveTab] = useState('oportunidades');
  const [dateFilter, setDateFilter] = useState('any');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showMobileInfo, setShowMobileInfo] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const [simulatedDevice, setSimulatedDevice] = useState('desktop');
  const [showDeviceBar, setShowDeviceBar] = useState(false); // Solo para testing, oculto por defecto
  const [currentView, setCurrentView] = useState('main'); // 'main' | 'settings'
  const chatContainerRef = useRef(null);
  const currentChatIdRef = useRef(null); // Para evitar race conditions en carga de mensajes
  const isPollingConversationsRef = useRef(false); // Para evitar polling apilado

  // Estado para teléfonos WhatsApp
  const [whatsappPhones, setWhatsappPhones] = useState([]);
  const [selectedPhone, setSelectedPhone] = useState(null);
  const [phonesLoading, setPhonesLoading] = useState(true);
  const [connectionError, setConnectionError] = useState(null);

  // Estado para conversaciones reales
  const [conversations, setConversations] = useState([]);
  const [conversationsLoading, setConversationsLoading] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [loadError, setLoadError] = useState(null); // Estado para errores de carga
  const [showClosedConversations, setShowClosedConversations] = useState(false);
  const [conversationAnalyses, setConversationAnalyses] = useState([]); // Análisis de IA de la conversación
  const [currentAnalysisIndex, setCurrentAnalysisIndex] = useState(0); // Índice para carrusel

  // Detección automática del dispositivo basada en el ancho de ventana
  useEffect(() => {
    const detectDevice = () => {
      const width = window.innerWidth;
      if (width < 480) {
        setSimulatedDevice('mobile');
      } else if (width < 1024) {
        setSimulatedDevice('tablet');
      } else {
        setSimulatedDevice('desktop');
      }
    };

    // Detectar al cargar
    detectDevice();

    // Detectar cuando cambia el tamaño de la ventana
    window.addEventListener('resize', detectDevice);
    return () => window.removeEventListener('resize', detectDevice);
  }, []);

  // Helper para fechas
  const getTodayDate = () => new Date().toISOString().split('T')[0];
  const todayStr = '24/10';
  const yesterdayStr = '23/10';

  // Cargar teléfonos WhatsApp al autenticarse
  useEffect(() => {
    const loadPhones = async () => {
      if (!isAuthenticated) return;
      console.log('App: Cargando teléfonos WhatsApp...');
      setPhonesLoading(true);
      setConnectionError(null);
      try {
        // Timeout de 15 segundos para evitar bloqueo en carga de teléfonos
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('TimeoutPhones')), 15000)
        );

        const phones = await Promise.race([
          getWhatsappPhones(),
          timeoutPromise
        ]);

        console.log('App: Teléfonos cargados:', phones);
        setWhatsappPhones(phones || []);
        setConnectionError(null);
        // Seleccionar el default o el primero
        const defaultPhone = phones?.find(p => p.is_default) || phones?.[0];
        console.log('App: Teléfono seleccionado:', defaultPhone);
        if (defaultPhone) setSelectedPhone(defaultPhone);
      } catch (err) {
        console.error('Error cargando teléfonos:', err);
        setConnectionError('No se pudo conectar a Supabase. Verifica tu conexión.');
      } finally {
        setPhonesLoading(false);
      }
    };
    loadPhones();
  }, [isAuthenticated]);

  // Cargar conversaciones cuando cambia el teléfono seleccionado o el filtro
  useEffect(() => {
    const loadConversations = async (isPolling = false) => {
      if (!selectedPhone?.id) {
        console.log('App: No hay teléfono seleccionado, limpiando conversaciones');
        setConversations([]);
        return;
      }
      // Solo mostrar loading en carga inicial, no en polling
      if (!isPolling) {
        console.log(`App: Cargando conversaciones ${showClosedConversations ? 'cerradas' : 'abiertas'} para teléfono:`, selectedPhone.id);
        setConversationsLoading(true);
      }
      try {
        // Timeout de 10s para evitar bloqueo inicial
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('TimeoutConversations')), 10000)
        );

        const fetchPromise = showClosedConversations
          ? getClosedConversations(selectedPhone.id)
          : getConversations(selectedPhone.id);

        const convs = await Promise.race([fetchPromise, timeoutPromise]);

        if (!isPolling) {
          console.log('App: Conversaciones cargadas:', convs);
        }
        setConversations(convs || []);
        // Solo limpiar selección en carga inicial
        if (!isPolling) {
          setSelectedChat(null);
          setSelectedConversation(null);
          setChatMessages([]);
          setConnectionError(null);
        }
      } catch (err) {
        console.error('Error cargando conversaciones:', err);
        if (!isPolling) {
          setConnectionError('Sesión inestable. Por favor reinicia sesión.');
        }
      } finally {
        if (!isPolling) {
          setConversationsLoading(false);
        }
        // Resetear flag de polling para permitir la siguiente ejecución
        if (isPolling) {
          isPollingConversationsRef.current = false;
        }
      }
    };

    // Carga inicial
    loadConversations(false);

    // POLLING DESACTIVADO - Confiamos en Real-time de Supabase
    // Descomentar si se necesita como respaldo
    /*
    const intervalId = setInterval(() => {
      // Solo hacer polling si:
      // 1. Hay teléfono seleccionado
      // 2. No se está ejecutando ya una carga (evita apilamiento)
      // 3. La ventana está visible (ahorra recursos)
      // 4. No hay error activo de conexión
      if (selectedPhone?.id && !isPollingConversationsRef.current && document.visibilityState === 'visible' && !connectionError) {
        isPollingConversationsRef.current = true;
        loadConversations(true).catch(() => {
           isPollingConversationsRef.current = false;
        });
      }
    }, 30000);
    */

    // Suscribirse a cambios en tiempo real (solo para conversaciones abiertas)
    let unsubscribe;
    if (selectedPhone?.id && !showClosedConversations) {
      unsubscribe = subscribeToConversations(selectedPhone.id, (payload) => {
        if (payload.eventType === 'INSERT') {
          setConversations(prev => [payload.new, ...prev]);
        } else if (payload.eventType === 'UPDATE') {
          setConversations(prev =>
            prev.map(c => c.id === payload.new.id ? payload.new : c)
          );
        }
      });
    }

    return () => {
      // clearInterval(intervalId); // POLLING DESACTIVADO
      if (unsubscribe) unsubscribe();
    };
  }, [selectedPhone?.id, showClosedConversations]);

  // Cargar mensajes cuando cambia la conversación seleccionada + polling cada 10 seg
  // Ahora carga TODOS los mensajes del cliente (de todas sus conversaciones)
  useEffect(() => {
    const loadMessages = async () => {
      // Necesitamos client_id y phoneId para cargar historial completo
      if (!selectedConversation?.client_id || !selectedPhone?.id) {
        // Evitar borrar mensajes si solo falta el client_id pero ya cargamos por conversation_id
        // setChatMessages([]); 
        return;
      }
      try {
        // Solo mostrar loading si es la primera carga (no polling) o si es explícito
        // Pero como es polling, mejor no flashear loading. 
        // Solo indicaremos loading en handleChatSelect que es manual.

        // Prioridad: Si tenemos una conversación específica seleccionada, cargar sus mensajes directamente
        // Esto es más robusto y evita problemas de filtros de status/phone que tiene getMessagesByClient
        if (selectedConversation.id) {
          const msgs = await getMessages(selectedConversation.id);
          setChatMessages(msgs || []);
          return;
        }

        // Fallback: Cargar por cliente (comportamiento anterior, útil si no hay conv ID específica)
        const status = showClosedConversations ? 'closed' : 'open';
        const msgs = await getMessagesByClient(selectedConversation.client_id, selectedPhone.id, status);
        setChatMessages(msgs || []);
      } catch (err) {
        console.error('Error cargando mensajes:', err);
      }
    };

    // Carga inicial
    loadMessages();

    // POLLING DE MENSAJES DESACTIVADO - Confiamos en Real-time
    // Descomentar si se necesita como respaldo
    /*
    const intervalId = setInterval(() => {
      if (selectedConversation?.client_id && selectedPhone?.id) {
        loadMessages();
      }
    }, 10000);
    */

    // Limpiar intervalo al cambiar de cliente o desmontar
    return () => {
      // clearInterval(intervalId); // POLLING DESACTIVADO
    };
  }, [selectedConversation?.client_id, selectedPhone?.id, showClosedConversations]);

  // --- Wake-Up Handler: Recuperar conexión al volver a la pestaña ---
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'visible') {
        console.log('👁️ Pestaña visible: Verificando salud de conexión...');
        // Intentar un refresh suave para "despertar" la conexión si estaba dormida
        // No forzamos reload, solo reconexión de sesión
        try {
          await forceSessionRefresh();
        } catch (e) {
          console.warn('Error en Wake-Up refresh:', e);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // --- Real-time: Suscripción a mensajes nuevos ---


  // Inicializar sin chat seleccionado (limpio)
  const [selectedChat, setSelectedChat] = useState(null);

  // --- Real-time: Suscripción a mensajes nuevos ---
  useEffect(() => {
    let unsubscribe = null;

    if (selectedChat?.conversationId) {
      console.log('Iniciando suscripción a mensajes para:', selectedChat.conversationId);
      unsubscribe = subscribeToMessages(selectedChat.conversationId, (newMessage) => {
        console.log('Nuevo mensaje recibido (Real-time):', newMessage);
        setChatMessages(prev => {
          // Evitar duplicados
          if (prev.find(m => m.id === newMessage.id)) return prev;
          return [...prev, newMessage];
        });

        // Scroll al fondo si es mensaje nuevo
        if (chatContainerRef.current) {
          // Pequeño delay para asegurar render
          setTimeout(() => {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
          }, 100);
        }
      });
    }

    return () => {
      if (unsubscribe) {
        console.log('Cerrando suscripción mensajes');
        unsubscribe();
      }
    };
  }, [selectedChat?.conversationId]);

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
  const isTabletView = simulatedDevice === 'tablet';
  const isCompactView = isMobileView || isTabletView; // Móvil o Tablet: panel de análisis como overlay

  const handleChatSelect = async (chat) => {
    console.log('handleChatSelect: Seleccionando chat:', chat);
    setSelectedChat(chat);
    // Actualizar estado para el polling
    setSelectedConversation({ id: chat.conversationId, client_id: chat.clientId });
    setShowMobileInfo(false);
    setFeedback(null);

    // Si es una conversación real, cargar los mensajes
    if (chat.conversationId) {
      // Guardar referencia del chat actual
      currentChatIdRef.current = chat.conversationId;

      // Limpiar mensajes anteriores inmediatamente
      setChatMessages([]);
      setMessagesLoading(true);
      setLoadError(null); // Resetear error

      console.log('handleChatSelect: Cargando mensajes para conversación:', chat.conversationId);
      try {
        // Timeout de 4 segundos (Fail Fast & Recover)
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Tiempo de espera agotado')), 4000)
        );

        // Race entre carga y timeout
        const msgs = await Promise.race([
          getMessages(chat.conversationId),
          timeoutPromise
        ]);

        // Verificar si seguimos en el mismo chat antes de actualizar
        if (currentChatIdRef.current === chat.conversationId) {
          console.log('handleChatSelect: Mensajes cargados:', msgs);
          setChatMessages(msgs || []);
          setLoadError(null);

          // Extraer análisis de IA de todos los media
          const analyses = [];
          (msgs || []).forEach(msg => {
            if (msg.media && Array.isArray(msg.media)) {
              msg.media.forEach(m => {
                if (m.ai_analysis) {
                  try {
                    const parsed = typeof m.ai_analysis === 'string'
                      ? JSON.parse(m.ai_analysis)
                      : m.ai_analysis;
                    analyses.push({
                      ...parsed,
                      media_url: m.media_url,
                      media_id: m.id
                    });
                  } catch (e) {
                    console.error('Error parsing ai_analysis:', e);
                  }
                }
              });
            }
          });
          console.log('handleChatSelect: Análisis extraídos:', analyses);
          setConversationAnalyses(analyses);
          setCurrentAnalysisIndex(0);
        } else {
          console.log('handleChatSelect: Ignorando resultados de chat antiguo');
        }
      } catch (err) {
        // Si cambió el chat, no mostrar error de la carga anterior
        if (currentChatIdRef.current === chat.conversationId) {
          console.error('Error cargando mensajes:', err);

          // Intentar recuperar la sesión automáticamente
          console.log('Intentando recuperar sesión...');
          const refreshed = await forceSessionRefresh();

          if (refreshed) {
            // Reintentar carga de mensajes después del refresh
            console.log('Sesión recuperada, reintentando carga...');
            try {
              const retryMsgs = await getMessages(chat.conversationId);
              if (currentChatIdRef.current === chat.conversationId) {
                setChatMessages(retryMsgs || []);
                setLoadError(null);
                setMessagesLoading(false);
                return; // Éxito en el reintento
              }
            } catch (retryErr) {
              console.error('Error en reintento:', retryErr);
            }
          }

          // Si el refresh falló o el reintento falló, mostrar error
          let friendlyError = 'Error cargando mensajes';
          if (err.message === 'Tiempo de espera agotado') {
            friendlyError = 'La conexión está lenta o inestable';
          } else if (err.message.includes('fetch')) {
            friendlyError = 'Error de conexión a internet';
          }

          setLoadError(friendlyError);
          setChatMessages([]);
        }
      } finally {
        // Solo quitar loading si seguimos en el mismo chat
        if (currentChatIdRef.current === chat.conversationId) {
          setMessagesLoading(false);
        }
      }
    } else {
      // Sin conversación seleccionada
      setChatMessages([]);
    }

  }; // This closes handleChatSelect

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

  // Reabrir conversación cerrada
  const handleReopenConversation = async () => {
    if (!selectedChat?.conversationId) return;
    try {
      await reopenConversation(selectedChat.conversationId);
      // Refrescar lista de conversaciones cerradas
      const convs = await getClosedConversations(selectedPhone.id);
      setConversations(convs || []);
      setSelectedChat(null);
      // Opcional: cambiar a vista de abiertas
      setShowClosedConversations(false);
    } catch (err) {
      console.error('Error reabriendo conversación:', err);
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

  // Usar solo conversaciones reales (sin demo data)
  const displayChats = realChatsFormatted;

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

      {/* BARRA DE SIMULACIÓN (Solo visible en modo testing) */}
      {showDeviceBar && (
        <div className="flex items-center justify-center gap-4 bg-black/80 text-slate-400 py-2 border-b border-white/10 z-50 flex-shrink-0">
          <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Vista Previa:</span>
          <button onClick={() => setSimulatedDevice('mobile')} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${simulatedDevice === 'mobile' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'hover:bg-white/10'}`}><Smartphone size={14} /> Celular</button>
          <button onClick={() => setSimulatedDevice('tablet')} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${simulatedDevice === 'tablet' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'hover:bg-white/10'}`}><Tablet size={14} /> Tablet</button>
          <button onClick={() => setSimulatedDevice('desktop')} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${simulatedDevice === 'desktop' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'hover:bg-white/10'}`}><Monitor size={14} /> PC</button>
        </div>
      )}

      <div className="flex-1 flex overflow-hidden relative">
        <div className={`w-full h-full overflow-hidden flex flex-col relative bg-black`}>

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
                    <button
                      onClick={signOut}
                      className={`flex items-center gap-2 text-xs font-bold px-3 py-2 rounded-lg transition-colors text-red-400 ${isDarkMode ? 'hover:bg-red-500/10' : 'hover:bg-red-50'}`}
                      title="Cerrar sesión"
                    >
                      <LogOut size={16} />
                      <span className="hidden xl:inline">Salir</span>
                    </button>
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
                ${isCompactView && selectedChat ? 'hidden' : 'flex'} 
                ${isMobileView ? 'w-full' : isTabletView ? 'w-[280px]' : 'w-80'} flex-shrink-0 flex-col 
                ${theme.cardBg} ${!isMobileView && `rounded-2xl border ${theme.cardBorder} shadow-xl`} transition-colors duration-300
              `}>
                  <div className={`p-4 border-b ${theme.cardBorder} flex items-center justify-between`}>
                    <h2 className={`font-bold text-sm ${theme.text} flex items-center gap-2`}><MessageCircle size={18} className={theme.accent} /> Mensajes</h2>
                    <div className="flex items-center gap-2">
                      {/* Toggle para ver conversaciones cerradas */}
                      <button
                        onClick={() => setShowClosedConversations(!showClosedConversations)}
                        className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-bold uppercase transition-all ${showClosedConversations ? 'bg-gray-500 text-white' : `${theme.textMuted} hover:bg-slate-800/50`}`}
                        title={showClosedConversations ? 'Ver abiertas' : 'Ver cerradas'}
                      >
                        <Archive size={12} />
                        <span className="hidden sm:inline">{showClosedConversations ? 'Cerradas' : 'Abiertas'}</span>
                      </button>
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
                    {/* Indicador de error de conexión */}
                    {connectionError && (
                      <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-red-500/10 border-red-500/30' : 'bg-red-50 border-red-200'} text-center`}>
                        <AlertCircle size={32} className="text-red-400 mx-auto mb-2" />
                        <p className="text-red-400 text-sm font-medium mb-1">Error de conexión</p>
                        <p className={`text-xs ${theme.textMuted} mb-3`}>{connectionError}</p>
                        <button
                          onClick={() => window.location.reload()}
                          className="w-full mb-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-lg transition-colors"
                        >
                          Reintentar
                        </button>
                        <button
                          onClick={signOut}
                          className="w-full px-4 py-2 border border-red-300 hover:bg-red-50 text-red-500 text-xs font-bold rounded-lg transition-colors"
                        >
                          Cerrar Sesión (Reset)
                        </button>
                      </div>
                    )}

                    {/* Indicador de carga */}
                    {phonesLoading && !connectionError && (
                      <div className="flex flex-col items-center justify-center py-8">
                        <Loader2 size={32} className="animate-spin text-emerald-500 mb-2" />
                        <p className={`text-sm ${theme.textMuted}`}>Cargando...</p>
                      </div>
                    )}

                    {/* Sin conversaciones (datos reales) */}
                    {!connectionError && !phonesLoading && realChatsFormatted.length === 0 && (
                      <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-gray-50 border-gray-200'} text-center`}>
                        <MessageCircle size={32} className={`${theme.textMuted} mx-auto mb-2 opacity-50`} />
                        <p className={`text-sm font-medium ${theme.textMuted}`}>Sin conversaciones</p>
                        <p className={`text-xs ${theme.textMuted} mt-1`}>
                          {whatsappPhones.length === 0
                            ? 'No hay teléfonos WhatsApp configurados'
                            : 'No hay conversaciones activas'}
                        </p>
                      </div>
                    )}

                    {/* Lista de conversaciones */}
                    {!connectionError && filteredChats.map((chat) => (
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
                ${isCompactView ? (selectedChat && !showMobileInfo ? 'flex' : 'hidden') : 'flex'} 
                ${isMobileView ? 'flex-1' : isTabletView ? 'flex-1' : 'w-[600px]'} flex-col flex-shrink-0
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
                          {isCompactView && (
                            <button
                              onClick={() => setShowMobileInfo(true)}
                              className={`p-2 rounded-lg relative ${conversationAnalyses.length > 0 ? 'text-emerald-500 bg-emerald-500/20' : 'text-emerald-500'} hover:bg-emerald-500/10`}
                            >
                              <ShieldCheck size={20} />
                              {conversationAnalyses.length > 0 && (
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                  {conversationAnalyses.length}
                                </span>
                              )}
                            </button>
                          )}
                          {/* Botón cerrar conversación (solo para conversaciones abiertas) */}
                          {selectedChat.conversationId && !showClosedConversations && (
                            <button
                              onClick={() => handleCloseConversation('resolved')}
                              className={`p-2 rounded-lg transition-colors text-red-400 hover:bg-red-500/10`}
                              title="Cerrar conversación"
                            >
                              <XCircle size={18} />
                            </button>
                          )}
                          {/* Botón reabrir conversación (solo para conversaciones cerradas) */}
                          {selectedChat.conversationId && showClosedConversations && (
                            <button
                              onClick={handleReopenConversation}
                              className={`p-2 rounded-lg transition-colors text-emerald-400 hover:bg-emerald-500/10`}
                              title="Reabrir conversación"
                            >
                              <Archive size={18} />
                            </button>
                          )}
                          <button className={`p-2 rounded-lg hover:bg-opacity-10 transition-colors ${theme.textMuted} hover:bg-slate-500`}><MoreVertical size={18} /></button>
                        </div>
                      </div>

                      <div ref={chatContainerRef} className={`flex-1 ${isDarkMode ? 'bg-slate-950/50' : 'bg-gray-50/50'} p-4 lg:p-6 overflow-y-auto custom-scrollbar flex flex-col gap-4`}>
                        {messagesLoading ? (
                          <div className="flex flex-col items-center justify-center h-full opacity-50">
                            <Loader2 size={32} className="animate-spin text-emerald-500 mb-2" />
                            <p className={`text-sm ${theme.textMuted}`}>Cargando mensajes...</p>
                          </div>
                        ) : loadError ? (
                          <div className="flex flex-col items-center justify-center h-full gap-4">
                            <AlertCircle size={48} className="text-red-400" />
                            <div className="text-center">
                              <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{loadError}</p>
                              <p className="text-xs text-slate-500 mt-1">Revisa tu conexión o intenta de nuevo</p>
                            </div>
                            <div className="flex gap-3 mt-2">
                              <button
                                onClick={() => handleChatSelect(selectedChat)}
                                className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-[600] shadow hover:bg-emerald-500 transition-colors flex items-center gap-2"
                              >
                                <RefreshCw size={14} /> Reintentar
                              </button>

                              <button
                                onClick={surgicalConnectionReset}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 text-xs rounded-lg transition-colors border border-yellow-500/30"
                                title="Intenta reparar la conexión sin perder tu sesión"
                              >
                                <RefreshCw size={14} /> Reparar Conexión
                              </button>

                              <button
                                onClick={() => window.location.reload()}
                                className={`px-4 py-2 border ${isDarkMode ? 'border-slate-700 hover:bg-slate-800' : 'border-slate-300 hover:bg-slate-100'} rounded-lg text-sm font-medium transition-colors`}
                              >
                                Recargar Página
                              </button>
                            </div>
                          </div>
                        ) : selectedChat.conversationId && chatMessages.length > 0 ? (
                          chatMessages.map((msg, idx) => {
                            const sender = msg.direction === 'inbound' ? 'user' : 'bot';
                            const msgTime = new Date(msg.created_at).toLocaleString('es-MX', {
                              hour: '2-digit', minute: '2-digit', hour12: true
                            });
                            const hasImage = msg.num_media > 0 && msg.media?.length > 0 && msg.media[0]?.media_url;
                            // Debug: log para ver datos de media
                            if (msg.num_media > 0) {
                              console.log('Mensaje con media:', { id: msg.id, num_media: msg.num_media, media: msg.media });
                            }
                            return (
                              <div key={msg.id || idx} className={`flex ${sender === 'user' ? 'justify-start' : 'justify-end'}`}>
                                <div className={`max-w-[85%] lg:max-w-[80%] rounded-2xl p-3 lg:p-4 text-sm leading-relaxed relative group transition-all ${sender === 'user' ? theme.chatBubbleUser : theme.chatBubbleBot} ${sender === 'user' ? 'rounded-tl-none' : 'rounded-tr-none'}`}>
                                  {hasImage ? (
                                    <div className="space-y-2">
                                      <div className="relative rounded-lg overflow-hidden shadow-md">
                                        <img src={msg.media[0].media_url} alt="Evidencia" className="w-full h-auto object-cover max-h-[300px]" />
                                      </div>
                                      {msg.body && <p className={`text-xs ${theme.textMuted} italic`}>{msg.body}</p>}
                                    </div>
                                  ) : msg.num_media > 0 ? (
                                    // Fallback: tiene media pero no se pudo cargar
                                    <div className="space-y-2">
                                      <div className={`flex items-center gap-2 p-3 rounded-lg ${isDarkMode ? 'bg-slate-800' : 'bg-gray-100'}`}>
                                        <ImageIcon size={20} className="text-blue-500" />
                                        <span className={`text-sm ${theme.text}`}>📎 Imagen adjunta ({msg.num_media})</span>
                                      </div>
                                      {msg.body && <p className={theme.text}>{msg.body}</p>}
                                    </div>
                                  ) : (
                                    <p className={isDarkMode || sender === 'bot' ? theme.text : 'text-gray-700'}>{msg.body}</p>
                                  )}
                                  <div className={`flex items-center gap-1 mt-1.5 opacity-40 text-[9px] font-bold uppercase ${sender === 'user' ? 'justify-start' : 'justify-end'}`}>
                                    {msgTime}
                                    {sender === 'bot' && <CheckCircle size={10} />}
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        ) : selectedChat.history && selectedChat.history.length > 0 ? (
                          selectedChat.history.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-start' : 'justify-end'}`}>
                              <div className={`max-w-[85%] lg:max-w-[80%] rounded-2xl p-3 lg:p-4 text-sm leading-relaxed relative group transition-all ${msg.sender === 'user' ? theme.chatBubbleUser : theme.chatBubbleBot} ${msg.sender === 'user' ? 'rounded-tl-none' : 'rounded-tr-none'}`}>
                                {msg.type === 'image' ? <div className="space-y-2"><div className="relative rounded-lg overflow-hidden shadow-md"><img src={msg.img} alt="Evidencia" className="w-full h-auto object-cover max-h-[300px]" /></div>{msg.text && <p className={`text-xs ${theme.textMuted} italic`}>{msg.text}</p>}</div> : <p className={isDarkMode || msg.sender === 'bot' ? theme.text : 'text-gray-700'}>{msg.text}</p>}
                                <div className={`flex items-center gap-1 mt-1.5 opacity-40 text-[9px] font-bold uppercase ${msg.sender === 'user' ? 'justify-start' : 'justify-end'}`}>{msg.time.split(' ')[1]} {msg.time.split(' ')[2]}{msg.sender === 'bot' && <CheckCircle size={10} />}</div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="flex-1 flex flex-col items-center justify-center opacity-40">
                            <MessageCircle size={48} className="mb-3 text-gray-400" />
                            <p className={`text-sm font-medium ${theme.textMuted}`}>No hay mensajes aún</p>
                            <p className={`text-xs ${theme.textMuted} mt-1`}>El cliente no ha enviado mensajes</p>
                            <p className="text-[10px] text-gray-400 font-mono mt-4 select-all">
                              ID: {selectedChat.conversationId} | Client: {selectedChat.clientId || 'N/A'}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* EDITOR DE RESPUESTA (Aquí para Móvil) */}
                      {isCompactView && <ReplyEditor key={selectedChat.conversationId} chat={selectedChat} theme={theme} isDarkMode={isDarkMode} selectedPhone={selectedPhone} setChatMessages={setChatMessages} />}
                    </>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center opacity-40"><MessageCircle size={64} className="mb-4 text-gray-400" /><p className={`text-sm font-medium ${theme.textMuted}`}>Selecciona una conversación</p></div>
                  )}
                </div>

                {/* COLUMNA 3: IA */}
                <div className={`
                ${isCompactView ? (showMobileInfo ? 'flex absolute inset-0 z-50' : 'hidden') : 'flex'} 
                ${isCompactView ? 'w-full h-full' : 'flex-1'} flex-col 
                ${theme.cardBg} ${!isMobileView && `rounded-2xl border ${theme.cardBorder} shadow-xl`} transition-colors duration-300 overflow-hidden
              `}>
                  {isCompactView && <div className={`p-4 border-b ${theme.cardBorder} flex items-center justify-between`}><div className="flex items-center gap-2"><ShieldCheck size={18} className="text-emerald-500" /><h2 className="font-bold text-sm text-emerald-500">Análisis IA</h2></div><button onClick={() => setShowMobileInfo(false)}><X size={24} className={theme.textMuted} /></button></div>}
                  {!isCompactView && <div className={`p-4 border-b ${theme.cardBorder} ${isDarkMode ? 'bg-emerald-900/10' : 'bg-emerald-50'} flex items-center gap-2 flex-shrink-0`}><ShieldCheck size={18} className="text-emerald-500" /><h2 className="font-bold text-sm text-emerald-600 uppercase tracking-wider">{selectedChat?.aiAnalysis?.category === 'inquiry' ? 'Intención' : 'Análisis'}</h2></div>}

                  {selectedChat ? (
                    <>
                      <div className="flex-1 overflow-y-auto custom-scrollbar p-5 pb-0">
                        {/* Si hay análisis de IA en la conversación */}
                        {conversationAnalyses.length > 0 ? (
                          <div className={`rounded-xl p-5 mb-5 relative overflow-hidden border shadow-sm ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-gray-100'}`}>
                            {/* Decorative background */}
                            <div className={`absolute top-0 right-0 w-24 h-24 transform translate-x-8 -translate-y-8 rotate-45 opacity-10 ${conversationAnalyses[currentAnalysisIndex]?.business_classification === 'OPORTUNIDAD' ? 'bg-emerald-500' : 'bg-gray-500'}`}></div>

                            {/* Carousel navigation (only if > 1) */}
                            {conversationAnalyses.length > 1 && (
                              <div className="flex items-center justify-between mb-4 relative z-20">
                                <button
                                  type="button"
                                  onClick={() => setCurrentAnalysisIndex(prev => prev > 0 ? prev - 1 : conversationAnalyses.length - 1)}
                                  className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-gray-100 text-gray-500'}`}
                                >
                                  <ArrowLeft size={16} />
                                </button>
                                <span className={`text-xs font-bold ${theme.textMuted}`}>
                                  {currentAnalysisIndex + 1} / {conversationAnalyses.length}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => setCurrentAnalysisIndex(prev => prev < conversationAnalyses.length - 1 ? prev + 1 : 0)}
                                  className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-gray-100 text-gray-500'}`}
                                >
                                  <ArrowRight size={16} />
                                </button>
                              </div>
                            )}

                            {/* Current analysis card content */}
                            {(() => {
                              const analysis = conversationAnalyses[currentAnalysisIndex];
                              if (!analysis) return null;
                              return (
                                <div className="relative z-10">
                                  <p className={`text-[10px] uppercase font-bold mb-2 tracking-widest ${theme.textMuted}`}>Identificación IA</p>

                                  {/* Image thumbnail */}
                                  {analysis.media_url && (
                                    <div className={`mb-4 group relative rounded-lg overflow-hidden border ${isDarkMode ? 'border-slate-700 bg-slate-800' : 'border-gray-200 bg-gray-100'} shadow-sm w-full h-32`}>
                                      <img src={analysis.media_url} alt="Moneda analizada" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
                                        <a href={analysis.media_url} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-colors border border-white/20"><Eye size={16} /></a>
                                      </div>
                                    </div>
                                  )}

                                  {/* Analysis details grid */}
                                  <div className="grid grid-cols-2 gap-3 mb-4">
                                    {analysis.year && (
                                      <div>
                                        <p className={`text-[10px] uppercase font-bold ${theme.textMuted}`}>Año</p>
                                        <p className={`text-lg font-bold ${theme.text}`}>{analysis.year}</p>
                                      </div>
                                    )}
                                    {analysis.material_detected && (
                                      <div>
                                        <p className={`text-[10px] uppercase font-bold ${theme.textMuted}`}>Material</p>
                                        <p className={`text-lg font-bold ${theme.text}`}>{analysis.material_detected}</p>
                                      </div>
                                    )}
                                    {analysis.currency_type && (
                                      <div>
                                        <p className={`text-[10px] uppercase font-bold ${theme.textMuted}`}>Moneda</p>
                                        <p className={`text-sm font-medium ${theme.text}`}>{analysis.currency_type}</p>
                                      </div>
                                    )}
                                    {analysis.confidence && (
                                      <div>
                                        <p className={`text-[10px] uppercase font-bold ${theme.textMuted}`}>Confianza</p>
                                        <p className={`text-sm font-bold ${analysis.confidence >= 80 ? 'text-emerald-500' : analysis.confidence >= 50 ? 'text-yellow-500' : 'text-red-500'}`}>{analysis.confidence}%</p>
                                      </div>
                                    )}
                                  </div>

                                  {/* Classification badge */}
                                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold ${analysis.business_classification === 'OPORTUNIDAD' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'}`}>
                                    <Star size={12} fill={analysis.business_classification === 'OPORTUNIDAD' ? 'currentColor' : 'none'} />
                                    {analysis.business_classification || 'SIN CLASIFICAR'}
                                  </div>

                                  {/* Reasoning */}
                                  {analysis.reasoning && (
                                    <div className={`mt-4 pt-4 border-t ${isDarkMode ? 'border-slate-800' : 'border-gray-100'}`}>
                                      <p className={`text-[10px] uppercase font-bold mb-2 ${theme.textMuted}`}>Razonamiento</p>
                                      <p className={`text-xs leading-relaxed ${theme.textMuted}`}>{analysis.reasoning}</p>
                                    </div>
                                  )}
                                </div>
                              );
                            })()}

                            {/* Feedback buttons */}
                            <div className={`pt-4 mt-4 border-t ${isDarkMode ? 'border-slate-800' : 'border-gray-100'} flex items-center justify-end gap-1`}>
                              <p className={`text-[9px] uppercase font-bold mr-2 ${theme.textMuted}`}>¿Correcto?</p>
                              <button onClick={() => setFeedback('up')} className={`p-1.5 rounded transition-colors ${feedback === 'up' ? 'text-green-500 bg-green-500/10' : 'text-gray-400 hover:text-green-500'}`}><ThumbsUp size={14} /></button>
                              <button onClick={() => setFeedback('down')} className={`p-1.5 rounded transition-colors ${feedback === 'down' ? 'text-red-500 bg-red-500/10' : 'text-gray-400 hover:text-red-500'}`}><ThumbsDown size={14} /></button>
                            </div>
                          </div>
                        ) : (
                          /* Si no hay análisis de IA, mostrar placeholder */
                          <div className={`rounded-xl p-5 mb-5 relative overflow-hidden border shadow-sm ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-gray-100'} text-center`}>
                            <ShieldCheck size={40} className={`mx-auto mb-3 ${theme.textMuted} opacity-50`} />
                            <p className={`text-sm font-medium ${theme.textMuted}`}>Sin análisis de IA</p>
                            <p className={`text-xs ${theme.textMuted} mt-1`}>La conversación aún no ha sido analizada</p>
                          </div>
                        )}
                      </div>

                      {/* EDITOR DE RESPUESTA (Aquí para Desktop) */}
                      {!isMobileView && <ReplyEditor key={selectedChat.conversationId} chat={selectedChat} theme={theme} isDarkMode={isDarkMode} selectedPhone={selectedPhone} setChatMessages={setChatMessages} />}
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

// Componente ReplyEditor extraído para evitar re-renders innecesarios
const ReplyEditor = ({ chat, theme, isDarkMode, selectedPhone, setChatMessages }) => {
  // Si no hay análisis de IA aún, usar valores por defecto
  const category = chat?.aiAnalysis?.category || 'valuation';
  const suggestedReply = chat?.suggestedReply || '';

  // Estado para el mensaje
  const [responseBody, setResponseBody] = useState(suggestedReply);
  const [isSending, setIsSending] = useState(false);

  // Actualizar default si cambia la sugerencia y no hemos escrito nada
  useEffect(() => {
    if (suggestedReply && !responseBody) {
      setResponseBody(suggestedReply);
    }
  }, [suggestedReply]);

  const handleSend = async () => {
    if (!responseBody.trim()) return;
    if (!chat?.conversationId || !selectedPhone?.id) {
      alert('Error: Datos de conversación incompletos');
      return;
    }

    setIsSending(true);
    try {
      // URL del Webhook de n8n
      let WEBHOOK_URL = import.meta.env.VITE_N8N_OUTBOUND_WEBHOOK || '';

      // En desarrollo, usar el proxy para evitar CORS si es la URL de production
      if (import.meta.env.DEV && WEBHOOK_URL.includes('https://n8n-t.intelekta.ai/webhook')) {
        WEBHOOK_URL = WEBHOOK_URL.replace('https://n8n-t.intelekta.ai/webhook', '/api/n8n');
      }

      if (!WEBHOOK_URL) {
        alert('Error: Webhook de n8n no configurado. Verifica VITE_N8N_OUTBOUND_WEBHOOK en .env');
        setIsSending(false);
        return;
      }

      const payload = {
        conversation_id: chat.conversationId,
        phone_id: selectedPhone.id,
        to_number: chat.contactNumber,
        from_number: selectedPhone.phone_number,
        body: responseBody,
        direction: 'outbound'
      };

      // Enviar a n8n
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Error del webhook: ${response.status}`);
      }

      // NO Guardar en Supabase desde aquí, ya que el n8n se encarga de eso.
      // Evitamos duplicados.

      // Limpiar y actualizar UI (Optimistic Update)
      setResponseBody('');
      setChatMessages(prev => [...prev, {
        id: 'temp-' + Date.now(),
        conversation_id: chat.conversationId,
        body: responseBody,
        direction: 'outbound',
        created_at: new Date().toISOString(),
        status: 'sent'
      }]);

      console.log('Mensaje enviado exitosamente');

    } catch (error) {
      console.error('Error enviando mensaje:', error);
      alert('Error enviando mensaje: ' + error.message);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className={`flex-shrink-0 p-3 lg:p-5 pt-2 border-t z-20 ${isDarkMode ? 'border-slate-800 bg-slate-900' : 'border-gray-100 bg-white'}`}>
      <div className="flex items-center justify-between mb-2 lg:mb-3">
        <p className={`text-[10px] uppercase font-bold flex items-center gap-2 ${theme.textMuted}`}>
          <MessageCircle size={12} /> Borrador de Respuesta
        </p>
        {suggestedReply.includes('Cita') && (
          <span className="text-[9px] text-green-600 font-bold flex items-center gap-1 bg-green-100 px-2 py-0.5 rounded-full">
            <Calendar size={10} /> AGENDADO
          </span>
        )}
      </div>

      <div className={`rounded-xl border shadow-inner overflow-hidden flex flex-col ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-gray-50 border-gray-200'}`}>
        <textarea
          className={`w-full p-3 lg:p-4 bg-transparent border-none outline-none text-sm resize-none font-medium leading-relaxed overflow-y-auto custom-scrollbar h-20 lg:h-40 ${theme.text}`}
          value={responseBody}
          onChange={(e) => setResponseBody(e.target.value)}
          placeholder="Escribe tu respuesta aquí..."
          disabled={isSending}
        />
        <div className={`p-2 border-t ${isDarkMode ? 'border-slate-800' : 'border-gray-200'} bg-opacity-50 flex justify-end`}>
          <button
            onClick={handleSend}
            disabled={isSending || !responseBody.trim()}
            className={`py-2 px-4 lg:px-6 rounded-lg font-bold text-xs shadow-lg transition-transform active:scale-95 flex items-center gap-2 text-white ${isSending ? 'opacity-50 cursor-not-allowed' : ''} ${category === 'inquiry'
              ? 'bg-gradient-to-r from-blue-600 to-blue-500 shadow-blue-500/20'
              : 'bg-gradient-to-r from-emerald-600 to-emerald-500 shadow-emerald-500/20'
              }`}>
            {isSending ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
            {isSending ? 'Enviando...' : 'Enviar'}
          </button>
        </div>
      </div>
    </div>
  );
};

const FilterIconButton = ({ active, onClick, icon, title, color, isDark }) => (
  <button onClick={onClick} title={title} className={`flex-1 py-2 rounded-lg transition-all flex justify-center items-center ${active ? `${isDark ? 'bg-slate-800 shadow-sm' : 'bg-white shadow-md ring-1 ring-black/5'} ${color || 'text-slate-200'}` : `text-slate-500 hover:bg-opacity-50 hover:text-slate-400`}`}>{icon}</button>
);

export default App;