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
import Footer from "../components/Footer/Footer";
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

  const [dadosUsuario, setDadosUsuario] = useState([]); 
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parseData = JSON.parse(userData)
      setDadosUsuario(parseData);

    }else{
      console.log('nenhum dado encontrados no localStorage');
    }
  },[])

 


  useEffect(()=>{
   const fetchData = async () =>{
      const url = new URL('http://localhost:3000/food');
      try{
        const params = { number: 10, query: busca, sort:'fiber', sortDirection:'desc' }; // Define os parâmetros
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
        const res = await fetch(url);
        if(!res.ok){
          throw new Error("Erro na busca");
        }
        const result = await res.json();
        setData(result)

        setFilteredData(result)
       
      }
      catch(error){
        setError(error.message);
      }
    };
    fetchData();
  },[busca])


  useEffect(() => {
    const fetchFavorites = async () => {
      if (!dadosUsuario || dadosUsuario.length === 0) return;
  
      const userId = dadosUsuario[0]?.user_id;
      if (!userId) {
        console.error("user_id não encontrado nos dados do usuário");
        return;
      }
  
      try {
        const response = await fetch(`http://localhost:3000/food/favorites/${userId}`);
        if (!response.ok) {
          throw new Error("Erro ao buscar alimentos favoritos");
        }
        const favorites = await response.json();
        setFilteredDataTest(favorites);
      } catch (error) {
        console.error("Erro ao buscar favoritos:", error.message);
        setError(error.message);
      }
      
    };
  
    fetchFavorites();
  }, [dadosUsuario]);



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
      <Header
        valor='Salvar Alimento'
        inputQuantidade={true}
      />
      <div className="div-pai">
      <div className="descrisao-home">
        <h3>O que você está buscando ?</h3>
        <p id="texto-p">
          Encontre milhares de alimentos e sua respectiva informação calórica
        </p>
      <Input
        id="pesquisa-home"
        icon={iconBusca}
        type="text"
        placeholder="Pesquisar"
        idImg="iconBusca"
        onChange={handleBuscar}
        value={busca}
      
      />
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
                kcal={item.calories ? item.calories.toFixed(2) : null}
                proteina={item.protein ? item.protein.toFixed(2): null}
                carboidrato={item.carbohydrates ? item.carbohydrates.toFixed(2): null}
                sodio={item.sodium ? item.sodium.toFixed(2) : null}
                gordura={item.fat ? item.fat.toFixed(2): null}
                fibra={item.fiber ? item.fiber.toFixed(2): null}
                unidadeDeMedida={item.unit_of_measure}
                food_id={item.food_id}
                id='butao-fecha-modal'
                />
                <br />
                <br />
                <br />
            </SwiperSlide>
          ))
      }
        </Swiper>
      </div>
      <div className="descrisao-card-click">
      <h4 className="nome-frut">Favoritos</h4>
      <p id="card-informacao">Clique no card para mais informações</p>
     
      </div>
     <div className="container-card2">
     {filteredDataTest.length === 0 ? (
    <p id="frase-sem-alimentos">Você ainda não tem alimentos favoritos.</p>
) : (
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
    {filteredDataTest.map((item) => (
      <SwiperSlide key={item.food_id}>
        <Card
          nome={item.name}
          img={`https://img.spoonacular.com/ingredients_500x500/${item.image}`}
          kcal={item.calories ? item.calories.toFixed(2) : null}
          proteina={item.protein ? item.protein.toFixed(2) : null}
          carboidrato={item.carbohydrates ? item.carbohydrates.toFixed(2) : null}
          sodio={item.sodium ? item.sodium.toFixed(2) : null}
          gordura={item.fat ? item.fat.toFixed(2) : null}
          fibra={item.fiber ? item.fiber.toFixed(2) : null}
          edicaoModal={false}
          inputQuantidade={false}
          modalButton={true}
        />
        <br />
        <br />
      </SwiperSlide>
    ))}
  </Swiper>
)}
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
      <Footer/>
    </>
  );
};

export default Home;
