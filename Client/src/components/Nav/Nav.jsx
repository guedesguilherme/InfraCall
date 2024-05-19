import React from 'react'
import { Link } from 'react-router-dom'

import "./Nav.css"

const Nav = () => {
  return (
    <div className="nav">
      <Link to={"/"} id='Logo-control'>
        <h1>InfraCall</h1>
      </Link>
      <div className='nav-link-control'>

        <Link to={"/user/post"} className='nav-btn'>
          Cadastrar
        </Link>

        <Link to={"/user/post/login"} className='nav-btn'>
          Entrar
        </Link>

        <Link to={"/admin/post"} className='nav-btn'>
          Sou admin
        </Link>
      </div>

    </div>
  )
}

export default Nav