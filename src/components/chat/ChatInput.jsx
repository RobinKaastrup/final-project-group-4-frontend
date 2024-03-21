import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ChatInput({ onMessageSent }) {
  const { id: chatId } = useParams();
  const [newMessage, setNewMessage] = useState("");
  const userId = localStorage.getItem("userId");

  const sendMessage = () => {
    const authToken = localStorage.getItem("token");
    const messageData = {
      content: newMessage,
    };

    axios
      .post(
        `http://localhost:4000/chats/${chatId}/users/${userId}`,
        messageData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((response) => {
        console.log("Message sent:", response.data);
        setNewMessage("");
        onMessageSent();
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };

  return (
    <div className="user-input-container">
      <textarea
        className="chat-inp"
        maxLength={5000}
        placeholder="Type your message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button type="submit" onClick={sendMessage}>
        Send
      </button>
    </div>
  );
}

export default ChatInput;
