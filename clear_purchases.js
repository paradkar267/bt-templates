import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Need to use service_role key to bypass RLS and use Admin Auth API
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function clearPurchases() {
  console.log('Clearing all purchases...');

  try {
    // 1. Delete all records from the 'purchases' table
    const { error: dbError } = await supabase
      .from('purchases')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Hack to delete all rows

    if (dbError) {
      console.error('Error deleting purchases table:', dbError);
    } else {
      console.log('Successfully cleared purchases table.');
    }

    // 2. Clear 'purchased_templates' array from all users' metadata
    const { data: usersData, error: authError } = await supabase.auth.admin.listUsers();
    
    if (authError) {
      console.error('Error fetching users:', authError);
      return;
    }

    const users = usersData.users || [];
    console.log(`Found ${users.length} users. Clearing metadata...`);

    for (const user of users) {
      const currentMetadata = user.user_metadata || {};
      if (currentMetadata.purchased_templates && currentMetadata.purchased_templates.length > 0) {
        const { error: updateError } = await supabase.auth.admin.updateUserById(
          user.id,
          { user_metadata: { ...currentMetadata, purchased_templates: [] } }
        );

        if (updateError) {
          console.error(`Error updating user ${user.email}:`, updateError);
        } else {
          console.log(`Cleared purchases for ${user.email}`);
        }
      }
    }

    console.log('All purchase histories have been cleared successfully.');
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

clearPurchases();
