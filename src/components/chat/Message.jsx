import React, { useState, useEffect } from "react";
import axios from "axios";

function Message({ message }) {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/chats/${message.chat.id}/users/${message.user.id}`
        );
        setUsername(response.data.username);
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    if (message && message.user) {
      fetchUsername();
    }
  }, [message]);

  return (
    <div className="message">
      <img
        className="message-pic"
        src="https://cdn.domestika.org/c_fill,dpr_auto,f_auto,h_256,pg_1,t_base_params,w_256/v1575591291/avatars/000/161/315/161315-original.jpg?1575591291"
        alt="User avatar"
      />
      <span className="message-name">
        <b>{username || "User"}</b>
      </span>
      <p className="message-body">{message}</p>
    </div>
  );
}

export default Message;
