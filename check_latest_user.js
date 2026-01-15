
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://xuylkjkgfztfelsseyvh.supabase.co';
// Key extracted from user's n8n JSON
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1eWxramtnZnp0ZmVsc3NleXZoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTk5NDI4NiwiZXhwIjoyMDgxNTcwMjg2fQ.GQLG-vr5ofgZCKjXQw2SWuGvGR_YKT6pe6X2gfQUHKA';

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function checkLatestUser() {
    console.log('Fetching latest users...');
    const { data: { users }, error } = await supabase.auth.admin.listUsers({
        page: 1,
        perPage: 5
    });

    if (error) {
        console.error('Error fetching users:', error);
        return;
    }

    if (!users || users.length === 0) {
        console.log('No users found.');
        return;
    }

    // Sort by created_at desc manually since listUsers doesn't support order param directly in all versions
    const sortedUsers = users.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    const latestUser = sortedUsers[0];

    console.log('--- LATEST USER ---');
    console.log('ID:', latestUser.id);
    console.log('Email:', latestUser.email);
    console.log('Created At:', latestUser.created_at);
    console.log('Metadata:', JSON.stringify(latestUser.user_metadata, null, 2));

    // Also check profiles table for this id
    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', latestUser.id)
        .single();

    console.log('--- PROFILE STATUS ---');
    if (profileError) {
        console.log('Profile fetch error (likely expected if missing):', profileError.code, profileError.message);
    } else {
        console.log('Profile found:', profile);
    }
}

checkLatestUser();
