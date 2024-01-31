import React, { useState, useEffect, useRef } from 'react';
import "../styles/chatInput.css";
import EmojiPicker from "emoji-picker-react";
import { IoMdSend } from 'react-icons/io';
import { BsEmojiSmileFill } from 'react-icons/bs';

function ChatInput({ handleSendMsg }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");
  const emojiPickerRef = useRef(null);

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  }

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg + emojiObject.emoji;
    setMsg(message);
  }

  const sendChat = (e) => {
    e.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg('');
    }
  }

  const handleDocumentClick = (e) => {
    if (emojiPickerRef.current && !emojiPickerRef.current.contains(e.target)) {
      setShowEmojiPicker(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <div className='chat-input'>
      <div className="button-container">
        <div className="emoji" ref={emojiPickerRef}>
          <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
          {showEmojiPicker && (
            <EmojiPicker
              onEmojiClick={(emoji, event) => handleEmojiClick(event, emoji)}
              className='emoji-picker-react'
              height={400}
              width={300}
            />
          )}
        </div>
      </div>
      <form className='input-container' onSubmit={(e) => sendChat(e)}>
        <input type="text" placeholder='type your message...' value={msg} onChange={(e) => setMsg(e.target.value)} />
        <button className='submit'>
          <IoMdSend />
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
