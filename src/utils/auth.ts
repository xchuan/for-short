import { User } from './user'
import { postLogin } from '../utils/gomock'
import { userFormData } from '../model/index'
function logout(){
  sessionStorage.removeItem("_token");
}

async function authLogin(form: userFormData){
  try {
    const res:any = await postLogin(form);
    if(res.code=='200' && res.short=="password error."){
      return Promise.reject(res.short);
    }
    if(res.code=='200' && res.token){
      const authInfo = decodeJwt(res.token);
      sessionStorage.setItem('_token',res.token);
      const usrData: User = {
        user_name: authInfo.user_name,
        iat: authInfo.iat,
        exp: authInfo.exp,
        token: res.token,
        msg: res.short,
        logined: true
      };
      return Promise.resolve(usrData);
    }
    return Promise.resolve(null);
  } catch (error) {
    return Promise.resolve(null);
  }
  
  
  /*postLogin(form).then((res:any)=>{
    if(res.code=='200' && res.token){
      const authInfo = decodeJwt(res.token);
      const usrData: User = {
        user_name: authInfo.user_name,
        iat: authInfo.iat,
        exp: authInfo.exp,
        token: res.token
      };
      return Promise.resolve(usrData);
    }else{
      return Promise.resolve(null);
    }
  });*/
  
}

function decodeJwt(token:string | null){
  if(!token) return ""
  const user = decodeURIComponent(window.atob(token.split('.')[1]));
  return JSON.parse(user)
}

export {
  logout, decodeJwt, authLogin
}