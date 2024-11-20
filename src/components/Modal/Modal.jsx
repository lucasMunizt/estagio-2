// Modal.jsx
import React from 'react';
import './Modal.css';
import Butao from '../Botao/Butao'
import EventosPadrao from '../Calendario/EventosPadrao';
import moment from 'moment';
import 'moment/locale/pt-br';
import { useState } from 'react';
import AdicionarAlimento from './AdicionarAlimento';
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = (e) => setIsModalOpen(false)
  
  if (!isOpen) return null;
/*const SalvarAlimentos = () => {
  
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
};*/

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
          <h4 style={{fontSize:'17px',fontWeight:'500',}}>Valores nutricionais:</h4>
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
          onClick={openModal} 
          valor='adicionar Alimento'
          />

        )}
        {edicaoModal &&(
         <div className="edicoes">
          <i className="bi bi-trash" onClick={DeletarAlimento}></i>
         
         </div>
        )}
      </div>
      {isModalOpen &&(
        <AdicionarAlimento
        isOpen={isModalOpen}
        onClose={closeModal}
        nome={nome}
        calorias={calorias}
        carboidratos={carboidratos}
        proteinas={proteinas}
        sodio={sodio}
        gordura={gordura}
        fibra={fibra}
        img={img}
        />
      )}  


    </div>
  );
};

export default Modal;
