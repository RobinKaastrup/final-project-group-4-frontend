import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import './profile.css';
import axios from "axios";

function DashboardProfile() {
  const context = useContext(DataContext)
  const userId = useParams()
  const navigate = useNavigate();
  const [currentProfile, setCurrentProfile] = useState({
    username: '',
    email: ''
  });
  const [canEdit, setCanEdit] = useState(false)

  useEffect(() => {
    if (userId.id == context.loggedInUser.id) {
      setCanEdit(true);
      setCurrentProfile({
        username: context.loggedInUser.username,
        email: context.loggedInUser.email
      });
    } else {
      const authToken = localStorage.getItem("token");
      axios.get(`${context.baseURL}/users/${userId.id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`
      }
    })
      .then(response => {
        console.log(response)
        const { username, email } = response.data;
        setCurrentProfile({
          username,
          email
        });
      })
      .catch(error => console.error('Error fetching user data:', error));
    setCanEdit(false);
    }
  }, [userId, context]);



  return (
    <div className="profile-container">
      <div className="header"></div>
      <div className="profile-info">
        <h1 className="username">{currentProfile.username}</h1>
        <p className="email">{currentProfile.email}</p>
        {canEdit && (
          <button className="edit-button" onClick={() => navigate(`/profile/edit/${context.loggedInUser.id}`)}>Edit Profile</button>
        )}
      </div>
    </div>
  );
}
//<img src={profilePictureUrl} alt="Profile Picture" className="profile-picture"/>

export default DashboardProfile