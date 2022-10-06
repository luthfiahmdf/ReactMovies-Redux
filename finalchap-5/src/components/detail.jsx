import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { AiOutlinePlayCircle, AiOutlineStar } from "react-icons/ai";

import axios from "axios";
import Nav from "./nav";
import Footer from "./footer";
const Details = () => {
  let { id } = useParams();
  const [movies, setMovies] = useState([]);
  const [actor, setactor] = useState([]);
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

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/movie/${id}/credits`, {
        params: {
          api_key: process.env.REACT_APP_TMDB_KEY,
        },
      })
      .then((res) => {
        console.log("actor => ", res.data.cast.slice(0, 4));
        setactor(res.data.cast.slice(0, 4));
      });
  }, []);
  return (
    <div className="details h-screen">
      <Nav />
      <div className="content">
        {movies && (
          <div className="cont h-screen ">
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
              <div className="rating flex flex-wrap">
                <span className="pt-1 text-lg">
                  <AiOutlineStar className="text-amber-500" />
                </span>
                <p cla>{Math.ceil(movies.vote_average).toFixed()}/10</p>
              </div>
              <a
                href={`https://www.youtube.com/results?search_query=${movies.title}`}
                target="blank"
              >
                <Button variant="danger ">
                  <span className="flex items-center gap-x-3">
                    <AiOutlinePlayCircle /> WATCH TRAILER
                  </span>
                </Button>
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="title container mt-44">
        <h1 className="">Cast And Crew</h1>
      </div>
      <div className="actor flex flex-wrap container mt-10 place-content-between">
        {actor &&
          actor.map((item) => {
            return (
              <Card style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src={`https://image.tmdb.org/t/p/original/${item.profile_path}`}
                />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>{item.character}</Card.Text>
                </Card.Body>
              </Card>
            );
          })}
      </div>
      <Footer />
    </div>
  );
};

export default Details;
