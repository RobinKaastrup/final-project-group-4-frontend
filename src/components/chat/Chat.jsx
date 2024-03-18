import { useState } from 'react'
import ChatHeading from './ChatHeading'
import ChatInput from './ChatInput'
import Message from './Message'


function Chat() {
  const [chatDetails, setChatDetails] = useState([])

  return (
    <div className="chat-container">
          
    <ChatHeading />

    <div className="messages-container">
      <Message />
    </div>

    <ChatInput />

  </div>
  )
}

export default Chat