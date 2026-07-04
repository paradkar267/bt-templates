import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function testDB() {
  const { data: purchases, error: pError } = await supabase.from('purchases').select('*');
  console.log('Purchases:', purchases, pError);

  const { data: templates, error: tError } = await supabase.from('templates').select('id, title, is_sold_out').eq('is_sold_out', true);
  console.log('Sold out templates:', templates, tError);
}

testDB();
