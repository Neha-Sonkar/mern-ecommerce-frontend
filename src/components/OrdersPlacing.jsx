import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../Context/Context';
import API from '../api';
import './components.css';

const OrdersPlacing = () => {
    const navigate = useNavigate();
    const a = useContext(Context);

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        city: '',
        postalCode: '',
        country: 'India',
        paymentMethod: 'COD',
    });

    const [loading, setLoading] = useState(false);

    const subtotal = a.totalPrice;
    const estimatedTax = subtotal * 0.1;  // 10% tax
    const estimatedShipping = subtotal > 500 ? 0 : 12;  // Free shipping over ₹500
    const estimatedTotal = subtotal + estimatedTax + estimatedShipping;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const orderData = {
                user:a.userId,
                name:formData.name,
                orderItems: a.cartItems,
                shoppingAddress: {
                    address: formData.address,
                    city: formData.city,
                    postalCode: formData.postalCode,
                    country: formData.country,
                },
                payMethod: formData.paymentMethod
            };
            const res = await API.post('/order/create-order', orderData);
            if (res.data?.success) {
                alert('Order placed successfully!');
                // const res1 = await API.patch('/cart/send-order-confirmation', { email: a.user })
                // if (res1.data?.success) {
                //     alert("Confirmation mail send")
                //     const res2 = await API.delete('/cart/delete-cart')
                //     a.setCartItems(res2.data.cart.items)
                //     a.setTotalPrice(res2.data.totalPrice)
                //     a.setTotalItems(res2.data.totalItems)
                // }
                a.setCartItems([]);
                a.setTotalPrice(0);
                a.setTotalItems(0);
                navigate('/order-success');
            } else {
                alert('Failed to place order. Please try again.');
            }
        } catch (error) {
            console.error(error);
            alert('Server error. Are you online?');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="order-placing-page-wrapper">
            <div className="container my-5">
                <div className="row">
                    <div className="col-lg-6 col-12 mb-4">
                        <div className="card border-0 shadow-lg">
                            <div className="card-header bg-white border-0 py-3">
                                <h4 className="mb-0 fw-bold text-dark">Order Summary</h4>
                            </div>
                            <div className="card-body p-4">
                                {a.cartItems.map((item) => (
                                    <div key={item.product._id} className="d-flex align-items-center mb-3">
                                        <img
                                            src={item.product.image[0].url}
                                            alt={item.product.name}
                                            className="me-3 rounded"
                                            style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                            onError={(e) => { e.target.src = '/placeholder-image.jpg'; }}
                                        />
                                        <div className="flex-grow-1">
                                            <h6 className="mb-1 fw-bold">{item.product.name}</h6>
                                            <p className="text-muted small mb-0">Qty: {item.quantity} x ₹{item.product.price}</p>
                                        </div>
                                        <div className="text-end">
                                            <h6 className="mb-0 fw-bold">₹{item.quantity * item.product.price}</h6>
                                        </div>
                                    </div>
                                ))}
                                <hr />
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="h5 mb-0 fw-bold">Total</span>
                                    <span className="h5 mb-0 fw-bold text-primary">₹{a.totalPrice}/-</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 col-12">
                        <div className="card border-0 shadow-lg">
                            <div className="card-header bg-white border-0 py-3">
                                <h4 className="mb-0 fw-bold text-dark">Shipping & Payment Details</h4>
                            </div>
                            <div className="card-body p-4">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label fw-bold">Full Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="address" className="form-label fw-bold">Address</label>
                                        <textarea
                                            className="form-control"
                                            id="address"
                                            name="address"
                                            rows="3"
                                            value={formData.address}
                                            onChange={handleChange}
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="city" className="form-label fw-bold">City</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="city"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="postalCode" className="form-label fw-bold">Postal Code</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="postalCode"
                                                name="postalCode"
                                                value={formData.postalCode}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="country" className="form-label fw-bold">Country</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="country"
                                            name="country"
                                            value={formData.country}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label fw-bold">Payment Method</label>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="paymentMethod"
                                                id="cod"
                                                value="COD"
                                                checked={formData.paymentMethod === 'COD'}
                                                onChange={handleChange}
                                            />
                                            <label className="form-check-label" htmlFor="cod">
                                                Cash on Delivery
                                            </label>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg w-100 py-3 fw-bold rounded-pill"
                                        disabled={loading}
                                    >
                                        {loading ? 'Placing Order...' : `Place Order ₹${a.totalPrice}/-`}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrdersPlacing;