import "./compo.css";
import Swal from "sweetalert2";
import logo from "./assets/logoNav.svg";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Input } from "reactstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import ava from "./assets/users.png";

import { GoogleLogin } from "@react-oauth/google";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { logIn, postLogin } from "../features/loginRegister/loginSlice";
import { postLoginGoogle } from "../features/loginRegister/loginGoogleSlice";
import { postRegister } from "../features/loginRegister/registerSlice";
// Firebase

import { useAuthState } from "react-firebase-hooks/auth";
function Nav(props) {
  const [isHover, setIsHover] = useState(false);
  const [search, setSearch] = useState([]);
  const [login, setLogin] = useState(false);
  const [show, setShow] = useState(false);
  const [showRegist, setShowRegist] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleShowRegist = () => setShowRegist(true);
  const handleCloseRegist = () => setShowRegist(false);

  const [eye, seteye] = useState(true);
  const [passwordeye, setpasswordeye] = useState("password");
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
    if (passwordeye === "password") {
      setpasswordeye("text");
      seteye(false);
      settype(true);
    } else {
      setpasswordeye("password");
      seteye(true);
      settype(false);
    }
  };

  const EyeConfirm = () => {
    if (passwordConfirm === "password") {
      setPasswordConfirm("text");
      setEyeConfirm(false);
      setTypeConfirm(true);
    } else {
      setPasswordConfirm("password");
      setEyeConfirm(true);
      setTypeConfirm(false);
    }
  };
  const [user, setUser] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pass, setPass] = useState("");
  const [value, setValue] = useState({
    email: email,
    password: password,
  });
  let dispatch = useDispatch();

  const handleSubmit = async () => {
    dispatch(logIn(value));
    Swal.fire("Horeee!", "Login Berhasil!", "success");
    setTimeout(function () {
      window.location.reload(1);
    }, 1500);
    setShow(false);

    setLogin(true);
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    setLogin(token);
    setLogin(true);
    const user = JSON.parse(localStorage.getItem("log"));

    setUser(user);
  }, [login]);

  // Regist
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [mail, setMail] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwdConf, setPwdConf] = useState("");

  const [payload, setPayload] = useState({
    name: firstname,
    email: mail,
    password: pwd,
  });

  const onSubmitReg = () => {
    dispatch(postRegister(payload));
    setShowRegist(false);
    // registerWithEmailAndPassword(payload.name, payload.email, payload.password);
    // console.log(payload);
  };
  const handleLogout = () => {
    Swal.fire({
      title: "Do you want to Log Out?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Log Out Succes!", "", "success");
        setTimeout(function () {
          window.location.reload(1);
        }, 2000);
        localStorage.clear();
      } else if (result.isDenied) {
        Swal.fire("Gajadi", "", "info");
      }
    });
  };

  const isLoginGoogle = async () => {
    dispatch(postLoginGoogle());
    setLogin(true);
    setUser(user);
  };

  const navigate = useNavigate();
  let token = localStorage.getItem("token");
  let profile = localStorage.getItem("user");
  let image = localStorage.getItem("image");
  const { logins } = useSelector((state) => state.loginGoogle);
  // const { loginUser } = useSelector((state) => state.loginUser);
  let regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
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
            value={search.original_title}
            onKeyDown={(e) => handleKeyPressed(e)}
            onChange={(e) => setSearch(e.target.value)}
          />
          {token && login && token.length ? (
            <div className="wrapper flex flex-wrap space-x-4 items-center">
              {image !== null ? (
                <img
                  src={JSON.parse(image)}
                  alt=""
                  className="w-7 rounded-full"
                />
              ) : (
                <img src={ava} alt="" className="w-7" />
              )}

              <h2 className="text-white text-xl ">
                Halo,
                {JSON.parse(profile)}
              </h2>

              <Button variant="danger" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
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
                      controlId="exampleForm.ControlInput2"
                    >
                      <Form.Control
                        type="email"
                        onChange={(e) =>
                          setValue({ ...value, email: e.target.value })
                        }
                        placeholder="Email Address"
                        className="hover:border-rose-700 focus:bg-rose-700"
                      />
                      {/* {email.match(regexEmail) === null ? (
                        <span className="text-rose-700 text-sm ">
                          Please Input A Valid Email
                        </span>
                      ) : (
                        ""
                      )} */}

                      <div className="icon icon-mail relative">
                        <i>
                          <AiOutlineMail />
                        </i>
                      </div>
                    </Form.Group>

                    {/* Password */}
                    <Form.Group className="mb-3">
                      <Form.Control
                        type={passwordeye}
                        onChange={(e) =>
                          setValue({ ...value, password: e.target.value })
                        }
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
                  <Button variant="danger" onClick={handleSubmit}>
                    Login
                  </Button>
                  <div className="signInDiv">
                    <Button variant="danger" onClick={isLoginGoogle}>
                      Login With Google
                    </Button>
                    {/* <GoogleLogin
                      onSuccess={(credentialResponse) => {
                        dispatch(postLoginGoogle(credentialResponse));
                      setLogin(true);
                        setTimeout(function () {
                          window.location.reload(1);
                        }, 1000);
                      }}
                    /> */}
                  </div>
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
                    {/*  Name */}
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="first name"
                        onChange={(e) =>
                          setPayload({ ...payload, name: e.target.value })
                        }
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
                    {/* <Form.Group className="mb-3">
                      <Form.Control
                        type="last Name"
                        onChange={(e) =>
                          setPayload({ ...payload, last_name: e.target.value })
                        }
                        placeholder="Last Name"
                        className="hover:border-rose-700 focus:bg-rose-700"
                      />
                      <div className="icon icon-last absolute">
                        <i>
                          <AiOutlineUser />
                        </i>
                      </div>
                    </Form.Group> */}

                    {/* Email */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control
                        type="email"
                        onChange={(e) =>
                          setPayload({ ...payload, email: e.target.value })
                        }
                        placeholder="Email Address"
                        className="hover:border-rose-700 focus:bg-rose-700"
                      />
                      {mail.match(regexEmail) === null ? (
                        <span className="text-rose-700 text-sm ">
                          Please Input A Valid Email
                        </span>
                      ) : (
                        ""
                      )}
                      <div className="icon icon-mail-regist absolute">
                        <i>
                          <AiOutlineMail />
                        </i>
                      </div>
                    </Form.Group>

                    {/* Password */}
                    <Form.Group className="mb-3">
                      <Form.Control
                        type={passwordeye}
                        onChange={(e) =>
                          setPayload({ ...payload, password: e.target.value })
                        }
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
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="danger" onClick={onSubmitReg}>
                    Regist Now
                  </Button>
                  <Button variant="danger">Sign Up With Google</Button>
                </Modal.Footer>
              </Modal>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Nav;
