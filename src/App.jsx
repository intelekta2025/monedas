import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from './context/AuthContext';
import SettingsView from './components/SettingsView';
import DashboardHome from './components/DashboardHome';
import { getWhatsappPhones } from './services/whatsappService';
import { getConversations, getClosedConversations, getMessages, getMessagesByClient, subscribeToConversations, subscribeToAllMessagesByPhone, subscribeToAllMediaUpdates, closeConversation, reopenConversation, markAsRead } from './services/messagesService';
import { supabase } from './services/supabase';
import ClientEditModal from './components/ClientEditModal';

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

const LoginScreen = ({ isDarkMode, toggleTheme }) => {
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
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans transition-colors duration-300 ${isDarkMode ? 'bg-slate-950' : 'bg-gray-100'}`}>
      {/* Fondo decorativo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className={`w-full max-w-md backdrop-blur-xl border p-8 rounded-3xl shadow-2xl relative z-10 transition-colors duration-300 ${isDarkMode
        ? 'bg-slate-900/80 border-slate-800'
        : 'bg-white/80 border-gray-200/50 shadow-gold/5'
        }`}>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`absolute top-4 right-4 p-2 rounded-full transition-all ${isDarkMode
            ? 'hover:bg-slate-800 text-slate-400 hover:text-gold-light'
            : 'hover:bg-gray-100 text-gray-400 hover:text-gold-dark'
            }`}
          title={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="flex flex-col items-center mb-8">
          <div className="bg-gradient-to-br from-gold-light to-gold-dark p-3 rounded-2xl shadow-lg shadow-gold/20 mb-4">
            <Coins className="text-white" size={32} />
          </div>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className={`font-serif font-bold text-xl tracking-wide transition-colors ${isDarkMode ? 'text-white' : 'text-black'}`}>
              Bazar de
            </h1>
            <h1 className={`font-serif font-extrabold text-3xl tracking-wide transition-colors ${isDarkMode ? 'text-white' : 'text-black'}`}>
              Monedas Antiguas
            </h1>
            <p className="text-sm uppercase tracking-[0.2em] font-bold text-gold mt-1">Desde 1536</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Error Message */}
          {error && (
            <div className={`flex items-center gap-2 p-3 rounded-xl border text-sm ${isDarkMode
              ? 'bg-red-500/10 border-red-500/30 text-red-400'
              : 'bg-red-50 border-red-200 text-red-600'
              }`}>
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-1">
            <label className={`text-xs font-bold ml-1 uppercase transition-colors ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Email</label>
            <div className="relative group">
              <User className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${isDarkMode ? 'text-slate-500' : 'text-gray-400'} group-focus-within:text-gold`} size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full border rounded-xl py-3 pl-10 pr-4 outline-none transition-all placeholder:text-slate-600 focus:ring-1 focus:ring-gold/50 ${isDarkMode
                  ? 'bg-slate-950 border-slate-800 text-slate-200 focus:border-gold/50'
                  : 'bg-gray-50 border-gray-200 text-gray-800 focus:border-gold'
                  }`}
                placeholder="tu@email.com"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className={`text-xs font-bold ml-1 uppercase transition-colors ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Contraseña</label>
            <div className="relative group">
              <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${isDarkMode ? 'text-slate-500' : 'text-gray-400'} group-focus-within:text-gold`} size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full border rounded-xl py-3 pl-10 pr-4 outline-none transition-all placeholder:text-slate-600 focus:ring-1 focus:ring-gold/50 ${isDarkMode
                  ? 'bg-slate-950 border-slate-800 text-slate-200 focus:border-gold/50'
                  : 'bg-gray-50 border-gray-200 text-gray-800 focus:border-gold'
                  }`}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div className={`flex items-center justify-between text-xs pt-2 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
            <label className={`flex items-center gap-2 cursor-pointer ${isDarkMode ? 'hover:text-slate-300' : 'hover:text-gray-700'}`}>
              <input type="checkbox" className={`rounded text-gold focus:ring-gold/20 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-300'}`} />
              Recordarme
            </label>
            <span className={`opacity-50 cursor-not-allowed flex items-center gap-1 ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`} title="Funcionalidad en desarrollo">
              ¿Olvidaste tu contraseña? <span className="text-[10px] bg-slate-800 px-1 rounded border border-slate-700">Dev</span>
            </span>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-gold to-gold-dark hover:from-gold-light hover:to-gold text-white font-bold py-3.5 rounded-xl shadow-lg shadow-gold/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
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

        <div className={`mt-8 pt-6 border-t text-center ${isDarkMode ? 'border-slate-800' : 'border-gray-200'}`}>
          <p className={`text-[10px] uppercase font-medium ${isDarkMode ? 'text-slate-400' : 'text-gray-400'}`}>Powered by intelekta.ai</p>
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
  const [activeTab, setActiveTab] = useState('todos');
  const [dateFilter, setDateFilter] = useState('any');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Recuperar preferencia de tema del usuario
    const saved = localStorage.getItem('themePreference');
    if (saved) return saved === 'dark';
    return true; // Default Dark
  });

  // Persistir preferencia de tema
  useEffect(() => {
    localStorage.setItem('themePreference', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);
  const [showMobileInfo, setShowMobileInfo] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const [simulatedDevice, setSimulatedDevice] = useState('desktop');
  const [showDeviceBar, setShowDeviceBar] = useState(false); // Barra de simulación desactivada
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
  const messagesCache = useRef(new Map()); // Caché local para evitar recargas constantes
  const [showClosedConversations, setShowClosedConversations] = useState(false);
  const [conversationAnalyses, setConversationAnalyses] = useState([]); // Análisis de IA de la conversación
  const [currentAnalysisIndex, setCurrentAnalysisIndex] = useState(0); // Índice para carrusel
  const [imageModalOpen, setImageModalOpen] = useState(false); // Estado para modal de zoom de imagen
  const [imageModalUrl, setImageModalUrl] = useState(null); // URL de la imagen en el modal

  // Estado para edición de cliente
  const [clientModalOpen, setClientModalOpen] = useState(false);
  const [clientMenuOpen, setClientMenuOpen] = useState(false); // Menú de 3 puntos

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

  // --- Helper: Sincronizar clasificación con IA (Automático) ---
  const syncClassification = async (conversationId) => {
    if (!conversationId) return;
    try {
      // 1. Obtener mensajes con media del chat
      const { data: messages } = await supabase
        .from('whatsapp_messages')
        .select('id, media:whatsapp_message_media(ai_analysis)')
        .eq('conversation_id', conversationId)
        .not('whatsapp_message_media', 'is', null);

      if (!messages || messages.length === 0) {
        console.log('RT [AUTO-SYNC]: No hay mensajes con media para:', conversationId);
        return;
      }

      // 2. Buscar clasificaciones de IA
      let aiClass = null;
      for (const m of messages) {
        if (!m.media) continue;
        const mediaList = Array.isArray(m.media) ? m.media : [m.media];
        for (const mediaItem of mediaList) {
          if (!mediaItem.ai_analysis) continue;
          try {
            const parsed = typeof mediaItem.ai_analysis === 'string'
              ? JSON.parse(mediaItem.ai_analysis)
              : mediaItem.ai_analysis;

            if (parsed.business_classification === 'OPORTUNIDAD') {
              aiClass = 'opportunity';
              break;
            } else if (parsed.business_classification === 'BASURA' && !aiClass) {
              aiClass = 'trash';
            }
          } catch (e) { }
        }
        if (aiClass === 'opportunity') break;
      }

      if (!aiClass) {
        console.log('RT [AUTO-SYNC]: No se detectó OPORTUNIDAD ni BASURA en:', conversationId);
        return;
      }

      // 3. Verificar si cambio es necesario y actualizar
      setConversations(prev => {
        const conv = prev.find(c => c.id === conversationId);
        // Unificar comparaciones (algunas vienen null, otras 'inquiry')
        const currentClass = conv?.classification || 'inquiry';

        if (conv && currentClass !== aiClass) {
          console.log(`RT [AUTO-SYNC]: RELACIONANDO -> ${aiClass.toUpperCase()} para:`, conversationId);

          // Actualización en DB (en segundo plano)
          supabase
            .from('whatsapp_conversations')
            .update({ classification: aiClass })
            .eq('id', conversationId)
            .then(({ error }) => {
              if (error) console.error('RT [AUTO-SYNC]: Error en DB:', error);
              else console.log('RT [AUTO-SYNC]: Persistido con éxito en DB');
            });

          return prev.map(c => c.id === conversationId ? { ...c, classification: aiClass } : c);
        }
        return prev;
      });
    } catch (err) {
      console.error('RT [AUTO-SYNC]: Error crítico:', err);
    }
  };

  // Cargar teléfonos WhatsApp al autenticarse
  useEffect(() => {
    const loadPhones = async () => {
      if (!isAuthenticated) {
        console.log('⏭️ [PHONES] Saltando carga (no autenticado)');
        return;
      }

      console.log('📞 [PHONES] === INICIANDO CARGA DE TELÉFONOS ===');
      console.log('📞 [PHONES] Pestaña visible:', document.visibilityState === 'visible');
      console.log('📞 [PHONES] Timestamp:', new Date().toISOString());
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

        console.log('✅ [PHONES] Teléfonos cargados exitosamente');
        console.log('App: Teléfonos cargados:', phones);
        setWhatsappPhones(phones || []);
        setConnectionError(null);
        // Seleccionar el default o el primero
        const defaultPhone = phones?.find(p => p.is_default) || phones?.[0];
        console.log('App: Teléfono seleccionado:', defaultPhone);
        if (defaultPhone) setSelectedPhone(defaultPhone);
      } catch (err) {
        console.error('❌ [PHONES] Error cargando teléfonos:', err);
        console.error('❌ [PHONES] Tipo de error:', err.message);
        console.error('❌ [PHONES] Stack:', err.stack);
        setConnectionError('No se pudo conectar a Supabase. Verifica tu conexión.');
      } finally {
        setPhonesLoading(false);
      }
    };

    console.log('🔄 [PHONES] useEffect ejecutándose, isAuthenticated:', isAuthenticated);
    loadPhones();
  }, [isAuthenticated]);

  // Cargar conversaciones cuando cambia el teléfono seleccionado o el filtro
  useEffect(() => {
    const effectController = new AbortController(); // Controller para cancelar al cambiar deps

    const loadConversations = async (isPolling = false) => {
      if (!selectedPhone?.id) {
        console.log('⏭️ [CONVERSATIONS] No hay teléfono seleccionado, limpiando conversaciones');
        setConversations([]);
        return;
      }
      // Solo mostrar loading en carga inicial
      if (!isPolling) {
        console.log(`📋 [CONVERSATIONS] Cargando conversaciones ${showClosedConversations ? 'cerradas' : 'abiertas'} para teléfono:`, selectedPhone.id);
        console.log('📋 [CONVERSATIONS] Pestaña visible:', document.visibilityState === 'visible');
        setConversationsLoading(true);
      }
      try {
        // Simple y directo. Sin timeouts manuales.
        // Verificar si el efecto fue cancelado antes de iniciar
        if (effectController.signal.aborted) return;

        const convs = showClosedConversations
          ? await getClosedConversations(selectedPhone.id, 50)
          : await getConversations(selectedPhone.id);

        // Verificar cancelación antes de actualizar estado
        if (effectController.signal.aborted) return;

        if (!isPolling) {
          console.log('App: Conversaciones cargadas:', convs);
        }
        setConversations(convs || []);
        // Solo limpiar selección en carga inicial SIN ERROR
        if (!isPolling && convs && convs.length > 0) {
          setConnectionError(null); // Limpiar error si cargó exitosamente
        }
        // NO limpiamos selectedChat ni setChatMessages en caso de error
        // Mantenemos datos cacheados visibles
      } catch (err) {
        if (err.message === 'EffectCancelled' || err.name === 'AbortError') {
          // Ignorar errores de cancelación
          return;
        }
        console.error('Error cargando conversaciones:', err);
        if (!isPolling) {
          // Solo mostrar error si no es un aborto intencional
          if (err.name !== 'AbortError') {
            // Estilo WhatsApp: mensaje amigable, no alarmante
            setConnectionError('Esperando red...');
            // NO limpiamos las conversaciones, mostramos datos cacheados
          }
        }
      } finally {
        if (!effectController.signal.aborted) {
          if (!isPolling) {
            setConversationsLoading(false);
          }
          // Resetear flag de polling para permitir la siguiente ejecución
          if (isPolling) {
            isPollingConversationsRef.current = false;
          }
        }
      }
    };

    // Carga inicial
    loadConversations(false);

    // POLLING DESACTIVADO - Confiamos en Real-time de Supabase
    // Descomentar si se necesita como respaldo
    // Suscribirse a cambios en tiempo real (solo para conversaciones abiertas)
    let unsubscribe;
    if (selectedPhone?.id && !showClosedConversations) {
      unsubscribe = subscribeToConversations(selectedPhone.id, async (payload) => {
        if (payload.eventType === 'INSERT') {
          console.log('RT [INSERT]: Nueva conversación detectada', payload.new.id);
          // El payload de realtime NO trae las relaciones (client), así que hay que obtenerlas
          try {
            const { data: fullConv, error } = await supabase
              .from('whatsapp_conversations')
              .select('*, client:clients(*)')
              .eq('id', payload.new.id)
              .single();

            if (fullConv && !error) {
              console.log('RT [INSERT]: Datos completos obtenidos para:', fullConv.client?.full_name || 'Sin nombre');
              setConversations(prev => {
                // Evitar duplicados si ya se cargó por polling o evento previo
                if (prev.find(c => c.id === fullConv.id)) return prev;
                return [fullConv, ...prev];
              });
              // Una conversación nueva podría tener ya un mensaje analizado si viene de un flujo n8n rápido
              syncClassification(fullConv.id);
            } else {
              console.warn('RT [INSERT]: No se pudo obtener datos completos, usando payload básico');
              setConversations(prev => [payload.new, ...prev]);
            }
          } catch (e) {
            console.error('RT [INSERT]: Error fatal:', e);
            setConversations(prev => [payload.new, ...prev]);
          }
        } else if (payload.eventType === 'UPDATE') {
          console.log('RT [UPDATE]: Conversación actualizada', payload.new.id, 'Last message:', payload.new.last_message);

          let needsFetch = false;

          setConversations(prev => {
            const existing = prev.find(c => c.id === payload.new.id);

            // Si el cliente falta o es "Sin nombre", marcamos para fetch
            if (!existing?.client || existing.client.full_name === null) {
              needsFetch = true;
            }

            // Si ya tenemos cliente y el update no trae cambios críticos de relación, solo mergeamos
            if (existing?.client) {
              return prev.map(c =>
                c.id === payload.new.id ? { ...c, ...payload.new, client: c.client } : c
              );
            }

            // Si no tenemos cliente o es una conversación nueva detectada via UPDATE,
            // marcamos para fetch o mergeamos payload.new
            return prev.map(c =>
              c.id === payload.new.id ? { ...c, ...payload.new } : c
            );
          });

          // Fetch asíncrono si es necesario (fuera del state update para evitar efectos secundarios)
          if (needsFetch) {
            console.log('RT [UPDATE]: Intentando recuperar datos del cliente ausentes...');
            try {
              const { data: fullConv } = await supabase
                .from('whatsapp_conversations')
                .select('*, client:clients(*)')
                .eq('id', payload.new.id)
                .single();

              if (fullConv?.client) {
                console.log('RT [UPDATE]: Datos del cliente recuperados:', fullConv.client.full_name);
                setConversations(prev => prev.map(c =>
                  c.id === fullConv.id ? fullConv : c
                ));
              }
            } catch (err) {
              console.error('RT [UPDATE]: Error recuperando cliente:', err);
            }
          }

          // SIEMPRE intentar sincronizar clasificación en un update, por si la IA terminó
          syncClassification(payload.new.id);
        }
      });
    }

    return () => {
      effectController.abort(); // Cancelar peticiones en curso
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
        console.log("📱 App en primer plano. Verificando estado...");

        // 1. Reconectar Realtime si se desconectó
        const status = supabase.channel('ping').subscribe();
        if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
          // Solo si el socket murió, recargamos datos críticos
          if (selectedPhone?.id) getConversations(selectedPhone.id).then(setConversations);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [selectedPhone]);

  // --- ESC key handler para cerrar modal de imagen ---
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && imageModalOpen) {
        setImageModalOpen(false);
      }
    };

    if (imageModalOpen) {
      document.addEventListener('keydown', handleEscKey);
      return () => document.removeEventListener('keydown', handleEscKey);
    }
  }, [imageModalOpen]);

  // --- Real-time: Suscripción GLOBAL a mensajes (Por teléfono, no por chat) ---
  const [selectedChat, setSelectedChat] = useState(null);
  const selectedChatRef = useRef(null);

  // Mantener el Ref actualizado para el callback de suscripción global
  useEffect(() => {
    selectedChatRef.current = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    let unsubscribe = null;

    if (selectedPhone?.id) {
      console.log('--- Suscripción Global Iniciada para:', selectedPhone.name);
      unsubscribe = subscribeToAllMessagesByPhone(selectedPhone.id, async (newMessage) => {
        console.log('Mensaje Global recibido:', newMessage);

        // 1. Si el mensaje pertenece al chat que estamos viendo, lo añadimos a la vista
        if (newMessage.conversation_id === selectedChatRef.current?.conversationId) {
          setChatMessages(prev => {
            // Si ya existe el ID real, ignorar
            if (prev.find(m => m.id === newMessage.id)) return prev;

            // Si es un mensaje SALIENTE (nuestro), buscar si hay un temporal atrapado
            // (Mensaje optimista que agregamos al enviar)
            if (newMessage.direction === 'outbound') {
              const tempIndex = prev.findIndex(m => m.id.toString().startsWith('temp-') && m.body?.trim() === newMessage.body?.trim());

              if (tempIndex !== -1) {
                // Reemplazar el temporal con el real
                const newMessages = [...prev];
                newMessages[tempIndex] = newMessage;
                return newMessages;
              }
            }

            return [...prev, newMessage];
          });

          // Auto-scroll si es el chat activo
          setTimeout(() => {
            if (chatContainerRef.current) {
              chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            }
          }, 100);
        }

        // 2. SIEMPRE actualizar la lista lateral (Conversaciones)
        let convToUpdate = null;

        setConversations(prev => {
          const updated = prev.map(conv => {
            if (conv.id === newMessage.conversation_id) {
              const newConv = {
                ...conv,
                last_message: newMessage.body,
                last_message_at: newMessage.created_at,
                // Si el mensaje es entrante y NO estamos viendo ese chat, sumar 1 al contador
                unread_count: (newMessage.direction === 'inbound' && selectedChatRef.current?.conversationId !== conv.id)
                  ? (conv.unread_count || 0) + 1
                  : conv.unread_count
              };

              // Si le falta el cliente, lo guardamos para fetch
              if (!newConv.client || newConv.client.full_name === null) {
                convToUpdate = newConv.id;
              }

              return newConv;
            }
            return conv;
          });

          // Si el mensaje viene de una conversación que NO está en la lista (Conversación nueva REAL)
          // esto puede pasar si el subscription level 1 falló o es muy lento.
          if (!prev.find(c => c.id === newMessage.conversation_id)) {
            console.log('RT [GLOBAL]: Mensaje de conversación desconocida, solicitando fetch total...');
            convToUpdate = newMessage.conversation_id;
          }

          return updated;
        });

        // 3. Resolución de nombre si es necesario
        if (convToUpdate) {
          console.log('RT [GLOBAL]: Resolviendo datos de cliente para conversación:', convToUpdate);
          try {
            const { data: fullConv } = await supabase
              .from('whatsapp_conversations')
              .select('*, client:clients(*)')
              .eq('id', convToUpdate)
              .single();

            if (fullConv?.client) {
              console.log('RT [GLOBAL]: Datos recuperados con éxito:', fullConv.client.full_name);
              setConversations(prev => {
                const alreadyExists = prev.find(c => c.id === fullConv.id);
                if (alreadyExists) {
                  return prev.map(c => c.id === fullConv.id ? fullConv : c);
                }
                return [fullConv, ...prev];
              });
            }
            // Sincronizar clasificación si es un chat nuevo o recuperado
            syncClassification(convToUpdate);
          } catch (err) {
            console.error('RT [GLOBAL]: Error recuperando datos:', err);
          }
        } else {
          // Si no necesita fetch total, igual intentamos sincronizar clasificación 
          // porque pudo llegar un mensaje que la IA acaba de clasificar
          syncClassification(newMessage.conversation_id);
        }
      });
    }

    return () => {
      if (unsubscribe) {
        console.log('Cerrando suscripción Global (Solo al cambiar de teléfono o salir)');
        unsubscribe();
      }
    };
  }, [selectedPhone?.id]); // Solo reacciona si cambias el aparato físico

  // --- Monitor Global de Imágenes (IA Analysis) ---
  useEffect(() => {
    const unsubscribeMedia = subscribeToAllMediaUpdates(async (media) => {
      console.log('RT [MEDIA-IA]: Nueva actualización de análisis detectada');
      if (media.ai_analysis && media.message_id) {
        try {
          // Obtener la conversación asociada al mensaje de la imagen
          const { data: msg } = await supabase
            .from('whatsapp_messages')
            .select('conversation_id')
            .eq('id', media.message_id)
            .single();

          if (msg?.conversation_id) {
            console.log('RT [MEDIA-IA]: Sincronizando clasificación para conversación:', msg.conversation_id);
            syncClassification(msg.conversation_id);
          }
        } catch (err) {
          console.error('RT [MEDIA-IA]: Error procesando actualización:', err);
        }
      }
    });

    return () => unsubscribeMedia();
  }, []); // Es un listener global para la tabla de media

  useEffect(() => {
    if (chatContainerRef.current && selectedChat) {
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
  const isCompactView = isMobileView; // Tablet shows 3 columns layout now

  const handleChatSelect = async (chat) => {
    // Si ya estamos en este chat, no recargar (evita loop de desconexión/conexión)
    if (selectedChat?.conversationId === chat.conversationId) return;

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

      // OPTIMISTIC UI: Mostrar caché inmediatamente
      const cachedMessages = messagesCache.current.get(chat.conversationId);
      if (cachedMessages) {
        console.log('📦 [CACHE] Usando mensajes en memoria para:', chat.conversationId);
        setChatMessages(cachedMessages);
        // No ponemos loading(true) para que la UI no parpadee
      } else {
        setChatMessages([]);
        setMessagesLoading(true);
      }

      setLoadError(null); // Resetear error

      console.log('handleChatSelect: Cargando mensajes para conversación (Red):', chat.conversationId);
      try {
        // Simple y directo. Sin timeouts manuales.
        const msgs = await getMessages(chat.conversationId, 50);

        // Verificar si seguimos en el mismo chat antes de actualizar
        if (currentChatIdRef.current === chat.conversationId) {
          // Actualizar Caché
          messagesCache.current.set(chat.conversationId, msgs || []);

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
                      media_id: m.id,
                      user_feedback: m.ai_feedback // Incluir feedback existente
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

          // FALLBACK SYNC: Por si el tiempo real falló o fue muy rápido
          syncClassification(chat.conversationId);
        } else {
          console.log('handleChatSelect: Ignorando resultados de chat antiguo');
        }
      } catch (err) {
        // Si cambió el chat, no mostrar error de la carga anterior
        if (currentChatIdRef.current === chat.conversationId) {
          console.error('Error de red natural:', err);

          // NO hacer logout. Solo mostrar aviso discreto.
          let friendlyError = 'Error cargando mensajes';
          if (err.message?.includes('fetch') || err.message?.includes('network')) {
            friendlyError = 'Esperando red...';
          }

          setLoadError(friendlyError);
          // NO limpiamos mensajes cacheados
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
    accent: 'text-gold',
    chatBubbleUser: isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200 shadow-sm',
    chatBubbleBot: isDarkMode ? 'bg-gold-dark/20 border-gold/20' : 'bg-yellow-50 border-yellow-200',
  };

  const handleClientUpdated = (updatedClient) => {
    // Actualizar conversaciones localmente
    setConversations(prev => prev.map(c => {
      if (c.client?.id === updatedClient.id) {
        return {
          ...c,
          client: { ...c.client, ...updatedClient }
        };
      }
      return c;
    }));

    // Actualizar chat seleccionado si corresponde
    if (selectedChat?.clientId === updatedClient.id) {
      setSelectedChat(prev => ({
        ...prev,
        name: updatedClient.full_name || prev.name
      }));
    }
  };

  const handleFeedback = async (type) => {
    const currentAnalysis = conversationAnalyses[currentAnalysisIndex];
    if (!currentAnalysis?.media_id) return;

    // Optimistic update
    const newAnalyses = [...conversationAnalyses];
    newAnalyses[currentAnalysisIndex] = { ...currentAnalysis, user_feedback: type };
    setConversationAnalyses(newAnalyses);

    try {
      const { error } = await supabase
        .from('whatsapp_message_media')
        .update({ ai_feedback: type })
        .eq('id', currentAnalysis.media_id);

      if (error) throw error;
    } catch (err) {
      console.error('Error updating feedback:', err);
    }
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
    type: conv.classification === 'opportunity' ? 'Oportunidad' :
      conv.classification === 'trash' ? 'Basura' :
        'Consulta', // Default: 'inquiry' o null se tratan como Consulta
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
          <Loader2 size={48} className="animate-spin text-gold" />
          <p className="text-slate-400 text-sm">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginScreen isDarkMode={isDarkMode} toggleTheme={toggleTheme} />;
  }

  return (
    <div className="flex flex-col h-screen bg-neutral-900 font-sans overflow-hidden">

      {/* BARRA DE SIMULACIÓN (Solo visible en modo testing) */}
      {showDeviceBar && (
        <div className="flex items-center justify-center gap-4 bg-black/80 text-slate-400 py-2 border-b border-white/10 z-50 flex-shrink-0">
          <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Vista Previa:</span>
          <button onClick={() => setSimulatedDevice('mobile')} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${simulatedDevice === 'mobile' ? 'bg-gold text-white shadow-lg shadow-gold/20' : 'hover:bg-white/10'}`}><Smartphone size={14} /> Celular</button>
          <button onClick={() => setSimulatedDevice('tablet')} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${simulatedDevice === 'tablet' ? 'bg-gold text-white shadow-lg shadow-gold/20' : 'hover:bg-white/10'}`}><Tablet size={14} /> Tablet</button>
          <button onClick={() => setSimulatedDevice('desktop')} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${simulatedDevice === 'desktop' ? 'bg-gold text-white shadow-lg shadow-gold/20' : 'hover:bg-white/10'}`}><Monitor size={14} /> PC</button>
        </div>
      )}

      <div className="flex-1 flex overflow-hidden relative">
        <div className={`w-full h-full overflow-hidden flex flex-col relative bg-black`}>

          <div className={`flex flex-col h-full ${theme.bg} ${theme.text} w-full transition-colors duration-300`}>

            <header className={`h-14 lg:h-16 ${theme.headerBg} border-b ${theme.cardBorder} flex items-center justify-between px-4 lg:px-6 flex-shrink-0 z-20 shadow-sm transition-colors duration-300`}>
              <div className="flex items-center gap-2 lg:gap-3">
                <div className="bg-gradient-to-br from-gold-light to-gold-dark p-1.5 rounded-xl shadow-lg shadow-gold/20">
                  <Coins className="text-white" size={simulatedDevice === 'mobile' ? 18 : 20} />
                </div>
                <div className="flex flex-col">
                  <span className={`font-serif font-bold ${simulatedDevice === 'mobile' ? 'text-xs leading-tight' : 'text-lg'} tracking-wide ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    BAZAR DE MONEDAS ANTIGUAS
                  </span>
                  {!isMobileView && (
                    <span className={`text-[10px] uppercase tracking-widest font-bold ${theme.accent}`}>
                      Desde 1536
                    </span>
                  )}
                </div>
              </div>

              {!isMobileView && (
                <div className={`flex items-center ${theme.inputBg} rounded-xl px-4 py-2 w-1/3 border border-transparent focus-within:border-gold/50 transition-all group`}>
                  <Search size={18} className={`${theme.textMuted} group-focus-within:text-gold transition-colors`} />
                  <input type="text" placeholder="Buscar..." className={`bg-transparent border-none outline-none ml-3 w-full text-sm ${theme.text} placeholder-opacity-50`} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                  {searchQuery && <button onClick={() => setSearchQuery('')} className="text-gray-500 hover:text-white"><X size={14} /></button>}
                </div>
              )}

              {/* Selector de Teléfono WhatsApp */}
              {!isMobileView && whatsappPhones.length > 0 && (
                <div className={`flex items-center gap-2 ${theme.inputBg} rounded-xl px-3 py-2 border ${theme.cardBorder}`}>
                  <Phone size={16} className="text-gold" />
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
                <button onClick={toggleTheme} className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-800 text-gold-light' : 'hover:bg-gray-100 text-slate-600'}`}>{isDarkMode ? <Sun size={18} /> : <Moon size={18} />}</button>
                {!isMobileView && (
                  <>
                    <button
                      onClick={() => setCurrentView(currentView === 'dashboard' ? 'main' : 'dashboard')}
                      className={`flex items-center gap-2 text-xs font-bold px-3 py-2 rounded-lg transition-colors ${isDarkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-gray-100'}`}
                    >
                      {currentView === 'dashboard' ? (
                        <>
                          <ArrowLeft size={16} /> <span className="hidden xl:inline">Bandeja</span>
                        </>
                      ) : (
                        <>
                          <LayoutGrid size={16} /> <span className="hidden xl:inline">Dashboard</span>
                        </>
                      )}
                    </button>
                    <button onClick={() => setCurrentView('settings')} className={`flex items-center gap-2 text-xs font-bold px-3 py-2 rounded-lg transition-colors ${isDarkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-gray-100'}`}><Settings size={16} /></button>
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
                {isMobileView && (
                  <>
                    <button
                      onClick={() => setCurrentView(currentView === 'dashboard' ? 'main' : 'dashboard')}
                      className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-gray-100'}`}
                      title={currentView === 'dashboard' ? 'Bandeja' : 'Dashboard'}
                    >
                      {currentView === 'dashboard' ? <ArrowLeft size={20} /> : <LayoutGrid size={20} />}
                    </button>
                    <button
                      onClick={() => setCurrentView('settings')}
                      className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-gray-100'}`}
                      title="Configuración"
                    >
                      <Settings size={20} />
                    </button>
                    <button
                      onClick={signOut}
                      className={`p-2 rounded-lg transition-colors text-red-400 ${isDarkMode ? 'hover:bg-red-500/10' : 'hover:bg-red-50'}`}
                      title="Cerrar sesión"
                    >
                      <LogOut size={20} />
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
            ) : currentView === 'dashboard' ? (
              <DashboardHome
                navigateToWorkspace={() => setCurrentView('main')}
                navigateToClients={() => setCurrentView('clients')}
                isDarkMode={isDarkMode}
                stats={{
                  uniqueClients: conversations.length,
                  conversations: conversations.length,
                  opportunities: conversations.filter(c => c.classification === 'opportunity').length,
                  trash: conversations.filter(c => c.classification === 'trash').length,
                  unattended: conversations.filter(c => c.unread_count > 0).length,
                  active: conversations.filter(c => c.status === 'open').length,
                  closed: 0
                }}
              />
            ) : (
              <main className={`flex-1 flex overflow-hidden ${isMobileView ? 'p-0' : 'p-4 lg:p-6 lg:gap-6'} relative`}>

                {/* COLUMNA 1: LISTA (Ancho fijo en tablet/desktop) */}
                <div className={`
                ${isCompactView ? (!selectedChat ? 'flex' : 'hidden') : 'flex'} 
                ${isMobileView ? 'w-full' : 'w-[320px]'} flex-col flex-shrink-0
                ${theme.cardBg} ${!isMobileView && `rounded-2xl border ${theme.cardBorder} shadow-xl`} overflow-hidden relative transition-colors duration-300
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
                      <button onClick={cycleDateFilter} className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-bold uppercase transition-all ${dateFilter !== 'any' ? 'bg-gold text-white shadow-lg shadow-gold/20' : `${theme.textMuted} hover:bg-slate-800/50`}`}><Calendar size={12} /><span className={`${isMobileView ? 'hidden' : 'hidden sm:inline'}`}>{dateFilter === 'today' ? 'Hoy' : dateFilter === 'week' ? '7 Días' : 'Fecha'}</span></button>
                      <div className={`text-[10px] font-bold px-2 py-1 rounded-full ${isDarkMode ? 'bg-slate-800 text-slate-400' : 'bg-gray-100 text-gray-500'}`}>{filteredChats.length}</div>
                    </div>
                  </div>
                  <div className="p-3">
                    <div className={`flex justify-between items-center p-1.5 rounded-xl ${isDarkMode ? 'bg-slate-950' : 'bg-gray-100'}`}>
                      <FilterIconButton active={activeTab === 'todos'} onClick={() => setActiveTab('todos')} icon={<Inbox size={16} />} title="Todos" isDark={isDarkMode} />
                      <div className="w-px h-4 bg-gray-500/20 mx-1"></div>
                      <FilterIconButton active={activeTab === 'oportunidades'} onClick={() => setActiveTab('oportunidades')} icon={<Star size={16} />} title="Oportunidades" color="text-gold" isDark={isDarkMode} />
                      <FilterIconButton active={activeTab === 'consultas'} onClick={() => setActiveTab('consultas')} icon={<ShoppingBag size={16} />} title="Intención" color="text-blue-500" isDark={isDarkMode} />
                      <FilterIconButton active={activeTab === 'basura'} onClick={() => setActiveTab('basura')} icon={<Trash2 size={16} />} title="Papelera" color="text-gray-500" isDark={isDarkMode} />
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-2 custom-scrollbar">
                    {/* Banner de conexión estilo WhatsApp */}
                    {connectionError && (
                      <div className={`p-2 rounded-lg border ${isDarkMode ? 'bg-yellow-500/10 border-yellow-500/30' : 'bg-yellow-50 border-yellow-200'} text-center mb-2`}>
                        <div className="flex items-center justify-center gap-2">
                          <Loader2 size={14} className="animate-spin text-yellow-500" />
                          <p className="text-yellow-600 dark:text-yellow-500 text-xs font-medium">{connectionError}</p>
                        </div>
                      </div>
                    )}

                    {/* Indicador de carga */}
                    {phonesLoading && !connectionError && (
                      <div className="flex flex-col items-center justify-center py-8">
                        <Loader2 size={32} className="animate-spin text-gold mb-2" />
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
                      <div key={chat.id} onClick={() => handleChatSelect(chat)} className={`p-3 rounded-xl cursor-pointer transition-all border group relative ${selectedChat?.id === chat.id && !isMobileView ? `${isDarkMode ? 'bg-slate-800 border-gold/40' : 'bg-gold-light/20 border-gold-light'} shadow-md` : `${isDarkMode ? 'hover:bg-slate-800/50' : 'hover:bg-gray-50'} border-transparent`}`}>
                        <div className="flex gap-3">
                          <div className="relative">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm border shadow-sm ${isDarkMode ? 'bg-slate-700 border-slate-600 text-slate-300' : 'bg-white border-gray-100 text-gray-600'}`}>{chat.avatar}</div>
                            <div className={`absolute -top-1 -right-1 p-1 rounded-full border ${isDarkMode ? 'border-slate-900' : 'border-white'} shadow-sm ${chat.type === 'Oportunidad' ? 'bg-gold text-white' : chat.type === 'Consulta' ? 'bg-blue-500 text-white' : 'bg-gray-400 text-white'}`}>
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
                ${isMobileView ? 'flex-1' : 'flex-1'} flex-col flex-shrink-0
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
                              className={`p-2 rounded-lg relative ${conversationAnalyses.length > 0 ? 'text-gold bg-gold/20' : 'text-gold'} hover:bg-gold/10`}
                            >
                              <ShieldCheck size={20} />
                              {conversationAnalyses.length > 0 && (
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold text-white text-[10px] font-bold rounded-full flex items-center justify-center">
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
                              className={`p-2 rounded-lg transition-colors text-gold-light hover:bg-gold/10`}
                              title="Reabrir conversación"
                            >
                              <Archive size={18} />
                            </button>
                          )}
                          <div className="relative">
                            <button
                              onClick={() => setClientMenuOpen(!clientMenuOpen)}
                              className={`p-2 rounded-lg hover:bg-opacity-10 transition-colors ${theme.textMuted} hover:bg-slate-500`}
                            >
                              <MoreVertical size={18} />
                            </button>

                            {/* Menú contextual */}
                            {clientMenuOpen && (
                              <div className={`absolute right-0 top-full mt-2 w-48 rounded-xl shadow-xl border overflow-hidden z-50 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'}`}>
                                <button
                                  onClick={() => {
                                    setClientMenuOpen(false);
                                    setClientModalOpen(true);
                                  }}
                                  className={`w-full text-left px-4 py-3 text-sm flex items-center gap-2 hover:bg-gold/10 hover:text-gold transition-colors ${theme.text}`}
                                >
                                  <User size={16} />
                                  Editar Cliente
                                </button>
                              </div>
                            )}

                            {/* Overlay transparente para cerrar menú al hacer click fuera */}
                            {clientMenuOpen && (
                              <div
                                className="fixed inset-0 z-40"
                                onClick={() => setClientMenuOpen(false)}
                              ></div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div ref={chatContainerRef} className={`flex-1 ${isDarkMode ? 'bg-slate-950/50' : 'bg-gray-50/50'} p-4 lg:p-6 overflow-y-auto custom-scrollbar flex flex-col gap-4`}>
                        {messagesLoading ? (
                          <div className="flex flex-col items-center justify-center h-full opacity-50">
                            <Loader2 size={32} className="animate-spin text-gold mb-2" />
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
                                className="px-4 py-2 bg-gold-dark text-white rounded-lg text-sm font-[600] shadow hover:bg-gold transition-colors flex items-center gap-2"
                              >
                                <RefreshCw size={14} /> Reintentar
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
                            // Log removido a petición del usuario para mejor legibilidad
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
                ${isCompactView ? 'w-full h-full' : isTabletView ? 'w-80 flex-shrink-0' : 'flex-1'} flex-col 
                ${theme.cardBg} ${!isMobileView && `rounded-2xl border ${theme.cardBorder} shadow-xl`} transition-colors duration-300 overflow-hidden
              `}>
                  {isCompactView && <div className={`p-4 border-b ${theme.cardBorder} flex items-center justify-between`}><div className="flex items-center gap-2"><ShieldCheck size={18} className="text-gold" /><h2 className="font-bold text-sm text-gold">Análisis IA</h2></div><button onClick={() => setShowMobileInfo(false)}><X size={24} className={theme.textMuted} /></button></div>}
                  {!isCompactView && <div className={`p-4 border-b ${theme.cardBorder} ${isDarkMode ? 'bg-gold-dark/10' : 'bg-gold-light/20'} flex items-center gap-2 flex-shrink-0`}><ShieldCheck size={18} className="text-gold" /><h2 className="font-bold text-sm text-gold-dark uppercase tracking-wider">{selectedChat?.aiAnalysis?.category === 'inquiry' ? 'Intención' : 'Análisis'}</h2></div>}

                  {selectedChat ? (
                    <>
                      <div className="flex-1 overflow-y-auto custom-scrollbar p-5 pb-0">
                        {/* Si hay análisis de IA en la conversación */}
                        {conversationAnalyses.length > 0 ? (
                          <div className={`rounded-xl p-5 mb-5 relative overflow-hidden border shadow-sm ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-gray-100'}`}>
                            {/* Decorative background */}
                            <div className={`absolute top-0 right-0 w-24 h-24 transform translate-x-8 -translate-y-8 rotate-45 opacity-10 ${conversationAnalyses[currentAnalysisIndex]?.business_classification === 'OPORTUNIDAD' ? 'bg-gold' : 'bg-gray-500'}`}></div>

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
                                        <button
                                          onClick={() => {
                                            setImageModalUrl(analysis.media_url);
                                            setImageModalOpen(true);
                                          }}
                                          className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-colors border border-white/20"
                                        >
                                          <Eye size={16} />
                                        </button>
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
                                        <p className={`text-sm font-bold ${analysis.confidence >= 80 ? 'text-gold' : analysis.confidence >= 50 ? 'text-yellow-500' : 'text-red-500'}`}>{analysis.confidence}%</p>
                                      </div>
                                    )}
                                  </div>

                                  {/* Classification badge */}
                                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold ${analysis.business_classification === 'OPORTUNIDAD' ? 'bg-gold/20 text-gold-light border border-gold/30' : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'}`}>
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
                              <button onClick={() => handleFeedback('positive')} className={`p-1.5 rounded transition-colors ${conversationAnalyses[currentAnalysisIndex]?.user_feedback === 'positive' ? 'text-green-500 bg-green-500/10 scale-110' : 'text-gray-400 hover:text-green-500'}`}><ThumbsUp size={14} /></button>
                              <button onClick={() => handleFeedback('negative')} className={`p-1.5 rounded transition-colors ${conversationAnalyses[currentAnalysisIndex]?.user_feedback === 'negative' ? 'text-red-500 bg-red-500/10 scale-110' : 'text-gray-400 hover:text-red-500'}`}><ThumbsDown size={14} /></button>
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

      {/* MODAL DE ZOOM DE IMAGEN */}
      {imageModalOpen && imageModalUrl && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fadeIn"
          onClick={() => setImageModalOpen(false)}
        >
          <div className="relative max-w-[95vw] max-h-[95vh] p-4">
            {/* Botón de cerrar */}
            <button
              onClick={() => setImageModalOpen(false)}
              className="absolute -top-12 right-0 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all border border-white/20 shadow-lg"
              aria-label="Cerrar"
            >
              <X size={24} />
            </button>

            {/* Imagen */}
            <img
              src={imageModalUrl}
              alt="Moneda en tamaño completo"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
      <ClientEditModal
        isOpen={clientModalOpen}
        onClose={() => setClientModalOpen(false)}
        clientId={selectedChat?.clientId}
        currentName={selectedChat?.name}
        onClientUpdated={handleClientUpdated}
        isDarkMode={isDarkMode}
      />
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
              : 'bg-gradient-to-r from-gold-dark to-gold shadow-gold/20'
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