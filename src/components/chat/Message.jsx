import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { DataContext } from "../../App"; // Assuming DataContext is exported from App.jsx

function Message({ message }) {
  const { baseURL } = useContext(DataContext);
  const [username, setUsername] = useState("");

  console.log("Message component:", message);

  useEffect(() => {
    if (message.userId) {
      fetchUsername(message.userId);
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
    } catch (error) {
      console.error("Error fetching username:", error);
    }
  };

  return (
    <div className="message">
      <img
        className="message-pic"
        src="https://cdn.domestika.org/c_fill,dpr_auto,f_auto,h_256,pg_1,t_base_params,w_256/v1575591291/avatars/000/161/315/161315-original.jpg?1575591291"
        alt="User avatar"
      />
      <span className="message-name">
        <b>{username}</b>
      </span>
      <p className="message-body">{message}</p>
    </div>
  );
}

export default Message;
