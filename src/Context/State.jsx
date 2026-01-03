import React, { useEffect, useState } from 'react'
import Context from './Context' 
import API from '../api'

const State = (props) => {
  const [visibility, setVisibility] = useState("hidden")
  const [signout, setSignOut] = useState(false);
  const [signinsignout, setSignInSignOut] = useState(true);
  const [user, setUser] = useState("")
  const [showprofile, setShowProfile] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [login, setLogin] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [totalItems, setTotalItems] = useState()
  const [totalPrice, setTotalPrice] = useState()
  const [category, setCategory] = useState([])
  const [items, setItems] = useState([])
  const [itemsProductId,setItemsProductId]=useState([])
  const [userId,setUserId]=useState()
  const checkAuth = async () => {
    try {
      const res = await API.get('/auth/me')
      if (res.data.success) {
        setUserId(res.data.user.userId)
        setUser(res.data.user.email)
        setSignInSignOut(false)
        setSignOut(true)
        setLogin(true)
        handlecart()
      }
    } catch (err) {
      if (err.response && err.response.status === 403) {
        setUser('');
        setSignInSignOut(true);
        setSignOut(false);
        setLogin(false);
      } else {
        console.error('Unexpected error:', err);
      }
    }
  }
  useEffect(() => {
    checkAuth()
    const fetchCategories = async () => {
      try {
        const res = await API.get('/category/get-category')
        if(res.data?.success){
          setCategory(res.data.data)
        }
        
      } catch (error) {
        console.error(error)
      }
    }
    fetchCategories()
  }, [])

  const toggle_sidebar = async () => {
    if (visibility === "hidden") setVisibility("visible")
    else setVisibility("hidden")
  }

  const handlecart = async () => {
    try {
      const res = await API.get('/cart/get-cart')
      setCartItems(res.data.cart.items)
      setTotalPrice(res.data.totalPrice)
      setTotalItems(res.data.totalItems) 
    }
    catch (error) {
      console.error(error)
    }
  }

  return (
    <Context.Provider value={{
      setSignInSignOut, checkAuth,
      setSignOut, category, visibility, setVisibility, toggle_sidebar, showPassword, setShowPassword, signout, signinsignout, showprofile, setShowProfile, user, setUser, handlecart, cartItems, setCartItems, totalItems, setTotalItems, totalPrice, setTotalPrice, login, setLogin, items, setItems,itemsProductId,setItemsProductId,userId
    }}>
      {props.children}
    </Context.Provider>
  )
}

export default State
