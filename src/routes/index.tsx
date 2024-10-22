import React,{lazy} from 'react'
import Index from '../page'
import Home from '../page/home'
import About from '../page/about'
import Links from '../page/links'
import Upload from '../page/upload'
import Uploadfile from '../page/up'
import Quote from '../page/quote'
//import { lazily } from 'react-lazily';
const Lazys = lazy(() => delayForDemo(import('../page/lazypage')));

function delayForDemo(promise:any) {
  return new Promise(resolve => {
    setTimeout(resolve, 2000);
  }).then(() => promise);
}

const withLoadingComponent = (comp:JSX.Element) =>(
  <React.Suspense fallback={<div>Loading······</div>}>
      {comp}
  </React.Suspense>
)

export default [
  {
    path:'/',
    element: <Home />
  },
  {
    path:'/login',
    element: <Index />
  },
  {
    path:'/reg',
    element: <Index />
  },
  {
    path:'/about',
    element: <About />
  },
  {
    path:'/links',
    element: <Links />
  },
  {
    path:'/link',
    element: <Links />
  },
  {
    path:'/upload',
    element: <Upload />
  },
  {
    path:'/up',
    element: <Uploadfile />
  },
  {
    path:'/quote',
    element: <Quote />
  },
  {
    path:'/welcome/:nickname',
    element: <About />
  },
  {
    path:'/other',
    element: withLoadingComponent(<Lazys/>)
  }
];