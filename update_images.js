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

const ARTIFACTS_DIR = "C:\\Users\\yashp\\.gemini\\antigravity-ide\\brain\\cfb0bddc-cf18-42e4-93c6-d46a00b10dc8";
const DEST_DIR = path.join(process.cwd(), 'frontend', 'public', 'images', 'templates');

if (!fs.existsSync(DEST_DIR)) {
  fs.mkdirSync(DEST_DIR, { recursive: true });
}

// Map template names to their generated image prefixes
const imageMap = {
  'Agency Landing Page': 'agency_landing_page_',
  'Apothecary & Herbal Homepage': 'apothecary_herbal_',
  'Artisanal Marketplace Homepage': 'artisanal_marketplace_',
  'Beauty & Skincare Homepage': 'beauty_skincare_',
  'Dermatology & Skincare Homepage': 'dermatology_skincare_',
  'Emergency & Urgent Care Homepage': 'emergency_care_',
  'ESG Investing Homepage': 'esg_investing_',
  'Family Care Portal Homepage': 'family_care_',
  'Luxury Boutique Pharmacy Homepage': 'luxury_pharmacy_',
  'Luxury Listing Homepage': 'luxury_listing_',
  'Medical Specialist Homepage': 'medical_specialist_',
  'Modern Property Portal Homepage': 'property_portal_',
  'summer collection': 'summer_collection_',
  'Sustainable Health Homepage': 'sustainable_health_',
  'Tech Store Homepage (Dark Mode)': 'tech_store_dark_',
  'Vitality & Nutrition Homepage': 'vitality_nutrition_',
  'Wealth Management Homepage': 'wealth_management_'
};

const artifactFiles = fs.readdirSync(ARTIFACTS_DIR);

async function updateImages() {
  for (const [title, prefix] of Object.entries(imageMap)) {
    // Find the file in artifacts
    const matchedFile = artifactFiles.find(f => f.startsWith(prefix) && f.endsWith('.png'));
    if (!matchedFile) {
      console.warn(`No generated image found for ${title} (prefix: ${prefix})`);
      continue;
    }
    
    // Clean filename for public usage
    const cleanFileName = prefix + 'front.png';
    const sourcePath = path.join(ARTIFACTS_DIR, matchedFile);
    const destPath = path.join(DEST_DIR, cleanFileName);
    
    // Copy file
    fs.copyFileSync(sourcePath, destPath);
    console.log(`Copied ${matchedFile} to ${cleanFileName}`);
    
    // Update DB
    const newImageUrl = `/images/templates/${cleanFileName}`;
    const { error } = await supabase
      .from('templates')
      .update({ image: newImageUrl })
      .eq('title', title);
      
    if (error) {
      console.error(`Error updating DB for ${title}:`, error);
    } else {
      console.log(`Updated DB for ${title} with ${newImageUrl}`);
    }
  }
  
  console.log('All template front images updated successfully!');
}

updateImages();
