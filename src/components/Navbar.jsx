import React, { useContext, useEffect, useRef, useState } from 'react'
import './components.css'
import { Link, useNavigate } from "react-router-dom"
import Context from '../Context/Context'
import API from '../api'

const Navbar = () => { 
    const a = useContext(Context)
    const boxRef = useRef(null)
    const navigate = useNavigate()
    const [inputsearch, setInput] = useState("")
    const handleprofile = () => {
        a.setShowProfile(prev => !prev)
    }
    const handlelogout = async () => {
        try {
            const res = await API.post('/auth/logout')
            navigate('/')
            a.setLogin(false)
            a.setUser("")
            a.setSignInSignOut(true)
            a.setSignOut(false)
            a.setShowProfile(false)
            a.setCartItems([])
            a.setTotalItems()
            a.setTotalPrice()
            alert("LogOut succesfull!")
        }
        catch (error) {
            alert("Logout failed! Try again")
            console.error(error)
        }
    }
    const handleSearch = async () => {
        try {
            const slug = encodeURIComponent(inputsearch.toLowerCase().trim().replace(/\s+/g, '-'))
            navigate(`/product/${slug}`)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (boxRef.current && !boxRef.current.contains(event.target)) {
                a.setShowProfile(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
    });
    return (
        <div style={{ position: "sticky", top: "0", zIndex: "10" }}>
            <nav className="navbar navbar-expand-lg">
                <div className='navbox'>
                    <div className='home d-flex justify-content-center align-items-center' style={{ gap: "20px" }}>
                        <i className="fa-solid fa-bars fa-lg" onClick={a.toggle_sidebar}></i>
                        <Link className="text-dark" to="/" style={{  
                            fontFamily: "Georgia, serif", fontSize: "20px", fontWeight: "bold"
                        }}>Zoyo</Link>
                    </div>
                    <div className="sidebar-scroll" style={{ background: "#8cb0d4", width: "7vw", visibility: a.visibility, padding: " 5px", position: "absolute", zIndex: "20", top: "75px", height: "90vh", overflowY: "auto", minWidth: "max-content", left: "0" }}>
                        <div className="d-flex justify-conten-center align-items-center" style={{ flexDirection: "column" }} >
                            {a.category.map(item => {
                                return (
                                    <Link to={`/${item.name}`} >
                                        <div className='' key={item._id} >
                                            <img src={item.image} alt="" className='image-item' />
                                            <p className='text-center' style={{ fontSize: "10px", color: "black" }}>{item.name}</p>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                    <div style={{ backgroundColor: "white", borderRadius: "30px" , padding: "5px 15px"}}>
                        <div className='homesearch d-flex justify-content-center align-items-center'>
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" style={{ border: "none", boxShadow: "none" }} value={inputsearch} onChange={(e)=>setInput(e.target.value)} onKeyDown={(e)=>{
                                if(e.key==='Enter'){
                                    handleSearch()
                                }
                            }}/>
                            <i className="fa-solid fa-magnifying-glass" style={{ marginRight: "0px", cursor: "pointer" }} onClick={handleSearch}></i>
                        </div>
                    </div>
                    <div className='d-flex justify-content-center align-items-center'>
                        <Link to={a.login ? "/cart" : "/login"}><i className="fa-solid fa-cart-shopping position-relative" style={{ color: "white", marginRight: "50px", fontSize: "22px" }} onClick={a.handlecart}>
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ width: "10px", minWidth: "max-content", fontSize: "10px" }}>
                                {a.login && a.totalItems}
                            </span>
                        </i></Link>

                        {a.signinsignout && <Link to='/signup' style={{ color: "beige" }}><i className="fa-solid fa-circle-user " style={{ fontSize: "35px" }}></i></Link>}
                        {a.signout && <i className="fa-solid fa-circle-user " style={{ color: "beige", fontSize: "35px" }} onClick={handleprofile}></i>}
                    </div>
                </div>
            </nav>

            {a.showprofile && <div ref={boxRef} style={{ width: "400px", height: "180px", backgroundColor: "#8cb0d4", borderRadius: "10px", position: "absolute", right: "2px", top: "72px", padding: "15px", textAlign: "center", minHeight: "max-content", color: "white" }}>
                <p><i className="fa-solid fa-circle-user m-2 "></i>My profile</p>
                <h6>{a.user}</h6>
                <hr />
                <div style={{ textAlign: "left" }}>
                    <Link to={'/orders'}><p style={{ color: "white" }}><i className="fa-solid fa-box m-2"></i>Orders</p></Link>
                    <Link><p style={{ color: "white" }}><i className="fa-solid fa-heart m-2"></i>Wishlists</p></Link>
                </div>
                <button style={{ width: "100%", padding: "0", backgroundColor: "#7492b0" }} onClick={handlelogout}>LogOut</button>
            </div>}

        </div>
    )
}

export default Navbar
