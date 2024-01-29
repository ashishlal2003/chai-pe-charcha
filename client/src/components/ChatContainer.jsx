import React from 'react'
import "../styles/chatHeader.css";
import ChatInput from './ChatInput';

export default function ChatContainer({currentChat}) {
  const handleSendMsg = async (msg) =>{

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
        <div className="chat-messages"></div>
       <ChatInput handleSendMsg = {handleSendMsg}/>
    </div>)
    }
  </>
  )
}