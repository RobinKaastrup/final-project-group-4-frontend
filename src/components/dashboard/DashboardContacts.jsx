import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import ContactElement from "../contactElement/ContactElement"

function DashboardContacts() {
  const userId = useParams()
  const contacts = useState([])
  
  const getContacts = () => {
    
  }

  useEffect(() => {

  }, [])

  return (
    <div className="contacts-dashboard">
      <div className="contacts-view">
        <ul className="contacts-list">
          <ContactElement />
          <ContactElement />

        </ul>

      </div>
    </div>
  )
}

export default DashboardContacts