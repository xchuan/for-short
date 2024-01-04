import React from 'react'
import {Navigate, useLocation} from "react-router-dom";

type RouteProps = {
  children?: React.ReactNode
}

const loginRoute = '/login'
const indexRoute = '/'
// 路由表白名单
const allowList = ['/','/login', '/reg']

const AuthRoute: React.FC<RouteProps> = (props) => {
  const location = useLocation();
  // children 为子组件
  const {children} = props
  const token = sessionStorage.getItem('_token');
  if (token && token !== 'undefined') {
    if (location.pathname === loginRoute) {
      return <Navigate to={indexRoute}></Navigate>
    } else {
        // 其他路由均可正常跳转
        return <>{children}</>
    }
  }else{
    if (allowList.includes(location.pathname || '')) {
      return <>{children}</>
    } else {
        // 无 token 且非白名单路由，重定向至登录页
        return <Navigate to={loginRoute}></Navigate>
    }
  }
  //return <>{children}</>
}
export default AuthRoute