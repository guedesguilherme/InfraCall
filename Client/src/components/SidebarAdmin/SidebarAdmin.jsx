import React from 'react'

import { Link } from 'react-router-dom'

import "./SidebarAdmin.css"

const SidebarAdmin = () => {
  return (
    <div className='sidebar'>
      
      <h2>InfraCall</h2>

      <div className="options">
        <li>
          
          <ul>
            <Link to={"/admin/home"} className='sidebar-option'>Gerenciar chamados </Link>
          </ul>
          <ul>
            <Link to={"/admin/home/done"} className='sidebar-option'>Concluídos</Link>
          </ul>

          <ul>
            <Link to={"/"} className='sidebar-option'>Coming feature</Link>
          </ul>

        </li>
      </div>
    </div>
  )
}

export default SidebarAdmin