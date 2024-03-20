import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    const signInData = {
      username: username,
      password: password,
    };

    axios
      .post("http://localhost:4000/auth/signin", signInData)
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem("token", token);
        console.log("Token:", token);
        // Redirect the user back to the original page
        const returnUrl = localStorage.getItem("returnUrl") || "/";
        navigate(returnUrl);
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle authentication error
      });
  };

  return (
    <div className="login-container">
      <form className="login-details" onSubmit={handleSignIn}>
        <h2>Login</h2>
        <div className="username-inp">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="password-inp">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="login-submit">
          <button className="login-submit-btn" type="submit">
            Login
          </button>
        </div>
        <div className="go-to-signup">
          <Link to="/signup">Go To Signup</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
