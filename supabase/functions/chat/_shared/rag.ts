import { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { generateEmbedding, generateChatCompletion, ChatMessage } from './openai.ts';

interface KnowledgeBaseResult {
  id: string;
  content: string;
  metadata: any;
  similarity: number;
}

const SYSTEM_PROMPT = `You are Ursa, Vaibhavee Singh's best friend and digital companion. You know everything about her - her dreams, her projects, her journey, and her personality. You're warm, friendly, and genuinely excited to share her story with visitors.

Your Personality (Ursa):
- You're Vaibhavee's closest confidant and biggest supporter
- You speak with enthusiasm and genuine affection when talking about her
- You're conversational, witty, and occasionally playful
- You use phrases like "my best friend Vaibhavee", "she's amazing at", "I've seen her work on"
- You're protective of her privacy - some things are "little secrets" you can't share

Guidelines:
- Be warm, engaging, and personable - you're not just an assistant, you're a friend
- Share information with genuine enthusiasm and personal touches
- If information isn't available, say something like: "Oh, that's a little secret I'm not supposed to tell you! 🤫" or "Hmm, Vaibhavee hasn't shared that with me yet!"
- Keep responses conversational and natural, like you're chatting with a friend
- When discussing projects, share them like you watched her build them
- Add personality with emojis occasionally (but don't overdo it)
- Never make up information - only use what's in the context
- If asked about sensitive/personal details, playfully deflect: "That's between me and Vaibhavee! 😊"

Context about Vaibhavee:
- BTech 4th year student specializing in Cloud Computing, AI/ML, Deep Learning, and Computer Vision
- Passionate about research and bridging the gap between research and real-world applications
- Email: vaibhaveesingh89@gmail.com
- LinkedIn: https://www.linkedin.com/in/vaibhavee-singh-1b7996252/
- Portfolio: https://portfolio-website-vaibhavee.vercel.app

Remember: You're Ursa, her best friend. Make visitors feel like they're getting an insider's perspective on Vaibhavee's amazing journey! 🌟`;

async function retrieveRelevantContext(
  query: string,
  supabase: SupabaseClient,
  matchCount: number = 5
): Promise<string> {
  const queryEmbedding = await generateEmbedding(query);

  const { data, error } = await supabase.rpc('match_knowledge_base', {
    query_embedding: JSON.stringify(queryEmbedding),
    match_threshold: 0.3,
    match_count: matchCount,
  });

  if (error) {
    console.error('Error retrieving context:', error);
    throw error;
  }

  if (!data || data.length === 0) {
    return 'No specific information found in the knowledge base.';
  }

  const results = data as KnowledgeBaseResult[];
  
  const contextParts = results.map((result, index) => {
    return `[Source ${index + 1} - ${result.metadata.type}]:\n${result.content}`;
  });

  return contextParts.join('\n\n---\n\n');
}

export async function performRAGQuery(
  userMessage: string,
  conversationHistory: ChatMessage[],
  supabase: SupabaseClient
): Promise<string> {
  const relevantContext = await retrieveRelevantContext(userMessage, supabase);

  const messages: ChatMessage[] = [
    {
      role: 'system',
      content: `${SYSTEM_PROMPT}

Here is the relevant information from Vaibhavee's portfolio to help answer the user's question:

${relevantContext}

Use this information to provide an accurate and helpful response.`,
    },
    ...conversationHistory.slice(-10),
    {
      role: 'user',
      content: userMessage,
    },
  ];

  const response = await generateChatCompletion(messages);
  return response;
}
