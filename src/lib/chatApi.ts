const SUPABASE_FUNCTION_URL = import.meta.env.VITE_SUPABASE_URL;

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export async function sendChatMessage(
  message: string,
  conversationHistory: ChatMessage[]
): Promise<string> {
  const functionUrl = `${SUPABASE_FUNCTION_URL}/functions/v1/chat`;
  
  const historyForAPI = conversationHistory.map(msg => ({
    role: msg.role,
    content: msg.content,
  }));

  const response = await fetch(functionUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      conversationHistory: historyForAPI,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to get response from AI assistant');
  }

  const data = await response.json();
  return data.response;
}
