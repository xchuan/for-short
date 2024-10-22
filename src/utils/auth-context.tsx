import { createContext, useState, ReactNode, useContext } from 'react'
import { User } from './user'
import { userFormData } from '../model/index'
import { authLogin, decodeJwt } from './auth'
export const AuthContext = createContext<{
  user: User | null;
  login: (form: userFormData) => Promise<void>;
  msg?: string;
  setUser?: React.Dispatch<React.SetStateAction<User | null>>
} | undefined>(undefined);

export const AuthProvider = ({children}:{children:ReactNode}) => {
  const [user, setUser] = useState<User | null>(null)
  const [loginMsg, setLoginMsg] = useState<string>("")
  const login = (form: userFormData) => {
    return authLogin(form).then((user) => setUser(user)).catch((error) => setLoginMsg(error))
  };

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, msg: loginMsg, setUser }}
    ></AuthContext.Provider>
  );
}

export const AppProviders = ({children}:{children:ReactNode}) => {
  return (
      <AuthProvider>
          {children}
      </AuthProvider>
  )
}
