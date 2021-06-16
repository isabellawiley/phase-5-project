import { useSelector } from "react-redux";
import NavBar from "./NavBar";


function Header(){
    const currentUser = useSelector((state) => state.userReducer.currentUser);

    return(
        <div>
            {currentUser ? <NavBar /> : <div></div>}
        </div>
    )
}

export default Header;