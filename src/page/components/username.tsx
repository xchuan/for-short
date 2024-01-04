import { useState } from 'react'

interface inputItemProps {
  label:string;
  type?:string;
  limit?:number;
  onChange: (params: any) => any;
}

export default function UserName(props:inputItemProps){
  const [input, setInput] = useState<any>('');
  let input_len = 0;

  let fireNewVal = (val:string)=>{
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

  return (
    <>
      <div>
        {props.label}<input onChange={handleCnhange} type={!props.type ? "text" : props.type} value={input}/>
        <span onClick={()=>{changeVal('11111')}}>{input.length}</span>
      </div>
    </>  
  )
}