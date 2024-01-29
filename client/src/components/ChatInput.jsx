import React, { useState } from 'react'
import "../styles/chatInput.css";
import EmojiPicker from "emoji-picker-react";
import { IoMdSend } from 'react-icons/io';
import { BsEmojiSmileFill } from 'react-icons/bs';

function ChatInput({handleSendMsg}) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  }

  const handleEmojiClick = (event, emojiObject) => {
    console.log("emoji nhi aa rha", emojiObject);
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  }


  const sendChat = (e) =>{
    e.preventDefault();
    if(msg.length > 0){
      handleSendMsg(msg);
      setMsg('');
    }
  }


  return (
    <div className='chat-input'>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
          {
            showEmojiPicker && <EmojiPicker onEmojiClick={(emoji, event) => handleEmojiClick(event, emoji)} className='emoji-picker-react' height={400} width={300}/>
          }
        </div>
      </div>
      <form className='input-container' onSubmit={(e)=>sendChat(e)}>
        <input type="text" placeholder='type your message...' value={msg} onChange={(e) => setMsg(e.target.value)} />
        <button className='submit'>
          <IoMdSend />
        </button>
      </form>
    </div>
  )
}

export default ChatInput