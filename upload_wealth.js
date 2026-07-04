import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function uploadWealth() {
  const d = 'Wealth Management Homepage';
  const currentId = 72; // The last one was 72
  const TEMPLATES_DIR = path.join(process.cwd(), 'templates');
  const tplPath = path.join(TEMPLATES_DIR, d);
  const zipName = `${d}.zip`;
  const zipPath = path.join(TEMPLATES_DIR, zipName);
  
  if (!fs.existsSync(zipPath)) {
    console.error(`Skipping ${d}, zip not found.`);
    return;
  }

  const category = 'React';
  let imageFile = fs.readdirSync(tplPath).find(f => f.endsWith('.png') || f.endsWith('.jpg'));
  let imageUrl = `/images/templates/${imageFile}`;
  
  const t = {
    id: currentId,
    tag: "Premium",
    category,
    title: d,
    author: "Nexus Themes",
    sales: 350,
    rating: 4.8,
    price: "5999",
    image: imageUrl,
    description: `Premium ${category} template for ${d}.`,
    keywords: ["react", "template", "wealth"]
  };

  console.log(`Processing ${t.title}...`);
  
  // 1. Upload ZIP to storage
  const fileBuffer = fs.readFileSync(zipPath);
  
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('secure_templates')
    .upload(`templates/${zipName}`, fileBuffer, {
      contentType: 'application/zip',
      upsert: true
    });
    
  if (uploadError) {
    console.error(`Error uploading ${zipName}:`, uploadError);
    return;
  }
  
  // 2. Insert into templates table
  const { error: dbError } = await supabase
    .from('templates')
    .upsert(t);
    
  if (dbError) {
    console.error(`Error inserting ${t.title} into templates:`, dbError);
  }
  
  // 3. Insert into template_files table
  const { error: fileDbError } = await supabase
    .from('template_files')
    .upsert({
      template_id: t.id,
      file_path: `templates/${zipName}`
    }, { onConflict: 'template_id' });
    
  if (fileDbError) {
    console.error(`Error inserting ${t.title} into template_files:`, fileDbError);
  }
  
  console.log(`Successfully processed ${t.title}!`);
}

uploadWealth();
