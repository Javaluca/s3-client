import React, { createContext, useState, useEffect, type ReactNode, useContext } from 'react';
import type { User, AuthContextType } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simula il controllo del token salvato al caricamento dell'app
  useEffect(() => {
    const checkAuth = async () => {
      const infos = localStorage.getItem('authinfos');
      if (infos) {
        // Qui faresti una chiamata API per validare il token
        // Per ora simulo con un utente fake
        const user: User = JSON.parse(infos);
        setUser(user);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (host: string, accesskey: string, secretkey: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simula una chiamata API di login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simula credenziali valide
      if (accesskey === '123' && secretkey === '456') {
        const user: User = {
          host: host,
          accesskey: accesskey,
          secretKey: secretkey
        };

        const userJson = JSON.stringify(user);
        setUser(user);
        localStorage.setItem('authinfos', userJson);
        return true;
      } 

      return false;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authinfos');
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};