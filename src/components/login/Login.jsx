import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";
import { DataContext } from "../../App";
import Logo from "../logo/Logo";

function Login() {
  const context = useContext(DataContext);
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
      .post(`${context.baseURL}/auth/signin`, signInData)
      .then((response) => {
        console.log(response);
        const token = response.data.token;
        const userId = response.data.id;

        const username = response.data.username;
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("username", username)


        return axios.get(`${context.baseURL}/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      })
      .then((userResponse) => {

        console.log(userResponse);
        context.setLoggedInUser(userResponse.data);

        
        //context.setLoggedInUser(response.data)
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
        <div>
          <Logo />
          <h2>Login</h2>

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
