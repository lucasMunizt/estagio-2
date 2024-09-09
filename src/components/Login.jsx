import React from 'react'
import Input from './input/Input'
import './Login.css'
import imgLogin from '../assets/imgLogin.png'
import iconEmail from '../assets/icons/iconEmail.png'
import iconSenha from '../assets/icons/iconSenha.png'
import Butao from './Butao/Butao'
const Login = () => {
  return (
    <div>
        <div className="container">
            <div className="quadrado-principal">
              <div className="img">
                <h1>NutriCard</h1>
                 {/* <img src={imgLogin} alt="" /> */}
                 <Butao id="criar-conta" valor="Criar conta"/>
              </div>
                <div className="card">
                    <div className="card-body">
                     <h1>Olá Novamente</h1>
                     <span>Seja Bem Vindo</span>   
                      <form action="">
                        <Input id='email' icon={iconEmail} placeholder="Coloque seu Email" type="email"/>
                        <Input id='senha' icon={iconSenha} placeholder="Coloque sua Senha" type="password"/>
                        <Butao valor="Entrar" id="butao-entrar"/>
                         <div className="senha-esquecida">
                          <p><a href="#">esqueceu a senha</a></p>
                          </div> 
                       </form>  
                    </div>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default Login