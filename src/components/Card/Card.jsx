// Card.jsx
import React, { useState } from 'react';
import './Card.css';
import Modal from '../Modal/Modal';

const Card = ({ id, img, descrisao, kcal, nome }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado do modal

  const openModal = () => setIsModalOpen(true);
  const closeModal = (e) => {
      setIsModalOpen(false)
   
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
          />


      <button
        onClick={(e) => {
          e.preventDefault();
          console.log("Card clicado!");
          openModal();
        }}
        className="container-card-pai"
      >
        
        <div className="conatiner-card" id={id}>
          <div className="card-img">
            <img src={img} alt={descrisao} />
            <h4 id="nome">{nome}</h4>
          </div>
          <div className="text-informacao">
            {/* modal */}
            <div className="descricao">
              <span>{descrisao}</span>
            </div>
            <div className="valores-nutricionais">
              <h4 className="h5-nutricao">Valores Nutricionais:</h4>
              <div className="informacoes">
                <span id="calorias">Calorias {kcal}kcal</span>
                <span id="proteina">Proteína {kcal}g</span>
                <span id="massa">Massa {kcal}g</span>
              </div>
              
            </div>
            
          </div>
        </div>
        
      </button>

      {/* Renderizando o modal fora do botão */}
    
    </>
  );
};

export default Card;
