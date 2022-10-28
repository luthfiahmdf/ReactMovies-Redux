import React, { useState, useEffect } from "react";
import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";
import Button from "react-bootstrap/Button";
import { BsArrowRight } from "react-icons/bs";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMoviesSwipper } from "../features/genre/swipperSlice";
import { getMoviesList } from "../features/genre/genreListSlice";
function FilterGenre() {
  const [genre, setGenre] = useState([]);
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/genre/movie/list`, {
        params: {
          api_key: process.env.REACT_APP_TMDB_KEY,
        },
      })
      .then((respone) => {
        // console.log("datas => ", respone.data.genres);
        setGenre(respone.data.genres);
      });
  }, []);
  let dispatch = useDispatch();
  const { entities, loading } = useSelector((state) => state.swipper);
  const { list } = useSelector((state) => state.list);
  useEffect(() => {
    dispatch(getMoviesSwipper());
    dispatch(getMoviesList());
  }, []);
  return (
    <div className="genre">
      <div className="trending container flex place-content-between mt-20">
        <h2 className=" items-start">Movie By Genre</h2>
        <div className="flex items-center flex-wrap gap-x-4 text-rose-700 cursor-pointer">
          <h1 className="text-xl">See All Movies</h1>
          <span className="text-md">
            <BsArrowRight />
          </span>
        </div>
      </div>
      <Swiper
        slidesPerView={6}
        spaceBetween={30}
        className="mySwiper h-3/4 container mt-12"
      >
        {list &&
          list.map((item, index) => {
            return (
              <SwiperSlide>
                <Button
                  variant="outline-danger"
                  className="w-56"
                  onClick={() => navigate(`genre/${item.name}`)}
                >
                  {item.name}
                </Button>
              </SwiperSlide>
            );
          })}
      </Swiper>

      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        className="mySwiper h-3/4 container mt-12"
      >
        {entities.map((result) => {
          return (
            <SwiperSlide>
              <img
                key={result.id}
                className="h-3/4 rounded-xl"
                src={`https://image.tmdb.org/t/p/original/${result.poster_path}`}
                alt=""
                onClick={() => navigate(`${result.id}`)}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default FilterGenre;
