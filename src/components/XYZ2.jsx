import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Context from '../Context/Context'
import API from '../api'
import './components.css' // Assuming you'll create a separate CSS file for styles

const XYZ2 = () => {
    const a = useContext(Context) 
    const { slug } = useParams()
 
    useEffect(() => {
        const fetchProdutByName = async () => {
            try {
                const res = await API.get(`/products/search?query=${encodeURIComponent(slug)}`)
                a.setItems(res.data.data)
            }
            catch (error) {
                console.error(error)
            }
        }
        fetchProdutByName()
    }, [slug, a.setItems])

    const handleadditems = async (productId) => {
        try {
            let quantity = 1
            const res = await API.post('/cart/add-items-to-cart', { productId, quantity })
            a.handlecart()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="products-container">
            <div className="search-header text-center mb-5">
                <h2 className="section-title">Search Results for "{slug}"</h2>
                <p className="section-subtitle text-muted">We found {a.items.length} matching items</p>
            </div>

            {a.items.length > 0 ? (
                <div className="row justify-content-center">
                    {a.items.map((item) => (
                        <div key={item._id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                            <div className="product-card card h-100 border-0 shadow-sm">
                                <div className="card-image-container position-relative overflow-hidden">
                                    <img 
                                        src={item.image[0].url} 
                                        className="card-img-top" 
                                        alt={item.name}
                                        onError={(e) => {
                                            e.target.src = '/placeholder-image.jpg' // Fallback if needed
                                        }}
                                    />
                                </div>
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title fw-bold mb-2">{item.name}</h5>
                                    <p className="card-text text-muted small mb-3 flex-grow-1">{item.description || 'Premium quality jewelry piece'}</p>
                                    <div className="d-flex justify-content-between align-items-center mt-auto">
                                        <h5 className="mb-0 fw-bold text-primary">₹{item.price}/-</h5>
                                        <button 
                                            className="btn btn-primary px-4 py-2 rounded-pill fw-semibold"
                                            onClick={() => handleadditems(item._id)}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="empty-state text-center py-5">
                    <i className="fas fa-search fa-3x text-muted mb-3"></i>
                    <h4 className="text-muted mb-3 fw-bold">Sorry, no results found!</h4>
                    <p className="text-muted mb-4">Try adjusting your search or explore our full collection.</p>
                    <button className="btn btn-outline-primary rounded-pill px-4">Search Again</button>
                </div>
            )}
        </div>
    )
}

export default XYZ2