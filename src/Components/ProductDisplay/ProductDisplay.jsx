import React, { useState } from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { ShopContext } from '../../Context/ShopContext'
import { useContext } from 'react'
import { formatINR } from '../../utils/formatCurrency'



const ProductDisplay = (props) => {
    const {product}=props
    const {addToCart} = useContext(ShopContext)
    const [selectedSize, setSelectedSize] = useState(null)
  return (
    <div className='productdisplay'>
        <div className="productdisplay-left">
            <div className="productdisplay-img-list">
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
            </div>
            <div className="productdisplay-img">
                <img className='productdisplay-main-img' src={product.image} alt="" />
            </div>

        </div>
        <div className="productdisplay-right">
            <h1>{product.name}</h1>
            <div className="productdisplay-right-star">
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_dull_icon} alt="" />
                <img src={star_dull_icon} alt="" />
                <p>(122)</p>
            </div>
            <div className="productdisplay-right-prices">
                <div className="productdisplay-right-price-old">{formatINR(product.old_price)}</div>
                <div className="productdisplay-right-price-new">{formatINR(product.new_price)}</div>
            </div>
            <div className="productdisplay-right-description">

            </div>
            <div className="productdisplay-right-size">
                <h1>Select Size</h1>
                <div className="productdisplay-right-sizes">
                    {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                        <div 
                            key={size}
                            className={selectedSize === size ? 'size-selected' : ''}
                            onClick={() => setSelectedSize(size)}
                        >
                            {size}
                        </div>
                    ))}
                </div>
                {!selectedSize && <p className="size-error">Please select a size</p>}
            </div>
            <button onClick={() => {
                if (selectedSize) {
                    addToCart(product.id);
                    alert(`Added to cart - Size: ${selectedSize}`);
                } else {
                    alert('Please select a size first');
                }
            }}>ADD TO CART</button>
            <p className='productdisplay-right-category'><span>Category :</span> Women , T-Shirt, Crop Top</p>
            <p className='productdisplay-right-category'><span>Tags :</span> Modern , Latest</p>

        </div>
    </div>
  )
}

export default ProductDisplay