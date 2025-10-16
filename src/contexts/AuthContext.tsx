import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getUserInfo } from '../api/auth/getUserInfo';
import { signOut } from '../api/auth/signOut';

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (token: string) => {
    localStorage.setItem('token', token);

    try {
      const userInfo = await getUserInfo();
      setIsAuthenticated(true);
      setUser({
        name: userInfo.name,
        email: userInfo.email,
      });
    } catch (error) {
      console.error('Failed to get user info:', error);
      localStorage.removeItem('token');
      throw error;
    }
  };

  const logout = () => {
    signOut();
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          const userInfo = await getUserInfo();
          setIsAuthenticated(true);
          setUser({
            name: userInfo.name,
            email: userInfo.email,
          });
        } catch (error) {
          console.error('Failed to restore auth state:', error);
          localStorage.removeItem('token');
        }
      }

      setLoading(false);
    };

    initAuth();
  }, []);

  const value: AuthContextType = {
    isAuthenticated,
    user,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
