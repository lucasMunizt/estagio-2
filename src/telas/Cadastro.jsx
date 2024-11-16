import React from 'react'
import Logins from '../components/Logins/Logins'
import iconEmail from '../assets/icons/iconEmail.png'
import iconSenha from '../assets/icons/iconSenha.png'
import iconPessoal from '../assets/icons/iconPersona.png'
import './Cadastro.css'
import { useState } from 'react'
import { json } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
const Cadastro = () => {
  const [calculoImc,setCalculoImc] = useState();
  const [height,setHeight] = useState();
  const [weight,setWeight] = useState();
  const [age,setAge] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const ValoresCadastro = []
  const url = 'http://localhost:3000/Cadastro' 
  const navigate = useNavigate();


  const handleInputChange = (e) =>{
      const {id,value} = e.target;
      if(id === 'altura'){
        setHeight(value)
      }
      
      else if(id === 'peso'){
        setWeight(value);
      }

      else if(id === 'idade'){
        setAge(value);
      }

      else if(id === 'idCadastroEmail'){
        setEmail(value);
      }

      else if(id === 'idCadastroNome'){
        setName(value)
      }

      else if(id === 'confirm-senha'){
        setPassword(value);
      }
  };

  const CalcularImc = () =>{
    if(height && weight){
      const imc = (weight / (height * height)).toFixed(2);
      setCalculoImc(imc)
    }
  } 

  const handleSave =  async (e) =>{
    CalcularImc()
    e.preventDefault()
      ValoresCadastro.push({
      "altura": height,
      "peso": weight,
      "idade": age,
      "name": name,
      "senha": password,
      "email": email,
      "imc": calculoImc
    })
    const res = await fetch(url,{
      method:"POST",
      headers:{
        "content-type": "application/json"
      },
      body: JSON.stringify(ValoresCadastro)
    })

    if(res.ok){
      console.log("Cadastro realizado com sucesso")
      //navigate('/home')
    }

  };

  return (
    <Logins
      titulo="NutriCard"
      butaoId1="idCadastoLogin"
      butaoValor1="Faça Login"
      titulo2="Crie sua Conta"
      span="Seja Bem Vindo!"
      inputId1="idCadastroNome"
      iconEmail={iconPessoal}
      placeholder1="Coloque Seu name"
      typer1="text"
      inputId2="idCadastroEmail"
      iconSenha={iconEmail}
      placeholder2="Coloque Seu Email"
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
      isInput = {true}
      isDados={true} 
      onInputChangeNome={handleInputChange}
      onInputChangeIdade = {handleInputChange}
      onInputChangePeso = {handleInputChange}
      onInputChangeAltura = {handleInputChange}
      onInputChangeSenha = {handleInputChange}
      onInputChangeEmail = {handleInputChange}
      onSave={handleSave}
    />
  )
}

export default Cadastro
