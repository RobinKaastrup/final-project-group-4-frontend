import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../App";
import axios from "axios";

function Menu() {
  const { loggedInUser } = useContext(DataContext);
  const navigate = useNavigate();
  const [hasChats, setHasChats] = useState(false);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        if (loggedInUser) {
          const authToken = localStorage.getItem("token");
          const response = await axios.get(
            `http://localhost:4000/chats/${loggedInUser.id}`,
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          );
          const existingChats = response.data.data;
          console.log("existingChats", existingChats);
          setHasChats(existingChats !== null);
        }
      } catch (error) {
        console.error("Error fetching user's chats:", error);
      }
    };

    fetchChats();
  }, [loggedInUser]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="menu-container">
      <ul className="menu-list">
        <li onClick={() => navigate(`/profile/${loggedInUser.id}`)}>Profile</li>
        <li onClick={() => navigate(`/contacts/${loggedInUser.id}`)}>
          Contacts
        </li>
        <li onClick={() => navigate(hasChats ? `/chats` : `/chats/welcome`)}>
          Chat
        </li>
      </ul>
      <ul className="menu-list">
        <li className="logout-button" onClick={handleLogout}>
          Logout
        </li>
      </ul>
    </nav>
  );
}

export default Menu;
