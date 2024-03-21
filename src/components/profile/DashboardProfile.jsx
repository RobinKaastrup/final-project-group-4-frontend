import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../../App";
import { useContext } from "react";
import './profile.css';

function DashboardProfile() {
  const context = useContext(DataContext)
  const userId = useParams()
  const navigate = useNavigate();

  return (
    <div className="profile-container">
      <div className="header"></div>
       <div className="profile-info">
        <h1 className="username">{context.loggedInUser.username}</h1>
        <p className="email">{context.loggedInUser.email}</p>
        <button className="edit-button" onClick={() => navigate(`/profile/edit/${context.loggedInUser.id}`)}>Edit Profile</button>
      </div>
    </div>
  )
}
//<img src={profilePictureUrl} alt="Profile Picture" className="profile-picture"/>

export default DashboardProfile