const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://xuylkjkgfztfelsseyvh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1eWxramtnZnp0ZmVsc3NleXZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5OTQyODYsImV4cCI6MjA4MTU3MDI4Nn0.78ZK0OHEQKW8Zq-b8UI2SMmY71rZ5yK1D-rcGFJ88-8';
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
    const { data, error } = await supabase
        .from('whatsapp_messages')
        .select('body, direction, created_at')
        .ilike('body', '%Me parece bien%')
        .order('created_at', { ascending: false })
        .limit(5);

    if (error) {
        console.error('Error:', error);
    } else {
        console.log(JSON.stringify(data, null, 2));
    }
}

check();
