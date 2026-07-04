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

const TEMPLATES_DIR = path.join(process.cwd(), 'templates');
const skipDirs = ['html-fitness', 'next-portfolio', 'react-saas', 'svelte-ecommerce', 'vue-admin', 'html-fitness.zip', 'next-portfolio.zip', 'react-saas.zip', 'svelte-ecommerce.zip', 'vue-admin.zip'];

const dirs = fs.readdirSync(TEMPLATES_DIR).filter(f => {
  const stat = fs.statSync(path.join(TEMPLATES_DIR, f));
  return stat.isDirectory() && !skipDirs.includes(f);
});

async function uploadAll() {
  // Start from ID 56
  let currentId = 56;
  
  for (const d of dirs) {
    const tplPath = path.join(TEMPLATES_DIR, d);
    const zipName = `${d}.zip`;
    const zipPath = path.join(TEMPLATES_DIR, zipName);
    
    if (!fs.existsSync(zipPath)) {
      console.error(`Skipping ${d}, zip not found.`);
      continue;
    }

    let isReact = false;
    if (fs.existsSync(path.join(tplPath, 'package.json'))) {
      const pkg = JSON.parse(fs.readFileSync(path.join(tplPath, 'package.json')));
      isReact = !!(pkg.dependencies && (pkg.dependencies.react || pkg.dependencies.next));
    }
    
    const category = isReact ? 'React' : 'HTML';
    let imageFile = fs.readdirSync(tplPath).find(f => f.endsWith('.png') || f.endsWith('.jpg'));
    let imageUrl = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop'; // fallback
    
    if (imageFile) {
      // we need to upload the image to public storage or serve it
      // we'll put it in public/images/templates/
      const pubImgDir = path.join(process.cwd(), 'frontend', 'public', 'images', 'templates');
      if (!fs.existsSync(pubImgDir)) fs.mkdirSync(pubImgDir, { recursive: true });
      fs.copyFileSync(path.join(tplPath, imageFile), path.join(pubImgDir, imageFile));
      imageUrl = `/images/templates/${imageFile}`;
    }

    const t = {
      id: currentId++,
      tag: "Premium",
      category,
      title: d,
      author: "Nexus Themes",
      sales: Math.floor(Math.random() * 500) + 50,
      rating: (Math.random() * (5.0 - 4.5) + 4.5).toFixed(1),
      price: "5999",
      image: imageUrl,
      description: `Premium ${category} template for ${d}.`,
      keywords: [category.toLowerCase(), "template", d.split(" ")[0].toLowerCase()]
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
      continue;
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
  
  console.log('All new templates uploaded and added to DB!');
}

uploadAll();
