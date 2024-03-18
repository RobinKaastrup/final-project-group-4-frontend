import { Link } from 'react-router-dom'
import './signup.css'

function Signup() {
  return (

  <div className="signup-container">
    <form className="signup-details">
      <h2>Signup</h2>
      <div className="username-inp">
        <input type="text" placeholder="E-mail"></input>
      </div>
      <div className="username-inp">
        <input type="text" placeholder="Username"></input>
      </div>
      <div className="password-inp">
        <input type="password" placeholder="Password"></input>
      </div>
      <div className="password-verify-inp">
        <input type="password" placeholder="verify password"></input>
      </div>
      <div className="signup-submit">
        <button className="signup-submit-btn" type="submit">Signup</button>
      </div>
      <div className='go-to-login'>
        <Link to="/login">Go To Login</Link>
      </div>
    </form>
  </div>
  )
}

export default Signup