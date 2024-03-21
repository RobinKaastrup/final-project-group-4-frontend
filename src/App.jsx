import { Routes, useNavigate } from "react-router-dom";
import { Route } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Dashboard from "./components/dashboard/Dashboard";
import DashboardChat from "./components/dashboard/DashboardChat";
import DashboardContacts from "./components/dashboard/DashboardContacts";
import DashboardProfile from "./components/profile/DashboardProfile";
import Chat from "./components/chat/Chat";
import axios from "axios";

const DataContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();
  const baseURL = "http://localhost:4000";

  useEffect(() => {
    const authToken = localStorage.getItem("token");
    if (!authToken && window.location.pathname !== "/signup") {
      navigate && navigate("/login");
    } else if (authToken && loggedInUser !== null) {
      axios
        .get(`${baseURL}/users/${loggedInUser.id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((response) => {
          setLoggedInUser(response.data);
        })
        .catch(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          if (window.location.pathname !== "/signup") {
            navigate && navigate("/login"); // Check if navigate exists before using it
          }
        });
    }
  }, [navigate]);

  console.log("loggedInUser", loggedInUser);

  return (
    <div className="app-container">
      <DataContext.Provider value={{ loggedInUser, setLoggedInUser, baseURL }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Dashboard />}>
            <Route path="/chats" element={<DashboardChat />}>
              <Route
                path="/chats/:id"
                element={<Chat loggedInUser={loggedInUser} />}
              />
            </Route>
            <Route path="/profile/:id" element={<DashboardProfile />} />
            <Route path="/contacts/:id" element={<DashboardContacts />} />
          </Route>
        </Routes>
      </DataContext.Provider>
    </div>
  );
}

export { App, DataContext };
