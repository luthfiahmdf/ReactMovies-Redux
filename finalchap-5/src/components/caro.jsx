import Carousel from "react-bootstrap/Carousel";
import { useEffect, useState } from "react";
import axios from "axios";

function UncontrolledExample() {
  const [movies, setMovies] = useState([]);

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
    <div className="car container  h-fit box-border">
      {movies && (
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-screen"
              src={`https://image.tmdb.org/t/p/original/jsoz1HlxczSuTx0mDl2h0lxy36l.jpg`}
              alt="First slide"
            />
            <Carousel.Caption classname="place-content-center">
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-screen"
              src={`https://image.tmdb.org/t/p/original/jsoz1HlxczSuTx0mDl2h0lxy36l.jpg`}
              alt="First slide"
            />
            <Carousel.Caption classname="place-content-center">
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-screen"
              src={`https://image.tmdb.org/t/p/original/jsoz1HlxczSuTx0mDl2h0lxy36l.jpg`}
              alt="First slide"
            />
            <Carousel.Caption classname="place-content-center">
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      )}
    </div>
  );
}

export default UncontrolledExample;
