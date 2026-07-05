import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const newTemplates = [
  {
    id: 73,
    title: "Premium Store",
    description: "A premium, fully responsive React E-Commerce template with modern animations and sleek product displays. Perfect for high-end brands.",
    category: "React",
    tag: "E-Commerce",
    price: 49,
    author: "Bizleap",
    sales: 120,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=2000",
    is_sold_out: false
  },
  {
    id: 74,
    title: "Luxury Estate",
    description: "An elegant, high-end real estate portal inspired by Sotheby's. Built with React and optimized for luxury property listings with rich typography.",
    category: "React",
    tag: "Real Estate",
    price: 69,
    author: "Bizleap",
    sales: 85,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2000",
    is_sold_out: false
  }
];

async function upload() {
  const { data, error } = await supabase
    .from('templates')
    .insert(newTemplates)
    .select();

  if (error) {
    console.error('Error inserting templates:', error);
  } else {
    console.log('Successfully added templates:', data.map(t => t.title));
  }
}

upload();
