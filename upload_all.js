import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const templatesToAdd = [
  {
    id: 51,
    tag: "SaaS",
    category: "React",
    title: "React SaaS Landing Page",
    author: "Nexus Themes",
    sales: 120,
    rating: 4.8,
    price: "7200",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
    description: "A beautiful, highly-converting SaaS landing page built with React and Tailwind CSS.",
    keywords: ["react", "saas", "landing", "startup"],
    file: "react-saas.zip"
  },
  {
    id: 52,
    tag: "Dashboard",
    category: "Vue",
    title: "Vue Admin Dashboard",
    author: "Nexus Themes",
    sales: 340,
    rating: 4.9,
    price: "8500",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
    description: "A comprehensive admin dashboard template using Vue 3, Vite, and Tailwind CSS.",
    keywords: ["vue", "admin", "dashboard", "analytics"],
    file: "vue-admin.zip"
  },
  {
    id: 53,
    tag: "Portfolio",
    category: "Next.js",
    title: "Next Developer Portfolio",
    author: "Nexus Themes",
    sales: 450,
    rating: 5.0,
    price: "6000",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&auto=format&fit=crop",
    description: "A sleek, dark-mode developer portfolio built with Next.js App Router and Tailwind.",
    keywords: ["nextjs", "portfolio", "developer", "dark"],
    file: "next-portfolio.zip"
  },
  {
    id: 54,
    tag: "E-Commerce",
    category: "Svelte",
    title: "Svelte E-Commerce",
    author: "Nexus Themes",
    sales: 210,
    rating: 4.7,
    price: "7900",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&auto=format&fit=crop",
    description: "Lightning-fast e-commerce storefront built with Svelte and Vite.",
    keywords: ["svelte", "ecommerce", "store", "shop"],
    file: "svelte-ecommerce.zip"
  },
  {
    id: 55,
    tag: "Local",
    category: "HTML",
    title: "HTML Elite Fitness",
    author: "Nexus Themes",
    sales: 890,
    rating: 4.8,
    price: "5000",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop",
    description: "A high-intensity fitness and gym landing page using pure HTML and Tailwind CSS CDN.",
    keywords: ["html", "fitness", "gym", "local"],
    file: "html-fitness.zip"
  }
];

async function uploadAll() {
  for (const t of templatesToAdd) {
    console.log(`Processing ${t.title}...`);
    
    // 1. Upload ZIP to storage
    const filePath = path.join(__dirname, 'templates', t.file);
    const fileBuffer = fs.readFileSync(filePath);
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('secure_templates')
      .upload(`templates/${t.file}`, fileBuffer, {
        contentType: 'application/zip',
        upsert: true
      });
      
    if (uploadError) {
      console.error(`Error uploading ${t.file}:`, uploadError);
      continue;
    }
    
    // 2. Insert into templates table
    const { file, ...templateData } = t;
    const { error: dbError } = await supabase
      .from('templates')
      .upsert(templateData);
      
    if (dbError) {
      console.error(`Error inserting ${t.title} into templates:`, dbError);
    }
    
    // 3. Insert into template_files table
    const { error: fileDbError } = await supabase
      .from('template_files')
      .upsert({
        template_id: t.id,
        file_path: `templates/${t.file}`
      }, { onConflict: 'template_id' });
      
    if (fileDbError) {
      console.error(`Error inserting ${t.title} into template_files:`, fileDbError);
    }
    
    console.log(`Successfully processed ${t.title}!`);
  }
  
  console.log('All templates uploaded and added to DB!');
}

uploadAll();
