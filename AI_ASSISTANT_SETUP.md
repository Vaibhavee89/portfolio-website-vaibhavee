# AI Personal Assistant Setup Guide

This guide will help you set up and deploy the AI Personal Assistant feature for your portfolio website.

## Prerequisites

1. **OpenAI API Key**: Get one from https://platform.openai.com/api-keys
2. **Supabase Project**: Already configured
3. **Supabase CLI**: Install with `npm install -g supabase` (if not already installed)

## Step 1: Install Dependencies

```bash
npm install openai react-markdown remark-gfm
```

## Step 2: Configure Environment Variables

Add your OpenAI API key to your `.env` file:

```bash
# Add to .env
VITE_OPENAI_API_KEY=sk-your-openai-api-key-here
```

## Step 3: Setup Database Schema

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `supabase/knowledge_base_schema.sql`
4. Run the SQL script

This will:
- Enable the pgvector extension
- Create the `knowledge_base` table for storing embeddings
- Create the `chat_conversations` and `chat_messages` tables (optional)
- Set up RLS policies
- Create the vector similarity search function

## Step 4: Generate Knowledge Base Embeddings

Run the scripts to aggregate your portfolio data and generate embeddings:

```bash
# Aggregate knowledge base (test)
npx tsx src/scripts/aggregateKnowledgeBase.ts

# Generate and store embeddings
npx tsx src/scripts/generateEmbeddings.ts
```

**Note**: This will use OpenAI API credits. The cost is minimal (~$0.01-0.05 for typical portfolio data).

## Step 5: Deploy Supabase Edge Function

1. Login to Supabase CLI:
```bash
supabase login
```

2. Link your project:
```bash
supabase link --project-ref your-project-ref
```

3. Set the OpenAI API key as a secret:
```bash
supabase secrets set OPENAI_API_KEY=sk-your-openai-api-key-here
```

4. Deploy the chat function:
```bash
supabase functions deploy chat --no-verify-jwt
```

## Step 6: Test the Assistant

1. Start your development server:
```bash
npm run dev
```

2. Open your portfolio in the browser
3. Look for the floating chat button in the bottom-right corner
4. Click it and try asking questions like:
   - "What projects has Vaibhavee worked on?"
   - "Tell me about Vaibhavee's skills"
   - "What is Vaibhavee's educational background?"

## Step 7: Deploy to Production

1. Deploy your frontend to Vercel (as usual):
```bash
npm run build
# Deploy to Vercel
```

2. Make sure your environment variables are set in Vercel:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_OPENAI_API_KEY`

## Updating the Knowledge Base

When you update your portfolio data (projects, skills, etc.), regenerate the embeddings:

```bash
npx tsx src/scripts/generateEmbeddings.ts
```

This will:
1. Clear the existing knowledge base
2. Aggregate fresh data from your Supabase tables
3. Generate new embeddings
4. Store them in the database

## Troubleshooting

### Chat button doesn't appear
- Check browser console for errors
- Verify ChatWidget is imported in `src/App.tsx`

### "Failed to get response" error
- Check that the Edge Function is deployed: `supabase functions list`
- Verify OPENAI_API_KEY is set: `supabase secrets list`
- Check Edge Function logs: `supabase functions logs chat`

### Inaccurate responses
- Regenerate embeddings with latest data
- Adjust the `match_threshold` in `rag.ts` (lower = more results, higher = more strict)
- Modify the system prompt in `supabase/functions/chat/_shared/rag.ts`

### TypeScript errors in scripts
- These are expected for Deno Edge Functions (they run in Deno, not Node)
- The scripts will work fine when deployed to Supabase

## Cost Considerations

- **Embeddings**: ~$0.0001 per 1K tokens (one-time cost when generating)
- **Chat**: ~$0.002 per conversation (depends on GPT-4o-mini usage)
- **Storage**: Minimal (embeddings are small)

For a typical portfolio with 20-30 chunks, expect:
- Initial embedding generation: ~$0.01-0.05
- Monthly chat usage (100 conversations): ~$0.20-0.50

## Architecture

```
User Question
    ↓
Frontend (React)
    ↓
Supabase Edge Function
    ↓
1. Generate query embedding (OpenAI)
2. Vector similarity search (Supabase pgvector)
3. Retrieve relevant context
4. Generate response (OpenAI GPT-4o-mini)
    ↓
Return to user
```

## Features

✅ RAG-powered responses (no hallucination)
✅ Conversation memory (last 10 messages)
✅ Mobile-responsive chat UI
✅ Markdown support in responses
✅ Suggested questions
✅ Dark mode support
✅ Real-time data from Supabase

## Customization

### Change AI Model
Edit `supabase/functions/chat/_shared/openai.ts`:
```typescript
model: 'gpt-4o-mini', // Change to 'gpt-4' for better quality
```

### Adjust Response Style
Edit the system prompt in `supabase/functions/chat/_shared/rag.ts`

### Modify Suggested Questions
Edit `SUGGESTED_QUESTIONS` in `src/components/chat/ChatWindow.tsx`

### Change Chat Widget Position
Edit `src/components/chat/ChatWidget.tsx`:
```typescript
className="fixed bottom-6 right-6" // Change position
```

## Support

If you encounter issues:
1. Check the browser console for frontend errors
2. Check Supabase Edge Function logs
3. Verify all environment variables are set
4. Ensure the knowledge base has data: Check `knowledge_base` table in Supabase

## Next Steps

Consider adding:
- Analytics to track popular questions
- Feedback buttons (thumbs up/down)
- Export conversation feature
- Voice input/output
- Multi-language support
