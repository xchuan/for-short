import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';
import { AppProviders } from './utils/auth-context.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  //<React.StrictMode>
  <BrowserRouter>
    <AppProviders>
      <App />
    </AppProviders>
  </BrowserRouter>
  //</React.StrictMode>,
)
