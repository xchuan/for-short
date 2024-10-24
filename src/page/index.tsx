import { useState } from 'react'
import { getSysInfo,getDiskInfo,postLogin } from '../utils/gomock'
import UserName from './components/username'
import IButton from './components/newbtn'
import {userFormData} from '../model/index'
import { useNavigate, useLocation } from 'react-router-dom'
import { decodeJwt } from '../utils/auth'
import { useAuth } from '../hooks/use-auth';

export default function Index(){
  const [count, setCount] = useState(0);
  const [islogined, setLogined] = useState(false);
  const [formobj, setFormObj] = useState<userFormData>({username:'',password:''});
  const [preview, setPreview] = useState<any>('');
  const [classBtn, setClassBtn] = useState(true);
  const [childBtn, setChildBtn] = useState('Child Btn');
  const navigate = useNavigate();
  const location = useLocation();
  const { user, login, msg } = useAuth()
  console.log(import.meta.env.VITE_LOGIN_API)
  
  const fireSubmit = ()=>{
    setCount(count+1);
    setChildBtn('Open Button')
    getSysInfo().then((res:any)=>{
      console.log(res,'get sys info');
      setPreview(outputJson(res));
    });
  }

  const fireSubmitWithAuth = ()=>{
    setCount(count+1);
    getDiskInfo().then((res:any)=>{
      console.log(res,'get disk info');
      setPreview(outputJson(res));
    });
  }

  const logUsername = (usr: string) => {
    formobj.username = usr;
    setFormObj(formobj);
  };

  const logPassword = (pwd: string) => {
    formobj.password = pwd;
    setFormObj(formobj);
  };

  const authSubmit = ()=>{
    try {
      login(formobj);
    } catch (error) {
      console.log(error,'222222')
    }
  }

  const loginSubmit = ()=>{
    //setPreview(outputJson(formobj));
    postLogin(formobj).then((res:any)=>{
      console.log(res,'after login chk');
      if(res.code=='200' && res.token){
        sessionStorage.setItem('_token',res.token);
        const userInfo = decodeJwt(res.token);

        console.log(userInfo,location,"userInfo");
        setLogined(true);
        if(location.search){
          navigate(decodeURIComponent(location.search.replace('?back=','')));
        }
      }else{
        setLogined(false);
      }
    });
  }

  const outputJson = (obj:any) => {
    return JSON.stringify(obj)
  }

  const umMountClsBtn = ()=>{
    setClassBtn(false);
  }

  const goGoogle = ()=>{
    navigate('link',{
      state:{name:'bing',link:'http://www.bing.com'}
    });
  }


  return <div>
    <h2>Login</h2>
    <UserName label='Username:' onChange={logUsername}></UserName>
    <UserName label='Password:' type='password' onChange={logPassword} onEnter={authSubmit}></UserName>
    <div>
      <input type="button" value="Submit" onClick={()=>fireSubmit()}/> <input type="button" value="Auth" onClick={()=>fireSubmitWithAuth()}/>
      &nbsp;<input type="button" value="Login" style={{display:'none'}} onClick={()=>loginSubmit()}/><input type="button" value="Login" onClick={()=>authSubmit()}/> {classBtn && <IButton onClick={()=>umMountClsBtn()} defaultText={childBtn}/>}
      <input type="button" value="Golink" onClick={()=>goGoogle()}/>
    </div>
    <div>{count}</div>
    {(user && user?.logined) ? user.msg : msg}
    <div><code>{preview}</code></div>
    <img src="https://cbimg.xchuan.workers.dev/thumb/mini/article/2023/1228/306663c16ebe9cd.jpg"/>
  </div>;
}