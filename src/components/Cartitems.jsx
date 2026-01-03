import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Context from '../Context/Context'
import cart from '../assets/cart.png'
import API from '../api'
import './components.css'

const Cartitems = () => {
    const navigate = useNavigate()
    const a = useContext(Context)
    const quantity = 0

    const handleDecrease = async (productId, quantity) => {
        try {
            quantity = quantity - 1
            const res = await API.patch('/cart/update-items-of-cart', { productId, quantity })
            a.handlecart()
        } catch (error) {
            console.error(error)
        }
    }

    const handleIncrease = async (productId, quantity) => {
        try {
            quantity = quantity + 1
            const res = await API.patch('/cart/update-items-of-cart', { productId, quantity })
            a.handlecart()
        } catch (error) {
            console.error(error)
        }
    }

    const handleDeleteCart = async (e) => {
        e.preventDefault()
        try {
            const res = await API.delete('/cart/delete-cart')
            window.location.reload()
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="cart-page-wrapper">
            <div className="cart-container">
                <div className="cart-header">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                        <div >
                            <h1 className="mb-1">Shopping Cart</h1>
                            <small className="text-muted">
                                {a.totalItems > 0 ? `${a.totalItems} item${a.totalItems > 1 ? 's' : ''} in your cart` : 'Your cart is empty'}
                            </small>
                        </div>
                        {a.totalItems > 0 && (
                            <button className="btn btn-outline-secondary btn-sm" onClick={handleDeleteCart}>
                                <i className="fas fa-trash me-1"></i>
                                Clear Cart
                            </button>
                        )}
                    </div>
                </div>

                {a.cartItems.length != 0 ? (
                    <>
                        <div className="cart-items-section">
                            <div className="row">
                                {a.cartItems.map((item) => (
                                    <div key={item.product._id} className="col-lg-8 col-12 mb-4">
                                        <div className="cart-item-card card h-100 border-0 shadow-lg">
                                            <div className="card-body p-4 d-flex align-items-center gap-4">
                                                <div className="item-image-container">
                                                    <img
                                                        src={item.product.image[0].url}
                                                        alt={item.product.name}
                                                        className="item-image rounded-3"
                                                        onError={(e) => {
                                                            e.target.src = '/placeholder-image.jpg'
                                                        }}
                                                    />
                                                </div>
                                                <div className="item-details flex-grow-1">
                                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                                        <div>
                                                            <h5 className="mb-1 fw-bold text-dark">{item.product.name}</h5>
                                                            <p className="text-muted small mb-0">{item.product.description}</p>
                                                        </div>
                                                        <div className="text-end">
                                                            <h5 className="mb-0 fw-bold text-primary">₹{item.product.price}</h5>
                                                            <small className="text-muted">per unit</small>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex justify-content-between align-items-center mt-3">
                                                        <div className="quantity-controls d-flex align-items-center border rounded-pill px-3 py-2 bg-light">
                                                            <button
                                                                className="btn btn-link p-0 text-decoration-none fw-bold fs-5"
                                                                onClick={() => handleDecrease(item.product._id, item.quantity)}
                                                                disabled={item.quantity < 1}
                                                                style={{ minWidth: '30px', color: '#6c757d' }}
                                                            >
                                                                {item.quantity > 1 ? (
                                                                    <i>-</i>
                                                                ) : (
                                                                    <i className="fas fa-trash me-1"></i>
                                                                )}
                                                            </button>
                                                            <span className="quantity-badge mx-3 px-3 py-1 bg-white border rounded fw-bold fs-6">
                                                                {item.quantity}
                                                            </span>
                                                            <button
                                                                className="btn btn-link p-0 text-decoration-none fw-bold fs-5"
                                                                onClick={() => handleIncrease(item.product._id, item.quantity)}
                                                                style={{ minWidth: '30px', color: '#6c757d' }}
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                        <div className="item-total-price">
                                                            <h4 className="mb-0 fw-bold text-success">₹{item.quantity * item.product.price}/-</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="cart-summary-section mt-4">
                            <div className="row justify-content-end">
                                <div className="col-lg-4 col-12">
                                    <div className="card border-0 shadow-lg">
                                        <div className="card-header bg-white border-0 py-3">
                                            <h4 className="mb-0 fw-bold text-dark">Order Summary</h4>
                                        </div>
                                        <div className="card-body p-4">
                                            <div className="summary-row d-flex justify-content-between align-items-center mb-3 py-2">
                                                <span className="text-muted">Subtotal ({a.totalItems} items)</span>
                                                <span className="h5 mb-0 fw-bold">₹{a.totalPrice}/-</span>
                                            </div>
                                            <div className="summary-row d-flex justify-content-between align-items-center mb-3 py-2 text-success">
                                                <span>Discount</span>
                                                <span className="fw-bold">₹0</span>
                                            </div>
                                            <div className="summary-row d-flex justify-content-between align-items-center mb-4 py-2 border-top">
                                                <span className="h4 mb-0 fw-bold">Total</span>
                                                <span className="h4 mb-0 fw-bold text-primary">₹{a.totalPrice}/-</span>
                                            </div>
                                            <button
                                                className="btn btn-primary btn-lg w-100 py-3 fw-bold rounded-pill"
                                                onClick={()=>navigate('/order-placing')}
                                            >
                                                <i className="fas fa-credit-card me-2"></i>
                                                Proceed to Checkout ₹{a.totalPrice}/-
                                            </button>
                                            <div className="text-center mt-3">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="empty-cart text-center py-5 my-5">
                        <div className="empty-cart-icon-wrapper mb-4">
                            <img src={cart} alt="Empty Cart" className="empty-cart-icon position-absolute" />
                        </div>
                        <h3 className="text-muted mb-3 fw-bold">Your Cart is Empty</h3>
                        <p className="text-muted lead mb-4">Looks like you haven't added anything to your cart yet.</p>
                        <div className="d-flex flex-column gap-2">
                            <button className="btn btn-primary btn-lg rounded-pill px-4" onClick={() => navigate('/')}>
                                <i className="fas fa-store me-2"></i>
                                Continue Shopping
                            </button>
                            <button className="btn btn-outline-secondary btn-lg rounded-pill px-4" onClick={() => navigate('/products')}>
                                <i className="fas fa-th-large me-2"></i>
                                Browse Products
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Cartitems
