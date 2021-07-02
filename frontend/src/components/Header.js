import { useSelector } from "react-redux";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";

function Header({logout}){
    const isLoggedIn = useSelector((state) => state.userReducer.isLoggedIn)

    return(
        <div>
            <header>
                <img className="logo" src="/MngMeLogo.png" alt="MngMe Logo" />
            </header>
            {isLoggedIn ? <NavBar logout={logout} /> : <div></div>}
        </div>
    )
}

export default Header;