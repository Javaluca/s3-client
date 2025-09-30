import React, { createContext, useState, useEffect, type ReactNode, useContext } from 'react';
import type { User, AuthContextType } from '../types/auth';
import { ListBucketsCommand, S3, type ListBucketsCommandOutput } from '@aws-sdk/client-s3';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [s3Client, setS3Client] = useState<S3 | null>(null);

  function createS3Client(user: User): S3 {
    if (!user) {
      throw new Error('Missing user');
    }
    if (!user.host) {
      throw new Error('Missing s3 host endpoint');
    }
    if (!user.accesskey) {
      throw new Error('Missing access key');
    }
    if (!user.secretKey) {
      throw new Error('Missing secret key');
    }

    return new S3({
          endpoint: user.host,
          credentials: {
            accessKeyId: user.accesskey,
            secretAccessKey: user.secretKey
          },
          region: 'default'
        });
  }

  // Simula il controllo del token salvato al caricamento dell'app
  useEffect(() => {
    const checkAuth = async () => {
      const infos = localStorage.getItem('authinfos');
      if (infos) {
        // Qui faresti una chiamata API per validare il token
        // Per ora simulo con un utente fake
        const user: User = JSON.parse(infos);
        setUser(user);
        setS3Client(createS3Client(user));
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (host: string, accesskey: string, secretkey: string): Promise<boolean> => {
    /*if (!s3Client) {
      return false;
    }*/
    setIsLoading(true);
    
    try {

      const user: User = {
        host: host,
        accesskey: accesskey,
        secretKey: secretkey
      };

      const s3: S3 = createS3Client(user);

      setS3Client(s3);

      const output: ListBucketsCommandOutput = await s3.send(new ListBucketsCommand());
      // Simula credenziali valide
      if (output) {
        const userJson = JSON.stringify(user);
        setUser(user);
        localStorage.setItem('authinfos', userJson);
        return true;
      } 

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
    isLoading,
    s3Client
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