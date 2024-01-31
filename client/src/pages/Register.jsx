import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../assets/logo.png';
import axios from 'axios';
import { registerRoute } from '../utils/APIRoutes';

function Register() {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(handleValidation()){
            const {username, password, email} = values;
            const {data} = await axios.post(registerRoute, {username, password, email});
            
            if(data.status === false){
                toast.error(data.msg, toastOptions);
            }
            else{
                console.log("idhar"+data);
                toast.success(data.msg, toastOptions);
                localStorage.setItem('chat-app-user', JSON.stringify(data.user));
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

    const toastOptions = {
        position: "top-center",
        autoClose: 5000,
        pauseOnHover: true,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: "dark",
    }

    const handleValidation = () => {
        const {username, password, email, confirmPassword} = values;
        if(password !== confirmPassword){
            toast.error("Passwords do not match", toastOptions);
            return false;
        }
        else if(password.length < 8){
            toast.error("Password must be at least 8 characters long", toastOptions);
            return false;
        }
        else if(username.length < 3){
            toast.error("Username must be at least 3 characters long", toastOptions);
            return false;
        }
        else if(!email.includes('@')){
            toast.error("Invalid email address", toastOptions);
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
                <input type="text" placeholder='Username' name='username' onChange={e=> handleChange(e)}/>
                <input type="email" placeholder='Email' name='email' onChange={e=> handleChange(e)}/>
                <input type="password" placeholder='Password' name='password' onChange={e=> handleChange(e)}/>
                <input type="password" placeholder='Confirm Password' name='confirmPassword' onChange={e=> handleChange(e)}/>
                <button type='submit'>Create User</button>
                <span>
                    Already have an account? <Link to='/login'>Login</Link>
                </span>

            </form>
        </div>
        <ToastContainer/>
    </>
  )
}

export default Register
