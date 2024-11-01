import { useState } from 'react'

import './App.css'
import Input from './components/input/Input'
import Login from './telas/Login'
import Cadastro from './telas/Cadastro'
import Home from './telas/Home'
import DadosPessoais from './telas/DadosPessoais'

function App() {

  return (
    <>
        <Login/> 
        <Cadastro/>
        <Home/>
        <DadosPessoais/>
    </>
  )
}

export default App
