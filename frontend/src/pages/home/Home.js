import React, { useEffect, useState } from "react";
import axios from "axios";
import './Home.css';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import CardVBox from "../../components/CardVbox/CardVBox";
import CardHBox from "../../components/CardHBox/CardHBox";
import { getKey } from "../../redux/apiRequest";

export default function Home(){

    const [listSong, setListSong] = useState([]);

    const getNewSong = async () => {
      if(!localStorage.getItem("token")){
          await getKey();
      }
      //console.log(hds);
      //console.log(localStorage.getItem("token"));
     await axios.get(
          'https://api.spotify.com/v1/browse/new-releases?limit=10&offset=5',
          {
              headers:{
                  Authorization: 'Bearer ' + localStorage.getItem("token"),
              }
          }
      )
      .then(res => {
          setListSong(res.data.albums.items);
      })
      .catch(err => {
        //console.log(err.response.data.error);
        if(err.response.data.error.status == 401){
          //console.log("token")
          localStorage.removeItem("token");
          window.location.reload();
        }
      });
  }

    useEffect(() => {
      getNewSong();
    },[])

    const images = [
        "https://i.scdn.co/image/ab67616d0000b273aaabd35dde0cfc0bcf315d3e",
        "https://www.songmeaningsandfacts.com/wp-content/uploads/2019/08/Teeth.png",
        "https://i.scdn.co/image/ab67616d0000b273e42cb2ca56e0ab0c53bd6475"
    ];

    const buttonStyle = {
        width: "30px",
        background: "transparent !important",
        border: '0px'
    };
    
    const properties = {
      prevArrow: (
        <button style={{ ...buttonStyle }}>
          <svg
            width="17"
            height="28"
            viewBox="0 0 17 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.5 28C13.8672 28 13.3047 27.7891 12.8828 27.3672L1.63281 16.1172C0.71875 15.2734 0.71875 13.7969 1.63281 12.9531L12.8828 1.70312C13.7266 0.789062 15.2031 0.789062 16.0469 1.70312C16.9609 2.54688 16.9609 4.02344 16.0469 4.86719L6.41406 14.5L16.0469 24.2031C16.9609 25.0469 16.9609 26.5234 16.0469 27.3672C15.625 27.7891 15.0625 28 14.5 28Z"
              fill="#66B2FF"
            />
          </svg>
        </button>
      ),
      nextArrow: (
        <button style={{ ...buttonStyle }}>
          <svg
            width="18"
            height="28"
            viewBox="0 0 18 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.5 28C2.86719 28 2.30469 27.7891 1.88281 27.3672C0.96875 26.5234 0.96875 25.0469 1.88281 24.2031L11.5156 14.5L1.88281 4.86719C0.96875 4.02344 0.96875 2.54688 1.88281 1.70312C2.72656 0.789062 4.20312 0.789062 5.04688 1.70312L16.2969 12.9531C17.2109 13.7969 17.2109 15.2734 16.2969 16.1172L5.04688 27.3672C4.625 27.7891 4.0625 28 3.5 28Z"
              fill="#66B2FF"
            />
          </svg>
        </button>
      ),
    };

    const img = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUVFRgVFRUYGBgZGBoZGBoaGBgYGBgYGBgZGRgYGRgcIS4lHB4rIRgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHxISHjQrJSs0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIALYBFAMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAACAAEDBQYEB//EAD0QAAIBAgQDBQYFAwMDBQAAAAECAAMRBBIhMQVBUQYiYXGBEzKRobHwQlJywdEjYuEHFDOCkvEVFzRDov/EABoBAAIDAQEAAAAAAAAAAAAAAAECAAMEBQb/xAAmEQADAQABAwQCAwEBAAAAAAAAAQIRAxIhMQQTIlFBYTJScSOB/9oADAMBAAIRAxEAPwDjEKCI956I4oQMMQISyEHEe8YR7QECivGEa8hAjGvGJjQkDvCEDMBvOatjgq5gpIJIB21va3neJXJM/wAmNMVXhHT/ALhNe8NND59JAeJINC1tbesx2Nx7XYbanXw9JxPiCfv95ir1ufxRqn0u+Wb2rjlF7MLi3W3xgUOJoxCbE7X0v6TCriGGoJv5yZOIONb/AHfX/wAQL1vfwF+k7eTfkwTKDAccB97yP82l4lRWF1II8DebY5JtamZaiofccmCTE0EmWCD3jXjRryBDvBJjAxGAmCJivGvGvCHB4JMRgmQgLGXnYp7YpfFWH0lEZ28DxPs8RTf+8A+R0/eV8q2Gv0WQ8pMXaIWxNX9f7CVy1MpDDkQfgbzQducNkxJbk6hh9D+0qOD4E16yU+RN2/SN/vxlc0vbT/Q1J9bX7PSuJ4UYnDFebIGX9VrieT1qbIxR1KsNwZ7SiBFAGgAtK3jHA6WJXvizcnG4/mYeHm6Hj8Grl4upavJ5LeKXmM7IYlHKquccmBtceUU2e9H2Zfar6IREIN4U1GccQwYAhCQgYhyO8fNBgA518HwS1qmR75QpJymx5W1nCTNB2STvO3kPqZVzU5h4WQtoLEdlR/8AXVKjo6hvmLTqw/Zmgts5dyBrdiAT5CXU4ON1nSg7p7yi+4GnPU7TC7pruy5JGZ7V8Sw2GR6dJFSrlHeyFtyNB42PznmOO4q76F2I0022J3tG4txF67sznUn7156W1lZciZbvWbIhSu5MxNtIIMEE21jBv/MQtJAD9/OIG4/x5wLn0++sSi2/34SEJEMu+E8Z9kpUgsNx4Si9JIrW8Y0XUVsiXCpYz0KlVDqGHMXt6RGZLhHECj67Hf0HSanD4gOuZfL1nY4edck/s53LxOH+g414jBMvKx7x7wIwMgQiY14xMa8hB7xjGvGMhBGCxjmCYCGw4sn+7wKVl1elo452GjfzJ+wPDgiNiH0zaKTyUc/WUfZTjAoVMjf8b6N0B2Bl72zr1KVJEorlpEasvIch4Tn2qT9peG+3+GyWn835RW9re0pcmlSNlGjMOfgJRYPjuJpe5UYjo3eHz1nBAM0zwxM5hTV03umrp9u6oFjTUnrcj5WimRiiexx/Qfdr7LeFGqIyMyOLMpKsOhH7cx4GNNUtUtRmawkiBgR4QBXjxoryECM1fZGn/Tc9X+gEyV5a4XF18MqkFSrgkL08T4zP6ieqUl9lkedNjicQiKWcgAC+s8u7bdqRVX2dJmGt3IYgHfQWOo2nfxTi7i9Rze2w/D5Wnm2NqZ3ZtrkmwOw5CYOZOMT/ACauGVT36IWeMdR9/CMDbkY7k358vszKbBrab/vH5b+sdEZiFUXJPzmy4B2OLEPiCQAfcHP1iVanyPEVT7GQw9F3NlUsToLCaPhvYvEVfeAQWvdtflPScBg6VIZURV9NZ3IhMormb8GmfTyv5MxmB/0/pqP6tRmPRO6PiZzcc7DJlzYdirD8LG6t4X/CflPRPZ9TOXEC+lonXSe6W+1DWYeFFWRirKVYGxB0IImi7OYgksuYnY63sJadvuDiwxCDUWV7cwdFb0Nh6jpKHstSuS2Yi3LrOn6O3Vpo5fq46U0zTmDeE0jnbOWPeNGvGkIPeNEIxgIPeNeNeKQODkwTHjGDQ4Awmo7PdpVVfYYkZqZ0DHXKOh8PGZdoBlfJCpYx5py9Rtsd2MSp38NUGU6hTqPQysp9iMSWsxVR13lLg+I1aP8Axuy+F9PgdJ3v2txZFs488usocc09k0y3q433aNdg+zeGooEexbck2vrFPOK+OquczOxJ53MUT2uT+weuPo3HbLh+2IUbWWp+n8L+h08j4TMAz0xrEZSAQdCDqCOhEwHG+GnD1Mo9x7snh1T0v8LR/TcmfF/+Gep3ucd48EGPebSsKK8a8UhB7yRqrNa5vYWHgBITHzWF4Gl5IVHamuVRV5Em/wB+sxxtfeaHtA/tBnuQF0AOhubaW1ud5mmnK9W9vToenWTgRaOXB+/vpGzjblBffSZDQWvCHC1FPL6T1bAOGRSOgv8ACeM0qhuJ6X2dxZNO51B52+nwmfmn8mngr8GnRp10CTzlWMQirnY2A+7Sj4r26SictMLfqdT6KJVMt+DRVzPk3aUz4SHGulNSzd62uk83/wDcioBcUi7E/iORfTcn5Sv472/evT9mlL2ZOjkvm12IAsPjH9qvor96fssON9qC4dGCBGuuQDM7g6WC/vpMvR421FQiUkUrvnLFjfXYWy+RnDQ4eSAcwsQCMp72Yi+ssaHDwzMaqksAvMgWGmtt5u9PFS0peNmHmtUtrvhd8H4wK+bu5SuW4zZr3vqNBzHznexlT2eohUqAC39VgOuXKpUX6ay0JnX4XThOn3OdySlTwRjZoN4xMtEwO8bNI7x7yBwImK8C8Qg0mB3jExo15NDgjGiJgkwaETSJjDJkbRGyJDRQbxQaE9jUzn4tw8YikyHRt0b8rjY+XI+BkHA+IjEUUqDQnR1/K494ffWWqCc9vO5Dy4gqSrCzKSrDoQbEQgZoe2fDsrDEKNGsr+DbI3rt8Jm1M6XDydc7+Sqpxkl4oJMV5aAIxQLwS8gcOPjWFV6Z5W10G/8AEwbjXxE9GarMNxhB7RiBoSTvcTn+shdqRq9NT7ycCm+m0kOht0kJlhgOGVq4Ps0zf9QW56C5F5zm88m1JvwQ4YAuOl/WekPjKNBFD1FQAaAnvHyUan4TA4/gmJoANUpOg5bemqmdeD7OVHUOzBc2vVvXxiVM0tbLIdS8S7nVx/tKrjLSz9Ax7oHUhevLW25lHhsKWGYMF873N92vNVgOzKfjOYG4JIOl+Y8Zz00GFY0qynKNadULmDKdg1tmH31LcbjcQvJN+WcNHh1hexsbWJ+Zmj/02wy5sSHRXDZU7wDad4sNeRBWctD2+KJXCUGcbGq/dpr43O/lvpsZc8CwrYWi6qqtiC+ZyWyIL/ivl92wGw3g57lrJG4IaetEHGezT4IGpSVqlAktkABqUgdTa/vJ47jnfUytw2ExVdwVwz00sQalRSNCLiy3W+trWJmm/wDXzZGxD6Z9DTuwuNw50012+Mv34qlVe66t5HfppKvfuVhd7MU9MFhsGtFfZreyk3J1JN9SYZMlxzf1H/V+wP7yDNPQcNKuNNfSOJyT021+2KNGJjEy3RcHjkwLx7waTB7wc0UGDSYHmivBvFeDQ4OTBJiJgmRsmDEwSYjBJi6Ea8UGKAOGu7IYv2VcqT3KlgRyDj3W9dpu3eeSmp0NvGbbs/xz29Ozke0TuuOttn8j9ZTy8SVb9ia8NBWRHUo4DKwsQdiJ59xXAGhUKH3d0PVeXqNjNqmInHxvADEU9PfQEp46aqfA2EMfF6hd3sYy8YmAj6QKjzZ1C4O9SQNUkbNGvFdDpB5pUcVwhI7qjx8paXivEuVaxjTTl6jCvSINiLGeldksBRq4am5CllY022JBDNbyJBU/9UzPG8FmUMo1Gh5aSv4HxiphHJFyrWzpffKbqw6Mp1B9NiZx/UcNS8Ol6flW6z0PiOEZy1IqfZ/hZybmwubDpcCxv12lJgcf7NjTfkbA9RymrwnFUxap3lKsDYo4Do+5DKVup3018zMl2owJpNfextfmV3mWP6s1cn9pNHhcYji2hnXhcHRYgugfW4DaqPQ7zBYSuy2Kttc+Yt4zQYTje2Yeu1/jFqWvAZtPyb9MWoGlgANANAP4ma4vxFqx9hRG/vsSAoGtyTynI/EgyHK17AHT4jflp85zcKwhdLtmClrkKct7fhJtew+t4qX5Y7rXiOnDUKNJPZ5RWZjc3BKlv7U/zIuKcOcAOlMU2WxUocpvf3Sl7WsD0lyuPNBDkpM5tYBQL+FyBc+ckw3tnXPVQIdwoN7A9fGTfyM0sxGMr1w9RyNLlWtobEqLjTxBjAyB9K1YWtZ7fW/zvJAZ3/Sv/kjh86/6MljGMDETNGlIjFBiBk0grxrxEwSYNDg94rwbxXgCFeMTGjEwEGMAmETAJgCNeKNeKDQhM5kmAxho1kqXsAcr+KNvf6yPErldh0Y/WQv9dJK7yVpdz0xavMG4Oo8ZPSxEz/AUqLRVanLRddcnK/SWGciNPdaU12eFb2mwgRvaoO65s4Gwfr6/Xzmfd7zXYoh0ZG2YW8jyI8jMK+ZWKN7ymx9Iyrp7Dz8kTxQQ0a8OjYHGJg3ivJocE7ThxPDhVWplVc6pnBJyjKpu/he1p2PJuD18mIQnYnK3SzC2vylXLKpYxpbnujDgvTa6llYcwbEeoml4dijiQPbMzsoyi7E28RPR8Xh6b6Oit5gG8oOJ8BoUaT1aYCMGB1awa7e4L89dB4WmPk9I5TpMu4/VJtJox7oaTlGv4dCJ2pXDbC29iNbaeP2Z14zDrVTXcbHxmdq03TS0w9n/AKbnq/wsndlJy27w16X5jXoby74Txc0wqNYrmPPbnlA9ZjmxZH3qJEMcb726fT0kc6RXj7HsmG41hl3fWwNram+gt1g8W7TU0RihBYDwtf6zyKljHYqFux5Aany8tJ0sHVkFcOiOeVs5UWzZQT72o3iLiW4O+Z5uFthcSajO5/ERfztrOkGF/tURAaLh6Z91hvfchxur9QYM7fCumEjl2+qmwgY8ERzLRByY14140hB2jRQSYCBRQCYryBHLRiYxgkwaHBGCYi0kweGeq600F2Y2H8nwiug4Q3inoOH/ANOhlGes2bnlGnpFKffkf26Mjj8A74moiKdGOpFgAdj4y44X2fRCHc53Hu/kX05nxl5mzC43ldxLiKUVzMbsfdXmT/EuUpL5MyOqrtJ1OeZ0+kG8w+M4hUqnvubflGij0l52bx+dPZMe8g7vinL4bSya14LXG0tLOsZSccwOce1Qd5R3gPxKOfmJeVxOUNYw1OoWK6Xpk6NS8lvJuK4P2b5l9x9R4NzX95zgxJf2aez7oKIRgYgYdJgmMiO4PQgyQmRsItd0FG/puGVT1UH4ieW9q8dUq12uxyo7Ii8lysVuB1Nr3/xNvw/iWXCvUbVqYI82/B8SQJgwt99SdSed+sp9TWykiemjKbZp+CVQbBpaYjgyOLgWPhz9JScIxSOArEK42uQM3l/E1eBqEaGcW21R2oxyZHGdnyt7pcdQJwHgqkbW9P5np+QEQKXBkY52X0gV0F8cmN4H2ayf1GAufd8BO3tTwP21AZdGS7jxFu8Plf0mwGGAOk5+L1Vo03d+SlVG2ZiDZR97AwKm60LmVLX4PH8JXdGK3Ia3oyjr1M70x782+IEHG4W+g95SbN5HQ/fWQUkzrce8DZh4zpRbSxM51QmWIxj+HwhDHtzUH4iViOV0+U66Tq3n4y1ctfYnRJ1Lj+qH0N4jjh+VvlIFF4eQQ+9QPbk6qVdX236GGTK6r3SrDTWx9dj8dPWdyVMwv9g8xL+Pk6uz8ldTg5ivFeCZYKOZYdnRTbE01qqGRmykHa52v6ytJgCoVIYaEEEeY1EWu6wZeT2XiXZbDVUKimqG2jKLEfCZDsnwlsPxBqb6lUYoeoJGs3nBsaK1CnUH4kBPnbWUvamquHq4fEnQB8jn+xx+xAMwK67yaHK8mkzRQEOYBgdCLxSsY834nxIYdLjV20UfUnw/mY2vXZ2LuSWP3YdBLvtaNaZ8GHzEz4nTp/JnP41khQqFdkdXT3lPxHMQIoH3LDc4fELUQOuzD4HmJHUXWZzgvEfZPlY9xzr/AGtyPlNPU12+/KXxXUv2ZbnpZBWwy1EKNz59CNmmXxGHamxRxYj4EciPCbSnT6yPinDVrJbZ1BKN4/lPgZLj8oPHfT2fgxQMK8VamyMUdSrDcGDKkzQFGY21MF3AFzOKvXLbbRbtShpnRsRimbuAkJe9uRI5kc5GtONlnQhv+8yOup9y9LCB6GbSdmD4lWogDMSvI+9bTQFTuvkQfHlEqw+Xw+sSoVLuPNuX2LvC9rnQAvQVxtmpuVF97WZTY87Gxlknb2nb/wCO/wD3qPnYzHhihJU2B0YWBUjoynRh57bxCmjcwjcgb5D4Br3X106sJmfFK8ouXNX2aLE9u6rf8VBEP5nY1CPIWUX+MzuK4hVrNnq1GdthfQD9KgWX0EjaiVNmHj6dQeY8RHAhmZXhC1VV5YdRPdPMqP8A8koPko+M4qwKNnGx0cfQzvY9xf1MPSyn9zImUEEHnHQrGax1PxgKh9B85FhTlJpty1U9ROhZanoggbazpO1xIGsBcw6bcoUQGuLqR1GnnJMLVBt/eL+o3+/CR1ROfDPZL/kf5HX6GPD6a0WlqLQmCTHvzEEmbCkeRtHMYmAh6V/pjj89J6JOqNmX9Lf5vIv9UcaoppRBBYvnI6KB/JEwfDeJ1cOxek2ViuU89Jz4rEvUcu7FmO5Mz+18+os6vjhb8P7W4qggpqwsu2YXIHS8UoYpZ0T9C9TNH2o9yn+pvoJnJp+1qEU0PRyPipI+hmWBllP5Mo4v4okvFeDePF0swcy/7N45mvSY3Ki6Hnl2t6TPyfAYkU6qOfdGjeR0vCq6aTFqeqWjeUjpOkJOPCVVcBkYMOoN5ZU0vNZiODi3BhiaZyi1VBdD+Yc0MwDvlvfQjlzuJ6JxnjSYRMxszsCES+pP5m6KOvpPLalQsSzHUkk+ZmHkvpbw2cKbnuKo5YwRFaGqzM3pqSGAh09D56evKIoeRsb6aX+PhJQ4OjKAenLzEUYMGOf3H8xsg6fOLLGBgZnO6W1G30k8SxWtCiJKpAtuOh29Oh8pMKSuO41m5o1hf9D7HyNj0zSComU3G0ZZU1g2kv4Cp0KuNCLEXDXv/wBogWmi7M8OOND4X2oRgvtaQYXu69xlvcaZSNLmwuQN5naqMjMjqVdGKsp3VlNmB8iIqffAsgxtMkBl95dR4jmJIj5lDDnDBnNQGRyn4W1X9xLJYrOrLe1+XLxhmCBDEcABM4lFjUXqob9pO7W9DBqcz1T9xCyEvDq2ZLcx9DtOkmVPDqmVz0tYy1JmnirZKanGIwbxEwbywURMEmImCYNCPmig3igDhs+0RBw7ZuTKR53t+8xgM21dA6Oh1zKQL8jbQ/GYh0KkqRYg2I6GWcs5Rn4Xs4FePeCDHlZcFeCxivJcOiswDNlHM2voPDrA32IjecBoj2FMgWugJ8zqTF2i46uEpiwzVXByKdhbd3/tBI05nTqRTN2gZUWnRUIFULnaxbQW0GwmQ4xi3q1WZ3LkWQE9F5aeJb4yy+XISRTHC3esir4l6jl3cu7alibk/wADwGgh01nMDOmiZifc2JHQlOGEh0208PpDKSDEYWDUS+8ntEVkIc9N7aH0PX/M6AsjZOR2iBK76jr/ADFIHaK0IRzGAARyMgdLG3wnSRBdbi0Wp0KY2Bxj0aiVaZs6MHU+I3B8CLg+BM1Xb3B06q0eIYf3K6AVE5o4GVWIHkUY3tmVfzTG367xVXJABJIW5UX0Bb3iByJsLnwHSUOe+jipvykGMGgYbqb+nOInYyapqvmIwCdWuAw5iHOThj3Qqd1NvSdIly8CnJidCfSQu+kmxwnCdZGQSOBmMssJWzoDzGh8xKWsbmwllgRl06j5j7MbirKFpajtMEmOYBM1NlQ5MEmImDAEV4oN48UJtb6ym7R4YXFUfi0YdSNL/CKKa+dfEw8P8kUoMeKKZDYIR1MUUYhMlSUtZu+36j9TFFE5fA0j0hOlIopQWImpORpuJ2kxopCDgw1iikCC4jIORiikACe4RzBNvEaE/DSSxRSEFaCwiikIQ4pdL9N/GQGKKVV5GRGwh0TcERRRQnNw5rVSORH+JaOIopbPgVnNixcCV9Q20HW0aKFkDwdEHvH0hV8RZhYbGKKREO+MYoprKQTBiiihGiiikIf/2Q==";
    const name = "Blinding Lights";
    const singer = "The Weeknd";

    function check(){
      console.log(listSong);
    }

    return (
        <div>
            <div style={{marginTop: '3rem'}}>
                <Slide slidesToShow={3} {...properties}>
                    <div className="each-slide-effect">
                        <div style={{ 'backgroundImage': `url(${images[0]})` }}>
                            {/* <span>Slide 1</span> */}
                        </div>
                    </div>
                    <div className="each-slide-effect">
                        <div style={{ 'backgroundImage': `url(${images[1]})` }}>
                            {/* <span>Slide 2</span> */}
                        </div>
                    </div>
                    <div className="each-slide-effect">
                        <div style={{ 'backgroundImage': `url(${images[2]})` }}>
                            {/* <span>Slide 3</span> */}
                        </div>
                    </div>
                </Slide>
            </div>

            <div>
              <h1 onClick={check} className="mt-5 mb-4" style={{color: 'var(--gray-color)', fontSize: '30px'}}>New Album</h1>
              <div className="popular-content">
                {
                  listSong.map((item) => (
                    <div key={item.id}>
                      <CardVBox id={item.id} img={item.images[0].url} name={item.name} singer={item.artists[0].name}></CardVBox>
                    </div>
                  ))
                }
              </div>
            </div>

            <div className="mb-5">
              <h1 className="mt-5 mb-4" style={{color: 'var(--gray-color)', fontSize: '30px'}}>New Album release</h1>
              <div className="newsong-content">
                {
                  listSong.map((item) => (
                    <div key={item.id}>
                      <CardHBox id={item.id} img={item.images[0].url} name={item.name} singer={item.artists[0].name} type={'New song release'}></CardHBox>
                    </div>
                  ))
                }
              </div>
            </div>
        </div>
    )
}