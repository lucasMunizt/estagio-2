import React, { useState, useEffect } from 'react';
import './Header.css';
import Calendario from '../Calendario/Calendario';
import { json, useNavigate } from 'react-router-dom';
import imagemUsuario from '../../assets/icons/iconPersona.png';
import EventosPadrao from '../Calendario/EventosPadrao';
import dadosAlimentosArray from '../Modal/DadosAlimentos';
const Header = ({inputQuantidade = false,valor}) => {
  const [menuAberto, setMenuAberto] = useState(false);
  const [adicionarRefeicao, setaAdicionarRefeicao] = useState(false);
  const [dadosUsuario, setDadosUsuario] = useState([]); 
  const [dadosAlimentos, setDadosAlimentos] = useState(dadosAlimentosArray);
  const [start, setStart] = useState()
  const [end, setEnd] = useState()
  const [quantidadeCalorias, setQuantidadeCalarias] = useState()
  const [atividade, setAtividade] = useState()
  const [refeicoes,setRefeicoes]  = useState()
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const abrirMenu = (e) => {
    e.preventDefault();
    setMenuAberto(!menuAberto);
  };

  const abrirCalendario = () => {
    navigate('/calendario');
  };

  const SalvarRefeicoes = (e) =>{
    e.preventDefault();
    setaAdicionarRefeicao(!adicionarRefeicao);

  }


  const [dateTime, setDateTime] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parseData = JSON.parse(userData)
      const userId = parseData[0].user_id
      setDadosUsuario(parseData);
      if(userId){
        fetchUser(userId)
      }
      
    }else{
      console.log('nenhum dado encontrados no localStorage');
    }
    
  }, []); // Executa apenas na montagem do componente

  const handleInputChange = (e) =>{
    const {id,value} = e.target;
   
    if(id === 'start'){
      setStart(value);
    }

    else if(id === 'end'){
      setEnd(value);
    }
  };

  const handleRefeicoesChange = (value) => {
    setRefeicoes(value);
    if(value === "Café Da Manhã"){
      setAtividade("green")
    }
    else if(value === "Almoço"){
      setAtividade("blue")
    }
    else if(value === "Merenda"){
      setAtividade("gray")
    }

    else if(value === "Jantar"){
      setAtividade("red")
    }
  };

  const SalvarAlimentos =  async () => {
   
    const url ='http://localhost:3000/meal/create'  
    if(dadosAlimentos.length > 0){
     const evento = {
      meal : {
        start_date: new Date(start).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
        end_date: new Date(end).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
        user_id: dadosUsuario[0].user_id,
        color:atividade,
        name:refeicoes,
        foods: dadosAlimentos.map((index)=>({
          food_id: index.food_id,
          amount: index.quantidade,
          calories:index.calorias,
          fat:index.gordura,
          carbohydrates:index.carboidratos,
          sodium: index.sodio,
          fiber:index.fibra,
          protein:index.proteinas
        })),
      }
        
      };
      console.log(JSON.stringify(evento))
      try{
        const response = await fetch(url,{
          method: 'POST',
          headers:{
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(evento),
        });

        if(!response.ok){
          throw new Error('Não foi possível criar o evento')
        }else{
        navigate('/calendario');
        }
        const data = await response.json();
        setDadosAlimentos([])
        setaAdicionarRefeicao(false)
      }catch(error){
        console.error(error);
      }
    }
    else{
      alert('Nenhum alimento foi adicionado. Clique no card e adicione o alimento');
    }
    
    setaAdicionarRefeicao(false)
  }


  const fetchUser = async (userId) => {
    try {
      const url = `http://localhost:3000/user/${userId}`;
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error("Erro ao buscar dados do usuário.");
      }
  
      const data = await response.json();
    //  console.log("Dados do usuário:", data);
      setUser(data)
      console.log(user)
       // Verifique os dados no console
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
    }
  };
  




  const handleUpdate = async () => {
    try {
      const updateValores = {
        start_date: new Date(start).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
        end_date: new Date(end).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
        user_id: dadosUsuario[0].user_id,
        color:atividade,
        foods: dadosAlimentos.map((index)=>({
          food_id: index.food_id,
          amount: index.quantidade,
          calories:index.calorias,
          fat:index.gordura,
          carbohydrates:index.carboidratos,
          sodium: index.sodio,
          fiber:index.fibra,
          protein:index.proteinas
        }))

      }

      const response = await fetch(`http://localhost:3000/meal/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateValores),
      });

      if (response.ok) {
        Swal.fire('Atualizado!', 'Os dados foram atualizados com sucesso.', 'success');
        onClose(); // Fecha o modal
        window.location.reload(); // Recarrega para refletir as alterações
      } else {
        throw new Error('Erro ao atualizar os dados.');
      }
    } catch (error) {
      Swal.fire('Erro', 'Não foi possível atualizar os dados.', 'error');
    }
  };


  const updateUsuario = async () => {
    try {
        // Criação do objeto com os valores de atualização
        const updateValores = {
            user: {
                user_id: user[0].user_id, // Certifique-se de que 'user' está corretamente inicializado
                mail: user[0].mail,
                calories_consumed: 1
            }
        };

        // Realização da requisição PUT
        const response = await fetch(`http://localhost:3000/user/update`, {
            method: 'PUT', // Método HTTP para atualizar
            headers: {
                'Content-Type': 'application/json', // Indica que o corpo é JSON
            },
            body: JSON.stringify(updateValores), // Converte o objeto para JSON
        });

        // Verificação de resposta
        if (!response.ok) {
            // Lida com erros HTTP
            throw new Error(`Erro na atualização: ${response.status} - ${response.statusText}`);
        }

        // Manipula a resposta da API
        const data = await response.json();
        console.log('Usuário atualizado com sucesso:', data);
    } catch (error) {
        // Lida com erros na requisição
        console.error('Erro ao atualizar o usuário:', error.message);
    }
};

  
  return (
    <div>
      <div className="header-componente">
        <header id="header-menu">
          <h1 id="h1-nutricard">
            <a href="/home" id="h1-nutricard">Nutricard</a>
          </h1>
          <nav className="nav-bar">
           <div className="adiconar-refeicao">
            {inputQuantidade &&(
              
            <button 
            id='adicionar-alimento'
            onClick={SalvarRefeicoes}
            >{valor}
            </button>
            )}
            <i 
            className="bi bi-cart-plus-fill"
            id='carrinho'
            onClick={SalvarRefeicoes}
            ></i>
            </div> 
            <div className="navbar-inner">
              <img
                src={imagemUsuario}
                alt="Menu"
                id="img-menu"
                onClick={abrirMenu}
              />
              <input type="checkbox" id="check" />
              <label htmlFor="check" className="checkbtn">
                <i className="fas fa-bars">opa</i>
              </label>
            </div>
          </nav>
        </header>
      </div>
      <div className="main-container">
        
        {menuAberto &&  dadosUsuario.map((index,idx)=>(

          <div key={index.id || idx} className="client-info">
          <div className="client-name">
            <a href="/login"><i className="bi bi-box-arrow-left" id='icone-saida'></i></a>
            <a href="/home" id="icone-home"><i className="bi bi-house"></i></a>
            <i className="bi bi-pencil" id='icone-lapis' onClick={updateUsuario}></i>
            <h2 id="valor-nome">{index.name || 'Usuário'}</h2>
          </div>
          <div className="info-section">
            <div className="informacoes-valores">
              <div className="info-item">
                <p>Calorias consumidas</p>
                <span className="info-value">{user[0].calories_consumed .toFixed(2)|| 0}</span>
              </div>
              <div className="info-item">
                <p>Calorias a consumir</p>
                <span className="info-value">{index.calorie_goal - (index.calories_consumed || 0) || 2000}</span>
              </div>
            </div>
            <div className="valores-pessoais">
              <div className="info-item">
                <p>Altura</p>
                <span className="info-value">{index.height || 0} m</span>
              </div>
              <div className="info-item">
                <p>Peso</p>
                <span className="info-value">{index.weight || 0} kg</span>
              </div>
              <div className="info-item">
                <p>IMC</p>
                <span className="info-value">{index.bmi.toFixed(2) || 0}</span>
              </div>
            </div>
          </div>
          <div className="button-section">
            <button className="client-button" onClick={abrirCalendario}>Calendário</button>
          </div>
        </div>
        ))}
      </div>
      <div className="main-container-2">
      {adicionarRefeicao && dadosAlimentos.map((index,idx)=>(
          <div className="add-refeicao" key={index.id || idx}>
          <div className="client-name">
           
          </div>
          <div className="info-section-2">
            <h4>Nome: {index.title}</h4>
            <div className="informacoes-valores-data">
              <div className="info-item-2">
              <input
                  type="datetime-local"
                  id="start"
                  onChange={handleInputChange}
                  style={{
                    textAlign: "center",
                    padding: "5px",
                  }}
                />
                <input
                  type="datetime-local"
                  id="end"
                  onChange={handleInputChange}
                  style={{
                    textAlign: "center",
                    padding: "5px",
                  }}
                />

              </div>
              <div className="info-item">
                
              <div className="dropdown-menu-3">
  {/* Refeições */}
  <div className="dropdown">
    <button
      className="btn btn-secondary dropdown-toggle"
      type="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      id="botao-list-refeicoes"
    >
      {refeicoes || "Tipo de Refeição"} {/* Mostra o tipo de refeição atual */}
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
</div>

              
              </div>
            </div>
          </div>
          <div className="button-sectionAlimentos">
            <button 
              className="client-button-salvarAlimentos" 
              onClick={SalvarAlimentos}>
                Salvar Alimento
             </button>
          
          </div>

          </div>
        ))}
      </div>
     


    </div>
  );
};

export default Header;
