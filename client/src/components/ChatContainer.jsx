import React, { useEffect, useState, useRef } from 'react'
import "../styles/chatHeader.css";
import ChatInput from './ChatInput';
import axios from "axios";
import { getAllMsgsRoute, sendMsgRoute } from '../utils/APIRoutes';
import {v4 as uuidv4} from 'uuid';

export default function ChatContainer({ currentChat, currentUser, socket }) {

  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

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
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }
  };


  useEffect(() => {
    setIds();
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(
          localStorage.getItem('chat-app-user')
        )._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    try {
      // Send the message to the server
      socket.current.emit("send-msg", {
        to: currentChat._id,
        from: currentUser._id,
        msg,
      });
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
  
      const msgs = [...messages];
      msgs.push({fromSelf:true,message:msg});
      setMessages(msgs);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

  useEffect(() =>{
    if(socket.current){
      socket.current.on("msg-recieve",(msg)=>{
        setArrivalMessage({fromSelf:false, message:msg});
      });
    }
  },[])

  useEffect(() =>{
    arrivalMessage && setMessages((prevMessages) => [...prevMessages,arrivalMessage]);
  },[arrivalMessage])
  
  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior:"smooth"});
  },[messages]);
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
                  <div ref={scrollRef} key={uuidv4}>
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