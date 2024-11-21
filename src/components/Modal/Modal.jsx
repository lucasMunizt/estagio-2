import React, { useEffect } from 'react';
import './Modal.css';
import Butao from '../Botao/Butao'
import EventosPadrao from '../Calendario/EventosPadrao';
import moment from 'moment';
import 'moment/locale/pt-br';
import { useState } from 'react';
import DadosAlimentos from './DadosAlimentos';
const Modal = ({ 
  isOpen, 
  onClose, 
  nome, 
  img, 
  descricao, 
  calorias, 
  proteinas,
  onSalvarAlimentos,
  modalButton = false,
  id,
  opamen,
  edicaoModal = false,
  carboidratos,
  sodio,
  gordura,
  fibra,
  inputQuantidade = false
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = (e) => setIsModalOpen(false)
  const [quantidade,setQuantidade] = useState(1)
  if (!isOpen) return null;

  const SalvarAlimentos = () => {

    const valoresDadosAlimentos = {}
    DadosAlimentos.push({
      title: nome,
      calorias:calorias,
      carboidratos:carboidratos,
      proteinas:proteinas,
      sodio:sodio,
      gordura:gordura,
      fibra:fibra,
      quantidade:quantidade,
      img: img
    })
  //localStorage.setItem('dadosModal',JSON.stringify(DadosAlimentos))
  onClose();
};
  
  const DeletarAlimento = () =>{
    console.log("opa")
  }

  return (
    <div className="modal-overlay">
   
      <div className="butao-fecha" id={id}>
          <div className={opamen}>   
              <i 
              className="bi bi-x-square-fill"
              id="botao-fechar-modal"
              itemID={id}
              onClick={onClose}
              ></i>
          </div>
      </div>
      <div className="modal-container">
        <img src={img} alt={nome} className="modal-img" />    
        <h2 
        id='nome-fruta'
        style={{
          fontWeight:'200',
          fontSize:'20px',
          marginTop:'20px',
          marginBottom:'20px'}}>
          {nome}
        </h2>
        <div className="tes" style={{display:"flex", alignItems:"center",justifyContent:"spaceAround"}}>
        <h5 style={{fontWeight:'500',}}>Valores nutricionais:</h5>
       {inputQuantidade &&(
        <input type="number" 
        id="quantidade-alimentos" 
        style={{width:"80px",height:"40px",marginLeft:"40px"}}
        onChange={(e)=>setQuantidade(e.target.value)} 
        placeholder='Qtd'/>
      )}   

        </div>
        <div className="modal-valores">
          <p>Calorias: {calorias}g</p>
          <p>Carboidratos: {carboidratos}g</p>
          <p>Proteínas: {proteinas}g</p>
          <p>Sódio: {sodio}g</p>
          <p>Gordura: {gordura}g</p>
          <p>Fibra: {fibra}g</p>
        </div>

        {modalButton &&(
          <Butao 
          id='butao-modal'
          onClick={SalvarAlimentos} //openModal 
          valor='adicionar Alimento'
          />

        )}
        {edicaoModal &&(
         <div className="edicoes">
          <i className="bi bi-trash" onClick={DeletarAlimento}></i>
         
         </div>
        )}
      </div>
     
    </div>
  );
};

export default Modal;