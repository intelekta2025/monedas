const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://xuylkjkgfztfelsseyvh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1eWxramtnZnp0ZmVsc3NleXZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5OTQyODYsImV4cCI6MjA4MTU3MDI4Nn0.78ZK0OHEQKW8Zq-b8UI2SMmY71rZ5yK1D-rcGFJ88-8';
const supabase = createClient(supabaseUrl, supabaseKey);

async function inspect() {
    const { data, error } = await supabase.from('whatsapp_conversations').select('*').limit(1);
    if (error) {
        console.error('Error:', error);
    } else if (data && data.length > 0) {
        console.log('Columns:', Object.keys(data[0]).join(', '));
        console.log('Example data:', JSON.stringify(data[0], null, 2));
    } else {
        console.log('No data found in whatsapp_conversations');
    }
}

inspect();
