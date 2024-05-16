import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './pages/Home.js'
import { Provider } from './provider/Povider'

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Do not fount root element')


ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Provider>
      <Home />
    </Provider>
  </React.StrictMode>
)
