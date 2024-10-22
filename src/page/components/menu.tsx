
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState} from 'react'
import { logout } from '../../utils/auth'
import { User } from '../../utils/user'


interface menuProps {
  onThemeChange?: (theme:string) => void;
  authInfo?: User | null;
}
export default function Menu(props:menuProps){
  const alink = [{name:'baidu',link:'https://www.baidu.com'}];
  const [themeStatus, setThemeStatus] = useState('light');
  const navigate = useNavigate();

  const setTheme = (theme:string)=>{
    props.onThemeChange && props.onThemeChange(theme);
  }

  const logoutAction = ()=>{
    logout();
    navigate('/');
  }

  return (
    <ul className="leftmenu">
      <li><Link to="/">首页</Link></li>
      <li><Link to="/login">登录</Link> {props.authInfo ? (<Link to="/reg">注册</Link>) : ''}</li>
      <li><Link to="/about">关于</Link> <Link to="/welcome/高级用户">VIP</Link></li>
      <li><Link to="/links">友情链接</Link></li>
      <li><NavLink to={`link?name=${alink[0].name}&link=${alink[0].link}`}>链接A</NavLink></li>
      <li><NavLink to="link" state={{name:'google',link:'http://www.google.com.hk'}}>链接B</NavLink></li>
      <li><Link to="/other">其他链接</Link></li>
      {props.authInfo ? (<li><Link to="/up">上传</Link> </li>) : ''}
      {props.authInfo && props.authInfo.user_name=='admin' ? (<li><Link to="/quote">维护名言</Link> </li>) : ''}
      <li>切换<a onClick={()=>setTheme('dark')}>深色</a>/<a onClick={()=>setTheme('light')}>浅色</a></li>
      
      {props.authInfo ? (<li><a onClick={()=>logoutAction()} style={{cursor:'pointer'}}>退出</a></li>) : ''}
    </ul>
  )
}