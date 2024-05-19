import React, { useState } from "react";
import "./login.css"; // Import your CSS file
import Fab from "@mui/material/Fab";
import TextField from "@mui/material/TextField";
import axios from "axios";
import LoginIcon from "@mui/icons-material/Login";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

const LoginSignupModal = ({ onClose }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = !isLogin
      ? "https://seez-demo-f3nh.vercel.app/signup"
      : "https://seez-demo-f3nh.vercel.app/login";

    try {
      const data = isLogin
        ? {
            email: formData.email,
            password: formData.password,
          }
        : {
            userName: formData.username,
            email: formData.email,
            password: formData.password,
          };
      const response = await axios.post(apiUrl, data);
      sessionStorage.setItem(
        "token",
        response.data.result[0].token.accessToken
      );
      sessionStorage.setItem("username", response.data.result[0].userName);
      setFormData({
        username: "",
        email: "",
        password: "",
      });
      setError(null);
      setModalOpen(false);
      window.location.reload();
    } catch (error) {
      const errorData = error.response;
      if (error) {
        setError(errorData);
      }
    }
  };

  return (
    <>
      {!modalOpen && (
        <Button
          variant="contained"
          style={{ backgroundColor: "white", color: "#0d2a69" }}
          size="large"
          onClick={() => setModalOpen(true)}
        >
          <LoginIcon sx={{ mr: 1 }} />
          <b>Login/Signup</b>
        </Button>
      )}
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setModalOpen(false)}>
              &times;
            </span>
            <h2>{isLogin ? "Login to Seez" : "Create Account"}</h2>
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div>
                  <TextField
                    id="standard-basic"
                    label="Username"
                    variant="standard"
                    type="text"
                    name="username"
                    className="textFieldWide"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                </div>
              )}
              <div>
                <TextField
                  id="standard-basic"
                  label="Email Id"
                  variant="standard"
                  type="email"
                  name="email"
                  className="textFieldWide"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <TextField
                  id="standard-basic"
                  label="Password"
                  variant="standard"
                  type="password"
                  name="password"
                  className="textFieldWide"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <Button variant="contained" color="success" type="submit">
                {isLogin ? "Login to Seez" : "Create Account"}
              </Button>
            </form>
            {error && (
              <Alert severity="error" className="error">
                {" "}
                {error.data.message}
              </Alert>
            )}
            <p
              onClick={() => {
                setIsLogin(!isLogin);
                setFormData({
                  username: "",
                  email: "",
                  password: "",
                });
                setError(null);
              }}
            >
              {isLogin ? "Switch to Signup" : "Switch to Login"}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginSignupModal;
