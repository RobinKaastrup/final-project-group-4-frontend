import { useParams } from "react-router-dom"
import ContactElement from "../contactElement/ContactElement"

function DashboardContacts() {
  const userId = useParams()
  const contacts = []


  return (
    <div className="contacts-dashboard">
      <div className="contacts-view">
        <ul className="contacts-list">
          <ContactElement />
        </ul>

      </div>
    </div>
  )
}

export default DashboardContacts