import { useSelector } from "react-redux";
import NavBar from "./NavBar";


function Header({logout}){
    const isLoggedIn = useSelector((state) => state.userReducer.isLoggedIn)

    return(
        <div>
            <header>
                <h1>MngMe</h1>
            </header>
            {isLoggedIn ? <NavBar logout={logout} /> : <div></div>}
        </div>
    )
}

export default Header;