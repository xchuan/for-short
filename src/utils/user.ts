export interface User {
  user_name: string;
  iat: string;
  exp: string;
  token?: string;
  logined?: boolean;
  msg?: string
}

export interface Iparam {
  username:string;
  password:string;
}