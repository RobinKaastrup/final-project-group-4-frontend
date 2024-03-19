import { useNavigate } from "react-router-dom"

function ChatListElement(props) {
  const navigate = useNavigate()

  let content = []
  if (props.chat !== undefined) {
    <li onClick={() => navigate(`/chat/${props.chat.id}`)}className="chat-list-element">
      {props.chat.title}
    </li>
  } else {
    content = <li>Failed to load</li>
  }

  return (
    <>
      {content}
    </>
  )

}

export default ChatListElement