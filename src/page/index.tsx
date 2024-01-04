import { useState } from 'react'
import { getSysInfo,getDiskInfo,postLogin } from '../utils/gomock'
import UserName from './components/username'
import IButton from './components/newbtn'
import {userFormData} from '../model/index'
import { useNavigate } from 'react-router-dom'


export default function Index(){
  const [count, setCount] = useState(0);
  const [islogined, setLogined] = useState(false);
  const [formobj, setFormObj] = useState<userFormData>({username:'',password:''});
  const [preview, setPreview] = useState<any>('');
  const [classBtn, setClassBtn] = useState(true);
  const [childBtn, setChildBtn] = useState('Child Btn');
  const navigate = useNavigate();

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

  const loginSubmit = ()=>{
    console.log(formobj);
    setPreview(outputJson(formobj));
    postLogin(formobj).then((res:any)=>{
      console.log(res,'after login chk');
      if(res.code=='200' && res.token){
        sessionStorage.setItem('_token',res.token);
        setLogined(true);
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
    <UserName label='Password:' type='password' onChange={logPassword}></UserName>
    <div>
      <input type="button" value="Submit" onClick={()=>fireSubmit()}/> <input type="button" value="Auth" onClick={()=>fireSubmitWithAuth()}/>
      &nbsp;<input type="button" value="Login" onClick={()=>loginSubmit()}/> {classBtn && <IButton onClick={()=>umMountClsBtn()} defaultText={childBtn}/>}
      <input type="button" value="Golink" onClick={()=>goGoogle()}/>
    </div>
    <div>{count}</div>
    {islogined ? <div>Logined</div> : ''}
    <div><code>{preview}</code></div>
    <img src="https://cbimg.xchuan.workers.dev/thumb/mini/article/2023/1228/306663c16ebe9cd.jpg"/>
  </div>;
}