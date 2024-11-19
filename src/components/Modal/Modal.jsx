// Modal.jsx
import React from 'react';
import './Modal.css';
import Butao from '../Botao/Butao'
import EventosPadrao from '../Calendario/EventosPadrao';

import moment from 'moment';
import 'moment/locale/pt-br';
import { useState } from 'react';
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
  fibra
}) => {

  
  if (!isOpen) return null;
const SalvarAlimentos = () => {
  
  const agora = moment();
    EventosPadrao.push({
      id: EventosPadrao.length + 1,
      title: nome,
      img: img,
      start: agora.toDate(),
      end:  agora.add(1, 'hour').toDate(),
      color:'blue',
      tipo:'atividade',
      calorias:calorias,
      carboidratos:carboidratos,
      proteinas:proteinas,
      sodio:sodio,
      gordura:gordura,
      fibra:fibra,
    })
    
  alert("funcionou")
  console.log()
  onClose();
};

  const DeletarAlimento = () =>{
    console.log("ola  ")
  }


  return (
    <div className="modal-overlay">
      <div className="butao-fecha">
          <div className={opamen}>
            <button id={id} onClick={onClose} style={{zIndex:'11000'}}>X</button>

          </div>
      </div>
      <div className="modal-container">
        <img src={img} alt={nome} className="modal-img" />
        <h2 style={{fontWeight:'200',fontSize:'20px', marginTop:'20px'}}>{nome}</h2>
        <p className="modal-descricao">{descricao}</p>
      
          <h4 style={{fontSize:'17px',fontWeight:'500',}}>Valores nutricionais:</h4>
        <div className="modal-valores">
          <p>Calorias: {calorias}g</p>
          <p>Carboidratos: {carboidratos}g</p>
          <p>Proteínas: {proteinas}g</p>
          <p>Sódio: {sodio}g</p>
          <p>Gordura: {gordura}g</p>
          <p>Fibra: {fibra}g</p>
          <div className="contador">
        
        </div>
        </div>

        {modalButton &&(
          <Butao 
          id='butao-modal'
          onClick={SalvarAlimentos} 
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
