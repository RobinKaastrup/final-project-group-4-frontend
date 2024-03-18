import { Link } from 'react-router-dom'
import './login.css'

function Login() {
  return (
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
      <div className='go-to-signup'>
        <Link to="/signup">Go To Signup</Link>
      </div>
    </form>
  </div>
  )
}

export default Login