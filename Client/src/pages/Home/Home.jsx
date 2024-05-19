import React from 'react'

import { Link } from 'react-router-dom'

import Cadastro from '../Usuários/Cadastro/Cadastro'
import Login from '../Usuários/Login/Login'
import Nav from '../../components/Nav/Nav'

import "./Home.css"

const Home = () => {
  return (
    <div>
      <Nav/>

      <div className="container">
        <h1>Bem vindo(a)</h1>

        <div className="inner-container-home">
          <Link to={"/user/post"} className='primary-btn'>Criar cadastro</Link>
          <Link to={"/user/post/login"} className='tertiary-btn'>Entrar</Link>
        </div>
      </div>
    </div>
  )
}

export default Home