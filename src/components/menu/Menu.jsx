import { useNavigate } from "react-router-dom"

function Menu() {
  const navigate = useNavigate()

  return (
    <nav className="menu-container">
      <img />
      <ul className="menu-list">
        <li onClick={() => navigate('/profile/1')}>Profile</li>
        <li onClick={() => navigate('/contacts/1')}>Contacts</li>
        <li onClick={() => navigate('/chat')}>Chat</li>
      </ul>        
    </nav>
  )
}

export default Menu