import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function syncSoldOut() {
  console.log("Fetching all purchases...");
  const { data: purchases, error: pError } = await supabase.from('purchases').select('template_id');
  
  if (pError) {
    console.error("Error fetching purchases:", pError);
    return;
  }
  
  if (!purchases || purchases.length === 0) {
    console.log("No purchases found.");
    return;
  }
  
  const soldOutTemplateIds = purchases.map(p => p.template_id);
  console.log(`Found ${soldOutTemplateIds.length} purchased templates. Marking them as sold out...`);
  
  // Set these specific templates to sold out
  const { error: updateError } = await supabase
    .from('templates')
    .update({ is_sold_out: true })
    .in('id', soldOutTemplateIds);
    
  if (updateError) {
    console.error("Error marking templates as sold out:", updateError);
  } else {
    console.log(`✅ Successfully marked templates ${soldOutTemplateIds.join(', ')} as sold out!`);
  }
}

syncSoldOut();
