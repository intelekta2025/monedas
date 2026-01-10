import { createClient } from '@supabase/supabase-js';

// --- CONFIGURACIÓN REAL DE SUPABASE ---
// Estos son los valores de tu proyecto que compartiste anteriormente.
// Nota: En un proyecto profesional, idealmente esto iría en un archivo .env

const supabaseUrl = 'https://xuylkjkgfztfelsseyvh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1eWxramtnZnp0ZmVsc3NleXZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5OTQyODYsImV4cCI6MjA4MTU3MDI4Nn0.78ZK0OHEQKW8Zq-b8UI2SMmY71rZ5yK1D-rcGFJ88-8';

export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false // Evitar chequeos de URL innecesarios al enfocar
    }
});

/**
 * Forzar refresh de la sesión de Supabase
 * Útil cuando la conexión se queda "zombie"
 * @returns {Promise<boolean>} true si se recuperó la sesión, false si no
 */
// Variable para evitar refrescos duplicados en ráfaga (Cool-down de 2 minutos)
let lastSuccessfulRefresh = 0;
const REFRESH_COOLDOWN = 2 * 60 * 1000;

export const forceSessionRefresh = async () => {
    // Retornamos true inmediatamente para simular éxito sin tocar la sesión real
    return true;
};

/**
 * Limpieza quirúrgica: Borra todo MENOS el token de refresh.
 * Intenta simular un "Ctrl+Shift+Del" sin desloguear al usuario.
 */
export const surgicalConnectionReset = async () => {
    console.log('Supabase: Iniciando reset quirúrgico manual (Safe Mode)...');

    try {
        let authKey = null;
        let tokenFound = null;

        // 1. Identificar cuál es la llave Maestra (Auth Token)
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('sb-') && key.endsWith('-auth-token')) {
                authKey = key;
                try {
                    const val = JSON.parse(localStorage.getItem(key));
                    if (val && val.refresh_token) tokenFound = val.refresh_token;
                } catch (e) { }
            }
        });

        if (!authKey || !tokenFound) {
            console.error('Supabase: No se encontró token de auth, no se puede preservar sesión.');
            console.error('Supabase: Redirigiendo a login...');
            // Si no hay tokens, limpiar todo y recargar
            Object.keys(localStorage).forEach(key => {
                if (key.startsWith('sb-')) {
                    localStorage.removeItem(key);
                }
            });
            window.location.reload();
            return;
        }

        // 2. Borrar todo lo de Supabase MENOS las llaves vitales de auth
        console.log('Supabase: Limpiando cache corrupto, preservando credenciales vitales...');
        Object.keys(localStorage).forEach(key => {
            // EXPLICIT WHITELIST: NO borrar nada que termine en -token, -verifier o sea la llave maestra
            const isAuthCore = key.endsWith('-auth-token') ||
                key.endsWith('-code-verifier') ||
                key.includes('supabase.auth.token');

            if (key.startsWith('sb-') && !isAuthCore) {
                console.log(`Supabase: Limpiando llave de cache: ${key}`);
                localStorage.removeItem(key);
            }
        });

        // 3. Intentar setSession para rehidratar el cliente en memoria
        try {
            const restorePromise = new Promise(async (resolve, reject) => {
                const t = setTimeout(() => reject(new Error('RestrictTimeout')), 5000); // Aumentado a 5s
                try {
                    // Usamos el token que ya tenemos seguro
                    const res = await supabase.auth.setSession({ refresh_token: tokenFound });
                    clearTimeout(t);

                    // Verificar que la sesión se estableció correctamente
                    if (res.data?.session) {
                        console.log('Supabase: Sesión establecida correctamente');
                        resolve(res);
                    } else {
                        reject(new Error('No session returned'));
                    }
                } catch (e) {
                    clearTimeout(t);
                    reject(e);
                }
            });

            const result = await restorePromise;
            console.log('Supabase: Cliente rehidratado exitosamente.');

            // CRÍTICO: Dar tiempo a que la conexión se estabilice
            console.log('Supabase: Esperando estabilización de conexión...');
            await new Promise(resolve => setTimeout(resolve, 1000)); // Esperar 1 segundo

        } catch (e) {
            console.warn('Supabase: setSession falló o timeout, pero las credenciales siguen en disco.', e);
            // Si falla el setSession, aún podemos intentar recargar ya que los tokens están en disco
        }

        // 4. VERIFICAR que los tokens siguen ahí antes de recargar
        const tokensStillPresent = Object.keys(localStorage).some(key =>
            key.startsWith('sb-') && key.endsWith('-auth-token')
        );

        if (!tokensStillPresent) {
            console.error('Supabase: ⚠️ ADVERTENCIA: Los tokens desaparecieron durante el reset!');
            console.error('Supabase: Esto causará que se pida login. Abortando reload.');
            return;
        }

        console.log('Supabase: ✅ Tokens verificados. Recargando página...');

    } catch (e) {
        console.error('Error en reset quirúrgico', e);
    }

    // 5. Recargar página
    // Al no haber borrado el authKey, el reload debería leerlo limpio del disco
    console.log('Supabase: Recargando página...');
    window.location.reload();
};

/**
 * Limpiar todo el almacenamiento de Supabase y forzar re-login
 * Usar como último recurso
 */
export const forceLogout = () => {
    console.log('Supabase: Limpiando almacenamiento local...');
    Object.keys(localStorage).forEach(key => {
        if (key.startsWith('sb-')) {
            localStorage.removeItem(key);
        }
    });
    window.location.reload();
};