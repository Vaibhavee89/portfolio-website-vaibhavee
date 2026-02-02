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

async function testVectorSearch() {
  console.log('🧪 Testing vector search...\n');

  // Check embedding dimensions in database
  const { data: sampleChunk, error: fetchError } = await supabase
    .from('knowledge_base')
    .select('id, content, metadata, embedding')
    .limit(1)
    .single();

  if (fetchError) {
    console.error('❌ Error fetching sample chunk:', fetchError);
    return;
  }

  console.log('📊 Sample chunk from database:');
  console.log('  ID:', sampleChunk.id);
  console.log('  Type:', sampleChunk.metadata.type);
  console.log('  Title:', sampleChunk.metadata.title);
  console.log('  Embedding dimension:', sampleChunk.embedding?.length || 'N/A');
  console.log('  Content preview:', sampleChunk.content.substring(0, 100));

  // Generate a test query embedding
  console.log('\n🔍 Generating query embedding for: "What projects has Vaibhavee worked on?"');
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: 'What projects has Vaibhavee worked on?',
  });

  const queryEmbedding = response.data[0].embedding;
  console.log('  Query embedding dimension:', queryEmbedding.length);

  // Test the match_knowledge_base function with different thresholds
  console.log('\n🎯 Testing match_knowledge_base function...\n');

  for (const threshold of [0.3, 0.5, 0.7]) {
    console.log(`\n--- Testing with threshold: ${threshold} ---`);
    
    const { data, error } = await supabase.rpc('match_knowledge_base', {
      query_embedding: queryEmbedding,
      match_threshold: threshold,
      match_count: 5,
    });

    if (error) {
      console.error('❌ Error:', error);
      continue;
    }

    if (!data || data.length === 0) {
      console.log('  ⚠️  No results found');
      continue;
    }

    console.log(`  ✅ Found ${data.length} results:`);
    data.forEach((result: any, idx: number) => {
      console.log(`    ${idx + 1}. [${result.metadata.type}] ${result.metadata.title}`);
      console.log(`       Similarity: ${result.similarity.toFixed(4)}`);
      console.log(`       Preview: ${result.content.substring(0, 80)}...`);
    });
  }

  // Test with a project-specific query
  console.log('\n\n🔍 Testing with project-specific query: "Tell me about QuizWhiz"');
  const projectResponse = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: 'Tell me about QuizWhiz project',
  });

  const projectEmbedding = projectResponse.data[0].embedding;

  const { data: projectData, error: projectError } = await supabase.rpc('match_knowledge_base', {
    query_embedding: projectEmbedding,
    match_threshold: 0.3,
    match_count: 5,
  });

  if (projectError) {
    console.error('❌ Error:', projectError);
  } else if (!projectData || projectData.length === 0) {
    console.log('  ⚠️  No results found');
  } else {
    console.log(`  ✅ Found ${projectData.length} results:`);
    projectData.forEach((result: any, idx: number) => {
      console.log(`    ${idx + 1}. [${result.metadata.type}] ${result.metadata.title}`);
      console.log(`       Similarity: ${result.similarity.toFixed(4)}`);
    });
  }
}

testVectorSearch()
  .then(() => {
    console.log('\n✅ Test complete!');
    process.exit(0);
  })
  .catch(error => {
    console.error('\n❌ Test failed:', error);
    process.exit(1);
  });
