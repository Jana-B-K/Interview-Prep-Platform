import type { ReactNode } from 'react';
import { useState } from 'react';
import { AuthContext } from './auth-context';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem('token')),
  );
  const [role, setRole] = useState('');

  const login = (token: string, role: string) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    setRole(role)
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, role }}>
      {children}
    </AuthContext.Provider>
  );
}
