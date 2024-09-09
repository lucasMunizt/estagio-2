import React from 'react'
import './Input.css'
const Input = ({type,placeholder,id,icon}) => {
  return (
    <div className="input-container">
      <img src={icon} alt="Email Icon" className="icon" />
      <input type={type} placeholder={placeholder} id={id} />
   </div>
  )
}

export default Input