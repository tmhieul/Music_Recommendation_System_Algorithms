import React, { useEffect, useState } from "react";
import './Recommend.css';
import CardVBox from "../../components/CardVbox/CardVBox";
import axios from "axios";

export default function Recommend(){

    const [listData, setList] = useState([]);

    useEffect(() => {
      if(localStorage.getItem("userId")){
        const UID = localStorage.getItem("userId");
        axios.post('http://47.129.1.22:5000/api/collaborative-filtering-recommend',
        {user_id: UID}
        )
        .then(res => {
          //console.log(res.data.recommendations);
          res.data.recommendations.map((item) => {
            axios.get(`https://api.spotify.com/v1/tracks/${item}`,
              { headers: {Authorization:'Bearer ' + localStorage.getItem("token")}}
            ).then(res => {
              console.log(res);
              setList((board) => [...board, res.data]);
            }).catch(err => console.log(err))
          })
        })
        .catch(err => console.error(err));

      }else{
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        axios.post('http://47.129.1.22:5000/api/content-base-recommend',
        {song_id: id}
        )
        .then(res => {
          //console.log(res.data.recommendations);
          res.data.recommendations.map((item) => {
            axios.get(`https://api.spotify.com/v1/tracks/${item}`,
              { headers: {Authorization:'Bearer ' + localStorage.getItem("token")}}
            ).then(res => {
              console.log(res);
              setList((board) => [...board, res.data]);
            }).catch(err => console.log(err))
          })
        })
        .catch(err => console.error(err));
      }
    },[]);

    return (
        <div>
            <div>
              <h1 className="mt-5 mb-4" style={{color: 'var(--gray-color)', fontSize: '30px'}}>Recommend for you</h1>
              <div className="popular-content">
                {
                  listData.map((item) => (
                    <div key={item.id}>
                      <CardVBox id={item.id} img={item.album.images[0].url} name={item.name} singer={item.artists[0].name}></CardVBox>
                    </div>
                  ))
                }
              </div>
            </div>
        </div>
    )
}
