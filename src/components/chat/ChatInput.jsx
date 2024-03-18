function ChatInput() {
  return (
    <div className="user-input-container">
    <textarea className="chat-inp" maxLength={5000} placeholder="message [chatname]"/>
    <button type="submit">Send</button>
  </div>
  )
}

export default ChatInput