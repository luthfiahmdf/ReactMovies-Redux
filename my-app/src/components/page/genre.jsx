import React from "react";

import Footer from "../footer";
import { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Nav from "../nav";
import { useDispatch, useSelector } from "react-redux";
import Cinema from "../assets/cinema.jpg";
import { getGenre } from "../../features/genre/genreSlice";

function Genre() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { entities, loading } = useSelector((state) => state.genre);
  let { name } = useParams();
  useEffect(() => {
    dispatch(getGenre(name));
  }, []);

  if (loading) return <p>loading</p>;
  return (
    <div className="film">
      <Nav />
      <div className="header">
        <img src={Cinema} alt="" className="w-screen " />
      </div>
      <div className="container">
        <h1 className="mt-12 mb-12"> Result For " {name} " Genre</h1>
        <div className="conatiner  grid grid-cols-4 gap-5 ">
          {entities &&
            entities.map((item, key) => {
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
        {/* <Footer /> */}
      </div>
    </div>
  );
}

export default Genre;
