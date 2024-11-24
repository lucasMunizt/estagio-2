import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";
import Card from "../components/Card/Card";
import "./Home.css";
import Input from "../components/input/Input";
import iconBusca from "../assets/icons/iconBusca.png";
import ArrayFrutas from "../data/Frutas";
import Modal from "../components/Modal/Modal";
import Header from "../components/Header/Header";
const Home = () => {
  const [cards, setCards] = useState(3); // 3
  const [cardsEspassamento, setcardsEspassament] = useState(10);
  const [busca,setBusca] = useState('');
  const [sugestoes,setSugestoes] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [frutaSelecionada, setFrutaSelecionada] = useState(null);
  const openModal = () => setIsModalOpen(true);
  const closeModal = (e) => setIsModalOpen(false)
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState([])
  const [filteredDataTest, setFilteredDataTest] = useState([])
  const [alimentos,setAlimetos] = useState()
  let buscaTest = 'apple';
  //const url = 'http://localhost:3000/food'


  const buildUrl = (query) => {
  
   // let params = new URLSearchParams({ number:1}); 
    if (!query) query ='';
    return `${baseUrl}`;
  };

  useEffect(()=>{
   const fetchData = async () =>{
      const url = new URL('http://localhost:3000/food');
      const urlTest = new URL('http://localhost:3000/food');
      try{
        const params = { number: 5, query: busca, sort:'calories', sortDirection:'desc' }; // Define os parâmetros
        const paramsTest = { number: 0, query: busca, sort:'fiber', sortDirection:'desc' }; // Define os parâmetros
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
        Object.keys(paramsTest).forEach(key => urlTest.searchParams.append(key, paramsTest[key]))
        const res = await fetch(url);
        const res2 = await fetch(urlTest);
        if(!res.ok){
          throw new Error("Erro na busca");
        }
        const result = await res.json();
        const result2 = await res2.json();
        //console.log("Dados retornados da API:", result);
        //console.log(JSON.stringify(result2))
        setData(result)
        //console.log(data)
        setFilteredData(result)
        setFilteredDataTest(result2)
       
      }
      catch(error){
        setError(error.message);
      }
    };
    fetchData();
  },[busca])


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

   /* const handleBuscar = (e,valorBusca) =>{
      e.preventDefault();
      const texto = e.target.value; 
      setBusca(texto);
      if(texto.length > 0){
        const filtrados = data.filter((fruta)=>
          fruta.name.toLowerCase().startsWith(texto.toLowerCase())
        );
        setSugestoes(filtrados.slice(0,5));
      }else{
        setSugestoes([]);
      }
    };*/

 


    const handleBuscar = (e) => {
      e.preventDefault();
      const texto = e.target.value;
      setBusca(texto);
      setFilteredData(data);
      /* if (texto.trim() === '') {
        setFilteredData(data); // Mostra todos os itens se busca estiver vazia
      }else{
       const filtrados = data.filter((fruta)=>
          fruta.name.toLowerCase().startsWith(texto.toLowerCase())
        );*/
        //setSugestoes(filtrados.slice(0,5));
        //setFilteredData(filtrados.slice(0,5));} 

      };
    
    
    const handleSelect = (fruta) => {
      setBusca(fruta.name);
   //   setFrutaSelecionada(fruta)
      openModal();
      setSugestoes([]);
    } 

    
  return (
    <>
      <Header/>
      <div className="div-pai">
      <div className="descrisao-home">
        <h3>O que você está buscando ?</h3>
        <span id="text">
          Encontre milhares de alimentos e sua respectiva informação calórica
        </span>

        {/* <input type="text" id="pesquisa-home" placeholder="pesquisar" onChange={handleBuscar} value={busca}/> */}
      <Input
        id="pesquisa-home"
        icon={iconBusca}
        type="text"
        placeholder="Pesquisar"
        idImg="iconBusca"
        onChange={handleBuscar}
        value={busca}
      
      />
       {busca.trim() && filteredData.length > 0 &&(
          <ul id="lista-busca">
            {filteredData.map((fruta)=>(
              <li
              key={fruta.food_id}
              onClick={() => handleSelect(fruta)}
              style={{
                padding: '20px',
                cursor: 'pointer',
                borderBottom: '1px solid #eee',
                
              }}>
                {fruta.name}
              </li>
            ))}
          </ul>
        )}
      </div>
     
      </div>
      <h4 className="nome-frut">Recomendações</h4>
      <p id="card-informacao">Clique no card para mais informações</p>
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
            { 
          data.map((item) => (
            <SwiperSlide key={item.food_id}>
              <Card
                nome={item.name}
                img={`https://img.spoonacular.com/ingredients_500x500/${item.image}`}
                kcal={item.calories}
                proteina={item.protein}
                carboidrato={item.carbohydrates}
                sodio={item.sodium}
                gordura={item.fat}
                fibra={item.fiber}
                unidadeDeMedida={item.unit_of_measure}
                food_id={item.food_id}
                />
                <br />
                <br />
            </SwiperSlide>
          ))
      }
        </Swiper>
      </div>
      <div className="descrisao-card-click">
      <h4 className="nome-frut">Recomendações</h4>
      <p id="card-informacao">Clique no card para mais informações</p>
     
      </div>
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
         { 
          filteredDataTest.map((item) => (
            <SwiperSlide key={item.food_id}>
              <Card
                 nome={item.name}
                 img={`https://img.spoonacular.com/ingredients_500x500/${item.image}`}
                 kcal={item.calories}
                 proteina={item.protein}
                 carboidrato={item.carbohydrates}
                 sodio={item.sodium}
                 gordura={item.fat}
                 fibra={item.fiber}
                />
                <br />
                <br />
            </SwiperSlide>
          ))
         }
        </Swiper>
      </div>

      {isModalOpen && filteredData.map((index)=>(
        <Modal key={index.food_id}
        
        nome={index.name}
        isOpen={isModalOpen}
        onClose={closeModal}
        img={`https://img.spoonacular.com/ingredients_500x500/${index.image}`}
        modalButton={true}
        opamen='test-butao-fechar'
        carboidratos={index.carbohydrates}
        calorias={index.calories}
        sodio={index.sodium}
        gordura={index.fat}
        fibra={index.fiber}
        id='butao-fechar-home'
        />
      ))}
      <footer></footer>
    </>
  );
};

export default Home;
