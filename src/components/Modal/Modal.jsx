import React, { useEffect } from 'react';
import './Modal.css';
import Butao from '../Botao/Butao'
import EventosPadrao from '../Calendario/EventosPadrao';
import moment from 'moment';
import 'moment/locale/pt-br';
import { useState } from 'react';
import DadosAlimentos from './DadosAlimentos';
import Swal from 'sweetalert2';
import { json, useNavigate } from 'react-router-dom';
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
  fibra,
  inputQuantidade = false,
  food_id,
  quantidadevalor,
  valorQuantidade = false,
  meal_id
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = (e) => setIsModalOpen(false)
  const [quantidade,setQuantidade] = useState(1)
  const [dadosUsuario, setDadosUsuario] = useState([]); 
  const navigate = useNavigate();


  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parseData = JSON.parse(userData)
      setDadosUsuario(parseData);

    }else{
      console.log('nenhum dado encontrados no localStorage');
    }
    
  }, [])

  const handleSaveToFavorites = async () => {
    try {
      const favorito = {
        user_id: dadosUsuario[0].user_id,
        food_id:food_id,
      };
      console.log("food"+favorito.food_id)
      console.log("user"+favorito.user_id)

      // Faz a requisição POST para salvar o favorito
      const response = await fetch(`http://localhost:3000/food/favorites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(favorito),
      });

      if (response.ok) {
        Swal.fire('Sucesso!', 'Alimento adicionado aos favoritos.', 'success');
      } else {
        Swal.fire('Erro', 'Não foi possível adicionar o alimento aos favoritos.', 'error');
      }
    } catch (error) {
      Swal.fire('Erro', 'Algo deu errado. Tente novamente.', 'error');
    }
  };


const handleDelete = async () => {
  const result = await Swal.fire({
    title: 'Deseja deletar esta refeição?',
    text: 'Essa ação não pode ser desfeita.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim, deletar!',
    cancelButtonText: 'Cancelar',
  });

  if (result.isConfirmed) {
    Swal.fire(
      'Deletado!',
      'A refeição foi removida com sucesso.',
      'success'
    );

    // A lógica para deletar vai aqui
    try {
      await fetch(`http://localhost:3000/meal/${meal_id}/food/${food_id}`, {
        method: 'DELETE',
      });
  
    } catch (error) {
      Swal.fire('Erro', 'Não foi possível deletar a refeição.', 'error');
    }
    
  }
    window.location.reload()
};

if (!isOpen) return null;

const SalvarAlimentos = () => {
  const valoresDadosAlimentos = {}
  DadosAlimentos.push({
    title: nome,
    calorias:calorias,
    carboidratos:carboidratos,
    proteinas:proteinas,
    sodio:sodio,
    gordura:gordura,
    fibra:fibra,
    quantidade:quantidade,
    img: img,
    food_id:food_id
  })
//localStorage.setItem('dadosModal',JSON.stringify(DadosAlimentos))
onClose();
};

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
        <div className="tes" style={{display:"flex", alignItems:"center",justifyContent:"spaceAround"}}>
        <h5 style={{fontWeight:'500',}}>Valores nutricionais:</h5>
       {inputQuantidade &&(
        <div className='input-quantidade-favoritos'>
          <input type="number" 
          id="quantidade-alimentos" 
          style={{width:"80px",height:"40px",marginLeft:"40px"}}
          onChange={(e)=>setQuantidade(e.target.value)} 
          placeholder='Qtd'/>
           <i className="bi bi-heart" id='icone-favoritos' onClick={handleSaveToFavorites}></i>
        </div>
       
      )}   

        </div>
        <div className="modal-valores">
          <p>Calorias: {calorias}g</p>
          <p>Carboidratos: {carboidratos}g</p>
          <p>Proteínas: {proteinas}g</p>
          <p>Sódio: {sodio}g</p>
          <p>Gordura: {gordura}g</p>
          <p>Fibra: {fibra}g</p>
          {valorQuantidade &&(
            <p>Quantidae: {quantidadevalor}</p>
          )}
        </div>

        {modalButton &&(
          <Butao 
          id='butao-modal'
          onClick={SalvarAlimentos} //openModal 
          valor='adicionar Alimento'
          />

        )}
        {edicaoModal &&(
         <div className="edicoes">
          <div className="modificar-dados">
          <i className="bi bi-trash" onClick={handleDelete} id='icone-refeicoes-deletar'></i>
          <i className="bi bi-pencil" id='icone-refeicoes-editar' onClick={SalvarAlimentos}></i>
          </div>
         </div>
        )}
      </div>
     
    </div>
  );
};

export default Modal;