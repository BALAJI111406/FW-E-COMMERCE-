import React, { useState } from 'react'
import './CartItems.css'
import remove_icon from '../Assets/cart_cross_icon.png'
import { useContext } from 'react'
import { ShopContext } from '../../Context/ShopContext'
import { formatINR } from '../../utils/formatCurrency'
import Checkout from '../Checkout/Checkout'
const CartItems = () => {
    const {all_product,cartItems,removeFromCart,getTotalCartAmount}=useContext(ShopContext)
    const [showCheckout, setShowCheckout] = useState(false)
  return (
    <div className='cartitems'>
        <div className="cartitems-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Size</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr />
        {all_product.map((e)=>{
            if(cartItems.items[e.id]>0){
                return <div key={e.id}>
                {cartItems.sizes[e.id].map((size, index) => (
                    <div key={`${e.id}-${index}`} className="cartitems-format cartitems-format-main">
                        <img src={e.image} className='carticon-product-icone' alt="" />
                        <p>{e.name}</p>
                        <p className="cartitems-size">{size}</p>
                        <p>{formatINR(e.new_price)}</p>
                        <button className='cartitems-quantity'>1</button>
                        <p>{formatINR(e.new_price)}</p>
                        <img 
                            className='cartitems-remove-icon' 
                            src={remove_icon} 
                            onClick={() => removeFromCart(e.id, index)} 
                            alt="" 
                        />
                    </div>
                ))}
                <hr />
            </div>
            }return null;
        })}
        <div className="cartitems-down">
            <div className="cartitems-total">
                <h1>cart Totals</h1>
                <div>
                    <div className="cartitems-total-item">
                        <p>Subtotal</p>
                        <p>{formatINR(getTotalCartAmount())}</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <p>Shipping Fee</p>
                        <p>Free</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <h3>Total</h3>
                        <h3>{formatINR(getTotalCartAmount())}</h3>
                    </div>

                </div>
                <button onClick={() => setShowCheckout(true)}>PROCEED TO CHECKOUT</button>
            </div>
            <div className="cartitems-promocode">
                <p>If you have a promo code, Enter it here</p>
                <div className="cartitems-promobox">
                    <input type="text" name="" id="" placeholder='promo code' />
                    <button>Submit</button>
                </div>
            </div>
        </div>
        {showCheckout && (
            <Checkout onClose={() => setShowCheckout(false)} />
        )}
    </div>
  )
}

export default CartItems