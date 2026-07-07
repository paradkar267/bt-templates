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
  const templateName = 'premium store'; // The exact filename expected for the zip
  const zipPath = path.resolve(__dirname, `../templates/${templateName}.zip`);
  const storagePath = `templates/${templateName}.zip`; // Supabase stores it here based on what they uploaded originally? Let's check what the file name was actually called when they uploaded it. Wait, the API uses Date.now() + originalname. But we are just overwriting or adding a new one. It doesn't matter, we just need to fix the live preview primarily, but I will upload it as premium store.zip. 

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
  
  if (fs.existsSync(zipPath)) {
    fs.unlinkSync(zipPath);
  }
}

run().catch(console.error);
