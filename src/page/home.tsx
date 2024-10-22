import { ThemeContext } from '../utils/theme-context'
import {useContext} from 'react'
export default function Home(){

  const themeC = useContext(ThemeContext); 

  const style = {
    color:themeC.color,
    background:themeC.background
  }

  console.log(themeC,"themeC");

  return (
    
    <>
      <div style={style}>this is Home Page.{themeC.color}</div>
    </>
  )
}