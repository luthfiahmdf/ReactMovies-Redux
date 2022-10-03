import "./App.css";
import axios from "axios";
import "antd/dist/antd.css";
import { Card, Layout, Menu } from "antd";
import { useEffect, useState } from "react";
import Caro from "./components/caro";
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
      <Layout className="layout">
        <Content>
          <Caro />
          <div className="site-layout-content grid grid-cols-4 mt-32 p-2 items-center">
            {movies.map((result, index) => {
              return (
                <div className="card w-4/5">
                  <Card
                    hoverable
                    key={index}
                    cover={
                      <img
                        alt="example"
                        src={`https://image.tmdb.org/t/p/original/${result.poster_path}`}
                      />
                    }
                  >
                    <Meta title={result.title} />
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
      </Layout>
    </div>
  );
}

export default App;
