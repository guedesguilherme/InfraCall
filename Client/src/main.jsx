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
import Home from './pages/Home/Home.jsx'

  //Componentes de usuário
  import Cadastro from './pages/Usuários/Cadastro/Cadastro.jsx'
  import Login from "./pages/Usuários/Login/Login.jsx"
  import Form from './pages/Usuários/Form/Form.jsx'

  //Componentes de administrador
  import CadastroAdmin from './pages/Admins/Cadastro/Cadastro.jsx'
  import LoginAdmin from './pages/Admins/Login/LoginAdmin.jsx'
  import HomeAdmin from './pages/Admins/Home/HomeAdmin.jsx'
  import HomeDoneTable from './pages/Admins/Home/HomeDoneTable/HomeDoneTable.jsx'

const router = createBrowserRouter([
  {
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      //Caminhos do usuário
      {
        path: "/user/post",
        element: <Cadastro/>
      },
      {
        path: "/user/post/login",
        element: <Login/>
      },
      //Caminhos do formulário
      {
        path: "/form/post",
        element: <Form/>
      },
      //Caminhos do Administrador
      {
        path: "/admin/post",
        element: <CadastroAdmin/>
      },
      {
        path: "/admin/post/login",
        element: <LoginAdmin/>
      },
      {
        path: "/admin/home",
        element: <HomeAdmin/>
      },
      {
        path: "/admin/home/done",
        element: <HomeDoneTable/>
      },
    ]
}
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />  
  </React.StrictMode>,
)
