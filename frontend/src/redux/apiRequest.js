import axios from "axios";
import { envirments } from "./envirments";

const clientSecret = envirments.clientSecret;
const clientId = envirments.clientId;

const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
}

export const getKey = async () => {
  try {
    const res = await axios.post(
      envirments.url +
        `/api/token?grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`, {}, {headers}
    );
    console.log("res: ", res.data.access_token);
    localStorage.setItem("token", res.data.access_token);
    //return res;
  } catch (err) {
    console.log(err);
  }
};

// export const getNewSong = async () => {
//     if(!localStorage.getItem("token")){
//         await getKey();
//     }
//     //console.log(hds);
//     //console.log(localStorage.getItem("token"));
//    await axios.get(
//         'https://api.spotify.com/v1/browse/new-releases?limit=10&offset=5',
//         {
//             headers:{
//                 Authorization: 'Bearer ' + localStorage.getItem("token"),
//             }
//         }
//     )
//     .then(res => {
//         return res.data.albums.items;
//     })
//     .catch(err => console.log(err));
// }
