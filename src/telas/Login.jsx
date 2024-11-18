import React, { useState } from 'react';
import Logins from '../components/Logins/Logins';
import iconEmail from '../assets/icons/iconEmail.png';
import iconSenha from '../assets/icons/iconSenha.png';
import './Login.css';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário
  
    const url = 'http://localhost:3000/user/login'; // Altere para sua API
    const body = { mail: email, password: senha };
  
    console.log("email:", email);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
  
      // Verifica se a resposta foi bem-sucedida antes de processar o JSON
      if (!response.ok) {
        const errorMessage = await response.text(); // Obtém a mensagem de erro como texto
        throw new Error(`Erro na requisição: ${errorMessage || response.statusText}`);
      }
  
      const result = await response.json(); // Obtém o JSON somente se a resposta for bem-sucedida
      console.log('Resposta do servidor:', result);
  
      // Salva no localStorage e redireciona
      localStorage.setItem('user', JSON.stringify(result));
      navigate('/home');
    } catch (error) {
      setError(error.message); // Atualiza o estado com a mensagem de erro
      console.error('Erro ao enviar os dados:', error);
    }
  };
  

 
  return (
    <div>
     
        <Logins
          titulo="NutriCard"
          butaoId1="criar-conta"
          butaoValor1="Criar Conta"
          titulo2="Olá Novamente!"
          span="Seja Bem Vindo!"
          inputId1="email"
          iconEmail={iconEmail}
          placeholder1="Coloque seu Email"
          typer1="email"
          inputId2="senha"
          iconSenha={iconSenha}
          placeholder2="Coloque sua Senha"
          type2="password"
          butaoValor2="Entrar"
          butaoId2="butao-entrar"
          a="Esqueceu a senha?"
          isCadastro={false}
          layoutInvertido={false}
          idImgEmail="iconEmailLogin"
          idImgSenha="iconSenhaLogin"
          // Handlers para atualizar os estados do email e senha
          onInputChangeNome={(e) => setEmail(e.target.value)}
          onInputChangeSenha ={(e) => setSenha(e.target.value)}
          onSave={handleLogin}
        />
      
      
    </div>
  );
};

export default Login;
