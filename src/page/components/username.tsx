import { useState } from 'react'

interface inputItemProps {
  label:string;
  type?:string;
  limit?:number;
  onChange: (params: any) => any;
  onEnter?: () => any;
  autoRedirect?: boolean;
}

export default function UserName(props:inputItemProps){
  const [input, setInput] = useState<any>('');
  let input_len = 0;

  const fireNewVal = (val:string)=>{
    props.onChange(val);
    setInput(val);
  }

  const handleCnhange = (e: any) => {
    const value = e.target.value
    input_len = input.lenght
    fireNewVal(value)
  }

  const changeVal = (newVal:string)=>{
    fireNewVal(newVal)
  }

  const inputParams = {
    onChange:handleCnhange,
    //onKeyDown:(e) => (e.key === "Enter" ? props.onEnter() : null),
    type: !props.type ? "text" : props.type
  }

  if(props.onEnter){
    inputParams['onKeyDown'] = (e) => (e.key === "Enter" ? props.onEnter!() : null)
  }

  return (
    <>
      <div>
        {props.label}<input {...inputParams} value={input}/>
        <span onClick={()=>{changeVal('11111')}}>{input.length}</span>
      </div>
    </>  
  )
}