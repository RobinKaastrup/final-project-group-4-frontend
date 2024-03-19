import ChatList from "../chatList/ChatList"
import Chat from "../chat/Chat"

function DashboardChat() {
  return (
    <main className="chat-dashboard">
      <ChatList />
      <div>
        <Chat />
      </div>
    
    </main>
  )
}

export default DashboardChat