import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const defaultDetails = {
  'HTML': {
    features: ['Fully Responsive HTML5/CSS3', 'SEO Optimized Code', 'Fast Loading Times', 'Clean & Commented Code'],
    idealFor: ['Local Businesses', 'Startups', 'Agencies', 'Freelancers'],
    pages: ['Home', 'About Us', 'Services', 'Contact', 'FAQ']
  },
  'React': {
    features: ['Modern React 18', 'Component-based Architecture', 'Tailwind CSS Styling', 'Framer Motion Animations'],
    idealFor: ['SaaS Startups', 'Modern Agencies', 'Tech Companies', 'Creators'],
    pages: ['Home', 'Features', 'Pricing', 'About', 'Contact']
  },
  'Next.js': {
    features: ['Next.js App Router', 'Server-Side Rendering', 'SEO Optimized', 'Tailwind CSS', 'TypeScript Support'],
    idealFor: ['SaaS Startups', 'E-commerce', 'Portfolios', 'High-Traffic Sites'],
    pages: ['Home', 'Dashboard', 'Pricing', 'Blog', 'Contact']
  },
  'Svelte': {
    features: ['SvelteKit Powered', 'Zero Virtual DOM', 'Lightning Fast', 'Tailwind CSS'],
    idealFor: ['E-commerce', 'Portfolios', 'Web Apps'],
    pages: ['Home', 'Shop', 'Product Details', 'Cart', 'Checkout']
  },
  'Figma': {
    features: ['Auto Layout 3.0', 'Global Design System', 'Responsive Components', 'Light & Dark Modes'],
    idealFor: ['UI/UX Designers', 'Product Managers', 'Agencies'],
    pages: ['Dashboard UI', 'Settings', 'Profile', 'Authentication', 'Components Library']
  },
  'Webflow': {
    features: ['No-Code Visual Builder', 'CMS Ready', 'Smooth Interactions', 'Responsive Design'],
    idealFor: ['Marketing Sites', 'Portfolios', 'Agencies'],
    pages: ['Home', 'Work', 'About', 'Blog', 'Contact']
  }
};

async function seed() {
  console.log("Fetching all templates...");
  const { data: templates, error } = await supabase.from('templates').select('id, title, category');
  if (error) {
    console.error("Error fetching templates:", error);
    return;
  }
  
  for (const t of templates) {
    const fallback = defaultDetails[t.category] || defaultDetails['HTML'];
    
    // Slight customization based on title
    let idealFor = [...fallback.idealFor];
    if (t.title.toLowerCase().includes('fitness')) idealFor = ['Gyms', 'Personal Trainers', 'Fitness Centers'];
    if (t.title.toLowerCase().includes('medical') || t.title.toLowerCase().includes('health')) idealFor = ['Clinics', 'Doctors', 'Hospitals', 'Healthcare'];
    if (t.title.toLowerCase().includes('portfolio')) idealFor = ['Developers', 'Designers', 'Freelancers'];
    if (t.title.toLowerCase().includes('ecommerce') || t.title.toLowerCase().includes('store')) idealFor = ['Online Stores', 'Retailers', 'Brands'];
    if (t.title.toLowerCase().includes('real estate') || t.title.toLowerCase().includes('estate')) idealFor = ['Real Estate Agents', 'Property Portals', 'Agencies'];

    console.log(`Updating ${t.id}: ${t.title}...`);
    const { error: updateError } = await supabase.from('templates').update({
      key_features: fallback.features,
      ideal_for: idealFor,
      pages_included: fallback.pages
    }).eq('id', t.id);
    
    if (updateError) {
      console.error(`Error updating ${t.id}:`, updateError.message);
    }
  }
  console.log("Done seeding template details!");
}

seed();
