import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./contactElement.css";

function ContactElement(props) {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const viewProfile = () => {
    navigate(`/profile/${props.contact.id}`);
  };

  const newChat = () => {
    const userIds = [props.contact.id, userId];

    axios
      .post(
        "http://localhost:4000/chats",
        {
          content: "Second chat",
          userIds: userIds,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("New chat created successfully:", response.data);
        axios
          .get("http://localhost:4000/chats", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            const chats = response.data.data;
            console.log("Chats: ", chats);
            if (chats.length > 0) {
              const latestChatId = chats[chats.length - 1].id;
              navigate(`/chats/${latestChatId}`);
            } else {
              console.error("No chats found.");
            }
          })
          .catch((error) => {
            console.error("Error fetching chats: ", error);
          });
      })
      .catch((error) => {
        console.error("Error creating new chat: ", error);
      });
  };

  const deleteContact = () => {
    props.deleteContact(props.contact.id);
  };

  return (
    <li className="contact-element">
      <img
        className="contact-image"
        src={props.contact.profileimage}
        alt="Contact avatar"
      />
      <div>
        <span>
          <b>{props.contact.username}</b>
        </span>{" "}
        <br />
        <span>Email: {props.contact.email}</span>
      </div>
      <ul className="contact-interaction">
        <li onClick={() => viewProfile()}>View Profile</li>
        <li onClick={() => newChat()}>New Chat</li>
        <li className="delete" onClick={() => deleteContact()}>
          Delete
        </li>
      </ul>
    </li>
  );
}

export default ContactElement;
