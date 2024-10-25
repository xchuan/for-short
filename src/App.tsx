import { createContext, useEffect, useState } from "react";
//import Index from './page'
import { Link, NavLink, useRoutes, useNavigate } from "react-router-dom";
import AuthRoute from "./page/components/auth";
import Menu from "./page/components/menu";
//import reactLogo from './assets/react.svg'
import routes from "./routes";
import { logout, decodeJwt } from "./utils/auth";
import { User } from "./utils/user";
import { ThemeContext, themes } from "./utils/theme-context";
import { useAuth } from "./hooks/use-auth";
import useDraggable from 'use-draggable-hook';
import { tzCompare } from "tz-compare";
import "./App.css";

function App() {
  //const [count, setCount] = useState(0)
  const [themeStatus, setThemeStatus] = useState("light");
  const [leftStyle, setLeftStyle] = useState({width: 200});

  const element = useRoutes(routes);
  const { target } = useDraggable<HTMLDivElement>({
    prevent:true,
    maxDistance:{
      x:{ max: 50, min: -50 }
    },
    direction: "horizontal",
    onMove:(target,pos,setPos) => {
      //console.log(pos);
      setLeftStyle({width:200+pos[0]});
    }
  })
  const { user, setUser } = useAuth();
  const token = sessionStorage.getItem("_token");

  const setTheme = (theme:string)=>{
    setThemeStatus(theme);
    return theme;
  }

  useEffect(() => {
    if(!token) {setUser && setUser(null);}
    if (token && !user) {
      const userInfo = decodeJwt(token);
      const usrData: User = {
        user_name: userInfo.user_name,
        iat: userInfo.iat,
        exp: userInfo.exp,
        token: token,
        logined: true,
      };
      setUser && setUser(usrData);
    }
  }, [token]);

  const themeC = themes[themeStatus]; 
  const mainStyle = {
    color:themeC.color,
    background:themeC.background
  }

  const toggleMenu = ()=>{
    if(leftStyle.width==150){
      setLeftStyle({width:50});
    }else{
      setLeftStyle({width:150});
    }
  }

  return (
    <>
      <ThemeContext.Provider value={themes[themeStatus]}>
        <div className={["main",leftStyle.width==50?"toggled":"normal",themeStatus].join(' ')}  style={mainStyle}>
          <div className="left" style={leftStyle}>
            <Menu authInfo={user} onThemeChange={setTheme}/>
            <div className="stick" onClick={toggleMenu}>░</div>
          </div>
          <div className="gap" ref={target}></div>
          <div className="view">
            <AuthRoute>{element}</AuthRoute>
            <div className="footer">{tzCompare("Shanghai","zh-CN")} Copyright &copy; 2024</div>
          </div>
        </div>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
