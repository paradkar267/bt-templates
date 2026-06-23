const fs = require('fs');
let data = fs.readFileSync('src/data.js', 'utf8');
data = data.replace(/image: ".*?"/g, (match, offset) => {
  const idMatch = data.substring(Math.max(0, offset - 150), offset).match(/id:\s*(\d+)/);
  const id = idMatch ? idMatch[1] : Math.floor(Math.random() * 1000);
  return `image: "https://picsum.photos/seed/bizleap${id}/800/600"`;
});
fs.writeFileSync('src/data.js', data);
console.log('Images fixed!');
