import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';
import { ShopContext } from '../../Context/ShopContext';
import { useContext } from 'react';
import { formatINR } from '../../utils/formatCurrency';

const Checkout = ({ onClose }) => {
    const { getTotalCartAmount } = useContext(ShopContext);
    const navigate = useNavigate();
    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: '',
        cardHolder: '',
        expiryDate: '',
        cvv: '',
        address: '',
        city: '',
        pincode: ''
    });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!paymentDetails.cardNumber.match(/^\d{16}$/)) {
            newErrors.cardNumber = 'Please enter a valid 16-digit card number';
        }
        if (!paymentDetails.cardHolder.trim()) {
            newErrors.cardHolder = 'Card holder name is required';
        }
        if (!paymentDetails.expiryDate.match(/^\d{2}\/\d{2}$/)) {
            newErrors.expiryDate = 'Enter valid expiry date (MM/YY)';
        }
        if (!paymentDetails.cvv.match(/^\d{3}$/)) {
            newErrors.cvv = 'Enter valid 3-digit CVV';
        }
        if (!paymentDetails.address.trim()) {
            newErrors.address = 'Address is required';
        }
        if (!paymentDetails.city.trim()) {
            newErrors.city = 'City is required';
        }
        if (!paymentDetails.pincode.match(/^\d{6}$/)) {
            newErrors.pincode = 'Enter valid 6-digit pincode';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPaymentDetails(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Simulate payment processing
            alert('Processing payment...');
            setTimeout(() => {
                alert('Payment successful! Thank you for your order.');
                navigate('/'); // Redirect to home page
            }, 2000);
        }
    };

    return (
        <div className="checkout-overlay">
            <div className="checkout-modal">
                <div className="checkout-header">
                    <h2>Secure Checkout</h2>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>
                <div className="checkout-content">
                    <div className="order-summary">
                        <h3>Order Summary</h3>
                        <p>Total Amount: {formatINR(getTotalCartAmount())}</p>
                    </div>
                    <form onSubmit={handleSubmit} className="checkout-form">
                        <div className="form-group">
                            <label>Card Number</label>
                            <input
                                type="text"
                                name="cardNumber"
                                placeholder="1234 5678 9012 3456"
                                value={paymentDetails.cardNumber}
                                onChange={handleInputChange}
                            />
                            {errors.cardNumber && <span className="error">{errors.cardNumber}</span>}
                        </div>
                        <div className="form-group">
                            <label>Card Holder Name</label>
                            <input
                                type="text"
                                name="cardHolder"
                                placeholder="Name on card"
                                value={paymentDetails.cardHolder}
                                onChange={handleInputChange}
                            />
                            {errors.cardHolder && <span className="error">{errors.cardHolder}</span>}
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Expiry Date</label>
                                <input
                                    type="text"
                                    name="expiryDate"
                                    placeholder="MM/YY"
                                    value={paymentDetails.expiryDate}
                                    onChange={handleInputChange}
                                />
                                {errors.expiryDate && <span className="error">{errors.expiryDate}</span>}
                            </div>
                            <div className="form-group">
                                <label>CVV</label>
                                <input
                                    type="text"
                                    name="cvv"
                                    placeholder="123"
                                    value={paymentDetails.cvv}
                                    onChange={handleInputChange}
                                />
                                {errors.cvv && <span className="error">{errors.cvv}</span>}
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Shipping Address</label>
                            <textarea
                                name="address"
                                placeholder="Enter your full address"
                                value={paymentDetails.address}
                                onChange={handleInputChange}
                            />
                            {errors.address && <span className="error">{errors.address}</span>}
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>City</label>
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    value={paymentDetails.city}
                                    onChange={handleInputChange}
                                />
                                {errors.city && <span className="error">{errors.city}</span>}
                            </div>
                            <div className="form-group">
                                <label>Pincode</label>
                                <input
                                    type="text"
                                    name="pincode"
                                    placeholder="123456"
                                    value={paymentDetails.pincode}
                                    onChange={handleInputChange}
                                />
                                {errors.pincode && <span className="error">{errors.pincode}</span>}
                            </div>
                        </div>
                        <button type="submit" className="pay-button">
                            Pay {formatINR(getTotalCartAmount())}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Checkout;