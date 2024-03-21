import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ChatHeading from "./ChatHeading";
import ChatInput from "./ChatInput";
import Message from "./Message";

function Chat({ loggedInUser }) {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, [id]);

  const fetchMessages = () => {
    setLoading(true);
    const authToken = localStorage.getItem("token");

    axios
      .get(`http://localhost:4000/chats/${id}/messages`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        const messagesContent = response.data.data.map(
          (message) => message.content
        );

        const messageObjects = response.data.data || [];

        console.log("messageObjects", messageObjects);

        setMessages(messagesContent);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
        setLoading(false);
      });
  };

  console.log("messages", messages);

  const handleMessageSent = () => {
    fetchMessages();
  };

  if (loading) {
    return <div>Loading messages...</div>;
  }

  return (
    <div className="chat">
      <ChatHeading id={id} />
      <div className="messages-container">
        {messages.map((message, index) => (
          <Message key={index} message={message} loggedInUser={loggedInUser} />
        ))}
      </div>
      <ChatInput onMessageSent={handleMessageSent} />
    </div>
  );
}

export default Chat;
