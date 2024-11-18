import React, { useState, useEffect } from 'react';
import './Header.css';
import img from '../../assets/fruta.jpg';
import Calendario from '../Calendario/Calendario';
import { useNavigate } from 'react-router-dom';
import imagemUsuario from '../../assets/icons/iconPersona.png';

const Header = () => {
  const [menuAberto, setMenuAberto] = useState(false);
  const [dadosUsuario, setDadosUsuario] = useState(null); // Estado para armazenar os dados do usuário
  const navigate = useNavigate();

  const abrirMenu = (e) => {
    e.preventDefault();
    setMenuAberto(!menuAberto);
  };

  const abrirCalendario = () => {
    navigate('/calendario');
  };

  useEffect(() => {
    // Recupera os dados do localStorage ao carregar o componente
    const userData = localStorage.getItem('user');
    
    if (userData) {
      setDadosUsuario(JSON.parse(userData));
       // Converte o JSON para objeto e armazena no estado
    }
  }, []); // Executa apenas na montagem do componente
   
  return (
    <div>
      <div className="header-componente">
        <header id="header-menu">
          <h1 id="h1-nutricard">
            <a href="/home" id="h1-nutricard">Nutricard</a>
          </h1>
          <nav className="nav-bar">
            <div className="navbar-inner">
              <img
                src={imagemUsuario}
                alt="Menu"
                id="img-menu"
                onClick={abrirMenu}
              />
              <input type="checkbox" id="check" />
              <label htmlFor="check" className="checkbtn">
                <i className="fas fa-bars"></i>
              </label>
            </div>
          </nav>
        </header>
      </div>
      <div className="main-container">
        {menuAberto && (
          <div className="client-info">
            <div className="client-name">
              <a href="/home" id="icone-home"><i className="bi bi-house"></i></a>
              <h2 id="valor-nome">{dadosUsuario?.name || 'Usuário'}</h2>
            </div>
            <div className="info-section">
              <div className="informacoes-valores">
                <div className="info-item">
                  <p>Calorias consumidas</p>
                  <span className="info-value">{dadosUsuario?.caloriesConsumed || 'N/A'}</span>
                </div>
                <div className="info-item">
                  <p>Calorias a consumir</p>
                  <span className="info-value">{dadosUsuario?.caloriesToConsume || 'N/A'}</span>
                </div>
              </div>
              <div className="valores-pessoais">
                <div className="info-item">
                  <p>Altura</p>
                  <span className="info-value">{dadosUsuario?.height || 'N/A'}</span>
                </div>
                <div className="info-item">
                  <p>Peso</p>
                  <span className="info-value">{dadosUsuario?.weight || 'N/A'}</span>
                </div>
                <div className="info-item">
                  <p>IMC</p>
                  <span className="info-value">{dadosUsuario?.imc || 'N/A'}</span>
                </div>
              </div>
            </div>
            <div className="button-section">
              <button className="client-button">Favoritos</button>
              <button className="client-button" onClick={abrirCalendario}>Calendário</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
