import React from "react";
import { useNavigate } from "react-router-dom";

function ChatWelcome() {
  const navigate = useNavigate();

  const handleStartChat = () => {
    // Redirect to the chat page
    navigate("/chats");
  };

  return (
    <div className="welcome-container">
      <h1>Welcome to the Chat App!</h1>
      <p>Start chatting with your friends now.</p>
      <button onClick={handleStartChat}>Start Chat</button>
    </div>
  );
}

export default ChatWelcome;
