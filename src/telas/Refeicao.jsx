import React, { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2'; // Adicione SweetAlert2
import Header from '../components/Header/Header';
import Card from '../components/Card/Card';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper/modules';
import EventosPadrao from '../components/Calendario/EventosPadrao';
import { useLocation } from 'react-router-dom';
import { json, useNavigate } from 'react-router-dom';
import './Refeicao.css';
import Footer from '../components/Footer/Footer'
const Refeicao = ({ id_food }) => {
  const [cardsTest, setCardsTest] = useState();
  const [cardsEspassamento, setCardsEspassamento] = useState();
  const [eventos, setEventos] = useState(EventosPadrao);
  const location = useLocation();
  const id = location.state.meal_id || {};
  const titulo = location.state.title ||{};
  const swiperRef = useRef(null);
  let calorias=0;
  let proteinas=0;
  let gorduras=0;
  let carboidratos=0;
  let fibras=0;
  let quantidade =0;
  const navigate = useNavigate();

  const fetchEventos = async () => {
    try {
      const response = await fetch(`http://localhost:3000/food/meal/${id}`);
      if (!response.ok) {
        throw new Error('Não foi possível carregar os eventos');
      }
      const data = await response.json();
      setEventos(data);
      if (data.length > 1) {
        setCardsTest(data.length - 1);
        setCardsEspassamento(1);
      } else {
        setCardsTest(data.length);
        setCardsEspassamento(1200);
      }
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    fetchEventos();
  }, [id]);

  // Função para exibir confirmação de deleção
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
        await fetch(`http://localhost:3000/meal/${id}`, {
          method: 'DELETE',
        });
        fetchEventos();
        navigate('/calendario')
      } catch (error) {
        Swal.fire('Erro', 'Não foi possível deletar a refeição.', 'error');
      }
    }
  };

  return (
    <div>
      <Header 
      inputQuantidade={true}
      valor='Alterar Refeição'
      />
      <div className="container-cards-refeicoes">
          <h3 id='descrisao-refeicoes'>{titulo}</h3>
          
      
        {
          eventos.forEach((index)=>(
            calorias += Number(index.calories),
            proteinas += Number(index.protein),
            carboidratos += Number(index.carbohydrates),
            gorduras += Number(index.fat),
            fibras += Number(index.fiber),
            quantidade += Number(index.amount)
          ))

        }

        <div className="valores-somados">
          <h3>Total</h3>
        <span id='calorias-soma'>Calorias: {calorias.toFixed(2)}</span>
        <span id='proteinas-soma'>Proteínas: {proteinas.toFixed(2)}</span>
        <span id='carboidratos-soma'>Carboidratos: {carboidratos.toFixed(2)}</span>
        <span id='gordura-soma'>gordura {gorduras.toFixed(2)}</span>
        <span id='fibra-soma'>Fibras: {fibras.toFixed(2)}</span>
        <span id='fibra-soma'>Alimentos: {quantidade}</span>
        <button id="deletar-refeicao" onClick={handleDelete}>
          Deletar refeição
        </button>

        </div>
        <div className="card-carrossel">
          <Swiper
            slidesPerView={3}
            spaceBetween={10}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            modules={[FreeMode, Pagination]}
            className="mySwiper"
            ref={swiperRef}
          >
            <div className="cards"></div>
            {eventos.map((item) => (
              <SwiperSlide key={item.food_id}>
                <Card
                  nome={item.name}
                  carboidrato={item.carbohydrates.toFixed(2)}
                  kcal={item.calories.toFixed(2)}
                  proteina={item.protein.toFixed(2)}
                  img={`https://img.spoonacular.com/ingredients_500x500/${item.image}`}
                  gordura={item.fat.toFixed(2)}
                  sodio={item.sodium.toFixed(2)}
                  fibra={item.fiber.toFixed(2)}
                  modalButton={false}
                  id="butao-fecha-modal-refeicao"
                  inputQuantidade={false}
                  valorQuantidade={true}
                  quantidade={item.amount}
                  edicaoModal={true}
                  meal_id={id}
                  food_id={item.food_id}
                />
                <br />
                <br />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Refeicao;
