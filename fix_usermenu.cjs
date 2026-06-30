const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'frontend', 'src');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      processDir(filePath);
    } else if (filePath.endsWith('.jsx')) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Look for:
      // <UserMenu />
      // <button ... > <ShoppingCart ... /> ... </button>
      // And swap them.
      
      const regex = /(\s*<UserMenu \/>\s*)(<button[^>]*onClick={\(\) => requireAuth\(\(\) => navigate\('\/cart'\)\)}[\s\S]*?<\/button>)/g;
      
      if (regex.test(content)) {
        content = content.replace(regex, (match, p1, p2) => {
          return '\n' + p2 + p1;
        });
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${filePath}`);
      }
    }
  }
}

processDir(srcDir);
