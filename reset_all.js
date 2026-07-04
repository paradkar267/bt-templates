import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing SUPABASE variables!");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function resetAll() {
  console.log("1. Resetting all templates to be available...");
  const { error: templatesError } = await supabase
    .from('templates')
    .update({ is_sold_out: false })
    .neq('id', 0); // Hack to update all rows

  if (templatesError) {
    console.error("Failed to reset templates:", templatesError);
  } else {
    console.log("✅ Templates reset successfully!");
  }

  console.log("2. Clearing purchased_templates from all users...");
  // Fetch all users
  const { data: { users }, error: usersError } = await supabase.auth.admin.listUsers();
  
  if (usersError) {
    console.error("Failed to fetch users:", usersError);
    return;
  }

  for (const user of users) {
    if (user.user_metadata?.purchased_templates?.length > 0) {
      console.log(`Resetting templates for user: ${user.email}`);
      const { error: updateError } = await supabase.auth.admin.updateUserById(
        user.id,
        { user_metadata: { ...user.user_metadata, purchased_templates: [] } }
      );
      if (updateError) {
        console.error(`Failed to update user ${user.email}:`, updateError);
      }
    }
  }
  
  console.log("✅ All users reset successfully!");
  console.log("Done!");
}

resetAll();
