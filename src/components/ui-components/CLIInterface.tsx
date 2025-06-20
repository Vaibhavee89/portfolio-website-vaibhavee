
import { useState, useEffect, useRef } from 'react';
import { Terminal } from 'lucide-react';

interface Command {
  input: string;
  output: string;
}

const CLIInterface = () => {
  const [commands, setCommands] = useState<Command[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const availableCommands = {
    help: 'Available commands: about, projects, skills, contact, blogs, clear, exit',
    about: 'Hi! I\'m Vaibhavee, a passionate developer and tech enthusiast. I love creating innovative solutions and exploring new technologies.',
    projects: 'My Projects:\n• Portfolio Website - Personal showcase\n• QuizWhiz - Interactive quiz app\n• Short.ly - URL shortening service\n• Crypto Wallet Mobile App - UI/UX Design\n• Sudoku Solver - C++ backtracking algorithm\n• Ziplyn - File compression utility in Rust',
    skills: 'Technical Skills:\n• Frontend: React, TypeScript, Tailwind CSS\n• Backend: Node.js, Express\n• Languages: JavaScript, C++, Rust\n• Tools: Git, VS Code, Figma',
    contact: 'Get in touch:\n• Email: vaibhavee.singh@example.com\n• LinkedIn: /in/vaibhavee-singh\n• GitHub: /vaibhavee-singh',
    blogs: 'Check out my blog posts on dev.to/vaibhavee_singh89',
    clear: 'CLEAR_TERMINAL',
    exit: 'EXIT_CLI'
  };

  useEffect(() => {
    if (commands.length === 0) {
      const welcomeMessage = {
        input: '',
        output: 'Welcome to Vaibhavee\'s Portfolio CLI\nType "help" to see available commands.\n'
      };
      setCommands([welcomeMessage]);
    }
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commands]);

  const handleCommand = (input: string) => {
    const trimmedInput = input.trim().toLowerCase();
    let output = '';

    if (trimmedInput in availableCommands) {
      output = availableCommands[trimmedInput as keyof typeof availableCommands];
    } else if (trimmedInput === '') {
      output = '';
    } else {
      output = `Command not found: ${trimmedInput}\nType "help" for available commands.`;
    }

    const newCommand: Command = { input: `> ${input}`, output };
    setCommands(prev => [...prev, newCommand]);

    if (output === 'CLEAR_TERMINAL') {
      setCommands([]);
    } else if (output === 'EXIT_CLI') {
      // This will be handled by the parent component
      return 'EXIT';
    }

    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = handleCommand(currentInput);
    if (result === 'EXIT') {
      // Parent component will handle this
      return;
    }
    setCurrentInput('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      // Simple autocomplete for help command
      if (currentInput.startsWith('h')) {
        setCurrentInput('help');
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-4 text-green-300">
          <Terminal size={20} />
          <span>Vaibhavee's Portfolio Terminal</span>
        </div>
        
        <div 
          ref={terminalRef}
          className="h-[70vh] overflow-y-auto mb-4 p-4 border border-green-600 rounded bg-gray-900"
        >
          {commands.map((cmd, index) => (
            <div key={index} className="mb-2">
              {cmd.input && (
                <div className="text-green-400">{cmd.input}</div>
              )}
              {cmd.output && (
                <div className="text-green-300 whitespace-pre-line pl-2">
                  {cmd.output}
                </div>
              )}
            </div>
          ))}
          
          <form onSubmit={handleSubmit} className="flex items-center">
            <span className="text-green-400 mr-2">{'>'}</span>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 bg-transparent outline-none text-green-400 caret-green-400"
              autoFocus
              spellCheck={false}
            />
          </form>
        </div>
        
        <div className="text-sm text-green-600">
          <p>Tip: Use Tab for autocomplete • Type "exit" to return to GUI mode</p>
        </div>
      </div>
    </div>
  );
};

export default CLIInterface;
