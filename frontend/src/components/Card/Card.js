import React from "react";
import "./Card.css";
import { useDrag } from "react-dnd";

export default function Card(props) {

  const [{isDragging}, drag] = useDrag(() => ({
    type: 'item',
    item: {name: props.name, img: props.img, singer: props.singer, id: props.id},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    })
  }))

  return (
    <div className="card-vbox" ref={drag} style={{ border: isDragging ? "5px solid var(--primary-color)" : "0px" }}>
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
