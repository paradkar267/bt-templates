/**
 * Upload latest new templates to Supabase.
 * Run: node upload_latest_templates.js
 */
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { execFileSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '.env.local') });

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// New templates to upload (id starts after highest existing: 74)
const NEW_TEMPLATES = [
  {
    id: 75,
    title: 'E-Commerce Store',
    folderPath: 'templates/e-commerce',          // actual source dir to zip
    zipName: 'e-commerce.zip',
    category: 'React',
    tag: 'Premium',
    price: '5999',
    description: 'Full-featured e-commerce React store with product listing, cart, checkout, and multi-page routing.',
    keywords: ['react', 'ecommerce', 'store', 'shop'],
    imageFile: null, // will use fallback
  },
  {
    id: 76,
    title: 'Agency Landing Page',
    folderPath: 'templates/Agency Landing Page/Agency Landing Page',
    zipName: 'Agency Landing Page.zip',
    category: 'React',
    tag: 'Premium',
    price: '5999',
    description: 'Modern agency landing page built with React & Vite. Clean, animated, and fully responsive.',
    keywords: ['react', 'agency', 'landing'],
    imageFile: 'Agency Landing Page.png',
  },
  {
    id: 77,
    title: 'Apothecary & Herbal Homepage',
    folderPath: 'templates/Apothecary & Herbal Homepage (1)/Apothecary & Herbal Homepage',
    zipName: 'Apothecary & Herbal Homepage.zip',
    category: 'HTML',
    tag: 'Premium',
    price: '4999',
    description: 'Elegant herbal & apothecary store homepage with pure HTML/CSS/JS — no dependencies.',
    keywords: ['html', 'herbal', 'apothecary', 'health'],
    imageFile: 'Apothecary & Herbal Homepage.png',
  },
  {
    id: 78,
    title: 'Dermatology & Skincare Homepage',
    folderPath: 'templates/Dermatology & Skincare Homepage (1)/Dermatology & Skincare Homepage',
    zipName: 'Dermatology & Skincare Homepage (1).zip',
    category: 'HTML',
    tag: 'Premium',
    price: '4999',
    description: 'Professional multi-page dermatology clinic site with treatments, bookings, and store pages.',
    keywords: ['html', 'dermatology', 'skincare', 'medical'],
    imageFile: 'Dermatology & Skincare Homepage.png',
  },
];

// Fallback image
const FALLBACK_IMG = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop';

// Sample reviews to seed per template
const SAMPLE_REVIEWS = [
  { user_name: 'Arjun Mehta', rating: 5, comment: 'Absolutely stunning design. Saved me hours of work!' },
  { user_name: 'Priya Sharma', rating: 5, comment: 'Clean code, easy to customize. Highly recommend.' },
  { user_name: 'Ravi Kumar', rating: 4, comment: 'Great template. Would love more color options.' },
];

