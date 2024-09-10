import React from 'react'
import Logins from './Logins'
import iconEmail from '../assets/icons/iconEmail.png'
import iconSenha from '../assets/icons/iconSenha.png'
import './Login.css'

const Login = () => {
  return (
    <Logins
      titulo="NutriCard"
      butaoId1="criar-conta"
      butaoValor1="Criar Conta"
      titulo2="Olá Novamente!"
      span="Seja Bem Vindo!"
      inputId1="email"
      iconEmail={iconEmail}
      placeholder1="Coloque seu Email"
      typer1="email"
      inputId2="senha"
      iconSenha={iconSenha}
      placeholder2="Coloque sua Senha"
      type2="password"
      butaoValor2="Entrar"
      butaoId2="butao-entrar"
      a="Esqueceu a senha?"
      isCadastro={false}  
      layoutInvertido={false} 
      idImgEmail='iconEmailLogin'  
      idImgSenha='iconSenhaLogin'  
    />
  )
}

export default Login
