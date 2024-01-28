import React, {useState , useEffect} from 'react';
import '../styles/chat.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { allUsersRoute } from '../utils/APIRoutes';

function Chat() {
  // const navigate = useNavigate();
  // const [contacts , setContacts] = useState([]);
  // const [currentUser , setCurrentUser] = useState(undefined);

  // const temp1 = async() => {
  //   if(!localStorage.getItem("chat-app-user")){
  //     navigate("/login");
  //   }else{
  //     setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")))
  //   }
  // }

  // useEffect( () =>{
  //   temp1();
  // },[])

  // const temp2 = async() => {
  //   if(currentUser){
  //     if(currentUser.isAvatarSet){
  //       const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
  //       setContacts(data.data);
      
  //     }
  //   }
  // }

  // useEffect(()=>{
  //   temp2();
  // },[currentUser])

  // return (
  //   <div className="mainContainer">
  //     <div className="container">

  //     </div>
  //   </div>
  // )
  <div>hi</div>
}

export default Chat;
