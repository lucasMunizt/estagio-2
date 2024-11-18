import React, { useState, useEffect } from 'react';
import './Header.css';
import Calendario from '../Calendario/Calendario';
import { useNavigate } from 'react-router-dom';
import imagemUsuario from '../../assets/icons/iconPersona.png';

const Header = () => {
  const [menuAberto, setMenuAberto] = useState(false);
  const [dadosUsuario, setDadosUsuario] = useState([]); // Estado para armazenar os dados do usuário
  const navigate = useNavigate();

  const abrirMenu = (e) => {
    e.preventDefault();
    setMenuAberto(!menuAberto);
  };

  const abrirCalendario = () => {
    navigate('/calendario');
  };

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parseData = JSON.parse(userData)
      //setDadosUsuario(JSON.parse(userData)); // Converte o JSON para objeto e armazena no estado
      console.log('dados carregados do: ' + JSON.stringify(parseData, null, 2));
      setDadosUsuario(parseData);

    }else{
      console.log('nenhum dado encontrados no localStorage');
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
        {menuAberto &&  dadosUsuario.map((index,idx)=>(

          <div key={index.id || idx} className="client-info">
          <div className="client-name">
            <a href="/home" id="icone-home"><i className="bi bi-house"></i></a>
            <h2 id="valor-nome">{index.name || 'Usuário'}</h2>
          </div>
          <div className="info-section">
            <div className="informacoes-valores">
              <div className="info-item">
                <p>Calorias consumidas</p>
                <span className="info-value">{index.calories_consumed || 'N/A'}</span>
              </div>
              <div className="info-item">
                <p>Calorias a consumir</p>
                <span className="info-value">{index.calorie_goal - (index.calories_consumed || 0) || 'N/A'}</span>
              </div>
            </div>
            <div className="valores-pessoais">
              <div className="info-item">
                <p>Altura</p>
                <span className="info-value">{index.height || 'N/A'} m</span>
              </div>
              <div className="info-item">
                <p>Peso</p>
                <span className="info-value">{index.weight || 'N/A'} kg</span>
              </div>
              <div className="info-item">
                <p>IMC</p>
                <span className="info-value">{index.bmi.toFixed(2) || 'N/A'}</span>
              </div>
            </div>
          </div>
          <div className="button-section">
            <button className="client-button">Favoritos</button>
            <button className="client-button" onClick={abrirCalendario}>Calendário</button>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
};

export default Header;
