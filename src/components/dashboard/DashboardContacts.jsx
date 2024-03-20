import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from 'axios'
import ContactElement from "../contactElement/ContactElement"

function DashboardContacts() {
  const userId = useParams()
  const [contacts, setContacts] = useState([])
  
  const getContacts = () => {

  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    axios
      .get(`http://localhost:4000/relations/all`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        console.log(response.data)
        const contactsList = response.data.map(relation => relation.friend)
        setContacts(contactsList)
        console.log("contacts loaded")
      })
      .catch(error => console.error(`Error: could not fetch contacts: `, error))
  }, [])

  const newContact = (event) => {
    event.preventDefault();
  }

  return (
    <div className="contacts-dashboard">
      <div className="contacts-view">

        <form className="new-contact-form">
          <input className="new-contact-inp" type="text" placeholder="username" />
          <button className="new-contact-submit" type="submit" onClick={(e) => newContact(e)}>
            Add to Contacts
          </button>

        </form>

        <ul className="contacts-list">
          {console.log((contacts !== undefined ? contacts : "none"))}
          {contacts !== undefined && contacts.map((contact, index) => (
            <ContactElement key={index} {...contact}/>  
          ))}
          
        </ul>

      </div>
    </div>
  )
}

export default DashboardContacts