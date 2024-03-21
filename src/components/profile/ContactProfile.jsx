import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./profile.css";

function ContactProfile() {
  const context = useContext(DataContext);
  const userId = useParams();
  const navigate = useNavigate();
  const [profileUser, setProfileUser] = useState(null);

  useEffect(() => {
    fetchProfileUser(userId);
  }, [userId]);

  const fetchProfileUser = (userId) => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:4000/users/${userId.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProfileUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching profile user: ", error);
      });
  };

  const isEditable = () => {
    return profileUser && context.loggedInUser.id === profileUser.id;
  };

  const handleEditProfile = () => {
    if (isEditable()) {
      navigate(`/profile/edit/${profileUser.id}`);
    }
  };

  return (
    <div className="profile-container">
      <div className="header"></div>
      <div className="profile-info">
        <img
          src="https://cdn.domestika.org/c_fill,dpr_auto,f_auto,h_256,pg_1,t_base_params,w_256/v1575591291/avatars/000/161/315/161315-original.jpg?1575591291"
          alt="Profile Picture"
          className="profile-picture"
        />
        <h1 className="username">{profileUser && profileUser.username}</h1>
        <p className="email">{profileUser && profileUser.email}</p>
        {isEditable() && (
          <button className="edit-button" onClick={handleEditProfile}>
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}

export default ContactProfile;
