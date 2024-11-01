// Modal.jsx
import React from 'react';
import './Modal.css';
import Butao from '../Butao/Butao'
const Modal = ({ 
  isOpen, 
  onClose, 
  nome, 
  img, 
  descricao, 
  calorias, 
  proteinas 
}) => {
  if (!isOpen) return null;
    const SalvarAlimentos = () => {
      console.log("alimentos salvos")
    }

   /* const handleOverlayClick = (e) => {
      if (e.target === e.currentTarget) {
        console.log("deu certo")
        onClose();
         Fecha o modal ao clicar no overlay
      }
    };*/


  return (
    <div className="modal-overlay">
      <div className="butao-fecha">

        <button id='butao-fecha-modal' onClick={onClose}>x</button>
      </div>
      <div className="modal-container">
        <img src={img} alt={nome} className="modal-img" />
        <h2>{nome}</h2>
        <p className="modal-descricao">{descricao}</p>

        <div className="modal-valores">
          <h4>Valores nutricionais:</h4>
          <p>Caloria: {calorias}kcal</p>
          <p>Proteínas: {proteinas}</p>
        </div>

        <Butao 
        id='butao-modal'
        onClick={SalvarAlimentos} 
        valor='adicionar Alimento'/>
       
      </div>
    </div>
  );
};

export default Modal;
