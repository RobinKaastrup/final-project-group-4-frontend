import React from "react";
import { useNavigate } from "react-router-dom";

function Menu() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any user data or tokens from local storage
    localStorage.removeItem("token");
    // Redirect to the login page
    navigate("/login");
  };

  return (
    <nav className="menu-container">
      <img />
      <ul className="menu-list">
        <li onClick={() => navigate("/profile/1")}>Profile</li>
        <li onClick={() => navigate("/contacts/1")}>Contacts</li>
        <li onClick={() => navigate("/chats/1")}>Chat</li>
      </ul>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}

export default Menu;
