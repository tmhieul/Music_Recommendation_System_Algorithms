import React, { useState } from "react";
import "./DragDrop.css";
import { useDrop } from "react-dnd";
import Card from "../../components/Card/Card";
import { songData } from "../../redux/envirments";
import { useNavigate } from "react-router-dom";

export default function DragDrop() {
  const [board, setBoard] = useState([]);

  const navigate = useNavigate();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "item",
    drop: (item) => addItemToBoard(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  function addItemToBoard(data) {
    // console.log(data);
    setBoard((board) => [...board, data]);
    setTimeout(() => {
      alert("See songs are recommended for you.");
      navigate(`/recommend?id=${data.id}`);
    }, 300);
  }

  return (
    <div style={{ display: "flex" }}>
      <div className="drag-section">
        <h1 style={{ color: "var(--gray-color)" }} className="mt-4 mb-4">
          Select song which you like
        </h1>
        <div className="list-song">
          {songData.map((item) => (
            <div key={item.id}>
              <Card
                id={item.id}
                img={item.img}
                name={item.name}
                singer={item.singer}
              ></Card>
            </div>
          ))}
        </div>
      </div>

      <div className="drop-section" ref={drop}>
        <div style={{ textAlign: "center" }}>
          {board.length === 0 && (
            <div>
              <button className="add-song mb-4">+</button>
              <h1 style={{ color: "var(--gray-color)" }}>
                Drop the song which you like
              </h1>
            </div>
          )}
          <div className="song-dropped">
            {board.map((item, index) => (
              <div key={index}>
                <Card
                  id={item.id}
                  img={item.img}
                  name={item.name}
                  singer={item.singer}
                ></Card>
              </div>
            ))}
          </div>
        </div>
        <button className="btn-primary">Select</button>
      </div>
    </div>
  );
}
