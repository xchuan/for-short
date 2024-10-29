import { useState, useEffect, useRef } from "react";
import { useTitle } from "../../hooks/use-title";
//import { CounterData } from "../../utils/user";

interface timerProps {
  themeChange?: (hours:number,mins:number) => void;
}

export default function Timer(props:timerProps) {
  const [timer, setTimer] = useState<string>("");
  const [secs, setSeconds] = useState<number>(-1);
  const oldTitle = useRef(document.title).current;
  const formattedTime = (showSecond:boolean=true) => {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    // 添加前导零，确保时间格式一致
    const hourstr = (hours < 10 ? "0" : "") + hours;
    const minutestr = (minutes < 10 ? "0" : "") + minutes;
    const secondstr = (seconds < 10 ? "0" : "") + seconds;
    
    if(showSecond)
      return {time:hourstr + ":" + minutestr + ":" + secondstr,secs:seconds,_t:currentTime};
    //hourstr + ":" + minutestr + ":" + secondstr;
    return {time:hourstr + ":" + minutestr,secs:seconds,_t:currentTime};
    /*if(seconds==0 || seconds==59){
      setSeconds(seconds);
    }
    // 构建时间字符串
    setTimer(hourstr + ":" + minutestr + ":" + secondstr);*/
  };

  const loopDatetime = () => {
    const t = formattedTime();
    if(t.secs==0 || t.secs==59){
      setSeconds(t.secs);
    }
    setTimer(t.time);
  }

  useEffect(() => {
    setTimer(formattedTime().time);
    setInterval(loopDatetime, 1000);
  }, []);

  useEffect(() => {
    // 根据传入的 title 更新 document.title
    if(secs==0){
      const updateTitle = formattedTime(false);
      document.title = updateTitle.time;
      console.log(updateTitle._t.getMinutes(),"ddd");
      if(props.themeChange){
        props.themeChange(updateTitle._t.getHours(),updateTitle._t.getMinutes());
      }
    }
  }, [secs]);

  return <div>{timer}</div>;
}
