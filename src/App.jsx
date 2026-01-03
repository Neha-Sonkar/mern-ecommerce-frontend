import './App.css'
import State from './Context/State'
import Navbar from './components/Navbar'
import Home from './components/Home'
import SignUp from './components/SignUp'
import LogIn from './components/Login'
import ForgetPassword from './components/ForgetPassword' 
import ForgetPasswordCode from './components/ForgetPasswordCode'
import ChangePassword from './components/ChangePassword'
import XYZ from './components/XYZ'
import XYZ2 from './components/XYZ2'
import Orders from './components/Orders'
import Cartitems from './components/Cartitems'
import OrdersPlacing from './components/OrdersPlacing'
import {
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom"
function App() {

  return (
    <>
      <State>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/login" element={<LogIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/change-password' element={<ChangePassword />} />
            <Route path='/forgetpassword' element={<ForgetPassword />} />
            <Route path='/forgetpasswordcode' element={<ForgetPasswordCode />} />
            <Route path='/cart' element={<Cartitems />} />
            <Route path='/:slug' element={<XYZ/>} />
            <Route path='/product/:slug' element={<XYZ2/>}/>
            <Route path='/orders' element={<Orders/>}/>
            <Route path='/order-placing' element={<OrdersPlacing/>}/>
          </Routes>
        </Router>
      </State>
    </>
  )
}

export default App
