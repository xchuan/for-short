import React from 'react';

export interface userFormData {
  username:string;
  password:string;
  captcha?:string;
}

export interface IThemeProps {
  [key: string]: {
    color: string;
    background: string;
  }
}

// 主题色
const themes: IThemeProps = {
  'light': {
    color: '#000',
    background: '#eee'
  },
  'dark': {
    color: '#fff',
    background: '#222'
  }
}

export const ThemeContext = React.createContext(themes.dark)