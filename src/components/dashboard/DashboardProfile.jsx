import { useParams } from "react-router-dom"

function DashboardProfile() {
  const userId = useParams()

  return (
    <div className="profile-dashboard">
      <div className="profile-view">
        

      </div>
    </div>
  )
}

export default DashboardProfile