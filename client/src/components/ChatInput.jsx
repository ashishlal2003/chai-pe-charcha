import React, {useState} from 'react'
import "../styles/chatInput.css";
import Picker from "emoji-picker-react";
import {IoMdSend} from 'react-icons/io';
import {BsEmojiSmileFill} from 'react-icons/bs';

function ChatInput() {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmojiPickerHideShow = () =>{
    setShowEmojiPicker(!showEmojiPicker);
  }

  const handleEmojiClick = (event, emoji) => {
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
  }
  return (
    <div className='chat-input'>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerHideShow}/>
          {
            showEmojiPicker && <Picker onEmojiClick={handleEmojiClick}/>
          }
        </div>
      </div>
      <form className='input-container'>
        <input type="text" placeholder='type your message...' value={msg} onChange={(e)=>setMsg(e.target.value)}/>
        <button className='submit'>
          <IoMdSend />
        </button>
      </form>
    </div>
  )
}

export default ChatInput