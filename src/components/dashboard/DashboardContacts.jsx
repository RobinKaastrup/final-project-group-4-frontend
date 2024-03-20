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

  return (
    <div className="contacts-dashboard">
      <div className="contacts-view">
        <ul className="contacts-list">
          {console.log((contacts !== undefined ? contacts : "none"))}
          {contacts !== undefined && contacts.map((contact, index) => (
            <ContactElement key={index}/>  
          ))}
          
        </ul>

      </div>
    </div>
  )
}

export default DashboardContacts