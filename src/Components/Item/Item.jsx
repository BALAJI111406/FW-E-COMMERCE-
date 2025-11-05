import React from 'react'
import "./Item.css"
import { Link } from 'react-router-dom'
import { formatINR } from '../../utils/formatCurrency'

const Item = (props) => {
  return (
    <div className='item'>
     <Link to={`/product/${props.id}`}><img onClick={window.scroll(0,0)} src={props.image} alt="" /></Link> 
      <p>{props.name}</p>
      <div className="item-prices">
        <div className="item-price-new">
          {formatINR(props.new_price)}
        </div>
        <div className="item-price-old">
          {formatINR(props.old_price)}
        </div>
      </div>
    </div>
  )
}

export default Item