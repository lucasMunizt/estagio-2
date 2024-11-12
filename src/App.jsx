import { useState } from 'react'

import './App.css'
import Input from './components/input/Input'
import Login from './telas/Login'
import Cadastro from './telas/Cadastro'
import Home from './telas/Home'
import DadosPessoais from './telas/DadosPessoais'
import Header from './components/Header/Header'
import { Outlet } from 'react-router-dom'
function App() {

  return (
    <>
      <Outlet /> {/* Renderiza as rotas filhas */}
    </>
  )
}

export default App
