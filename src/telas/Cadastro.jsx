import React from 'react'
import Logins from '../components/Logins/Logins'
import iconEmail from '../assets/icons/iconEmail.png'
import iconSenha from '../assets/icons/iconSenha.png'
import iconPessoal from '../assets/icons/iconPersona.png'
import './Cadastro.css'
import { useState } from 'react'
const Cadastro = () => {
  const [calculoImc,setCalculoImc] = useState();
  const [altura,setAltura] = useState();
  const [peso,setPeso] = useState();
  const [idade,setIdade] = useState();
  const [nome, setNome] = useState();
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const ValoresCadastro = [{}]
  const handleInputChange = (e) =>{
      const {id,value} = e.target;
      if(id === 'altura'){
        setAltura(value)
        
      }
      else if(id === 'peso'){
        setPeso(value);
      }
      else if(id === 'idade'){
        setIdade(value);
      }
      else if(id === 'idCadastroEmail'){
        setEmail(value);
      }
      else if(id === 'idCadastroNome'){
        setNome(value)
      }

      else if(id === 'confirm-senha'){
        setSenha(value);
      }
  };

  const CalcularImc = () =>{
    if(altura && peso){
      const imc = (peso / (altura * altura)).toFixed(2);
      setCalculoImc(imc)
    }
  } 

  const handleSave = (e) =>{
    e.preventDefault()
      ValoresCadastro.push({
      "altura": altura,
      "peso": peso,
      "idade": idade,
      "nome": nome,
      "senha": senha,
      "email": email,
      "imc": calculoImc
    })
    console.log(calculoImc)
    CalcularImc()
    console.log(ValoresCadastro)
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
      placeholder1="Coloque Seu Nome"
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
