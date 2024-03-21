import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { DataContext } from "../../App";

function Message({ message, onMessageEdited, onMessageDeleted }) {
  const { baseURL, loggedInUser } = useContext(DataContext);
  const [username, setUsername] = useState("");
  const [userImage, setUserImage] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editedMessage, setEditedMessage] = useState("");

  useEffect(() => {
    fetchUserData(message.user.id);
    setEditedMessage(message.content);
  }, [message.user.id, message]);

  const fetchUserData = async (userId) => {
    try {
      const authToken = localStorage.getItem("token");
      const response = await axios.get(`${baseURL}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setUsername(response.data.username);
      setUserImage(response.data.profileimage);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleEdit = async () => {
    try {
      const authToken = localStorage.getItem("token");
      const response = await axios.put(
        `${baseURL}/chats/${message.chat.id}/users/${loggedInUser.id}/messages/${message.id}`,
        {
          content: editedMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log("Message edited successfully:", response.data);
      setEditMode(false);

      // Notify parent component that message is edited
      onMessageEdited(response.data);
    } catch (error) {
      console.error("Error editing message:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const authToken = localStorage.getItem("token");
      const response = await axios.delete(
        `${baseURL}/chats/${message.chat.id}/users/${loggedInUser.id}/messages/${message.id}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log("Message deleted successfully:", response.data);

      // Notify parent component that message is deleted
      onMessageDeleted(message.id);
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  return (
    <div className="message">
      <img className="message-pic" src={userImage} alt="User avatar" />
      <span className="message-name">
        <b>{username}</b>
      </span>
      {editMode ? (
        <textarea
          className="message-body-edit"
          value={editedMessage}
          onChange={(e) => setEditedMessage(e.target.value)}
        />
      ) : (
        <p className="message-body">{message.content}</p>
      )}
      {loggedInUser.id === message.user.id && (
        <div>
          {editMode ? (
            <button onClick={handleEdit}>Save</button>
          ) : (
            <button onClick={() => setEditMode(true)}>Edit</button>
          )}
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
}

export default Message;
