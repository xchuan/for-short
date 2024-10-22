import { createContext, useState, ReactNode, useContext } from 'react'
import { IThemeProps } from '../model/index'
// 主题色
export const themes: IThemeProps = {
  'light': {
    color: '#000',
    background: '#eee'
  },
  'dark': {
    color: '#fff',
    background: '#222'
  }
}

export const ThemeContext = createContext(themes['light']);