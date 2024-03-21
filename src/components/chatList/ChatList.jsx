import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { DataContext } from "../../App";
import { useNavigate } from "react-router-dom";

function ChatList() {
  const { loggedInUser } = useContext(DataContext);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const authToken = localStorage.getItem("token");

    axios
      .get(`http://localhost:4000/users/${loggedInUser.id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        const user = response.data;
        if (!user || !Array.isArray(user.chatIds)) {
          throw new Error(
            `User with ID ${loggedInUser.id} not found or invalid chatIds format.`
          );
        }

        axios
          .get(`http://localhost:4000/chats`, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          })
          .then((chatResponse) => {
            const chatData = chatResponse.data.data;
            const filteredChats = chatData.filter((chat) =>
              user.chatIds.includes(chat.id)
            );
            setChats(filteredChats);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching chats:", error);
            setLoading(false);
          });
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, [loggedInUser]);

  const handleChatClick = (chat) => {
    navigate(`/chats/${chat.id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="chat-list-container">
      <ul>
        {chats.map((chat) => (
          <li key={chat.id}>
            <button onClick={() => handleChatClick(chat)}>
              {chat.content}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatList;
