import React, { useEffect, useState } from 'react'
import "../styles/chatHeader.css";
import ChatInput from './ChatInput';
import Messages from './Messages';
import axios from "axios";
import { getAllMsgsRoute, sendMsgRoute } from '../utils/APIRoutes';

export default function ChatContainer({ currentChat, currentUser }) {

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const setIds = async () => {
      if (currentUser && currentChat) {
        const response = await axios.get(getAllMsgsRoute, {
          form: currentUser._id,
          to: currentChat._id
        });
        setMessages(response.data);
        console.log(response);
      }
    };

    setIds();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    await axios.post(sendMsgRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg
    })
  }

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
                      <p>
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