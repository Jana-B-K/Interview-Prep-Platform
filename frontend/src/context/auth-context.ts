import { createContext } from 'react';

export interface AuthContextType {
  isAuthenticated: boolean;
  role: string;
  login: (token: string, role: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
