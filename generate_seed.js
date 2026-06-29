import { marketplaceTemplates } from './src/data.js';
import fs from 'fs';

const escapeSql = (str) => {
  if (typeof str !== 'string') return str;
  return str.replace(/'/g, "''");
};

let sql = 'INSERT INTO public.templates (id, tag, category, title, author, sales, rating, price, image, description, keywords) VALUES\n';

const values = marketplaceTemplates.map(t => {
  const keywordsArr = '{"' + t.keywords.map(k => escapeSql(k)).join('","') + '"}';
  return `(${t.id}, '${escapeSql(t.tag)}', '${escapeSql(t.category)}', '${escapeSql(t.title)}', '${escapeSql(t.author)}', ${t.sales}, ${t.rating}, '${escapeSql(t.price)}', '${escapeSql(t.image)}', '${escapeSql(t.description)}', '${keywordsArr}')`;
});

sql += values.join(',\n') + ';';

fs.writeFileSync('seed.sql', sql);
console.log('Generated seed.sql');
