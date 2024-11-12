import React, { useState } from 'react';
import './Header.css';
import img from '../../assets/fruta.jpg';
import Calendario from '../Calendario/Calendario';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-big-calendar';
const Header = () => {
  const [menuAberto, setMenuAberto] = useState(false);
  const navigate = useNavigate();
    const abrirMenu = (e) => {
        e.preventDefault();
        setMenuAberto(!menuAberto)
    };

    const Abrircalendario = () =>{
        navigate('/calendario')
    }

    return (
        <div>
            <div className="header-componente">
                <header id="header-menu">
                    <h1 id="h1-nutricard">Nutricard</h1>
                    <nav className="nav-bar">
                        <div className="navbar-inner">
                            <img src={img} alt="Menu" id="img-menu" onClick={abrirMenu} />
                            <input type="checkbox" id="check" />
                            <label htmlFor="check" className="checkbtn"><i className="fas fa-bars"></i></label>
                        </div>
                    
                    </nav>
                </header>
            </div>
            <div className="main-container">
            {menuAberto &&(
                
            <div className="client-info">
               
                <div className="client-name">
                   
                    <a href="/home" id='icone-home'><i className="bi bi-house"></i></a>       
                    <h2 id='valor-nome'>Nome do Cliente</h2>
                </div>
           
            <div className="info-section">

                <div className="informacoes-valores">
                  <div className="info-item">
                      <p>Calorias consumidas</p>
                      <span className="info-value">1220</span>
                  </div>
                  <div className="info-item">
                      <p>Calorias a consumir</p>
                      <span className="info-value">1220</span>
                  </div>

                </div>
              <div className="valores-pessoais">
              <div className="info-item">
                    <p>Altura</p>
                    <span className="info-value">1.78</span>
                </div>
                <div className="info-item">
                    <p>Peso</p>
                    <span className="info-value">75</span>
                </div>
                <div className="info-item">
                    <p>IMC</p>
                    <span className="info-value">25.5</span>
                </div>
              </div>
              
            </div>
            <div className="button-section">
                <button className="client-button">Favoritos</button>
                <button className="client-button" onClick={Abrircalendario}>Calendário</button>
            </div>
        </div>
          )}
            </div>
          
            
        </div>
    );
};

export default Header;
