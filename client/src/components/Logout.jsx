import React from 'react'
import { useNavigate } from 'react-router-dom'
import "../styles/logout.css"
import {BiPowerOff} from 'react-icons/bi'

function Logout() {
    const navigate = useNavigate();
    const handleClick = async() => {
        localStorage.removeItem("chat-app-user");
        navigate("/login");
    }
  return (
    <button className='logout' onClick={handleClick}>
      <BiPowerOff />
    </button>
  )
}

export default Logout