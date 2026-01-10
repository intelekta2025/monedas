import { createClient } from '@supabase/supabase-js';

// --- CONFIGURACIÓN REAL DE SUPABASE ---
// Estos son los valores de tu proyecto que compartiste anteriormente.
// Nota: En un proyecto profesional, idealmente esto iría en un archivo .env

const supabaseUrl = 'https://xuylkjkgfztfelsseyvh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1eWxramtnZnp0ZmVsc3NleXZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5OTQyODYsImV4cCI6MjA4MTU3MDI4Nn0.78ZK0OHEQKW8Zq-b8UI2SMmY71rZ5yK1D-rcGFJ88-8';

export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Forzar refresh de la sesión de Supabase
 * Útil cuando la conexión se queda "zombie"
 * @returns {Promise<boolean>} true si se recuperó la sesión, false si no
 */
// Variable para evitar refrescos duplicados en ráfaga (Cool-down de 2 minutos)
let lastSuccessfulRefresh = 0;
const REFRESH_COOLDOWN = 2 * 60 * 1000;

export const forceSessionRefresh = async () => {
    const now = Date.now();
    if (now - lastSuccessfulRefresh < REFRESH_COOLDOWN) {
        console.log('Supabase: Refresh ignorado (Cool-down activo)');
        return true;
    }

    try {
        console.log('Supabase: Intentando refrescar sesión (Wake-up)...');

        // 1. Obtener sesión actual con TIMEOUT (Aumentado a 6s para redes lentas)
        const sessionPromise = new Promise(async (resolve, reject) => {
            const t = setTimeout(() => reject(new Error('GetSessionTimeout')), 6000);
            try {
                const res = await supabase.auth.getSession();
                clearTimeout(t);
                resolve(res);
            } catch (e) { clearTimeout(t); reject(e); }
        });

        let session = null;
        try {
            const { data } = await sessionPromise;
            session = data?.session;
        } catch (e) {
            console.warn('Supabase: getSession() lento o fallido:', e);
            // Si falla getSession, no retornamos false todavía, vamos al intento de rescate directo
        }

        if (session) {
            // Si tenemos sesión oficial, intentamos refresh standard (Aumentado a 8s)
            const refreshTimeout = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('RefreshTimeout')), 8000)
            );

            const { error: refreshError } = await Promise.race([
                supabase.auth.refreshSession(),
                refreshTimeout
            ]);

            if (!refreshError) {
                console.log('Supabase: Sesión refrescada exitosamente (Standard)');
                lastSuccessfulRefresh = Date.now();
                return true;
            }
        }

        throw new Error('Falló refresh standard o no hay sesión activa');

    } catch (err) {
        console.warn('Supabase: Refresh standard falló, intentando Reset Quirúrgico Silencioso...', err);

        // --- ESTRATEGIA: RESET QUIRÚRGICO SILENCIOSO (RAW STORAGE) ---
        try {
            // 1. Buscar token en localStorage "a mano" (saltando SDK opaco)
            let rawRefreshToken = null;

            // Buscar key que parece ser de supabase auth
            Object.keys(localStorage).forEach(key => {
                if (key.startsWith('sb-') && key.endsWith('-auth-token')) {
                    try {
                        const val = JSON.parse(localStorage.getItem(key));
                        if (val && val.refresh_token) {
                            rawRefreshToken = val.refresh_token;
                        }
                    } catch (parseErr) { /* ignore */ }
                }
            });

            if (rawRefreshToken) {
                console.log('Supabase: Token de respaldo encontrado en raw storage.');

                // 2. Restaurar sesión manualmente con el token crudo
                const { error: restoreError } = await supabase.auth.setSession({
                    refresh_token: rawRefreshToken
                });

                if (!restoreError) {
                    console.log('Supabase: ¡Conexión rescatada exitosamente (Raw)!');
                    lastSuccessfulRefresh = Date.now();
                    return true;
                } else {
                    console.error('Supabase: Falló rescate quirúrgico:', restoreError);
                }
            } else {
                console.warn('Supabase: No se encontró token en localStorage para rescate.');
            }
        } catch (surgicalErr) {
            console.error('Supabase: Error en rescate quirúrgico:', surgicalErr);
        }

        return false;
    }
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

        if (authKey && tokenFound) {
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
                    const t = setTimeout(() => reject(new Error('RestrictTimeout')), 3000);
                    try {
                        // Usamos el token que ya tenemos seguro
                        const res = await supabase.auth.setSession({ refresh_token: tokenFound });
                        clearTimeout(t);
                        resolve(res);
                    } catch (e) { clearTimeout(t); reject(e); }
                });

                await restorePromise;
                console.log('Supabase: Cliente rehidratado exitosamente.');
            } catch (e) {
                console.warn('Supabase: setSession falló o timeout, pero las credenciales siguen en disco.', e);
            }

        } else {
            console.warn('Supabase: No se encontró token de auth, no se puede preservar sesión.');
        }

    } catch (e) {
        console.error('Error en reset quirúrgico', e);
    }

    // 4. Recargar página
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