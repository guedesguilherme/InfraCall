import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
  Route
} from "react-router-dom"
import './index.css'

//importando componentes
import Cadastro from './pages/Usuários/Cadastro.jsx'
import Login from "./pages/Usuários/Login.jsx"
import Form from './pages/Usuários/Form.jsx'

const router = createBrowserRouter([
  {
    element: <App/>,
    children: [
      {
        path: "/usuario/cadastro",
        element: <Cadastro/>
      },
      {
        path: "/usuario/login",
        element: <Login/>
      },
      {
        path: "/usuario/form",
        element: <Form/>
      },
    ]
}
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />  
  </React.StrictMode>,
)
