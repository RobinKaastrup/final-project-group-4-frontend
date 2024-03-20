import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const signUpData = {
      username: username,
      email: email,
      password: password,
      role: ["user"],
    };

    axios
      .post("http://localhost:4000/auth/signup", signUpData)
      .then((response) => {
        // Successful sign-up
        setError("");
        // Redirect the user back to the sign-in page
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("Failed to sign up. Please try again.");
      });
  };

  return (
    <div className="signup-container">
      <form className="signup-details" onSubmit={handleSignUp}>
        <h2>Signup</h2>
        <div className="email-inp">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
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
        <div className="password-verify-inp">
          <input type="password" placeholder="Verify Password" />
        </div>
        <div className="signup-submit">
          <button className="signup-submit-btn" type="submit">
            Signup
          </button>
        </div>
        <p style={{ color: "red" }}>{error}</p>
        <div className="go-to-login">
          <p>
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
