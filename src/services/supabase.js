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
export const forceSessionRefresh = async () => {
    try {
        console.log('Supabase: Intentando refrescar sesión...');

        // 1. Obtener sesión actual con TIMEOUT (Evitar que getSession cuelgue)
        const sessionPromise = new Promise(async (resolve, reject) => {
            const t = setTimeout(() => reject(new Error('GetSessionTimeout')), 3000); // 3s max
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
            // Si tenemos sesión oficial, intentamos refresh standard
            const refreshTimeout = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('RefreshTimeout')), 5000)
            );

            const { error: refreshError } = await Promise.race([
                supabase.auth.refreshSession(),
                refreshTimeout
            ]);

            if (!refreshError) {
                console.log('Supabase: Sesión refrescada exitosamente (Standard)');
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

                // 2. Limpiar todo sb- excepto backups (si hubiera)
                Object.keys(localStorage).forEach(key => {
                    if (key.startsWith('sb-')) {
                        localStorage.removeItem(key);
                    }
                });

                // 3. Restaurar sesión manualmente con el token crudo
                const { error: restoreError } = await supabase.auth.setSession({
                    refresh_token: rawRefreshToken
                });

                if (!restoreError) {
                    console.log('Supabase: ¡Conexión rescatada exitosamente (Raw)!');
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
    console.log('Supabase: Iniciando reset quirúrgico manual...');

    try {
        // 1. Intentar obtener refresh token (via SDK o Raw Storage)
        let tokenToSave = null;

        // Intento SDK con timeout corto
        try {
            const sessionPromise = new Promise(async (resolve, reject) => {
                const t = setTimeout(() => reject(new Error('Timeout')), 2000);
                try {
                    const res = await supabase.auth.getSession();
                    clearTimeout(t);
                    resolve(res);
                } catch (e) { clearTimeout(t); reject(e); }
            });
            const { data } = await sessionPromise;
            tokenToSave = data?.session?.refresh_token;
        } catch (e) { console.warn('SDK getSession timed out, trying raw storage'); }

        // Fallback: Raw Storage
        if (!tokenToSave) {
            Object.keys(localStorage).forEach(key => {
                if (key.startsWith('sb-') && key.endsWith('-auth-token')) {
                    try {
                        const val = JSON.parse(localStorage.getItem(key));
                        if (val && val.refresh_token) tokenToSave = val.refresh_token;
                    } catch (e) { }
                }
            });
        }

        if (tokenToSave) {
            console.log('Supabase: Token salvado. Limpiando almacenamiento...');

            // 2. Limpiar almacenamiento local
            Object.keys(localStorage).forEach(key => {
                if (key.startsWith('sb-')) {
                    localStorage.removeItem(key);
                }
            });

            // 3. Restaurar sesión manualmente con TIMEOUT CRÍTICO
            // Si esto se cuelga, el usuario muere. Ponemos un timeout agresivo.
            const restorePromise = new Promise(async (resolve, reject) => {
                const t = setTimeout(() => reject(new Error('RestoreTimeout')), 3000);
                try {
                    const res = await supabase.auth.setSession({ refresh_token: tokenToSave });
                    clearTimeout(t);
                    resolve(res);
                } catch (e) { clearTimeout(t); reject(e); }
            });

            try {
                const { error: restoreError } = await restorePromise;
                if (!restoreError) {
                    console.log('Supabase: ¡Conexión rescatada exitosamente (Surgical)!');
                    // No recargamos si tuvo éxito, dejamos que la app se recupere sola o el usuario reintente
                    return;
                } else {
                    console.error('Supabase: Falló setSession quirúrgico:', restoreError);
                }
            } catch (restoreErr) {
                console.error('Supabase: Timeout o error en setSession quirúrgico.', restoreErr);
            }
        } else {
            console.error('No se pudo encontrar token para salvar.');
        }
    } catch (e) {
        console.error('Error en reset quirúrgico', e);
    }

    // 4. Recargar página para asegurar estado limpio
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