import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const ForgetPasswordCode = () => {
    const navigate = useNavigate()
     const [email, setEmail] = useState('')
    const handleClickforgetpassword = () => {
        alert("Password Changed Successfully!.")
        if (email.trim() !== '') {
            navigate("/login");
        }
    }
    return (
        <div className='forgetPasswordCode'>
            <form className='forgetPasswordCodeForm'>
                <h4 className='mb-4'>Change Password</h4>
                <div><input type="email" className="form-control mb-3" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Username or Email' required /></div>
                <div className="mb-3">
                    <input type="text" className="form-control" id="Code" placeholder='Sent Code' style={{ width: "324.364px" }} />
                </div>
                <div className="mb-3 pass">
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder='New Password' style={{ width: "324.364px" }} />
                    <svg viewBox="0 0 24 24" width="1em" height="1em" className="icon__1Md2"><path fillRule="evenodd" d="M7.119 14.563L5.982 16.53l-1.732-1 1.301-2.253A8.97 8.97 0 0 1 3 7h2a7 7 0 0 0 14 0h2a8.973 8.973 0 0 1-2.72 6.448l1.202 2.083-1.732 1-1.065-1.845A8.944 8.944 0 0 1 13 15.946V18h-2v-2.055a8.946 8.946 0 0 1-3.881-1.382z"></path></svg>
                </div>

                <button type="submit" className="btn  btn-sm mt-1" onClick={handleClickforgetpassword}>Change Password</button>
                <div className='d-flex justify-content-between mt-3' style={{ fontSize: "13px" }}>
                    <div><Link className='text-secondary' to="/login">Login</Link></div>
                    <div><Link className='text-secondary' to="/signup">SignUp</Link></div>
                </div>
            </form>
        </div>
    )
}

export default ForgetPasswordCode