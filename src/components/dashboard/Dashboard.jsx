import ChatList from '../chatList/ChatList'
import Chat from '../chat/Chat'
import Menu from '../menu/Menu'
import { Outlet } from 'react-router-dom'

function Dashboard() {
  return (
    <div className='dashboard-view'>
        <Menu />
        
        <Outlet />


    </div>
  )
}

export default Dashboard