// ponytail: robocopy to temp dir first so we exclude node_modules/dist/.git, then PS zip
function zipDir(sourceDir, outPath, excludeDirs = ['node_modules', 'dist', '.git']) {
  if (fs.existsSync(outPath)) fs.unlinkSync(outPath);

  const hasExcludable = excludeDirs.some(d => fs.existsSync(path.join(sourceDir, d)));
  if (!hasExcludable) {
    // HTML templates — zip directly
    execFileSync('powershell', ['-NoProfile', '-Command',
      `Compress-Archive -Path "${sourceDir}\\*" -DestinationPath "${outPath}"`,
    ], { stdio: 'inherit' });
    return;
  }

  // React templates — robocopy to temp, then zip, then cleanup
  const tmpDir = path.resolve(__dirname, '_tmp_zip_' + Date.now());
  try {
    const xcludeArgs = excludeDirs.map(d => `"${d}"`).join(' ');
    // robocopy exit codes 0-7 are success
    try {
      execFileSync('robocopy', [sourceDir, tmpDir, '/E', '/XD', ...excludeDirs], { stdio: 'inherit' });
    } catch (_) { /* robocopy returns non-zero for partial copies */ }
    execFileSync('powershell', ['-NoProfile', '-Command',
      `Compress-Archive -Path "${tmpDir}\\*" -DestinationPath "${outPath}"`,
    ], { stdio: 'inherit' });
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

async function uploadTemplate(t) {
  console.log(`\n=== Processing: ${t.title} ===`);

  const sourceDir = path.resolve(__dirname, t.folderPath);
  if (!fs.existsSync(sourceDir)) {
    console.error(`  ❌ Source dir not found: ${sourceDir}`);
    return false;
  }

  // 1. Zip
  const zipPath = path.resolve(__dirname, t.zipName);
  console.log(`  Zipping ${sourceDir}...`);
  zipDir(sourceDir, zipPath);

  // 2. Upload ZIP to storage
  const storagePath = `templates/${t.zipName}`;
  console.log(`  Uploading to storage: ${storagePath}`);
  const { error: uploadErr } = await supabase.storage
    .from('secure_templates')
    .upload(storagePath, fs.readFileSync(zipPath), {
      contentType: 'application/zip',
      upsert: true,
    });
  fs.unlinkSync(zipPath); // cleanup

  if (uploadErr) {
    console.error(`  ❌ Storage upload failed:`, uploadErr.message);
    return false;
  }
  console.log(`  ✅ Storage upload done`);

  // 3. Resolve image URL
  let imageUrl = FALLBACK_IMG;
  if (t.imageFile) {
    const imgSrc = path.join(sourceDir, t.imageFile);
    if (fs.existsSync(imgSrc)) {
      const pubDir = path.resolve(__dirname, 'frontend/public/images/templates');
      fs.mkdirSync(pubDir, { recursive: true });
      fs.copyFileSync(imgSrc, path.join(pubDir, t.imageFile));
      imageUrl = `/images/templates/${t.imageFile}`;
    }
  }

  // 4. Upsert template row
  const row = {
    id: t.id,
    title: t.title,
    category: t.category,
    tag: t.tag,
    price: t.price,
    author: 'Nexus Themes',
    sales: Math.floor(Math.random() * 400) + 80,
    rating: (Math.random() * 0.5 + 4.5).toFixed(1),
    image: imageUrl,
    description: t.description,
    keywords: t.keywords,
  };

  const { error: dbErr } = await supabase.from('templates').upsert(row);
  if (dbErr) {
    console.error(`  ❌ DB insert failed:`, dbErr.message);
    return false;
  }
  console.log(`  ✅ DB insert done (id=${t.id})`);

  // 5. Upsert template_files row
  const { error: fileErr } = await supabase
    .from('template_files')
    .upsert({ template_id: t.id, file_path: storagePath }, { onConflict: 'template_id' });
  if (fileErr) {
    console.error(`  ❌ template_files insert failed:`, fileErr.message);
  } else {
    console.log(`  ✅ template_files done`);
  }

  return true;
}

async function seedReviews(templateIds) {
  console.log('\n=== Seeding reviews ===');
  // reviews table requires user_id (auth uuid) — we'll skip if no test user exists
  // ponytail: seeding dummy reviews needs a real uuid; skip gracefully if none configured
  const testUserId = process.env.TEST_USER_ID;
  if (!testUserId) {
    console.log('  ℹ️  TEST_USER_ID not set in .env.local — skipping review seed.');
    console.log('     Add TEST_USER_ID=<your-auth-uuid> to .env.local and re-run to seed reviews.');
    return;
  }

  for (const tid of templateIds) {
    for (const r of SAMPLE_REVIEWS) {
      const { error } = await supabase.from('reviews').insert({
        template_id: tid,
        user_id: testUserId,
        rating: r.rating,
        comment: r.comment,
        user_name: r.user_name,
      });
      if (error && !error.message.includes('duplicate')) {
        console.error(`  ❌ Review insert failed for template ${tid}:`, error.message);
      }
    }
    console.log(`  ✅ Reviews seeded for template ${tid}`);
  }
}

async function main() {
  const uploaded = [];
  for (const t of NEW_TEMPLATES) {
    const ok = await uploadTemplate(t);
    if (ok) uploaded.push(t.id);
  }

  if (uploaded.length) {
    console.log(`\n✅ Uploaded ${uploaded.length}/${NEW_TEMPLATES.length} templates: IDs ${uploaded.join(', ')}`);
    await seedReviews(uploaded);
  } else {
    console.log('\n⚠️  No templates uploaded.');
  }
}

main().catch(console.error);
