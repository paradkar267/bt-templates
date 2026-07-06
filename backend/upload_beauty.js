import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function run() {
  const templateName = 'Beauty & Skincare Homepage';
  const zipPath = path.resolve(__dirname, `../templates/${templateName}.zip`);
  const storagePath = `templates/${templateName}.zip`;

  console.log(`Uploading ${zipPath} to Supabase storage at ${storagePath}...`);
  if (!fs.existsSync(zipPath)) {
    console.error('Zip file not found!');
    process.exit(1);
  }
  const fileBuffer = fs.readFileSync(zipPath);

  const { data, error } = await supabase.storage
    .from('secure_templates')
    .upload(storagePath, fileBuffer, {
      contentType: 'application/zip',
      upsert: true
    });

  if (error) {
    console.error('Upload failed:', error.message);
  } else {
    console.log('Upload successful:', data);
  }
  
  // Clean up local zip
  if (fs.existsSync(zipPath)) {
    fs.unlinkSync(zipPath);
    console.log('Cleaned up local zip file.');
  }
}

run().catch(console.error);
