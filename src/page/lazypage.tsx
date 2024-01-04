import { getSysInfo,getDiskInfo,postLogin } from '../utils/gomock'

export default function Lazys(){

  const fireSubmitWithAuth = ()=>{
    getDiskInfo().then((res:any)=>{
      console.log(res,'get disk info');
      //disk:/_13%;/dev_100%;/System/Volumes/VM_1%;/System/Volumes/Preboot_1%;/System/Volumes/Update_1%;/System/Volumes/Data_66%;/System/Volumes/Update/mnt1_13%;100%_0,memory:4.44%,cpu:16.79%
    });
  }

  const downFile = ()=>{

  }

  const showImg = ()=>{

  }

  return (
    <>
      <div>Lazy load me! </div>
      <input type="button" value="Auth" onClick={()=>fireSubmitWithAuth()}/>
      <input type="button" value="Auth" onClick={()=>downFile()}/>
      <input type="button" value="Auth" onClick={()=>showImg()}/>
    </>
  )
}