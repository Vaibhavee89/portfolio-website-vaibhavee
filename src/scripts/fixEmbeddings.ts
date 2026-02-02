import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const openai = new OpenAI({
  apiKey: process.env.VITE_OPENAI_API_KEY || process.env.OPENAI_API_KEY,
});

async function fixEmbeddings() {
  console.log('🔧 Fixing embeddings in database...\n');

  // Get all chunks
  const { data: chunks, error: fetchError } = await supabase
    .from('knowledge_base')
    .select('id, content, metadata');

  if (fetchError) {
    console.error('❌ Error fetching chunks:', fetchError);
    return;
  }

  console.log(`📦 Found ${chunks.length} chunks to fix\n`);

  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    console.log(`Processing ${i + 1}/${chunks.length}: ${chunk.metadata.type} - ${chunk.metadata.title}`);

    try {
      // Generate embedding
      const response = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: chunk.content,
      });

      const embedding = response.data[0].embedding;
      
      // Update with proper vector format using SQL
      const { error: updateError } = await supabase.rpc('update_embedding', {
        chunk_id: chunk.id,
        new_embedding: embedding,
      });

      if (updateError) {
        console.error(`  ❌ Error updating: ${updateError.message}`);
        errorCount++;
      } else {
        successCount++;
      }
    } catch (error) {
      console.error(`  ❌ Error processing:`, error);
      errorCount++;
    }
  }

  console.log(`\n✨ Complete!`);
  console.log(`  ✅ Success: ${successCount}`);
  console.log(`  ❌ Failed: ${errorCount}`);
}

fixEmbeddings()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
