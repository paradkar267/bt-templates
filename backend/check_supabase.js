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

async function check() {
  const { data: templates } = await supabase.from('templates').select('id, title');
  console.log("TEMPLATES IN DB:");
  templates.forEach(t => console.log(`[${t.id}] ${t.title}`));
  
  const { data: mappings } = await supabase.from('template_files').select('*');
  console.log("\nMAPPINGS:");
  mappings.forEach(m => console.log(`[Template ID: ${m.template_id}] Path: ${m.file_path}`));
  
  const { data: files } = await supabase.storage.from('secure_templates').list('templates');
  console.log("\nFILES IN STORAGE:");
  files.forEach(f => console.log(f.name));
}

check();
