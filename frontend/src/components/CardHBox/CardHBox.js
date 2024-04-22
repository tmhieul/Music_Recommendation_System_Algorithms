import React from "react";
import "./CardHBox.css";
import { useNavigate } from "react-router-dom";

export default function CardHBox(props) {

  const navigate = useNavigate();

  function handleShowDetail(id){
    navigate(`/detail?id=${id}`);
  }

  return (
    <div className="card-hbox" onClick={() => handleShowDetail(props.id)}>
      <div className="each-img each-img-newsong">
        <div style={{ backgroundImage: `url(${props.img})` }}>
          {/* <span>Slide 1</span> */}
        </div>
      </div>

      <div style={{marginLeft: '3rem'}}>
        <h2 className="mb-3" style={{color: 'var(--white-color)', backgroundColor: 'transparent'}}>{props.name}</h2>
        <h3 style={{color: 'var(--gray-color)', backgroundColor: 'transparent'}}>{props.singer}</h3>
        <h3 style={{color: 'var(--gray-color)', backgroundColor: 'transparent'}}>{props.type}</h3>
      </div>
    </div>
  );
}
