import { createClient } from '@supabase/supabase-js';

// --- CONFIGURACIÓN REAL DE SUPABASE ---
// Estos son los valores de tu proyecto que compartiste anteriormente.
// Nota: En un proyecto profesional, idealmente esto iría en un archivo .env

const supabaseUrl = 'https://xuylkjkgfztfelsseyvh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1eWxramtnZnp0ZmVsc3NleXZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5OTQyODYsImV4cCI6MjA4MTU3MDI4Nn0.78ZK0OHEQKW8Zq-b8UI2SMmY71rZ5yK1D-rcGFJ88-8';

export const supabase = createClient(supabaseUrl, supabaseKey);