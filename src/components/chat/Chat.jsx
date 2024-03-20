import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ChatHeading from "./ChatHeading";
import ChatInput from "./ChatInput";
import Message from "./Message";

function Chat() {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

        setMessages(messagesContent);

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading messages...</div>;
  }

  return (
    <div className="chat">
      <ChatHeading title={`Chat #${id}`} />
      <div className="messages-container">
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
      </div>
      <ChatInput />
    </div>
  );
}

export default Chat;
