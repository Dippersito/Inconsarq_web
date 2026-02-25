import React from 'react'
import ReactDOM from 'react-dom/client'
// 1. Cambiamos BrowserRouter por HashRouter
import { HashRouter } from 'react-router-dom' 
import App from './App.jsx'
import './styles/globals.css'
import './styles/utils.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. Envolvemos la App con HashRouter */}
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
)