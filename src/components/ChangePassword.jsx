import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './components.css'
import API from '../api.jsx'
const ChangePassword = () => {
    const [oldpassword, setOldPassword] = useState("")
    const [newpassword, setNewPassword] = useState("")
    const [showOldPassword, setShowOldPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [isMessage, setIsMessage] = useState(false)
    const [message, setMessage] = useState("")
    const navigate = useNavigate()

    const handelsubmit = async (e) => {
        e.preventDefault()
        try {
            const result = await API.patch('/auth/change-password', { oldpassword, newpassword })
            if (result.data.success) {
                alert("Password has been changed!")
                navigate('/')
            }
        }
        catch (error) {
            const mssg = error.response?.data?.message || "SOmething went wrong!"
            setOldPassword("")
            setNewPassword("")
            setIsMessage(true)
            setMessage(mssg)
        }
    }
    const handleshowpassword1 = async () => {
        if (showOldPassword == true) setShowOldPassword(false)
        else setShowOldPassword(true)
    }
    const handleshowpassword2 = async () => {
        if (showNewPassword == true) setShowNewPassword(false)
        else setShowNewPassword(true)
    }

    return (
        <div className='changepassword '>
            <form className='changepasswordform' style={{ padding: "20px 50px" }} onSubmit={handelsubmit}>
                <h4 className='mb-4'>Change Password</h4>
                <div className="mb-3 pass">
                    <input type={`${showOldPassword === true ? "text" : "password"}`} className="form-control" id="exampleInputPassword1" placeholder='Old Password' value={oldpassword} onChange={(e) => setOldPassword(e.target.value)} />
                    <svg viewBox="0 0 24 24" width="1em" height="1em" className="icon__1Md2" onClick={handleshowpassword1} ><path fillRule="evenodd" d="M7.119 14.563L5.982 16.53l-1.732-1 1.301-2.253A8.97 8.97 0 0 1 3 7h2a7 7 0 0 0 14 0h2a8.973 8.973 0 0 1-2.72 6.448l1.202 2.083-1.732 1-1.065-1.845A8.944 8.944 0 0 1 13 15.946V18h-2v-2.055a8.946 8.946 0 0 1-3.881-1.382z"></path></svg>
                </div>
                <div className="mb-3 pass">
                    <input type={`${showNewPassword === true ? "text" : "password"}`} className="form-control" id="exampleInputPassword2" placeholder='New Password' value={newpassword} onChange={(e) => setNewPassword(e.target.value)} />
                    <svg viewBox="0 0 24 24" width="1em" height="1em" className="icon__1Md2" onClick={handleshowpassword2} ><path fillRule="evenodd" d="M7.119 14.563L5.982 16.53l-1.732-1 1.301-2.253A8.97 8.97 0 0 1 3 7h2a7 7 0 0 0 14 0h2a8.973 8.973 0 0 1-2.72 6.448l1.202 2.083-1.732 1-1.065-1.845A8.944 8.944 0 0 1 13 15.946V18h-2v-2.055a8.946 8.946 0 0 1-3.881-1.382z"></path></svg>
                </div>
                {isMessage && <p className='text-danger'>{message}</p>}
                <button type="submit" className="btn btn-sm mt-4">Change Password</button>
            </form>
        </div>
    )
}

export default ChangePassword
