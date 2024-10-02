/**
 * 网络请求配置
 */
import axios from "axios";

const API_URL = import.meta.env.VITE_LOGIN_API;
//console.log(import.meta.env.VITE_LOGIN_API)
axios.defaults.timeout = 100000;
axios.defaults.baseURL = API_URL;

/**
 * http request 拦截器
 */
interface cfgPost {
  params?:any;
  headers?:any;
}

axios.interceptors.request.use(
  (config:any) => {
    console.log(config,config.data);
    if(!String(config.url).includes("cone.xhashao.top") && !String(config.url).includes("9002")){
      config.data = JSON.stringify(config.data);
      config.headers = {
        "Content-Type": "application/json",
        "accept":"*/*",
        //"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbiIsImlhdCI6MTcwMTE2MjcwMCwiZXhwIjoxNzAxMTYyODIwfQ.FZTYb8iK0qkRIpgeG-trJ-MWv59APvhBO9fMUf2lgPc"
      };
      const token  = sessionStorage.getItem('_token');
      console.log(token,'tttttttt');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }  
    }
    

    console.log(config,"config end");
    
    return config;
  },
  (error:any) => {
    return Promise.reject(error);
  }
);

/**
 * 封装get方法
 * @param url  请求url
 * @param params  请求参数
 * @returns {Promise}
 */
export function get(url:string, params = {} ,auth?:string) {
  return new Promise((resolve, reject) => {

    const cfg:cfgPost = {
      //params: params,
      headers: { Authorization: `Bearer 11111` }
    }
    axios.get(url,cfg).then((response) => {
        landing(url, params, response.data);
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url:string, data:any) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
      (response) => {
        //关闭进度条
        resolve(response.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
}

/**
 * 查看返回的数据
 * @param url
 * @param params
 * @param data
 */
function landing(url:string, params:any, data:any) {
  console.log(url,params,data);
}
