import './contactElement.css'

function ContactElement(props) {
  return (
    <li className="contact-element">
      <img className="contact-image" src="https://cdn.domestika.org/c_fill,dpr_auto,f_auto,h_256,pg_1,t_base_params,w_256/v1575591291/avatars/000/161/315/161315-original.jpg?1575591291"/>
      <span><b>Username</b></span>
      <ul className="contact-interaction">
        <li>View Profile</li>
        <li>New Chat</li>
        <li className='delete'>Delete</li>
      </ul>
      
    </li>
  )
}

export default ContactElement 