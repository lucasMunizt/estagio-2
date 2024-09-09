import React from 'react'
import Logins from './Logins'
import iconEmail from '../assets/icons/iconEmail.png'
import iconSenha from '../assets/icons/iconSenha.png'
import iconPessoal from '../assets/icons/iconPersona.png'
import './Cadastro.css'

const Cadastro = () => {
  return (
    <Logins
      titulo="NutriCard"
      butaoId1="login"
      butaoValor1="Fazer Login"
      titulo2="Crie sua Conta"
      span="Seja Bem Vindo"
      inputId1="nome"
      iconEmail={iconPessoal}
      placeholder1="Coloque Seu Nome"
      typer1="text"
      inputId2="email"
      iconSenha={iconEmail}
      placeholder2="Crie Seu Email"
      type2="email"
      butaoValor2="Cadastrar"
      butaoId2="butao-cadastrar"
      a="Faça login"
      isCadastro={true} 
      inputIdExtra="confirm-senha"
      iconExtra={iconSenha}
      placeholderExtra="Coloque Sua Senha"
      typeExtra="password"
      layoutInvertido={true}
      idImgPersona='iconCadastroPersona'  
      idImgEmail='iconCadastroEmail'  
      idImgSenha='iconCadastroSenha'  
    
    />
  )
}

export default Cadastro
