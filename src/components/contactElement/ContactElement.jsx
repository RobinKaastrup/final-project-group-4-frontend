import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './contactElement.css'


function ContactElement(props) {
  const navigate = useNavigate()

  const viewProfile = () => {
    navigate(`/profile/${props.id}`)
  }

  const newChat = () => {

  }

  const deleteContact = () => {
    axios
      .delete()
  }

  return (
    <li className="contact-element">
      <img className="contact-image" src="https://cdn.domestika.org/c_fill,dpr_auto,f_auto,h_256,pg_1,t_base_params,w_256/v1575591291/avatars/000/161/315/161315-original.jpg?1575591291"/>
      <div>
        <span><b>{props.username}</b></span> <br />
        <span>Email: {props.email}</span>

      </div>
      <ul className="contact-interaction">
        <li onClick={() => viewProfile()}>View Profile</li>
        <li>New Chat</li>
        <li className='delete'>Delete</li>
      </ul>
      
    </li>
  )
}

export default ContactElement 