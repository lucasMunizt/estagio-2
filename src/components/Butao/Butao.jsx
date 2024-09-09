import React from 'react'
import './Butao.css'
const Butao = ({valor,id}) => {
  return (
    <div>
        <button id={id}>{valor}</button>
    </div>
  )
}

export default Butao