import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import{createBrowserRouter,RouterProvider,Route} from "react-router-dom"
import Login from './telas/Login.jsx'
import Cadastro from './telas/Cadastro.jsx'
import Home from './telas/Home.jsx'
import DadosPessoais from './telas/DadosPessoais.jsx'
import Calendario from './components/Calendario/Calendario.jsx'
import Refeicao from './telas/Refeicao.jsx'

const router = createBrowserRouter([
  
  {
    path: '/',
    element: <App />, // Rota principal usando o componente App
    children: [
      { path: 'login', element: <Login /> },
      { path: 'cadastro', element: <Cadastro /> },
      { path: 'home', element: <Home /> },
      { path: 'dadosPessoais', element: <DadosPessoais /> },
      {path: 'calendario', element: <Calendario/> },
      {path: 'refeicao',element: <Refeicao/>}
    ]
  }
])




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <RouterProvider router={router}/>
  </StrictMode>,
)
