import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  console.log('Testing Supabase connection...\n');
  
  try {
    // Test projects table
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('id, title')
      .limit(3);
    
    if (projectsError) {
      console.error('❌ Projects table error:', projectsError.message);
      console.log('\n⚠️  Database tables not found. Please run the SQL schema in Supabase dashboard.');
      return;
    }
    
    console.log('✅ Projects table:', projects?.length || 0, 'records');
    
    // Test other tables
    const { data: skills } = await supabase.from('skills').select('id').limit(1);
    const { data: certs } = await supabase.from('certifications').select('id').limit(1);
    const { data: edu } = await supabase.from('education').select('id').limit(1);
    const { data: work } = await supabase.from('work_experience').select('id').limit(1);
    
    console.log('✅ Skills table:', skills?.length || 0, 'records');
    console.log('✅ Certifications table:', certs?.length || 0, 'records');
    console.log('✅ Education table:', edu?.length || 0, 'records');
    console.log('✅ Work Experience table:', work?.length || 0, 'records');
    
    console.log('\n✅ Database is ready! You can proceed with Stage 2.');
    
  } catch (error) {
    console.error('❌ Connection test failed:', error);
  }
}

testConnection();
