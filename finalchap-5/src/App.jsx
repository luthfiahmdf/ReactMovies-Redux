import "./App.css";
import axios from "axios";
import "antd/dist/antd.css";

import Card from "react-bootstrap/Card";
import { Layout, Menu } from "antd";
import { useEffect, useState } from "react";
import Caro from "./components/caro";
import Nav from "./components/nav";
const { Meta } = Card;
const { Header, Content, Footer } = Layout;
function App() {
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
    <div className="App">
      <Content>
        <Nav />
        <Caro />
        {/* <h1 className=" mb-20">Trending Movies</h1> */}

        <div className="site-layout-content grid grid-cols-4 mt-32 ml-16 items-center h-4/5 rounded-lg">
          {movies.map((result, index) => {
            return (
              <div className="card w-4/5 flex space-x-4 rounded-lg">
                <Card style={{ width: "18rem" }}>
                  <Card.Img
                    variant="top"
                    src={`https://image.tmdb.org/t/p/original/${result.poster_path}`}
                  />
                </Card>
              </div>
            );
          })}
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </div>
  );
}
export default App;
