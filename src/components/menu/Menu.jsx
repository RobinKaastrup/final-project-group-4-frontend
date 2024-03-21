import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../App";
import Logo from "../logo/Logo";

function Menu() {
  const context = useContext(DataContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any user data or tokens from local storage
    localStorage.removeItem("token");
    // Redirect to the login page
    navigate("/login");
  };

  return (
    <nav className="menu-container">
      <ul className="menu-list">
        <li onClick={() => navigate(`/profile/${context.loggedInUser.id}`)}>Profile</li>
        <li onClick={() => navigate(`/contacts/${context.loggedInUser.id}`)}>Contacts</li>
        <li onClick={() => navigate(`/chats/${context.loggedInUser.id}`)}>
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
