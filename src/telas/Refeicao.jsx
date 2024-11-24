import React from 'react'
import Header from '../components/Header/Header'
import Card from '../components/Card/Card'
import Modal from '../components/Modal/Modal'
import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";
import EventosPadrao from '../components/Calendario/EventosPadrao';
import { useLocation } from 'react-router-dom';
import './Refeicao.css'
const Refeicao = ({id_food}) => {
    const [cards, setCards] = useState(3); 
    const [cardsEspassamento, setcardsEspassament] = useState(100);
    const [eventos, setEventos] = useState(EventosPadrao);
    const location = useLocation(); // Obtém os valores do state do navigate
    const  id  = location.state.meal_id || {}; // Recupera o id do state
    const fetchEventos = async () =>{
        try{
            const response = await fetch(`http://localhost:3000/food/meal/${id}`);
            if(!response.ok){
                throw new Error('Não foi possível carregar os eventos');
            }
            const data = await response.json()
            setEventos(data)
        }catch(error){
            console.error(error);
        }
     }   

     useEffect(()=>{
        fetchEventos();
     },[id])



 


  return (
    <div>
        <Header/>
        <div className="container-cards-refeicoes">
            <h3> Refeições Adicionadas</h3>
           <div className="card-carrossel">
           <Swiper
          slidesPerView={cards}
          spaceBetween={cardsEspassamento}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          className="mySwiper"
        >
         { 
          eventos.map((item) => (
            <SwiperSlide key={item.food_id}>
              <Card
                 nome={item.name}
                 carboidrato={item.carbohydrates}
                 kcal={item.calories}
                 proteina={item.protein}
                 img={`https://img.spoonacular.com/ingredients_500x500/${item.image}`}
                 gordura={item.fat}
                 sodio={item.sodium}
                 fibra={item.fiber}
                 descrisao={item.amount}
                />
                <br />
                <br />
            </SwiperSlide>
          ))
         }
        </Swiper>
           
           

           </div>
        </div>


    </div>
  )
}

export default Refeicao