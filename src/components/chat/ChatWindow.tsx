import { useEffect, useRef } from 'react';
import { X, Trash2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { useChatAssistant } from '@/hooks/useChatAssistant';

interface ChatWindowProps {
  onClose: () => void;
}

const SUGGESTED_QUESTIONS = [
  "What projects has Vaibhavee worked on?",
  "Tell me about Vaibhavee's skills",
  "What is Vaibhavee's educational background?",
  "What achievements does Vaibhavee have?",
];

export function ChatWindow({ onClose }: ChatWindowProps) {
  const { messages, isLoading, sendMessage, clearConversation } = useChatAssistant();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSuggestedQuestion = (question: string) => {
    sendMessage(question);
  };

  return (
    <div className="flex flex-col h-full bg-black/80 backdrop-blur-xl border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-500/20 overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 to-teal-500/10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center animate-pulse">
              <Sparkles className="text-white" size={20} />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-black/80" />
          </div>
          <div>
            <h3 className="font-semibold text-white flex items-center gap-2">
              URSA
              <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full border border-green-500/30">ONLINE</span>
            </h3>
            <p className="text-xs text-cyan-300">Vaibhavee's Best Friend</p>
          </div>
        </div>
        <div className="flex gap-2">
          {messages.length > 0 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={clearConversation}
              title="Clear conversation"
            >
              <Trash2 size={18} />
            </Button>
          )}
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X size={20} />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4 bg-gradient-to-b from-transparent via-black/20 to-transparent" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Sparkles className="text-white" size={32} />
              </div>
              <h4 className="font-semibold text-lg mb-2 text-white">Hey there! I'm Ursa 👋</h4>
              <p className="text-cyan-200 text-sm mb-6">
                Vaibhavee's best friend and companion! I know everything about her journey, projects, and dreams. What would you like to know?
              </p>
              <div className="space-y-2">
                <p className="text-xs text-cyan-400 font-medium mb-3 uppercase tracking-wider">SUGGESTIONS</p>
                {SUGGESTED_QUESTIONS.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestion(question)}
                    className="block w-full text-left px-4 py-3 rounded-lg bg-gradient-to-r from-cyan-500/10 to-teal-500/10 hover:from-cyan-500/20 hover:to-teal-500/20 text-sm transition-all border border-cyan-500/20 hover:border-cyan-500/40 text-cyan-100 hover:text-white"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((message, index) => (
                <ChatMessage key={index} message={message} />
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center">
                    <Sparkles size={18} className="animate-pulse text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="inline-block rounded-2xl px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 border border-cyan-500/30">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 to-teal-500/10">
        <ChatInput onSend={sendMessage} disabled={isLoading} />
      </div>
    </div>
  );
}
