import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function deleteNexus() {
  const templateId = 1;
  
  // 1. Delete purchases referencing this template
  console.log('Deleting purchases for template_id 1...');
  const { error: purchErr } = await supabase
    .from('purchases')
    .delete()
    .eq('template_id', templateId);
  if (purchErr) console.error('  purchases delete error:', purchErr.message);
  else console.log('  ✓ purchases deleted');

  // 2. Now delete the template row
  console.log('Deleting template row...');
  const { error: delErr } = await supabase
    .from('templates')
    .delete()
    .eq('id', templateId);
  if (delErr) console.error('  template delete error:', delErr.message);
  else console.log('  ✓ Nexus Admin Dashboard deleted from DB');
}

deleteNexus().catch(console.error);
