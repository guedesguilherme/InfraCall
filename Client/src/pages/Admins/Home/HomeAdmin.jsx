import React from 'react'

import InfoChamadosTable from '../../../components/InfoChamadosTable/InfoChamadosTable'
import SidebarAdmin from '../../../components/SidebarAdmin/SidebarAdmin'

import "./HomeAdmin.css"

const HomeAdmin = () => {
  return (
    <div className='home-admin-container'>
      <SidebarAdmin/>
      <div className="container">
        <h2>Todas as chamadas pendentes</h2>
        <InfoChamadosTable/>
      </div>
    </div>
  )
}

export default HomeAdmin