import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import ChatHeading from "./ChatHeading";
import ChatInput from "./ChatInput";
import Message from "./Message";

function Chat({ loggedInUser, navigate }) {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (id) {
      // Check if ID is valid
      fetchMessages();
    } else {
      setLoading(false); // Set loading to false to stop loading indicator
    }
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
        const fetchedMessages = response.data.data;

        fetchedMessages.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );

        setMessages(fetchedMessages);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
        setLoading(false);
      });
  };

  const handleMessageSent = () => {
    fetchMessages();
  };

  const deleteChat = () => {
    const authToken = localStorage.getItem("token");

    axios
      .delete(`http://localhost:4000/chats/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        console.log("Chat deleted successfully:", response.data);
        navigate("/chats");
      })
      .catch((error) => {
        console.error("Error deleting chat:", error);
      });
  };

  const handleEditMessage = (editedMessage) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === editedMessage.id ? editedMessage : msg
      )
    );
  };

  const handleDeleteMessage = (deletedMessageId) => {
    setMessages((prevMessages) =>
      prevMessages.filter((msg) => msg.id !== deletedMessageId)
    );
  };

  if (loading) {
    return <div>Loading messages...</div>;
  }

  return (
    <div className="chat">

      {id ? ( // Check if ID is valid
        <>
      <ChatHeading id={id} 
        onDelete={deleteChat}
        fetchMessages={fetchMessages}
        />
      <div className="messages-container">
        {messages.map((message) => (
          <Message
            key={message.id}
            message={message}
            loggedInUser={loggedInUser}
            onMessageEdited={handleEditMessage}
            onMessageDeleted={handleDeleteMessage}

          />
          <div className="messages-container">
            {messages.map((message) => (
              <Message
                key={message.id}
                message={message}
                loggedInUser={loggedInUser}
                onMessageEdited={handleEditMessage}
                onMessageDeleted={handleDeleteMessage}
              />
            ))}
          </div>
          <ChatInput onMessageSent={handleMessageSent} />
        </>
      ) : (
        <div
          className="start-new-chat-message"
          style={{
            padding: "10px",
            backgroundColor: "#253659",
            borderRadius: "5px",
            textAlign: "center",
          }}
        >
          Start a new chat with one of your{" "}
          <Link to={`/contacts/${userId}`}>contacts.</Link>
        </div>
      )}
    </div>
  );
}

export default Chat;
