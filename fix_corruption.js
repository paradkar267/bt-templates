import fs from 'fs';
import path from 'path';

const PREVIEWS_DIR = path.join(process.cwd(), 'frontend', 'public', 'previews');

function fixCorruptionInContent(content, slug) {
  const prefix = `/previews/${slug}`;
  const regex = /(?:\/previews\/[^\/]+){2,}/g;
  
  if (regex.test(content)) {
    return {
      content: content.replace(regex, prefix),
      changed: true
    };
  }
  return { content, changed: false };
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
        const content = fs.readFileSync(fullPath, 'utf8');
        const { content: newContent, changed } = fixCorruptionInContent(content, slug);
        if (changed) {
          fs.writeFileSync(fullPath, newContent, 'utf8');
          console.log(`Fixed corruption in: ${fullPath.replace(process.cwd(), '')}`);
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
  console.log("Finished fixing corruption!");
}

run();
