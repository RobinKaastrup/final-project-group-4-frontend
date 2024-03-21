import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from 'axios'
import ContactElement from "../contactElement/ContactElement"

function DashboardContacts() {
  const userId = useParams()
  const [contacts, setContacts] = useState([])
  const [contactInput, setContactInput] = useState("")

  useEffect(() => {
    const token = localStorage.getItem('token')
    axios
      .get(`http://localhost:4000/relations/${userId.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        console.log(response.data)
        const contactsList = response.data.map(relation => relation.friend)
        setContacts(contactsList)
      })
      .catch(error => console.error(`Error: could not fetch contacts: `, error))
  }, [])

  const newContact = (event) => {
    event.preventDefault();
    let user = ""
    const token = localStorage.getItem('token')

    axios
      .get(`http://localhost:4000/users/username/${contactInput}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        user = response.data
        console.log(user.id)
      })
      .catch(error => console.error(`Error: could not get user ${contactInput}`, error))
      .finally(() => {

        axios
        .post(`http://localhost:4000/relations/add/${userId.id}/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => {
          console.log(response)
        })
        .catch(error => console.error(`Error: could not create relation between ${userId.id} and ${user.id}`, error))
        
      })


  }

  return (
    <div className="contacts-dashboard">
      <div className="contacts-view">

        <form className="new-contact-form">
          <input className="new-contact-inp" type="text" placeholder="username" value={contactInput} onChange={(e) => setContactInput(e.target.value)}/>
          <button className="new-contact-submit" type="submit" onClick={(e) => newContact(e)}>
            Add to Contacts
          </button>

        </form>

        <ul className="contacts-list">
          {contacts !== undefined && contacts.map((contact, index) => (
            <ContactElement key={contact.id} {...contact}/>  
          ))}
          
        </ul>

      </div>
    </div>
  )
}

export default DashboardContacts