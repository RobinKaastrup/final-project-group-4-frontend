import ChatList from '../chatList/ChatList'
import Chat from '../chat/Chat'
import Menu from '../menu/Menu'
import { Outlet } from 'react-router-dom'

function Dashboard() {
  return (
    <div className='home-view'>
        <Menu />
        
        <Outlet />
        <ChatList />
        <main className="content-container">
          <Chat />
        </main>

      </div>
  )
}

export default Dashboard