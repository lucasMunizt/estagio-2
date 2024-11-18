import React from "react";
import "./Logins.css";
import Input from "../input/Input";
import Butao from "../Botao/Butao";
import { useNavigate } from "react-router-dom";

const Logins = ({
  titulo,
  butaoId1,
  butaoValor1,
  titulo2,
  span,
  inputId1,
  iconEmail,
  placeholder1,
  typer1,
  inputId2,
  iconSenha,
  placeholder2,
  type2,
  butaoValor2,
  butaoId2,
  a,
  isCadastro = false,
  inputIdExtra,
  iconExtra,
  placeholderExtra,
  typeExtra,
  layoutInvertido = false,
  idImgEmail,
  idImgSenha,
  idImgPersona,
  isDados = false,
  isInput = true,
  onInputChangeSenha,
  onSave,
  onInputChangeNome,
  onInputChangeIdade,
  onInputChangePeso,
  onInputChangeAltura,
  onInputChangeEmail,
  gernero = false,
  onInputChangeGenero,
  idGenero
}) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="container">
        <div
          className={`quadrado-principal ${layoutInvertido ? "invertido" : ""}`}
        >
          <div className="img">
            <h1 id="valor-titulo">{titulo}</h1>
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
                  idImg={idImgEmail}
                  onChange={onInputChangeNome} // Certifique-se de que este campo captura mudanças
                />
                {isInput && (
                  <Input
                    id={inputId2}
                    icon={iconSenha}
                    placeholder={placeholder2}
                    type={type2}
                    idImg={idImgSenha}
                    onChange={onInputChangeSenha} // Certifique-se de que este campo captura mudanças
                  />
                )}

                {isCadastro && isInput && (
                  <Input
                    id={inputIdExtra}
                    icon={iconExtra}
                    placeholder={placeholderExtra}
                    type={typeExtra}
                    idImg={idImgPersona}
                    onChange={onInputChangeEmail} // Corrige aqui
                  />

                )}
                {gernero &&(
                     <input type="text" onChange={onInputChangeGenero}id={idGenero} />
                )}

                {/* Renderiza os campos de input para idade, peso e altura */}
                {isDados && (
                  <div className="campos-valores">
                    <input
                      type="number"
                      id="idade"
                      placeholder="Idade"
                      onChange={onInputChangeIdade} // Corrige aqui
                    />
                    <input
                      type="number"
                      id="peso"
                      placeholder="Peso"
                      onChange={onInputChangePeso} // Corrige aqui
                    />
                    <input
                      type="number"
                      id="altura"
                      placeholder="Altura"
                      onChange={onInputChangeAltura} // Corrige aqui
                    />
                  </div>
                )}

                <Butao valor={butaoValor2} id={butaoId2} onClick={onSave} />

                {!isCadastro && (
                  <div className="senha-esquecida">
                    <p>
                      <a href="./Cadastro.jsx">{a}</a>
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logins;
