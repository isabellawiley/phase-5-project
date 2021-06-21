import { useSelector } from "react-redux";
import NavBar from "./NavBar";


function Header({logout}){
    const isLoggedIn = useSelector((state) => state.userReducer.isLoggedIn)

    return(
        <div>
            {isLoggedIn ? <NavBar logout={logout} /> : <div></div>}
        </div>
    )
}

export default Header;