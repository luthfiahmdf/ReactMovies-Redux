import React from "react";
import axios from "axios";
import Footer from "../footer";
import { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Nav from "../nav";
import Cinema from "../assets/cinema.jpg";
function Genre() {
  let { name } = useParams();
  const navigate = useNavigate();
  const [film, setFilm] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=97caff1504fb5f9037e7c577be630b77&language=en-US&query=${name}`,
        {
          params: {
            api_key: process.env.REACT_APP_TMDB_KEY,
          },
        }
      )
      .then((respone) => {
        // console.log("datas => ", respone.data.results);
        setFilm(respone.data.results);
      });
  }, []);
  return (
    <div className="film">
      <Nav />
      <div className="header">
        <img src={Cinema} alt="" className="w-screen " />
      </div>
      <div className="container">
        <h1 className="mt-12 mb-12"> Result For " {name} " Genre</h1>
        <div className="card flex flex-row flex-wrap justify-evenly space-y-6 ">
          {film &&
            film.map((item, key) => {
              return (
                <Card
                  style={{ width: "18rem" }}
                  onClick={() => navigate(`/${item.id}`)}
                >
                  <Card.Img
                    className="h-4/5"
                    key={item.id}
                    src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                  />
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                  </Card.Body>
                </Card>
              );
            })}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Genre;
