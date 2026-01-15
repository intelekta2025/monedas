
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://xuylkjkgfztfelsseyvh.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1eWxramtnZnp0ZmVsc3NleXZoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTk5NDI4NiwiZXhwIjoyMDgxNTcwMjg2fQ.GQLG-vr5ofgZCKjXQw2SWuGvGR_YKT6pe6X2gfQUHKA';

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function injectProfile() {
    const userId = 'be90ef3d-5a7a-4977-915b-61b1f13cf346';
    const email = 'rosaalvamartinezpacheco@gmail.com';
    const fullName = 'Rosa Martinez';
    const role = 'operator';

    console.log(`Attempting to manually insert profile for user ${userId}...`);

    const { data, error } = await supabase
        .from('profiles')
        .insert([{
            id: userId,
            email: email,
            full_name: fullName,
            role: role,
            status: 'active'
        }])
        .select()
        .single();

    if (error) {
        console.error('❌ Insert failed:', error);
    } else {
        console.log('✅ Insert successful:', data);
    }
}

injectProfile();
