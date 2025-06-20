
import { useState } from 'react';
import { Terminal, Layout } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InterfaceToggleProps {
  isCLI: boolean;
  onToggle: (isCLI: boolean) => void;
}

const InterfaceToggle = ({ isCLI, onToggle }: InterfaceToggleProps) => {
  return (
    <div className="fixed top-4 right-4 z-50">
      <Button
        onClick={() => onToggle(!isCLI)}
        variant={isCLI ? "default" : "outline"}
        size="sm"
        className="flex items-center gap-2"
      >
        {isCLI ? (
          <>
            <Layout size={16} />
            GUI Mode
          </>
        ) : (
          <>
            <Terminal size={16} />
            CLI Mode
          </>
        )}
      </Button>
    </div>
  );
};

export default InterfaceToggle;
