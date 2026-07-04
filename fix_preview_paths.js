import fs from 'fs';
import path from 'path';

const PREVIEWS_DIR = path.join(process.cwd(), 'frontend', 'public', 'previews');

function fixPathsInContent(content, slug) {
  let changed = false;
  const prefix = `/previews/${slug}`;

  // Fix HTML src/href absolute paths
  const replacements = [
    { from: /"\/assets\//g, to: `"${prefix}/assets/` },
    { from: /'\/assets\//g, to: `'${prefix}/assets/` },
    { from: /"\/_next\//g, to: `"${prefix}/_next/` },
    { from: /'\/_next\//g, to: `'${prefix}/_next/` },
    { from: /href="\/favicon/g, to: `href="${prefix}/favicon` },
    { from: /src="\/favicon/g, to: `src="${prefix}/favicon` },
    { from: /url\(\/assets\//g, to: `url(${prefix}/assets/` },
    { from: /url\("\/assets\//g, to: `url("${prefix}/assets/` },
    { from: /url\('\/assets\//g, to: `url('${prefix}/assets/` },
    { from: /url\(\/_next\//g, to: `url(${prefix}/_next/` },
  ];

  for (const { from, to } of replacements) {
    if (from.test(content)) {
      content = content.replace(from, to);
      changed = true;
    }
  }
  
  return { content, changed };
}

function processDirectory(dir, slug) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath, slug);
    } else {
      if (fullPath.endsWith('.html') || fullPath.endsWith('.js') || fullPath.endsWith('.css')) {
        let content = fs.readFileSync(fullPath, 'utf8');
        const { content: newContent, changed } = fixPathsInContent(content, slug);
        if (changed) {
          fs.writeFileSync(fullPath, newContent, 'utf8');
          console.log(`Fixed paths in: ${fullPath.replace(process.cwd(), '')}`);
        }
      }
    }
  }
}

function run() {
  const templates = fs.readdirSync(PREVIEWS_DIR);
  for (const slug of templates) {
    const slugDir = path.join(PREVIEWS_DIR, slug);
    if (fs.statSync(slugDir).isDirectory()) {
      processDirectory(slugDir, slug);
    }
  }
  console.log("Finished patching all preview paths!");
}

run();
