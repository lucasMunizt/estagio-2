import React from 'react'
import './Butao.css'
const Butao = ({valor,id,onClick}) => {
  return (
    <div>
        <button id={id} onClick={onClick}>{valor}</button>
    </div>
  )
}

export default Butao