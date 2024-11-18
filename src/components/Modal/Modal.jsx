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
}) => {
 

  if (!isOpen) return null;
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
      
        <div className="modal-valores">
          
          <div className="test"></div>
          <h4 style={{fontSize:'17px',fontWeight:'500'}}>Valores nutricionais:</h4>
          <p>Caloria: {calorias}kcal</p>
          <p>Proteínas: {proteinas}</p>
          <div className="contador">
          <input type="number"  id='contador'/>
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
