import React from "react";

function ChatHeading({ title, onDelete }) {
  return (
    <div className="chat-heading">
      <h2>{title}</h2>
      <button onClick={onDelete} className="delete-button">
        Delete Chat
      </button>
    </div>
  );
}

export default ChatHeading;
