import { createContext , useState} from 'react'
//import Index from './page'
import { Link, NavLink, useRoutes} from 'react-router-dom'
import AuthRoute from './page/components/auth'
import {IThemeProps} from './model/index'
//import reactLogo from './assets/react.svg'
import routes from './routes'
import './App.css'

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

export const ThemeContext = createContext('light');

function App() {
  //const [count, setCount] = useState(0)
  const [theme, setTheme] = useState('light');
  const element = useRoutes(routes);
  const alink = [{name:'baidu',link:'https://www.baidu.com'}];

  const setThemeDark = ()=>{
    setTheme('dark');
  }
  const setThemeLight = ()=>{
    setTheme('light');
  }
  return (
    <>
      <ThemeContext.Provider value={theme}>
      <div className='main'>
        <div className='left'>
          <ul>
            <li><Link to="/">首页{theme}</Link></li>
            <li><Link to="/login">登录</Link> <Link to="/reg">注册</Link></li>
            <li><Link to="/about">关于</Link> <Link to="/welcome/高级用户">VIP</Link></li>
            <li><Link to="/links">友情链接</Link></li>
            <li><NavLink to={`link?name=${alink[0].name}&link=${alink[0].link}`}>链接A</NavLink></li>
            <li><NavLink to="link" state={{name:'google',link:'http://www.google.com.hk'}}>链接B</NavLink></li>
            <li><Link to="/other">其他链接</Link></li>
            <li>切换<a onClick={()=>setThemeDark()}>深色</a>/<a onClick={()=>setThemeLight()}>浅色</a></li>
          </ul>
        </div>
        <div className='view'>
          <AuthRoute>{element}</AuthRoute>
        </div>
      </div>
      </ThemeContext.Provider>
    </>
  )
}

export default App
