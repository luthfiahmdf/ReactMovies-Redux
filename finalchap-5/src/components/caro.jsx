import Carousel from "react-bootstrap/Carousel";
import { useEffect, useState } from "react";
import axios from "axios";
import "./compo.css";
import Button from "./button";

function UncontrolledExample(props) {
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
    <div className="caro">
      {movies && (
        <Carousel>
          <Carousel.Item>
            <img
              className=" saturate-50   "
              src={`https://image.tmdb.org/t/p/original/o5Uy3zM1SNxzoMwy5H04GQAmfNF.jpg`}
              alt="First slide"
            />
            <Carousel.Caption>
              <h1 className="text-left">Blonde</h1>
              <p className="text-left">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta
                voluptates quaerat placeat quibusdam ducimus, ad quae accusamus
                unde recusandae consectetur.
              </p>
              <Button>WATCH TRAILER</Button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className=" saturate-50"
              src={`https://image.tmdb.org/t/p/original/jauI01vUIkPA0xVsamGj0Gs1nNL.jpg`}
              alt="First slide"
            />
            <Carousel.Caption>
              <h1 className="font-sans text-left">Jurassic World Dominion</h1>
              <p className="text-left">
                {" "}
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Veritatis magni quod hic ipsum dolorem rem numquam incidunt,
                libero labore quas.{" "}
              </p>
              <Button>WATCH TRAILER</Button>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className=" saturate-50"
              src={`https://image.tmdb.org/t/p/original/dxihDyyA6RSAtLZog4l1MYdDqLD.jpg`}
              alt="First slide"
            />
            <Carousel.Caption>
              <h1 className="text-left">Vesper</h1>
              <p className="text-left">
                {" "}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
                minima debitis iure error vel, ea neque inventore odit
                reprehenderit omnis.{" "}
              </p>
              <Button>WATCH TRAILER</Button>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      )}
    </div>
  );
}

export default UncontrolledExample;
