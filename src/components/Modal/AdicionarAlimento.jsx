import React from 'react'
import './AdicionarAlimento.css'
import 'moment/locale/pt-br';
import moment from 'moment';
import EventosPadrao from '../Calendario/EventosPadrao';
import { Link } from 'react-router-dom';
import { useState } from 'react';
const AdicionarAlimento = ({
    isOpen, 
    onClose, 
    calorias, 
    nome,
    proteinas,
    carboidratos,
    sodio,
    gordura,
    fibra,
    img, // Adicionado
}) => {
    const [AlteracaoCor, setAlteracaoCor] = useState()
    const [start, setStart] = useState()
    const [end, setEnd] = useState()
    const [quantidade, setQuantidade] = useState()
    const [atividade, setAtividade] = useState()
    const [refeicoes,setRefeicoes]  = useState()

    if (!isOpen) return null;

    const handleInputChange = (e) =>{
        const {id,value} = e.target;
        if(id === 'quantidade'){
            console.log(value)
          setQuantidade(value)
        }
        
        else if(id === 'start'){
          setStart(value);
        }
  
        else if(id === 'end'){
          setEnd(value);
        }
  
        
        
    };
    const handleRefeicoesChange = (value) => {
        setRefeicoes(value);
        console.log("Refeição selecionada:", value);
    };

    const handleAtividadeChange = (value) => {
        setAtividade(value);
        console.log("Atividade selecionada:", value, "\n" , AlteracaoCor);
         if(value === "Vermelho"){
            setAlteracaoCor('red');
        }
        else if (value === "Verde") {
            setAlteracaoCor('green');
        } 
        else if (value === "Azul") {
            setAlteracaoCor('blue');
         }

    };

    const SalvarAlimentos = () => {
        const agora = moment();
      const t =  EventosPadrao.push({
            id: 1,
            title: nome,
            img: img,
            start: start,
            end: end,
            color: AlteracaoCor,
            tipo: refeicoes,
            calorias,
            carboidratos,
            proteinas,
            sodio,
            gordura,
            fibra,
        });

        alert("Alimento salvo com sucesso!");
        console.log("data: "+ start +"\n" + "fim: " + end + "\n"+ "quantidade: "+ 
        quantidade + "\n" +"atividades: "+ AlteracaoCor + "\n" + "refeições: " + refeicoes)
        onClose(); // Fecha o modal após salvar
    };

    return (
      <div className="modal-overlay-2">
    
        <div className="modal-container-2">
          <div className="botao-fecha-2">
            <i
              className="bi bi-x-square-fill"
              id="botao-fechar-modal"
              onClick={onClose}
            ></i>
          </div>
          <div className="dados-modal">
            <h2>{nome}</h2>
            <input type="number" id="quantidade" placeholder="Qtd" onChange={handleInputChange} />
            <div className="datas">
              <input type="date" name="start" id="start" onChange={handleInputChange} />
              <input type="date" name="end" id="end" onChange={handleInputChange}/>
            </div>

            <div className="dropdown-menu-2">
              {/* Refeições */}
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  id="botao-list-refeicoes"
                >
                  Refeições
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <button 
                    className="dropdown-item" 
                    type="button" 
                    id="refeicoes" 
                    onClick={() => handleRefeicoesChange("Café Da Manhã")} 
                    >
                      Café Da Manhã
                    </button>
                  </li>
                  <li>
                    <button 
                    className="dropdown-item" 
                    type="button" 
                    id="almoco" 
                    onClick={() => handleRefeicoesChange("Almoço")} 
                    > 
                      Almoço
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      type="button"
                      id="merenda"
                      onClick={() => handleRefeicoesChange("Merenda")} 
                    >
                      Merenda
                    </button>
                  </li>
                  <li>
                    <button 
                    className="dropdown-item" 
                    type="button" 
                    id="refeicoes"
                    onClick={() => handleRefeicoesChange("Jantar")} 
                    >
                      Jantar
                    </button>
                  </li>
                </ul>
              </div>
              {/*Cores  */}
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  id="botao-list-atividades"
                >
                  Atividades
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <button 
                    className="dropdown-item" 
                    type="button" 
                    id="atividades"
                    onClick={()=>handleAtividadeChange("Vermelho")} 
                    >
                      Vermelho
                    </button>
                  </li>
                  <li>
                    <button 
                    className="dropdown-item" 
                    type="button" 
                    id="atividades"
                    onClick={()=>handleAtividadeChange("Verde")} 
                    >
                      Verde
                    </button>
                  </li>
                  <li>
                    <button 
                    className="dropdown-item"
                     type="button" 
                     id="atividades"
                     onClick={()=>handleAtividadeChange("Azul")} 
                     >
                      Azul
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <button onClick={SalvarAlimentos} id="salvar-alimentos">
              Salvar Alimento
            </button>
          </div>
        </div>
      </div>
    );
};

export default AdicionarAlimento;