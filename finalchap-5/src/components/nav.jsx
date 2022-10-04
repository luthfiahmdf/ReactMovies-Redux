import React from "react";
import "./compo.css";
import logo from "./assets/logoNav.svg";
import Button from "./button";
import { useState } from "react";
import { Input } from "antd";
// import Form from "react-bootstrap/Form";

function Nav(props) {
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const inputStyle = {
    width: "50%",
    color: "white",
    borderRadius: "25px",
    backgroundColor: "transparent",
    borderColor: isHover ? "red " : "red",
  };
  return (
    <div>
      <nav>
        <div className="container nav_container">
          <a href="index.html">
            <img src={logo} alt="logo" />
          </a>

          <Input
            style={inputStyle}
            placeholder="Search Movies"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            // prefix={<SearchOutlined />}
          />

          <div className="items gap-x-1">
            <Button>Login</Button>
            <Button>Register</Button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
