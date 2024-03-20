import { useEffect, useState } from "react";
import axios from "axios";

function ChatList({ userId }) {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (userId) {
      // Fetch chats for the logged-in user using the userId
      axios
        .get(`http://localhost:4000/chats/${userId}`)
        .then((response) => {
          setChats(response.data);
        })
        .catch((error) => {
          console.error("Error fetching chats:", error);
        });
    }
  }, [userId]);

  return (
    <div className="chat-list-container">
      <ul>
        {chats.map((chat) => (
          <li key={chat.id}>Chat #{chat.id}</li>
        ))}
      </ul>
    </div>
  );
}

export default ChatList;
