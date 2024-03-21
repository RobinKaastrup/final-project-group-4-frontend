import { useNavigate } from "react-router-dom";
import { DataContext } from "../../App";
import { useContext, useState } from "react";
import axios from "axios";

function EditProfile(){
    const context = useContext(DataContext)
    const navigate = useNavigate();

    const [userEdited, setUserEdited] = useState({
        username: context.loggedInUser.username,
        email: context.loggedInUser.email
    })

    function handleSubmit(event) {
        event.preventDefault();
        const authToken = localStorage.getItem("token");
        console.log(authToken)
        console.log(userEdited)
        axios.put(`${context.baseURL}/users/${context.loggedInUser.id}`, userEdited, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }).then(() => {
            context.loggedInUser.username = userEdited.username;
            context.loggedInUser.email = userEdited.email;
            console.log(context.loggedInUser)
            navigate(`/profile/${context.loggedInUser.id}`);
          });
        }

        function handleInputChange(e) {
            const { name, value } = e.target;
            setUserEdited(prevUser => ({
              ...prevUser,
              [name]: value,
            }));
          }

    return (
        <div className="profile-container">
            <div className="header"></div>
            <img src={context.loggedInUser.profileimage} alt="Profile Picture" className="profile-picture"/>
            <div>
                <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username: </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        onChange={handleInputChange}
                        value={userEdited.username} 
                    />
                    </div>
                    <div>
                    <label htmlFor="email">Email: </label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        onChange={handleInputChange}
                        value={userEdited.email} 
                    />
                    </div>
                    <button type="submit">Save Changes</button>
                </form>
            </div>
        </div>
    )
}
export default EditProfile