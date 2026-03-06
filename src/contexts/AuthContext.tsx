import { createContext, useContext, useEffect, useState } from 'react';

// Mock User and Session types since Supabase is disabled
type User = {
  id: string;
  email?: string;
} | null;

type Session = {
  user: User;
  access_token: string;
} | null;

interface AuthContextType {
  user: User;
  session: Session;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [session, setSession] = useState<Session>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user was previously logged in (localStorage)
    const savedUser = localStorage.getItem('mock_auth_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setSession({ user: parsedUser, access_token: 'mock_token' });
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    // Mock authentication - accept any credentials for now
    // In production, this would validate against a backend
    if (email && password) {
      const mockUser = { id: '1', email };
      setUser(mockUser);
      setSession({ user: mockUser, access_token: 'mock_token' });
      localStorage.setItem('mock_auth_user', JSON.stringify(mockUser));
      return { error: null };
    }
    return { error: { message: 'Invalid credentials' } };
  };

  const signOut = async () => {
    setUser(null);
    setSession(null);
    localStorage.removeItem('mock_auth_user');
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
