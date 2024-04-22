import React, { useEffect, useState } from "react";
import "./Detail.css";
import { getKey } from "../../redux/apiRequest";
import axios from "axios";

export default function Detail() {
  const [detail, setDetail] = useState([]);
  const [de, setDe] = useState([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    axios
      .get(`https://api.spotify.com/v1/tracks/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setDe((board) => [...board, res.data]);
      })
      .catch((err) => console.log(err));

    axios
      .get(`https://api.spotify.com/v1/albums/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setDetail((board) => [...board, res.data]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {
        detail.map((item, index) => (
          (index===0)&&<div key={index}>
            <div
          className="banner"
          style={{ backgroundImage: `url(${item.images[0]?.url})` }}
        ></div>
        <div className="content-detail">
          <div className="avt-song" style={{backgroundImage: `url(${item.images[0]?.url})`}}></div>
  
          <div className="detail-of-song">
            <h1 className="roboto-bold" style={{fontSize: '32px'}}>Name of song</h1>
            <h1 className="roboto-bold" style={{fontSize: '64px'}}>{item.name}</h1>
            <h1 className="roboto-bold" style={{fontSize: '36px'}}>
              {item.artists[0]?.name} - {item?.name}
            </h1>
          </div>
        </div>
  
        <div className="btn-play">
          <button className="btn-primary roboto-bold" onClick={() => {window.open(item.external_urls.spotify, '_blank')}}>Play song</button>
        </div>
          </div>
        ))
      }

      {de.map((item, index) => (
        (index===0)&&<div key={index}>
          <div
            className="banner"
            style={{ backgroundImage: `url(${item.album.images[0]?.url})` }}
          ></div>
          <div className="content-detail">
            <div
              className="avt-song"
              style={{ backgroundImage: `url(${item.album.images[0]?.url})` }}
            ></div>

            <div className="detail-of-song">
              <h1 className="roboto-bold" style={{ fontSize: "32px" }}>
                Name of song
              </h1>
              <h1 className="roboto-bold" style={{ fontSize: "64px" }}>
                {item.name}
              </h1>
              <h1 className="roboto-bold" style={{ fontSize: "36px" }}>
                {item.artists[0]?.name} - {item.name}
              </h1>
            </div>
          </div>

          <div className="btn-play">
            <button
              className="btn-primary roboto-bold"
              onClick={() => {
                window.open(item.external_urls.spotify, "_blank");
              }}
            >
              Play song
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
