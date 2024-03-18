import { Routes } from "react-router-dom"
import { Route } from "react-router-dom"
import Home from "./components/home/Home"
import Login from "./components/login/Login"
import Signup from "./components/signup/Signup"


function App() {
  return(
    <div className="app-container">
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/login" Component={Login} />
        <Route path="/signup" Component={Signup} />

      </Routes>


    </div>
  )
}

export default App