import { Routes } from "react-router-dom"
import { Route } from "react-router-dom"
import Login from "./components/login/Login"
import Signup from "./components/signup/Signup"
import Dashboard from "./components/dashboard/Dashboard"


function App() {
  return(
    <div className="app-container">
      <Routes>
        <Route path="/login" Component={Login} />
        <Route path="/signup" Component={Signup} />
        <Route path="/" Component={Dashboard}> 
        
        </Route>
      </Routes>


    </div>
  )
}

//<Route path="/profile/:id" Component={Profile} />
export default App