import { Link } from 'react-router-dom'
import React from 'react'

import "./NavAdmin.css"

const NavAdmin = () => {
  return (
    <div className='nav-admin-control'>
      <div className="nav-admin-1">
          <Link to={"/admin/post"}>Cadastrar</Link>
      </div>
      <div className="nav-admin-2">
          <Link to={"/admin/post/login"}>Sou cadastrado</Link>
      </div>
    </div>
  )
}

export default NavAdmin