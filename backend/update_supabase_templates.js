import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const archiver = require('archiver');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; 

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function zipDirectory(sourceDir, outPath) {
  const archive = new archiver.ZipArchive({ zlib: { level: 9 }});
  const stream = fs.createWriteStream(outPath);

  return new Promise((resolve, reject) => {
    archive
      .glob('**/*', {
        cwd: sourceDir,
        ignore: ['node_modules/**', 'dist/**', '.git/**']
      })
      .on('error', err => reject(err))
      .pipe(stream)
    ;
    stream.on('close', () => resolve());
    archive.finalize();
  });
}

async function updateTemplate(titleKeyword, folderName) {
  console.log(`Processing: ${titleKeyword}`);
  
  // Find template by title
  const { data: templates, error } = await supabase
    .from('templates')
    .select('id, title')
    .ilike('title', `%${titleKeyword}%`);
    
  if (error || !templates || templates.length === 0) {
    console.error(`Could not find template with title containing: ${titleKeyword}`);
    return;
  }
  
  const templateId = templates[0].id;
  console.log(`Found template: ${templates[0].title} (ID: ${templateId})`);
  
  // Find mapping
  const { data: mapping, error: mappingError } = await supabase
    .from('template_files')
    .select('file_path')
    .eq('template_id', templateId)
    .single();
    
  let storagePath;
  if (mappingError || !mapping) {
    console.log(`No mapping found, creating a new one...`);
    storagePath = `templates/${Date.now()}_${folderName}.zip`;
    await supabase.from('template_files').insert({
      template_id: templateId,
      file_path: storagePath
    });
  } else {
    storagePath = mapping.file_path;
    console.log(`Found existing storage path: ${storagePath}`);
  }
  
  // Create ZIP
  const folderPath = path.resolve(__dirname, `../templates/${folderName}`);
  const safeName = folderName.replace(/[\/\\]/g, '_');
  const zipPath = path.resolve(__dirname, `../${safeName}.zip`);
  console.log(`Zipping ${folderPath} to ${zipPath}...`);
  await zipDirectory(folderPath, zipPath);
  
  // Upload to Supabase Storage
  console.log(`Uploading to Supabase Storage at ${storagePath}...`);
  const fileBuffer = fs.readFileSync(zipPath);
  const { error: uploadError } = await supabase.storage
    .from('secure_templates')
    .upload(storagePath, fileBuffer, {
      contentType: 'application/zip',
      upsert: true
    });
    
  if (uploadError) {
    console.error(`Upload error:`, uploadError);
  } else {
    console.log(`Successfully updated ${titleKeyword} in Supabase!`);
  }
  
  // Cleanup zip
  fs.unlinkSync(zipPath);
}

async function main() {
  await updateTemplate('Premium Store', 'e-commerce');
  await updateTemplate('Luxury Estate', 'real-estate/luxury-estate');
}

main().catch(console.error);
