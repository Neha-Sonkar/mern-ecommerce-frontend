import React, { useContext, useEffect, useState } from 'react'
import API from '../api'
import Context from '../Context/Context'
import './components.css'

const Orders = () => {
    const a = useContext(Context)
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [productsData, setProductsData] = useState({})

    useEffect(() => {
        if (!a.userId) return

        const fetchOrdersAndProducts = async () => {
            try {
                setLoading(true)
                setError(null)
                const res = await API.get(`/order/get-user-order/${a.userId}`)
                const fetchedOrders = res.data.orders
                setOrders(fetchedOrders)

                const productIdsToFetch = new Set()
                fetchedOrders.forEach(order => {
                    order.orderItems?.forEach(item => {
                        if (item.product) {
                            productIdsToFetch.add(item.product)
                        }
                    })
                })

                const productDetailsPromises = Array.from(productIdsToFetch).map(async (productId) => {
                    try {
                        const productRes = await API.get(`/products/get-product-by-id/${productId}`)

                        return { [productId]: productRes.data.data }
                    } catch (prodError) {
                        console.error(`Failed to fetch product ${productId}:`, prodError)
                        return { [productId]: null }
                    }
                })

                const fetchedProductDetails = await Promise.all(productDetailsPromises)
                const newProductsData = Object.assign({}, ...fetchedProductDetails)
                setProductsData(newProductsData)
            } catch (error) {
                console.error('Fetch error:', error)
                setError('Failed to load orders or products. Please try again.')
                setOrders([])
                setProductsData({})
            } finally {
                setLoading(false)
            }
        }

        fetchOrdersAndProducts()
    }, [a.userId])

    if (loading) {
        return (
            <div className="orders-loading">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Loading your orders...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="orders-error alert alert-danger text-center py-4">
                <h5 className="alert-heading">Oops! Something went wrong.</h5>
                <p>{error}</p>
                <button className="btn btn-primary" onClick={() => window.location.reload()}>
                    Try Again
                </button>
            </div>
        )
    }

    return (
        <div className="orders-container">
            <div className="orders-header">
                <h2 className="mb-4">Your Orders</h2>
                <p className="text-muted">Track and manage your recent purchases.</p>
            </div>

            {orders.length > 0 ? (
                <div className="orders-list">
                    {orders.map((order) => (
                        <div key={order._id} className="order-card card mb-4 shadow-sm">
                            <div className="card-header bg-light d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center gap-3">
                                    <i className="fas fa-shopping-bag text-primary"></i>
                                    <div>
                                        <h6 className="mb-0 fw-bold">
                                            Order #{order._id}
                                        </h6>
                                        <small className="text-muted">
                                            Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </small>
                                    </div>
                                </div>
                                <span className="badge bg-success">Delivered</span> 
                            </div>

                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-8 ">
                                        <div className="shipping-info mb-4">
                                            <h6 className="fw-bold mb-2">
                                                <i className="fas fa-map-marker-alt text-primary me-2"></i>
                                                Ship to
                                            </h6>
                                            <p className="mb-1">
                                                {order.shoppingAddress?.address || 'N/A'},{' '}
                                                {order.shoppingAddress?.city || 'N/A'} -{' '}
                                                {order.shoppingAddress?.postalCode || 'N/A'},{' '}
                                                {order.shoppingAddress?.country || 'N/A'}
                                            </p>
                                            <h6 className="fw-bold mb-2">
                                                <i className="fas fa-credit-card text-primary me-2"></i>
                                                Payment Method
                                            </h6>
                                            <p className="mb-0">{order.payMethod || 'N/A'}</p>
                                        </div>

                                        <div className="order-items">
                                            <h6 className="fw-bold mb-3">
                                                <i className="fas fa-list text-primary me-2"></i>
                                                Order Items ({order.orderItems?.length || 0})
                                            </h6>
                                            <div className="items-list">
                                                {order.orderItems?.map((item, index) => {
                                                    const productId = item.product
                                                    const product = productsData[productId]

                                                    return (
                                                        <div key={index} className="item-row d-flex align-items-center gap-3 py-3 border-bottom">
                                                            {product && product.image && product.image[0]?.url ? (
                                                                <img
                                                                    src={product.image[0].url}
                                                                    alt={product.name}
                                                                    className="item-image"
                                                                />
                                                            ) : (
                                                                <div className="no-image">
                                                                    <i className="fas fa-image"></i>
                                                                </div>
                                                            )}
                                                            <div className="flex-grow-1">
                                                                <h6 className="mb-1 fw-bold">{product?.name || 'Unknown Product'}</h6>
                                                                <p className="mb-1 text-muted small">{product?.description || 'No description available'}</p>
                                                                <div className="d-flex justify-content-between align-items-center">
                                                                    <span className="text-muted small">Qty: {item.quantity}</span>
                                                                    <span className="fw-bold">₹{(item.quantity * (product?.price || 0)).toFixed(2)}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-4" style={{position:"sticky"}}>
                                        <div className="order-summary sticky-top">
                                            <h6 className="fw-bold mb-3">Order Summary</h6>
                                            <div className="summary-table">
                                                <div className="row mb-2">
                                                    <div className="col-7">Items Subtotal</div>
                                                    <div className="col-5 text-end">₹{order.itemPrice?.toFixed(2) || 0}</div>
                                                </div>
                                                <div className="row mb-2">
                                                    <div className="col-7">Shipping</div>
                                                    <div className="col-5 text-end">₹{order.shippingPrice?.toFixed(2) || 0}</div>
                                                </div>
                                                <div className="row mb-2">
                                                    <div className="col-7">Tax</div>
                                                    <div className="col-5 text-end">₹{order.taxPrice?.toFixed(2) || 0}</div>
                                                </div>
                                                <div className="row mb-3">
                                                    <div className="col-7 fw-bold">Total</div>
                                                    <div className="col-5 text-end fw-bold">₹{order.totalPrice?.toFixed(2) || 0}</div>
                                                </div>
                                                {order.discount > 0 && (
                                                    <div className="row mb-3">
                                                        <div className="col-7">Discount</div>
                                                        <div className="col-5 text-end text-success">-₹{order.discount?.toFixed(2) || 0}</div>
                                                    </div>
                                                )}
                                                <div className="row border-top pt-2">
                                                    <div className="col-7 fw-bold fs-5">Grand Total</div>
                                                    <div className="col-5 text-end fw-bold fs-5 text-primary">
                                                        ₹{((order.totalPrice || 0) - (order.discount || 0)).toFixed(2)}
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="btn btn-outline-primary w-100 mt-3">
                                                <i className="fas fa-download me-2"></i>
                                                Download Invoice
                                            </button>
                                            <button className="btn btn-primary w-100 mt-2">
                                                <i className="fas fa-truck me-2"></i>
                                                Track Order
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="no-orders text-center py-5">
                    <i className="fas fa-inbox fa-3x text-muted mb-3"></i>
                    <h5 className="text-muted">No orders found</h5>
                    <p className="text-muted">You haven't placed any orders yet. Start shopping!</p>
                    <a href="/shop" className="btn btn-primary">
                        Shop Now
                    </a>
                </div>
            )}
        </div>
    )
}

export default Orders
