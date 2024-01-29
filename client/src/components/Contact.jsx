import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import logo from '../assets/logo.png'
import "../styles/contacts.css";
import Logout from '../components/Logout';

function Contact({contacts , currentUser, changeChat}) {
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserAvatar, setCurrentUserAvatar] = useState(undefined);
    const [currentSelectedUser, setCurrentSelectedUser] = useState(undefined);

    useEffect(() => {
        if(currentUser){
            setCurrentUserName(currentUser.username);
            setCurrentUserAvatar(currentUser.avatarImage);
        }
    },[currentUser])

    const changeCurrentChat = (index, contact) => {
        setCurrentSelectedUser(index);
        changeChat(contact);
    }
  return (
    <>
       {
        currentUserAvatar && currentUserName && (
            <div className='ContainerCont'>
                <div className="brand">
                    <img src={logo} alt="logo" />
                </div>

                <div className="contacts">
                    {
                        contacts.map((contact , index) => {
                            return(
                                <div className={`contact ${index === currentSelectedUser ? "selected" : ""}`} key={index} onClick={()=>changeCurrentChat(index, contact)}>
                                    <div className="avatar">
                                        <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avaatar" />
                                    </div>
                                    <div className="username">
                                        <h3>{contact.username}</h3>
                                    </div>
                                    
                                    
                                </div>
                            )
                        })
                    }
                </div>
                <div className="current-user">
                    <div className="avatar">
                    <div className="avatar">
                                        <img src={`data:image/svg+xml;base64,${currentUserAvatar}`} alt="avaatar" />
                                    </div>
                                    <div className="username">
                                        <h2>{currentUserName}</h2>
                                    </div>
                                    <Logout/>
                    </div>
                </div>
            </div>
        )
       }
    </>
  )
}

export default Contact;
