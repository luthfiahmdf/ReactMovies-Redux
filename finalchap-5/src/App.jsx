import "./App.css";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import Card from "react-bootstrap/Card";

import { useEffect, useState } from "react";
import Caro from "./components/caro";
import Nav from "./components/nav";
import { useNavigate } from "react-router-dom";

function App() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/trending/movie/week`, {
        params: {
          api_key: process.env.REACT_APP_TMDB_KEY,
        },
      })
      .then((respone) => {
        console.log("datas => ", respone.data);
        setMovies(respone.data.results);
      });
  }, []);
  return (
    <div className="App">
      <Nav />
      <Caro />
      {/* 
      <div className="site-layout-content 4 mt-32 ml-16 items-center h-4/5 rounded-lg"> */}
      <>
        <h1 className="ml-20 mt-20 items-start">Trending Movies</h1>
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          className="mySwiper h-3/4 container mt-12"
        >
          {movies.map((result, index) => {
            return (
              <SwiperSlide>
                <img
                  className="h-3/4 rounded-xl"
                  src={`https://image.tmdb.org/t/p/original/${result.poster_path}`}
                  alt=""
                  onClick={() => navigate(`${result.id}`)}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </>
      ;
    </div>
    // </div>
  );
}
export default App;
