import React from "react";
import Nav from "./components/nav";
import Caro from "./components/caro";
import Trending from "./components/page/trending";
import FilterGenre from "./components/swiperGenre";
import Footer from "./components/footer";
function App() {
  return (
    <div className="App">
      <Nav />
      <Caro />
      <Trending />
      <FilterGenre />
      <Footer />
    </div>
  );
}
export default App;
