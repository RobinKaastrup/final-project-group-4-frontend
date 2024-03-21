
import axios from "axios";
import { useEffect, useState } from "react"

function ChatHeading({ id, onDelete, fetchMessages }) {
  const [inEdit, setInEdit] = useState(false)
  const [newTitle, setNewTitle] = useState('');
  const [usernameToAdd, setUsernameToAdd] = useState('');
  const [currentChat, setCurrentChat] = useState({ users: [], content: '' });

  useEffect(() => {
    const authToken = localStorage.getItem("token");
    axios.get(`http://localhost:4000/chats/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((response) => {
      setCurrentChat(response.data.data)
      setNewTitle(response.data.data.content);
    })

    }, [id]
  );

  const toggleEdit = () => {
    if (inEdit) {
      updateChat(newTitle, currentChat.users);
    }
    setInEdit((prev) => !prev);
  };
  
  const removeUserFromChat = (userId) => {
    const updatedUsers = currentChat.users.filter(user => user.id !== userId);
    updateChat(newTitle, updatedUsers);
};

  const editTitle = () => {
    updateChat(newTitle, currentChat.users);
  };

  const addUserToChat = () => {
    const authToken = localStorage.getItem("token");
    axios.get(`http://localhost:4000/users/username/${usernameToAdd}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((response) => {
      const userId = response.data.id;
      if (userId && !currentChat.users.some(user => user.id === userId)) {
        const updatedUsers = [...currentChat.users, {id: userId}];
        updateChat(newTitle, updatedUsers);
      }
    })
    .catch((error) => {
      console.error("Failed to fetch user or update chat:", error);
    });
};

  const updateChat = (newTitle, updatedUsers) => {
    const authToken = localStorage.getItem("token");
    axios.put(`http://localhost:4000/chats/${id}`, {
      content: newTitle,
      users: updatedUsers
    }, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((response) => {
      setCurrentChat(response.data.data);
    })
    .catch((error) => {
      console.error("Failed to update chat:", error);
    });
  };


  return (
    <div className="chat-heading">
      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        disabled={!inEdit}
      />
      <button onClick={toggleEdit}>{inEdit ? "Finish Editing" : "Edit Chat"}</button>
      {inEdit && (
        <div>
          <button onClick={editTitle}>Update Title</button>
          <div>
            <input
              type="text"
              value={usernameToAdd}
              onChange={(e) => setUsernameToAdd(e.target.value)}
              placeholder="Username to add"
            />
            <button onClick={addUserToChat}>Add User</button>
          </div>
          Users in Chat:
          <ul>
            {currentChat.users.map((user, index) => (
              <li key={index}>
                User ID: {user.id}
                <button onClick={() => removeUserFromChat(user.id)} style={{marginLeft: '10px'}}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button onClick={onDelete} className="delete-button">
        Delete Chat
      </button>
      <button onClick={fetchMessages} className="refresh-button">Refresh chat</button>
    </div>
  );
}

export default ChatHeading;
