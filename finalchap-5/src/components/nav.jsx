import React from "react";
import "./compo.css";
import logo from "./assets/logoNav.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from "reactstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";

function Nav(props) {
  const [isHover, setIsHover] = useState(false);
  const [search, setSearch] = useState([]);
  const [show, setShow] = useState(false);
  const [showRegist, setShowRegist] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleShowRegist = () => setShowRegist(true);
  const handleCloseRegist = () => setShowRegist(false);

  const [eye, seteye] = useState(true);
  const [password, setpassword] = useState("password");
  const [type, settype] = useState(false);

  const [eyeConfirm, setEyeConfirm] = useState(true);
  const [passwordConfirm, setPasswordConfirm] = useState("password");
  const [typeConfirm, setTypeConfirm] = useState(false);

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
  const handleKeyPressed = (e) => {
    if (e.key === "Enter") {
      navigate(`/search/${search}`);
    }
  };

  const Eye = () => {
    if (password === "password") {
      setpassword("text");
      seteye(false);
      settype(true);
    } else {
      setpassword("password");
      seteye(true);
      settype(false);
    }
  };

  const EyeConfirm = () => {
    if (password === "password") {
      setPasswordConfirm("text");
      setEyeConfirm(false);
      setTypeConfirm(true);
    } else {
      setPasswordConfirm("password");
      setEyeConfirm(true);
      setTypeConfirm(false);
    }
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
            type="text"
            className="seacrh bg-transparent     hover:border-rose-700"
            style={inputStyle}
            placeholder="Search Movies"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            // onClick={() => navigate(`name/`)}
            value={search.original_title}
            onKeyDown={(e) => handleKeyPressed(e)}
            // prefix={<SearchOutlined />}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="items flex space-x-4">
            <Button variant="outline-danger" onClick={handleShow}>
              Login
            </Button>
            <Modal show={show} onHide={handleClose} size="md">
              <Modal.Header closeButton>
                <Modal.Title>Login To Your Account</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="email"
                      placeholder="Email Address"
                      className="hover:border-rose-700 focus:bg-rose-700"
                    />
                    <div className="icon icon-mail absolute">
                      <i>
                        <AiOutlineMail />
                      </i>
                    </div>
                  </Form.Group>
                  {/* Password */}
                  <Form.Group className="mb-3">
                    <Form.Control
                      type={password}
                      placeholder="Password"
                      className={`  ${
                        type ? "type_password" : ""
                      } hover:border-rose-700`}
                    />
                    <div className="icon icon-eye-login absolute">
                      <i
                        onClick={Eye}
                        className={`fa ${
                          eye ? "fa-eye-slash" : "fa-thin fa-eye"
                        }`}
                      ></i>
                    </div>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="danger">Login</Button>
              </Modal.Footer>
            </Modal>
            {/* Modal Login */}

            {/* Modal Register */}
            <Button variant="danger" onClick={handleShowRegist}>
              Register
            </Button>
            <Modal show={showRegist} onHide={handleCloseRegist} size="md">
              <Modal.Header closeButton>
                <Modal.Title>Create Your Account</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  {/* First Name */}
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="first name"
                      placeholder="First Name"
                      className="hover:border-rose-700 focus:bg-rose-700"
                    />
                    <div className="icon icon-first absolute">
                      <i>
                        <AiOutlineUser />
                      </i>
                    </div>
                  </Form.Group>

                  {/* Last Name */}
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="last Name"
                      placeholder="Last Name"
                      className="hover:border-rose-700 focus:bg-rose-700"
                    />
                    <div className="icon icon-last absolute">
                      <i>
                        <AiOutlineUser />
                      </i>
                    </div>
                  </Form.Group>

                  {/* Email */}
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="Email"
                      placeholder="Email Address"
                      className="hover:border-rose-700 focus:bg-rose-700"
                    />
                    <div className="icon icon-mail-regist absolute">
                      <i>
                        <AiOutlineMail />
                      </i>
                    </div>
                  </Form.Group>

                  {/* Password */}
                  <Form.Group className="mb-3">
                    <Form.Control
                      type={password}
                      placeholder="Password"
                      className={`  ${
                        type ? "type_password" : ""
                      } hover:border-rose-700`}
                    />
                    <div className="icon icon-eye absolute">
                      <i
                        onClick={Eye}
                        className={`fa ${
                          eye ? "fa-eye-slash" : "fa-thin fa-eye"
                        }`}
                      ></i>
                    </div>
                  </Form.Group>

                  {/* Password Confirm */}
                  <Form.Group className="mb-3">
                    <Form.Control
                      type={passwordConfirm}
                      placeholder="Confirm Password"
                      className={`  ${
                        typeConfirm ? "type_password" : ""
                      } hover:border-rose-700`}
                    />
                    <div className="icon icon-eye-confirm absolute">
                      <i
                        onClick={EyeConfirm}
                        className={`fa ${
                          eyeConfirm ? "fa-eye-slash" : "fa-thin fa-eye"
                        }`}
                      ></i>
                    </div>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="danger">Regist Now</Button>
                <Button variant="danger">Sign Up With Google</Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
