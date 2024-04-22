import React, { useState } from "react";
import "./Header.css";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ListMenu = ["POPULAR", "TOP RATED", "RECOMMEND"];


function AvatarUser() {
  return <div style={{display: 'flex'}}>
    <Avatar>User</Avatar>
    <button style={{marginLeft: '10px'}} onClick={() => {localStorage.removeItem("userId"); alert("Logout successfully!"); window.location.reload()}} className="btn-primary roboto-regular">Logout</button>
  </div>;
}

export default function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const [showInput, setShowinput] = useState(false);
  //const [open, setOpen] = useState(false);

  // useEffect(() => {
  //   const data = getNewSong();
  //   console.log("data: ", data);
  // },[]);

  const [userId, setUserId] = useState('');

  const navigate = useNavigate();

  function handleNavigate(val) {
    switch (val) {
      case "POPULAR": {
        navigate("/");
        break;
      }
      case "TOP RATED": {
        navigate("/top-rated");
        break;
      }
      // case "UPCOMING": {
      //   navigate("/upcoming");
      //   break;
      // }
      case "RECOMMEND": {
        if(localStorage.getItem("userId")){
          navigate("/recommend");
        }else{
          navigate("/select-song");
        }
        break;
      }
      default: {
        navigate("/notfound");
      }
    }
  }

  function clickLogin(){
    localStorage.setItem("userId", userId);
    setIsLogin(true);
    alert("Login success, " + userId );
  }

  return (
    <div className="header">
      <div className="container">
        {/* menu item */}
        <div className="left-section">
          <div
            className="logo roboto-bold"
            onClick={() => handleNavigate("POPULAR")}
          >
            L O G O
          </div>
          {ListMenu.map((item, index) => (
            <div key={index}>
              <h2
                onClick={() => handleNavigate(item)}
                className="menu-item-text roboto-medium"
              >
                {item}
              </h2>
            </div>
          ))}
        </div>
        {/* avatar */}
        <div>{isLogin ? <AvatarUser /> : (
          <div>
            <input onChange={(e) => setUserId(e.target.value)} placeholder="Enter your user id" style={{height: '40px', marginRight: '10px', borderRadius: '10px', padding: '10px', color: '#fff'}}></input>
            <button onClick={() => clickLogin()} className="btn-primary roboto-regular">Login</button>
          </div>
         
        )}</div>
      </div>
    </div>
  );
}
