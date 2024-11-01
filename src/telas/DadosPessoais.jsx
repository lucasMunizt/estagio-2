
import React, { useState } from 'react';
import Logins from '../components/Logins/Logins';
import iconPessoal from '../assets/icons/iconPersona.png';
import './Dadospessoais.css'
const DadosPessoais = () => {
  const [calculoImc,setCalculoImc] = useState();
  const [altura,setAltura] = useState();
  const [peso,setPeso] = useState();
  const [idade,setIdade] = useState();

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
  };

  const CalcularImc = () =>{
    if(altura && peso){
      const imc = (peso / (altura * altura)).toFixed(2);
      setCalculoImc(imc)
    }
  } 

  const handleSave = (e) =>{
    e.preventDefault()
    CalcularImc()
    console.log(calculoImc)
  };


  return (
    <div>
      <Logins
        titulo="NutriCard"
        butaoValor1="Faça Login"
        butaoId1="idDadosPessoais-1"
        titulo2="Crie seu perfil"
        span="Seja Bem Vindo"
        inputId1="id-DadosPessoais-input-1"
        iconEmail={iconPessoal}
        idImgEmail='iconDadosPessoaisEmail'   
        placeholder1="Coloque Seu Nome"
        typer1="text"
        isDados={true}  
        showCamposValores={true} // Desativa os campos de input
        showImagem={false}
        isInput ={false}
        butaoValor2= "Salvar"
        butaoId2="butao-salvar-dadosPessoais"
        inputId2="id-dadospessoais" 
        isCadastro ={true} 
        onInputChangeNome={handleInputChange}
        onInputChangeIdade = {handleInputChange}
        onInputChangePeso = {handleInputChange}
        onInputChangeAltura = {handleInputChange}
        onSave={handleSave}
      />
    </div>
  );
}

export default DadosPessoais;
