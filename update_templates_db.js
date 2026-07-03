import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateDb() {
  console.log('Updating template 1...');
  const { error: err1 } = await supabase
    .from('templates')
    .update({ 
      category: 'HTML', 
      previewUrl: '/previews/nexus-admin/index.html'
    })
    .eq('id', 1);
  if (err1) console.error('Error 1:', err1);

  console.log('Updating template 2...');
  const { error: err2 } = await supabase
    .from('templates')
    .update({ 
      category: 'HTML', 
      previewUrl: '/previews/aura-landing/index.html'
    })
    .eq('id', 2);
  if (err2) console.error('Error 2:', err2);

  console.log('Done!');
}

updateDb();
