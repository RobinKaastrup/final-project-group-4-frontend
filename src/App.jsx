import Home from "./components/home/Home"


function App() {
  return(
    <div className="app-container">

      <div className="login-container">
        <form className="login-details">
          <h2>Login</h2>
          <div className="username-inp">
            <input type="text" placeholder="Username"></input>
          </div>
          <div className="password-inp">
            <input type="password" placeholder="Password"></input>
          </div>
          <div className="login-submit">
            <button className="login-submit-btn" type="submit">Login</button>
          </div>
        </form>
      </div>

    </div>
  )
}

export default App