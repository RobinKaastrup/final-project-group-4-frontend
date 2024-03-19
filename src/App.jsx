import { Routes } from "react-router-dom"
import { Route } from "react-router-dom"
import { createContext } from "react"
import Login from "./components/login/Login"
import Signup from "./components/signup/Signup"
import Dashboard from "./components/dashboard/Dashboard"
import DashboardChat from "./components/dashboard/DashboardChat"
import DashboardContacts from "./components/dashboard/DashboardContacts"
import DashboardProfile from "./components/dashboard/DashboardProfile"
import Chat from "./components/chat/Chat"

function App() {
  const DataContext = createContext()

  return(
    <div className="app-container">
      <DataContext.Provider value={""}>
        <Routes>
          <Route path="/login" Component={Login} />
          <Route path="/signup" Component={Signup} />
          <Route path="/" Component={Dashboard}> 
            <Route path="/chat" Component={DashboardChat}>
              <Route path='/chat/:id' Component={Chat}/>
            </Route>
            <Route path="/profile/:id" Component={DashboardProfile}/>
            <Route path="/contacts/:id" Component={DashboardContacts}/>
          </Route>
        </Routes>
      </DataContext.Provider>


    </div>
  )
}

//<Route path="/profile/:id" Component={Profile} />
export default App