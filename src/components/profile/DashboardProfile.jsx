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
    email: '',
    profileimage: ''
  });
  const [canEdit, setCanEdit] = useState(false)

  useEffect(() => {
    if (userId.id == context.loggedInUser.id) {
      setCanEdit(true);
      setCurrentProfile({
        username: context.loggedInUser.username,
        email: context.loggedInUser.email,
        profileimage: context.loggedInUser.profileimage
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
        const { username, email, profileimage } = response.data;
        setCurrentProfile({
          username,
          email,
          profileimage
        });
      })
      .catch(error => console.error('Error fetching user data:', error));
    setCanEdit(false);
    }
  }, [userId, context]);



  return (
    <div className="profile-container">
      <div className="header">
      <img src={currentProfile.profileimage} alt="Profile Picture" className="profile-picture"/>
      </div>
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

export default DashboardProfile