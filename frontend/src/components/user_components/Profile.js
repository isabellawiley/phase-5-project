import { useSelector } from "react-redux";
import DeleteProfile from "./DeleteProfile";

function Profile({logout}){
    const currentUser = useSelector((state) => state.userReducer.currentUser);
    const defaultCloset = useSelector((state) => state.closetReducer.defaultCloset)


    return(
       <div>
           <h1>Profile</h1>
           <h2>Name: {currentUser.name}</h2>
           <h2>Birthdate: {currentUser.birthdate}</h2>
           <h2>Email: {currentUser.email}</h2>
           <h2>Default Closet: {defaultCloset.title}</h2>
           <h2>Total Closets: {currentUser.total_closets}</h2>
           <h2>Total Garments: {currentUser.total_garments}</h2>
           <DeleteProfile currentUser={currentUser} logout={logout}/>
       </div> 
    )
}

export default Profile;