import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function run() {
  const templateId = Date.now();
  console.log('Testing insert with ID:', templateId);
  
  const { data, error } = await supabase
    .from('templates')
    .insert({
      id: templateId,
      title: 'Test Template',
      description: 'Testing upload',
      price: 1000,
      category: 'React',
      tag: 'SaaS',
      image: 'test.png',
      keywords: ['test'],
      author: 'Nexus Themes',
      sales: 0,
      rating: 5.0
    }).select().single();

  if (error) {
    console.error('Error inserting into templates:', error);
    return;
  }
  console.log('Inserted template successfully:', data);

  const { error: mapError } = await supabase
    .from('template_files')
    .insert({
      template_id: templateId,
      file_path: 'templates/test.zip'
    });

  if (mapError) {
    console.error('Error inserting into template_files:', mapError);
    return;
  }
  console.log('Inserted template_files successfully');

  // Clean up
  await supabase.from('templates').delete().eq('id', templateId);
  console.log('Cleaned up test data');
}

run().catch(console.error);
