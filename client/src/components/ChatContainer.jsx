import React, { useEffect, useState } from 'react'
import "../styles/chatHeader.css";
import ChatInput from './ChatInput';
import Messages from './Messages';
import axios from "axios";
import { getAllMsgsRoute, sendMsgRoute } from '../utils/APIRoutes';

export default function ChatContainer({ currentChat, currentUser, socket }) {

  const [messages, setMessages] = useState([]);

  const setIds = async () => {
    if (currentUser && currentChat) {
      try {
        const response = await axios.get(getAllMsgsRoute, {
          params: {
            from: currentUser._id,
            to: currentChat._id
          }
        });
        setMessages(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }
  };


  useEffect(() => {
    setIds();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    try {
      // Send the message to the server
      await axios.post(sendMsgRoute, {
        from: currentUser._id,
        to: currentChat._id,
        message: msg
      });

      // Update the local state to include the new message
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          fromSelf: true, // Assuming the sender is the current user
          message: msg,
        },
      ]);
  
      // Scroll to the bottom of the chat container
      const chatContainer = document.querySelector('.chat-messages');
      chatContainer.scrollTop = chatContainer.scrollHeight;
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

  useEffect(() =>{
    if(socket.current){
      socket.current.on("msg-recieve");
    }
  },[])

  

  return (
    <>
      {
        currentChat &&
        (<div className='ContainerChatWaala'>
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="avaatar" />
              </div>
              <div className="username">
                <h3>{currentChat.username}</h3>
              </div>
            </div>
          </div>

          <div className="chat-messages">
            {
              messages.map((message) => {
                return (
                  <div>
                    <div className={`message ${message.fromSelf ? "sended" : "recieved"}`}>
                      <p className='content'>
                        {message.message}
                      </p>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <ChatInput handleSendMsg={handleSendMsg} />
        </div>)
      }
    </>
  )
}