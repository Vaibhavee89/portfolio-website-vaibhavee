import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkKnowledgeBase() {
  console.log('🔍 Checking knowledge base contents...\n');

  const { data, error } = await supabase
    .from('knowledge_base')
    .select('id, content, metadata')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('❌ Error fetching knowledge base:', error);
    return;
  }

  if (!data || data.length === 0) {
    console.log('⚠️  Knowledge base is empty!');
    return;
  }

  console.log(`✅ Found ${data.length} chunks in knowledge base\n`);

  const typeGroups = data.reduce((acc, chunk) => {
    const type = chunk.metadata.type;
    if (!acc[type]) acc[type] = [];
    acc[type].push(chunk);
    return acc;
  }, {} as Record<string, any[]>);

  Object.entries(typeGroups).forEach(([type, chunks]) => {
    console.log(`\n📁 ${type.toUpperCase()} (${chunks.length} chunks):`);
    chunks.forEach((chunk, idx) => {
      const title = chunk.metadata.title || 'Untitled';
      const preview = chunk.content.substring(0, 150).replace(/\n/g, ' ');
      console.log(`  ${idx + 1}. ${title}`);
      console.log(`     Preview: ${preview}...`);
    });
  });

  console.log('\n\n🔍 Checking project chunks specifically:');
  const projectChunks = data.filter(c => c.metadata.type === 'project');
  projectChunks.forEach((chunk, idx) => {
    console.log(`\n--- Project ${idx + 1}: ${chunk.metadata.title} ---`);
    console.log(chunk.content);
    console.log('---');
  });
}

checkKnowledgeBase()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('Error:', error);
    process.exit(1);
  });
