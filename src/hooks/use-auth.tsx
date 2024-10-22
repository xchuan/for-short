// src/hooks/use-auth.tsx
import { useContext } from 'react';
import { AuthContext } from '../utils/auth-context';

export const useAuth = () => {
  const context = useContext(AuthContext)
  if(!context){
      throw new Error('useAuth必须在AuthProvider中使用')
  }
  return context
}