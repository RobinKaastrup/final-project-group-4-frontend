import Chat from '../chat/Chat'
import Menu from '../menu/Menu'
import SubMenu from '../submenu/SubMenu'

function Home() {
  return (
    <div className='home-view'>
        <Menu />
        <SubMenu />

        <main className="content-container">
          <Chat />
        </main>

      </div>
  )
}

export default Home