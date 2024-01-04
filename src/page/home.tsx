import { ThemeContext } from '../App'
import {useContext} from 'react'
export default function Home(){

  const themeC = useContext(ThemeContext); 

  return (
    
    <>
      <div>this is Home Page.{themeC}</div>
    </>
  )
}