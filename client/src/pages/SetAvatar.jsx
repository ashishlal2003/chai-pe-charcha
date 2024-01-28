import React, { useState, useEffect } from 'react';
import "../styles/avatar.css";
import styled from 'styled-components';
import loader from '../assets/loader.gif';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { setAvatarRoute } from '../utils/APIRoutes';
import 'react-toastify/dist/ReactToastify.css';
import { Buffer } from 'buffer';
import axios from 'axios';

function SetAvatar() {
  const api = 'https://api.multiavatar.com';
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const toastOptions = {
    position: "top-center",
    autoClose: 5000,
    pauseOnHover: true,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    theme: "dark",
  };

  const setProfilePic = async () => {
    if(selectedAvatar === undefined){
      toast.error("Please select an avatar", toastOptions);
    }
    else{
        const user = await JSON.parse(localStorage.getItem('chat-app-user'));
    }
  };

  const setup = async () => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      const image = await axios.get(`${api}/${Math.round(Math.random() * 100)}?apikey=ScCkTI6MLa9ZrW`);
      const buffer = new Buffer(image.data);
      data.push(buffer.toString('base64'));
    }
    setAvatars(data);
    setLoading(false);
    
  };

  useEffect(() => {
    setup();
  }, []);

  return (
    <>
    {
        loading ? (
            <img src={loader} alt="Loading" className='loader'/>
        ) : null
    }
      <div className="Container">
        <div className="title-container">
          <h1>Pick an avatar</h1>
        </div>
        <div className="avatars">
          {avatars.map((avatar, index) => (
            <div key={index} className={`avatar ${selectedAvatar === index ? "selected" : ""}`}>
              <img
                src={`data:image/svg+xml;base64,${avatar}`}
                alt="avatar"
                onClick={() => setSelectedAvatar(index)}
              />
            </div>
          ))}
        </div>
        <button type='button' className="sub_btn" onClick={setProfilePic}>
          Set as profile picture
        </button>
      </div>
      <ToastContainer />
    </>
  );
}

export default SetAvatar;
