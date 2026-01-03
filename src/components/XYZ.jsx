import React, { useContext, useEffect } from 'react'
import Context from '../Context/Context'
import { useNavigate, useParams } from 'react-router-dom'
import API from '../api'
import './components.css' 

const XYZ = () => {
  const a = useContext(Context)
  const { slug } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const category = a.category.find(cat => cat.name.toLowerCase() === slug.toLowerCase())
        if (!category) {
          a.setItems([])
          return
        }
        const res = await API.get(`/products/get-all-product-bycategory/${category._id}`)
        a.setItems(res.data.data)
      } catch (error) {
        console.error(error)
      }
    } 
    fetchProductById()
  }, [slug, a.category, a.setItems])

  const handleadditems = async (productId) => {
    try {
      let quantity = 1
      const res = await API.post('/cart/add-items-to-cart', { productId, quantity })
      a.handlecart()
    } catch (error) {
      console.error(error)
    }
  }

  const handlelogin = async (productId) => {
    localStorage.setItem('pendingAddProduct', productId)
    navigate('/login')
  }

  return (
    <div className="products-container">
      <div className="products-header text-center mb-5">
        <h2 className="section-title">Our Collection</h2>
        <p className="section-subtitle text-muted">Discover exquisite pieces tailored for you</p>
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
                      e.target.src = '/placeholder-image.jpg' 
                    }}
                  />
                  <div className="card-overlay">
                    <button 
                      className="btn btn-sm rounded-circle"
                      onClick={(e) => {
                        if (!a.login) {
                          handlelogin(item._id)
                        } else {
                          handleadditems(item._id)
                        }
                      }}
                    >
                      <i className="fas fa-shopping-cart"></i>
                    </button>
                  </div>
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold mb-2">{item.name}</h5>
                  <p className="card-text text-muted small mb-3 flex-grow-1">{item.description || 'Premium quality jewelry piece'}</p>
                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    <h5 className="mb-0 fw-bold text-primary">₹{item.price}/-</h5>
                    <button 
                      className="btn btn-primary px-4 py-2 rounded-pill fw-semibold"
                      onClick={(e) => {
                        if (!a.login) {
                          handlelogin(item._id)
                        } else {
                          handleadditems(item._id)
                        }
                      }}
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

export default XYZ