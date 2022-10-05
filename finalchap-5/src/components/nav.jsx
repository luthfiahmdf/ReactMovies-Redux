import React from "react";
import "./compo.css";
import logo from "./assets/logoNav.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from "reactstrap";
import Button from "react-bootstrap/Button";

function Nav(props) {
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };
  window.addEventListener("scroll", () => {
    document
      .querySelector("nav")
      .classList.toggle("window-scroll", window.scrollY > 0);
  });
  const inputStyle = {
    width: "40%",
    height: "50%",
    color: "white",
    borderRadius: "25px",
  };
  const navigate = useNavigate();
  return (
    <div>
      <nav>
        <div className="container nav_container">
          <div className="logo cursor-pointer">
            <img src={logo} alt="logo" onClick={() => navigate("/")} />
          </div>

          <Input
            className="seacrh bg-transparent     hover:border-rose-700"
            style={inputStyle}
            placeholder="Search Movies"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            // prefix={<SearchOutlined />}
          />

          <div className="items flex space-x-4">
            <Button variant="outline-danger">Login</Button>
            <Button variant="danger">Register</Button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
