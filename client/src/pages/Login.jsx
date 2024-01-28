import React, {useState, useEffect} from 'react'
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../assets/logo.png';
import axios from 'axios';
import { loginRoute } from '../utils/APIRoutes';

function Login() {
    const toastOptions = {
        position: "bottom-left",
        autoClose: 5000,
        pauseOnHover: true,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: "dark",
    }
    const navigate = useNavigate();

    const [values, setValues] = useState({
        username: '',
        password: ''
    })

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(handleValidation()){
            const {username, password} = values;
            const {data} = await axios.post(loginRoute, {username, password});
            console.log(data);
            if(data.status === false){
                toast.error(data.msg, toastOptions);
            }
            else{
                toast.success(data.msg, toastOptions);
                localStorage.setItem('chat-app-user', JSON.stringify(data.temp));
                navigate("/");
            }
        }
        
    }

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        })
    }

    const handleValidation = () => {
        const {username, password} = values;
        if(password === ""){
            toast.error("Password is required", toastOptions);
            return false;
        }
        else if(username.length === ""){
            toast.error("Username is required", toastOptions);
            return false;
        }

        return true;
    } 

  return (
    <>
        <div className="formContainer">
            <form onSubmit={(event) => handleSubmit(event)}>
                <div className="brand">
                    <img src={Logo} alt="Company logo" />
                </div>
                <input type="text" placeholder='Username' name='username' min="3" onChange={e=> handleChange(e)}/>
                <input type="password" placeholder='Password' name='password' onChange={e=> handleChange(e)}/>
                <button type='submit'>Login</button>
                <span>
                    Don't have an account? <Link to='/register'>Register</Link>
                </span>

            </form>
        </div>
        <ToastContainer/>
    </>
  )
}

export default Login
