
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState} from 'react'
import { logout } from '../../utils/auth'
import { User } from '../../utils/user'
import Timer from "./timer";

interface menuProps {
  theme?:string;
  onThemeChange?: (theme:string) => string;
  authInfo?: User | null;
}
export default function Menu(props:menuProps){
  const alink = [{name:'baidu',link:'https://www.baidu.com'}];
  const [themeStatus, setThemeStatus] = useState('');
  const navigate = useNavigate();

  const swithcTheme = (theme:string)=>{
    console.log(themeStatus,theme,props.theme,"in menu")
    if(props.onThemeChange){
      if(themeStatus=='dark'){
        props.onThemeChange('light');
        setThemeStatus('light');
      }else{
        const nowtheme = props.onThemeChange(theme);
        if(props.theme=='dark'){
          props.onThemeChange('light');
          setThemeStatus('light');
        }else{
          console.log(nowtheme,"nowthemenowtheme")
          setThemeStatus(nowtheme);
        }
        
      }
    }
  }

  const setTheme = (theme:string)=>{
    props.onThemeChange && props.onThemeChange(theme);
  }

  const logoutAction = ()=>{
    logout();
    navigate('/');
  }

  const timerChangeTheme = (hours:number,mins:number)=>{
    //console.log("timerChangeTheme",hours,mins,themeStatus);
    if(hours>=17 && hours<7 && mins>=30 && themeStatus!='dark'){
      props.onThemeChange && props.onThemeChange('dark');
      setThemeStatus('dark');
    }
    if(hours>=7 && hours<17 && mins>=0 && themeStatus!='light'){
      props.onThemeChange && props.onThemeChange('light');
      setThemeStatus('light');
    }
  }

  return (
    <ul className="leftmenu">
      <li><Link to="/"><em>𖠿</em><span>首页</span></Link></li>
      <li><Link to="/login"><em>☺</em><span>登录</span></Link> {props.authInfo ? (<Link to="/reg">注册</Link>) : ''}</li>
      <li><Link to="/about"><em>●</em><span>关于</span></Link> <Link to="/welcome/高级用户"><em>♛</em><span>VIP</span></Link></li>
      <li><Link to="/links"><em>⎋</em><span>友情链接</span></Link></li>
      <li><NavLink to={`link?name=${alink[0].name}&link=${alink[0].link}`}><em>⎋</em><span>链接A</span></NavLink></li>
      <li><NavLink to="link" state={{name:'google',link:'http://www.google.com.hk'}}><em>⎋</em><span>链接B</span></NavLink></li>
      <li><Link to="/other"><em>⎋</em><span>其他链接</span></Link></li>
      {props.authInfo ? (<li><Link to="/up">上传</Link> </li>) : ''}
      {props.authInfo ? (<li><Link to="/bigdays">重大节日</Link> </li>) : ''}
      {props.authInfo && props.authInfo.user_name=='admin' ? (<li><Link to="/quote">维护名言</Link> </li>) : ''}
      <li><a onClick={()=>swithcTheme('dark')}><em>☼</em><span>切换主题</span></a></li>
      
      {props.authInfo ? (<li><a onClick={()=>logoutAction()} style={{cursor:'pointer'}}>退出</a></li>) : ''}

      <li><Timer themeChange={timerChangeTheme}/></li>
    </ul>
  )
}