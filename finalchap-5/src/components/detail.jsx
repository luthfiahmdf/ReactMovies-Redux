import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";

import { AiOutlinePlayCircle } from "react-icons/ai";

import axios from "axios";
import Nav from "./nav";
const Details = () => {
  let { id } = useParams();
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/movie/${id}`, {
        params: {
          api_key: process.env.REACT_APP_TMDB_KEY,
        },
      })
      .then((respone) => {
        console.log("datas => ", respone.data);
        setMovies(respone.data);
      });
  }, []);
  return (
    <div className="details h-screen">
      <Nav />
      <div className="content">
        {movies && (
          <div className="cont h-screen">
            <img
              className="saturate-50  "
              src={`https://image.tmdb.org/t/p/original/${movies.backdrop_path}`}
              alt=""
            />
            <div className="title overlay  text-white  container place-content-center pt-56  ">
              <h1>{movies.title}</h1>
              <div className="genre">
                {movies.genres &&
                  movies.genres.map((item) => {
                    return (
                      <ul className="inline-block text-md mb-7  ">
                        <li>{item.name}</li>
                      </ul>
                    );
                  })}
              </div>

              <p className=" text-md leading-loose  mr-96 ">
                {movies.overview}
              </p>
              <Button variant="danger ">
                <span className="flex items-center gap-x-3">
                  <AiOutlinePlayCircle /> WATCH TRAILER
                </span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;
