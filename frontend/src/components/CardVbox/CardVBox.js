import React from "react";
import "./CardVbox.css";
import { useNavigate } from "react-router-dom";

export default function CardVBox(props) {

  const navigate = useNavigate();

  function handleClickItem(id){
    navigate(`/detail?id=${id}`)
  }

  return (
    <div onClick={() => handleClickItem(props.id)} className="card-vbox">
      <div className="each-img">
        <div style={{ backgroundImage: `url(${props.img})` }}>
          {/* <span>Slide 1</span> */}
        </div>
      </div>
      <h2 className="mt-4" style={{color: 'var(--white-color)'}}>{props.name}</h2>
      <h2 style={{color: 'var(--gray-color)'}}>{props.singer}</h2>
    </div>
  );
}
