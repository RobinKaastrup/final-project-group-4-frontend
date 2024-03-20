import { Routes, Route, useNavigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Dashboard from "./components/dashboard/Dashboard";
import DashboardChat from "./components/dashboard/DashboardChat";
import DashboardContacts from "./components/dashboard/DashboardContacts";
import DashboardProfile from "./components/dashboard/DashboardProfile";
import Chat from "./components/chat/Chat";
import axios from "axios";

const DataContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("token");
    if (!authToken && window.location.pathname !== "/signup") {
      navigate("/login"); // Redirect to login if no token and not on signup page
    } else if (authToken) {
      axios
        .get("http://localhost:4000/users", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((response) => {
          setLoggedInUser(response.data);
        })
        .catch(() => {
          localStorage.removeItem("token");
          navigate("/login"); // Redirect to login if token invalid
        });
    }
  }, [navigate]);

  return (
    <div className="app-container">
      <DataContext.Provider value={""}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Dashboard loggedInUser={loggedInUser} />}>
            <Route path="/chats/:id" element={<DashboardChat />} />
            <Route path="/profile/:id" element={<DashboardProfile />} />
            <Route path="/contacts/:id" element={<DashboardContacts />} />
          </Route>
          <Route path="/chat/:id" element={<Chat />} />
        </Routes>
      </DataContext.Provider>
    </div>
  );
}

export default App;
