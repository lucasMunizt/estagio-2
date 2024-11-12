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

}) => {
 

  if (!isOpen) return null;
 /* const SalvarAlimentos = () => {
    const agora = moment();
    const salvarEventos = {
        id: Math.random(),
        title: nome,
        start: agora.toDate(),
        end: agora.add(1, 'hour').toDate(),
        desc: descricao,
        color: 'green',
        tipo: 'atividade'
    };
    onSalvarAlimentos(salvarEventos);
    
    alert("funcionou")
    
    onClose();
};*/
const SalvarAlimentos = () => {
  const agora = moment();
    EventosPadrao.push({
      id: EventosPadrao.length + 1,
      title: nome,
      start: agora.toDate(),
      end:  agora.add(1, 'hour').toDate(),
      desc: descricao,
      color:'blue',
      tipo:'atividade',
      calorias:calorias,
      imagem: img
    })
  
  alert("funcionou")
  console.log(EventosPadrao)
  onClose();
};


  return (
    <div className="modal-overlay">
      <div className="butao-fecha">

        <button id={id} onClick={onClose}>x</button>
      </div>
      <div className="modal-container">
        <img src={img} alt={nome} className="modal-img" />
        <h2 style={{fontWeight:'200',fontSize:'20px', marginTop:'20px'}}>{nome}</h2>
        <p className="modal-descricao">{descricao}</p>

        <div className="modal-valores">
          <h4 style={{fontSize:'17px',fontWeight:'500'}}>Valores nutricionais:</h4>
          <p>Caloria: {calorias}kcal</p>
          <p>Proteínas: {proteinas}</p>
        </div>
        {modalButton &&(
          <Butao 
          id='butao-modal'
          onClick={SalvarAlimentos} 
          valor='adicionar Alimento'
          />

        )}
       
      </div>
    </div>
  );
};

export default Modal;
