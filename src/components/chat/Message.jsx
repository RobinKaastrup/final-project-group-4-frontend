import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { DataContext } from "../../App"; // Assuming DataContext is exported from App.jsx

function Message({ message }) {
  const { baseURL } = useContext(DataContext);
  const [username, setUsername] = useState("");
  const [userImage, setUserimage] = useState("")

  console.log("Message component:", message);

  useEffect(() => {
    console.log("before")
    console.log(message)
    if (message.user.id) {
      fetchUsername(message.user.id);
    }
  }, [message.userId]);

  const fetchUsername = async (userId) => {
    try {
      const authToken = localStorage.getItem("token");
      const response = await axios.get(`${baseURL}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      console.log("Username response:", response.data);
      setUsername(response.data.username);
      setUserimage(response.data.profileimage)
    } catch (error) {
      console.error("Error fetching username:", error);
    }
  };

  return (
    <div className="message">
      <img
        className="message-pic"
        src={`${userImage}`}
        alt="User avatar"
      />
      <span className="message-name">
        <b>{username}</b>
      </span>
      <p className="message-body">{message.content}</p>
    </div>
  );
}

export default Message;
