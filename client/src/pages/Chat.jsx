import React, { useState, useEffect } from 'react';
import '../styles/chat.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUsersRoute } from '../utils/APIRoutes';
import Contact from '../components/Contact';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';


function Chat() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [currentChat, setCurrentChat] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  const temp1 = async () => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    } else {
      setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")))
      setIsLoaded(true);
      console.log(currentUser);
    }
  }

  useEffect(() => {
    temp1();
  }, [])

  const temp2 = async () => {
    if (currentUser) {
      if (currentUser.isAvatarSet) {
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(data.data);
      } else {
        navigate("/setAvatar");
      }
    }
  }

  useEffect(() => {
    temp2();
  }, [currentUser])

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  }

  return (
    <div className="mainContainer">
      <div className="container">
        <Contact contacts={contacts} currentUser={currentUser} changeChat={(chat) => handleChatChange(chat)} />
        {
          isLoaded && currentChat === undefined ? (
            <Welcome currentUser={currentUser} />
          ) : (
            <ChatContainer currentChat={currentChat} currentUser={currentUser} />
          )
        }
      </div>
    </div>
  )
}

export default Chat;
