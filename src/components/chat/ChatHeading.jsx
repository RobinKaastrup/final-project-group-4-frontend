import { useState } from "react"

function ChatHeading(props) {
  const { id } = props

  const [currentChat, setCurrenChat] = useState('')

  useEffect(() => {
    const authToken = localStorage.getItem("token");
    
    if ()

    }
  );

  function editChat() {

  }

  return (
    <div className="chat-heading">
      {id}
    </div>
  )
}

export default ChatHeading