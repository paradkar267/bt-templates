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

const TEMPLATES_TO_DELETE = [
  { id: 56, title: 'Agency Landing Page',              storagePath: 'templates/Agency Landing Page.zip',              previewSlug: 'agency-landing-page',              sourceFolder: 'Agency Landing Page' },
  { id: 58, title: 'Artisanal Marketplace Homepage',    storagePath: 'templates/Artisanal Marketplace Homepage.zip',    previewSlug: 'artisanal-marketplace-homepage',    sourceFolder: 'Artisanal Marketplace Homepage' },
  { id: 54, title: 'Svelte E-Commerce',                 storagePath: 'templates/svelte-ecommerce.zip',                 previewSlug: 'svelte-ecommerce',                  sourceFolder: 'svelte-ecommerce' },
  { id: 57, title: 'Apothecary & Herbal Homepage',      storagePath: 'templates/Apothecary & Herbal Homepage.zip',      previewSlug: 'apothecary-herbal-homepage',         sourceFolder: 'Apothecary & Herbal Homepage' },
  { id: 67, title: 'Modern Property Portal Homepage',   storagePath: 'templates/Modern Property Portal Homepage.zip',   previewSlug: 'modern-property-portal-homepage',   sourceFolder: 'Modern Property Portal Homepage' },
];

async function run() {
  for (const tmpl of TEMPLATES_TO_DELETE) {
    console.log(`\n--- Deleting: ${tmpl.title} (ID: ${tmpl.id}) ---`);

    // 1. Delete purchases (to avoid FK constraint)
    const { error: purchErr } = await supabase.from('purchases').delete().eq('template_id', tmpl.id);
    if (purchErr) console.log(`  purchases: ${purchErr.message}`);
    else console.log(`  ✓ purchases cleared`);

    // 2. Delete storage file
    const { error: storageErr } = await supabase.storage.from('secure_templates').remove([tmpl.storagePath]);
    if (storageErr) console.log(`  storage: ${storageErr.message}`);
    else console.log(`  ✓ storage file deleted`);

    // 3. Delete template_files mapping
    const { error: mapErr } = await supabase.from('template_files').delete().eq('template_id', tmpl.id);
    if (mapErr) console.log(`  template_files: ${mapErr.message}`);
    else console.log(`  ✓ template_files deleted`);

    // 4. Delete template row
    const { error: delErr } = await supabase.from('templates').delete().eq('id', tmpl.id);
    if (delErr) console.log(`  templates: ${delErr.message}`);
    else console.log(`  ✓ template row deleted`);

    // 5. Delete preview folder
    const previewPath = path.resolve(__dirname, `../frontend/public/previews/${tmpl.previewSlug}`);
    if (fs.existsSync(previewPath)) {
      fs.rmSync(previewPath, { recursive: true, force: true });
      console.log(`  ✓ preview folder deleted`);
    } else {
      console.log(`  preview folder not found`);
    }

    // 6. Delete template source folder
    const sourcePath = path.resolve(__dirname, `../templates/${tmpl.sourceFolder}`);
    if (fs.existsSync(sourcePath)) {
      fs.rmSync(sourcePath, { recursive: true, force: true });
      console.log(`  ✓ source folder deleted`);
    } else {
      console.log(`  source folder not found`);
    }
  }

  // Also clean up duplicate svelte-e-commerce preview if it exists
  const extraPreview = path.resolve(__dirname, '../frontend/public/previews/svelte-e-commerce');
  if (fs.existsSync(extraPreview)) {
    fs.rmSync(extraPreview, { recursive: true, force: true });
    console.log('\n  ✓ extra svelte-e-commerce preview deleted');
  }

  console.log('\n=== All done! ===');
}

run().catch(console.error);
