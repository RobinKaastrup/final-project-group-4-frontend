import React from "react";

function ChatHeading({ title, onDelete, fetchMessages }) {
  return (
    <div className="chat-heading">
      <h2>{title}</h2>
      <button onClick={onDelete} className="delete-button">
        Delete Chat
      </button>
      <button onClick={fetchMessages} className="refresh-button">Refresh chat</button>
    </div>
  );
}

export default ChatHeading;
