import React from 'react'

import SidebarAdmin from '../../../../components/SidebarAdmin/SidebarAdmin'
import ChamadosFeitosTable from '../../../../components/ChamadosFeitosTable/ChamadosFeitosTable'

import "../HomeAdmin.css"

const HomeDoneTable = () => {
  return (
    <div className='home-admin-container'>
      <SidebarAdmin/>
      <div className="container">
        <h2>Todas as chamadas pendentes</h2>
        <ChamadosFeitosTable/>
      </div>
    </div>
  )
}

export default HomeDoneTable