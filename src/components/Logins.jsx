import React from 'react'
import './Logins.css'
import Input from './input/Input'
import Butao from './Butao/Butao'

const Logins = ({
  titulo, butaoId1, butaoValor1, titulo2, span,
  inputId1, iconEmail, placeholder1, typer1,
  inputId2, iconSenha, placeholder2, type2,
  butaoValor2, butaoId2, a, isCadastro = false,
  inputIdExtra, iconExtra, placeholderExtra, typeExtra,
  layoutInvertido = false,idImgEmail,idImgSenha,idImgPersona
}) => {
  return (
    <div>
      <div className="container">
        <div className={`quadrado-principal ${layoutInvertido ? 'invertido' : ''}`}>
          <div className="img">
            <h1>{titulo}</h1>
            <Butao id={butaoId1} valor={butaoValor1} />
          </div>
          <div className="card">
            <div className="card-body">
              <h1>{titulo2}</h1>
              <span>{span}</span>
              <form action="">
                <Input
                 id={inputId1}
                 icon={iconEmail} 
                 placeholder={placeholder1} 
                 type={typer1} 
                 idImg={idImgEmail}/>
                <Input 
                  id={inputId2}
                  icon={iconSenha}
                  placeholder={placeholder2}
                  type={type2}  
                  idImg={idImgSenha}/>
                {/* Campo extra apenas na tela de cadastro */}
                {isCadastro && (
                  <Input 
                  id={inputIdExtra}
                  icon={iconExtra} 
                  placeholder={placeholderExtra} 
                  type={typeExtra} 
                  idImg={idImgPersona}/>
                )}
                <Butao valor={butaoValor2} id={butaoId2} />
                <div className="senha-esquecida">
                  <p><a href="./Cadastro.jsx">{a}</a></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Logins
