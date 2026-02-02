import { useState } from 'react';
import { MessageCircle, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChatWindow } from './ChatWindow';

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
          isOpen ? 'w-[450px] h-[650px]' : 'w-auto h-auto'
        }`}
      >
        {isOpen ? (
          <ChatWindow onClose={() => setIsOpen(false)} />
        ) : (
          <div className="relative group">
            {/* Floating badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-[10px] px-2 py-0.5 rounded-full shadow-lg flex items-center gap-1 animate-pulse whitespace-nowrap z-10">
              <Sparkles size={10} />
              <span className="font-semibold tracking-wide">URSA AI</span>
            </div>
            
            {/* Status indicator */}
            <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background animate-pulse z-10" />
            
            <Button
              onClick={() => setIsOpen(true)}
              size="lg"
              className="h-16 w-16 rounded-full bg-gradient-to-br from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:via-teal-400 hover:to-emerald-400 shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-110 border-2 border-cyan-400/30"
            >
              <MessageCircle size={28} className="text-white" />
            </Button>
            
            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <div className="bg-gradient-to-r from-cyan-500/90 to-teal-500/90 backdrop-blur-md text-white text-sm px-4 py-2 rounded-lg shadow-xl whitespace-nowrap border border-cyan-400/30">
                <p className="font-medium">URSA - ONLINE</p>
                <p className="text-xs text-cyan-100">Vaibhavee's best friend & companion</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <style>{`
        @media (max-width: 768px) {
          .fixed.bottom-6.right-6 {
            bottom: 1rem;
            right: 1rem;
          }
          .fixed.bottom-6.right-6.w-\\[450px\\] {
            width: calc(100vw - 2rem);
            height: calc(100vh - 2rem);
            max-width: 450px;
            max-height: 650px;
          }
        }
      `}</style>
    </>
  );
}
