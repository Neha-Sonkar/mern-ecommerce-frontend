import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../api'
import Context from '../Context/Context'
const ForgetPassword = () => {
    const a = useContext(Context)
    const [email, setEmail] = useState('')
    const navigate = useNavigate()
      const [isMessage, setIsMessage] = useState(false)
      const [message, setMessage] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await API.patch('/auth/forget-password', { email })
        }
        catch (err) {
            console.error(err)
            const msg = err.response?.data?.message || 'Login Failed'
            setIsMessage(true)
            setMessage(msg)
            navigate('/')
        }
    }
    const handleClickforgetpassword = () => {
        alert("Code has been send to your email.")
        if (email.trim() !== '') {
            navigate("/forgetpasswordcode");
        }
    }
    return (
        <div className='forgetPassword'>
            <form className='forgetPasswordForm' onSubmit={handleSubmit}>
                <h4 className='mb-4'>Forget Password</h4>
                <div className="mb-3">
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Username or Email' required />
                    <div id="emailHelp" className="text-secondary">We'll never share your email with anyone else.</div>
                    <div className='text-danger text-start'>Required*</div>
                </div>
                {isMessage && <p className='text-danger'>{message}</p>}

                <button type="submit" className={`btn  btn-sm mt-1 ${email.trim() === '' ? 'disabled' : ''}`} onClick={handleClickforgetpassword} style={{ backgroundColor: "#8cb0d4", border: "none" }}>Send Code</button>

                <div className='d-flex justify-content-between mt-3' style={{ fontSize: "13px" }}>
                    <div><Link className='text-secondary' to="/login">Login</Link></div>
                    <div><Link className='text-secondary' to="/signup">SignUp</Link></div>
                </div>
            </form>
        </div>
    )
}

export default ForgetPassword