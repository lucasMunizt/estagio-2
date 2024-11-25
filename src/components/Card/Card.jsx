// Card.jsx
import React, { useState } from 'react';
import './Card.css';
import Modal from '../Modal/Modal';
import moment from 'moment';
import EventosPadrao from '../Calendario/EventosPadrao';
const Card = ({ 
  id, 
  img,
  descrisao , 
  kcal, 
  nome, 
  onSalvarAlimentos,
  carboidrato,
  proteina,
  sodio,
  gordura,
  fibra,
  unidadeDeMedida,
  food_id,
  modalButton = true,
  inputQuantidade = true,
  valorQuantidade = false,
  quantidade,
  edicaoModal = false,
  meal_id


}) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado do modal
  const [eventos, setEventos] = useState(EventosPadrao);
  const openModal = () => setIsModalOpen(true);
  
  const closeModal = (e) => {
      setIsModalOpen(false)
   
  };
  const adicionarEvento = (novoEvento) => {
    setEventos((prevEventos) => [...prevEventos, novoEvento]);
    setEventos(novoEvento)
    console.log("adicionarEvento é função:", typeof adicionarEvento === 'function');
  };
  return (
    <>
          
          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            nome={nome}
            img={img}
            descricao={descrisao}
            calorias={kcal}
            proteinas={kcal}
            carboidratos={carboidrato}
            gordura={gordura}
            sodio={sodio}
            fibra={fibra}
            id={id}
            onClick={adicionarEvento}
            inputQuantidade={inputQuantidade}
            modalButton={modalButton}
            food_id={food_id}
            valorQuantidade={valorQuantidade}
            quantidadevalor={quantidade}
            edicaoModal ={edicaoModal}
            meal_id={meal_id}
          />
  


      <button
        onClick={(e) => {
          e.preventDefault();
          openModal();
        }}
        className="container-card-pai"
      >
        
        <div className="conatiner-card" >
          <div className="card-img">
            <img src={img} alt={descrisao} />
            <h4 id="nome">{nome}</h4>
          </div>
          <div className="text-informacao">
            <div className="descricao">
              <span>{descrisao}</span>
            </div>
            <div className="valores-nutricionais">
              <h4 className="h5-nutricao">Valores Nutricionais:</h4>
              <div className="informacoes">
                <span id="calorias">Calorias {kcal || 0}kcal</span>
                <span id="massa">Carboidrato {carboidrato || 0}g</span>
                <span id="proteina">Proteína {proteina || 0}g</span>
              </div>
              
            </div>
            
          </div>
        </div>
        
      </button>
    
    </>
  );
};

export default Card;
