const fs = require('fs');
let data = fs.readFileSync('src/data.js', 'utf8');

const targetReact = [9, 13, 17, 21, 25];
const targetHTML = [10, 14, 18, 22, 26];

data = data.replace(/\{ id: (\d+),[^}]+}/g, (match, idStr) => {
  const id = parseInt(idStr);
  if (targetReact.includes(id)) {
    return match.replace(/category: "[^"]+"/, 'category: "React"');
  }
  if (targetHTML.includes(id)) {
    return match.replace(/category: "[^"]+"/, 'category: "HTML"');
  }
  return match;
});

fs.writeFileSync('src/data.js', data);
console.log('Successfully assigned React and HTML to templates!');
