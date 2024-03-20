import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../App";

function Menu() {
  const context = useContext(DataContext)
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
        <li onClick={() => navigate(`/profile/${context.loggedInUser.id}`)}>Profile</li>
        <li onClick={() => navigate("/contacts/1")}>Contacts</li>
        <li onClick={() => navigate("/chat")}>Chat</li>
      </ul>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}

export default Menu;
