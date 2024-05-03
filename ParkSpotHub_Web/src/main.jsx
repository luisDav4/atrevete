import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './login/login.jsx'
import Home from './administrator/home.jsx';
import './index.css'


const router = createBrowserRouter([
  { path:  "/",  element: <Login /> },
  { path:  "/home",  element: <Home /> },
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>,
)
