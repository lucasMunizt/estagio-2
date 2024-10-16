import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";
import Card from "../components/Card/Card";
import fruta from "../assets/fruta.jpg";
import fruta2 from "../assets/fruta.jpeg";
import "./Home.css";
import Input from "../components/input/Input";
import iconBusca from "../assets/icons/iconBusca.png";
import ArrayFrutas from "../data/Frutas";
const Home = () => {
  const [cards, setCards] = useState(3);
  const [cardsEspassamento, setcardsEspassament] = useState(10);
  const [busca,setBusca] = useState('');
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 820 && window.innerWidth > 560) {
        setCards(2);
        setcardsEspassament(20);
      } else if (window.innerWidth < 580) {
        setCards(1);
        setcardsEspassament(10);
      } else {
        setCards(3);
        setcardsEspassament(10);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

    const handleBuscar = (e) =>{
      e.preventDefault();
      setBusca(e.target.value);
      
    }

    const GetRamdomFrutas = (frutas) =>{
        return frutas.sort(()=>Math.random()-0.5).slice(0,5);
    }


  return (
    <>
      <header>
        <h1>nutricard</h1>
      </header>
      <div className="div-pai">
      <div className="descrisao-home">
        <h3>O que você está buscando ?</h3>
        <span id="text">
          Encontre milhares de alimentos e sua respectiva informação calórica
        </span>
      </div>

      <Input
        id="pesquisa-home"
        icon={iconBusca}
        type="text"
        placeholder="Pesquisar"
        idImg="iconBusca"
        onChange={handleBuscar}
      
      />
      </div>
     
      <h4 className="nome-frut">Frutas</h4>
      <div className="container-home">
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
          {GetRamdomFrutas(ArrayFrutas).map((frutavetor, index) => (
            <SwiperSlide key={frutavetor.id}>
              <Card
              img={fruta}
              descrisao={frutavetor.sobre}
              kcal={frutavetor.kcal}
              nome={frutavetor.nome}              
              />
              <br />
              <br />
              <br />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <h4 className="nome-frut">Verduras</h4>
      <div className="container-card2">
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
          <SwiperSlide>
            <Card img={fruta2} />
          </SwiperSlide>
          <SwiperSlide>
            <Card img={fruta} />
          </SwiperSlide>
          <SwiperSlide>
            <Card img={fruta} />
          </SwiperSlide>
          <SwiperSlide>
            <Card img={fruta} />
          </SwiperSlide>
          <SwiperSlide>
            <Card img={fruta2} />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default Home;
