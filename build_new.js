import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const archiver = require('archiver');

const TEMPLATES_DIR = path.join(process.cwd(), 'templates');
const PREVIEWS_DIR = path.join(process.cwd(), 'frontend', 'public', 'previews');

const skipDirs = ['html-fitness', 'next-portfolio', 'react-saas', 'svelte-ecommerce', 'vue-admin', 'html-fitness.zip', 'next-portfolio.zip', 'react-saas.zip', 'svelte-ecommerce.zip', 'vue-admin.zip'];

const dirs = fs.readdirSync(TEMPLATES_DIR).filter(f => {
  const stat = fs.statSync(path.join(TEMPLATES_DIR, f));
  return stat.isDirectory() && !skipDirs.includes(f);
});

function getSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

async function zipDirectory(sourceDir, outPath) {
  try {
    execSync(`powershell -ExecutionPolicy Bypass -Command "Compress-Archive -Path '${sourceDir}\\*' -DestinationPath '${outPath}' -Force"`);
  } catch (err) {
    console.error('Zipping failed', err);
  }
}

async function buildAll() {
  for (const d of dirs) {
    console.log(`\n\n--- Processing ${d} ---`);
    const tplPath = path.join(TEMPLATES_DIR, d);
    const slug = getSlug(d);
    const previewDest = path.join(PREVIEWS_DIR, slug);
    const zipDest = path.join(TEMPLATES_DIR, `${d}.zip`);
    
    let isReact = false;
    if (fs.existsSync(path.join(tplPath, 'package.json'))) {
      const pkg = JSON.parse(fs.readFileSync(path.join(tplPath, 'package.json')));
      isReact = !!(pkg.dependencies && (pkg.dependencies.react || pkg.dependencies.next));
    }

    // 1. Build or Copy
    if (!fs.existsSync(previewDest)) {
      fs.mkdirSync(previewDest, { recursive: true });
    }

    if (isReact) {
      console.log(`Building React/Next app for ${d}...`);
      try {
        execSync('npm install', { cwd: tplPath, stdio: 'inherit' });
        execSync('npm run build', { cwd: tplPath, stdio: 'inherit' });
        
        // Next.js uses out/, Vite uses dist/
        let buildDir = path.join(tplPath, 'dist');
        if (!fs.existsSync(buildDir)) {
          buildDir = path.join(tplPath, 'out');
        }
        
        if (fs.existsSync(buildDir)) {
          fs.cpSync(buildDir, previewDest, { recursive: true, force: true });
          console.log(`Copied build to ${previewDest}`);
          // Cleanup
          fs.rmSync(buildDir, { recursive: true, force: true });
        } else {
          console.warn(`No build directory found for ${d}`);
        }
        if (fs.existsSync(path.join(tplPath, 'node_modules'))) {
          fs.rmSync(path.join(tplPath, 'node_modules'), { recursive: true, force: true });
        }
      } catch (err) {
        console.error(`Build failed for ${d}:`, err.message);
      }
    } else {
      console.log(`Copying HTML files for ${d}...`);
      fs.cpSync(tplPath, previewDest, { recursive: true, force: true });
    }

    // 2. Zip
    console.log(`Zipping ${d}...`);
    if (fs.existsSync(zipDest)) {
      fs.unlinkSync(zipDest);
    }
    await zipDirectory(tplPath, zipDest);
    console.log(`Created ${d}.zip`);
  }
  console.log('All new templates processed!');
}

buildAll();
