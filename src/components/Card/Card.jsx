import React from 'react';
import './Card.css';

const Card = ({ id, img, descrisao, kcal,nome }) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        console.log("Card clicado!");
      }}
      className="container-card-pai" // Define o botão com a classe principal
    >
      <div className="conatiner-card" id={id}>
        <div className="card-img">
          <img src={img} alt={descrisao} />
          <h4 id='nome'>{nome}</h4>
        </div>
        <div className="text-informacao">
          <div className="descricao">
            <span>{descrisao}</span>
          </div>
          <div className="valores-nutricionais">
            <h4 className="h5-nutricao">Valores Nutricionais:</h4>
            <div className="informacoes">
            <span id='calorias'>Calorias {kcal}kcal</span>
            <span id='proteina'>Proteína {kcal}g</span>
            <span id='massa'>Massa {kcal}g</span>
            </div>
            
          </div>
        </div>
      </div>
    </button>
  );
};

export default Card;
