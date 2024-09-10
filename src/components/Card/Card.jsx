import React from 'react'
import './Card.css'
const Card = ({id,img}) => {
  return (
    <div className='container-card-pai'>
        <div className="conatiner-card" id={id}>
            <div className="card-img">
                <img src={img} alt="" />  
            </div>
            <div className="text-informacao">
                <h5>Descrição:</h5>
                <span>Banana Rico em proteina</span>
                <h5 className='h5-nutricao'>valores nutricionais:</h5>
                <span>230kcal</span>
            </div>
        </div>
   </div>
  )
}

export default Card