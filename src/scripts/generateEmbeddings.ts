import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';
import { aggregateKnowledgeBase } from './aggregateKnowledgeBase';
import type { KnowledgeChunk } from './aggregateKnowledgeBase';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const openai = new OpenAI({
  apiKey: process.env.VITE_OPENAI_API_KEY || process.env.OPENAI_API_KEY,
});

async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
    });
    return response.data[0].embedding;
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw error;
  }
}

async function clearKnowledgeBase() {
  console.log('🗑️  Clearing existing knowledge base...');
  const { error } = await supabase
    .from('knowledge_base')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000');
  
  if (error) {
    console.error('Error clearing knowledge base:', error);
    throw error;
  }
  console.log('✅ Knowledge base cleared');
}

async function insertKnowledgeChunk(chunk: KnowledgeChunk, embedding: number[]) {
  // Insert embedding as JSON array - Supabase will handle the conversion to vector type
  const { error } = await supabase
    .from('knowledge_base')
    .insert({
      content: chunk.content,
      metadata: chunk.metadata,
      embedding: JSON.stringify(embedding),
    });

  if (error) {
    console.error('Error inserting chunk:', error);
    throw error;
  }
}

async function generateAndStoreEmbeddings() {
  try {
    console.log('🚀 Starting embedding generation process...\n');

    console.log('📚 Step 1: Aggregating knowledge base...');
    const chunks = await aggregateKnowledgeBase();
    console.log(`✅ Aggregated ${chunks.length} chunks\n`);

    console.log('🗑️  Step 2: Clearing existing embeddings...');
    await clearKnowledgeBase();
    console.log('');

    console.log('🔮 Step 3: Generating and storing embeddings...');
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      try {
        console.log(`  Processing chunk ${i + 1}/${chunks.length}: ${chunk.metadata.type} - ${chunk.metadata.title || 'Untitled'}`);
        
        const embedding = await generateEmbedding(chunk.content);
        await insertKnowledgeChunk(chunk, embedding);
        
        successCount++;
        
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`  ❌ Error processing chunk ${i + 1}:`, error);
        errorCount++;
      }
    }

    console.log('\n✨ Embedding generation complete!');
    console.log(`  ✅ Successfully processed: ${successCount} chunks`);
    if (errorCount > 0) {
      console.log(`  ❌ Failed: ${errorCount} chunks`);
    }
    console.log('\n🎉 Knowledge base is ready for use!');

  } catch (error) {
    console.error('\n❌ Fatal error during embedding generation:', error);
    throw error;
  }
}

// Run if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  generateAndStoreEmbeddings()
    .then(() => {
      console.log('\n✅ All done! You can now use the AI assistant.');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Failed to generate embeddings:', error);
      process.exit(1);
    });
}

export { generateAndStoreEmbeddings, generateEmbedding };
