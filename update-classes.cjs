const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('src', function(filePath) {
  if (filePath.endsWith('.jsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    content = content.replace(/\bbg-white(?!(\/|\s+dark:bg-))\b/g, 'bg-white dark:bg-black');
    content = content.replace(/\bbg-white\/(5|10|20|30|40|50|60|70|80|90|95)(?!(\s+dark:bg-))\b/g, 'bg-white/$1 dark:bg-black/$1');
    content = content.replace(/\btext-black(?!(\/|\s+dark:text-))\b/g, 'text-black dark:text-white');
    content = content.replace(/\btext-black\/(40|50|60|70)(?!(\s+dark:text-))\b/g, 'text-black/$1 dark:text-white/$1');
    content = content.replace(/\bbg-gray-50(?!(\/|\s+dark:bg-))\b/g, 'bg-gray-50 dark:bg-gray-900');
    content = content.replace(/\bbg-gray-100(?!(\/|\s+dark:bg-))\b/g, 'bg-gray-100 dark:bg-gray-800');
    content = content.replace(/\btext-gray-900(?!(\/|\s+dark:text-))\b/g, 'text-gray-900 dark:text-gray-100');
    content = content.replace(/\btext-gray-800(?!(\/|\s+dark:text-))\b/g, 'text-gray-800 dark:text-gray-200');
    content = content.replace(/\bborder-gray-200(?!(\/|\s+dark:border-))\b/g, 'border-gray-200 dark:border-gray-800');
    content = content.replace(/\bborder-black\/\[0\.04\](?!(\s+dark:border-))\b/g, 'border-black/[0.04] dark:border-white/[0.04]');
    content = content.replace(/\bborder-black\/\[0\.05\](?!(\s+dark:border-))\b/g, 'border-black/[0.05] dark:border-white/[0.05]');
    content = content.replace(/\bborder-black\/\[0\.06\](?!(\s+dark:border-))\b/g, 'border-black/[0.06] dark:border-white/[0.06]');
    content = content.replace(/\bborder-black\/\[0\.03\](?!(\s+dark:border-))\b/g, 'border-black/[0.03] dark:border-white/[0.03]');
    content = content.replace(/\bborder-black\/10(?!(\s+dark:border-))\b/g, 'border-black/10 dark:border-white/10');
    
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated: ' + filePath);
    }
  }
});
