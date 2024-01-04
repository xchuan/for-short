import { get,post } from './http';

/**
 * 获取Sysinfo
 */
function getSysInfo(){
  return  get("/v1/sysinfo");
}
/**
 * 获取Diskinfo
 */
function getDiskInfo(){
  return  get("/v1/diskinfo");
}
/**
 * 登录
 */
function postLogin(params:any){
  return  post("/v1/login",params);
}

export {
  getSysInfo,getDiskInfo,
  postLogin
}