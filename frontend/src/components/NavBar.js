import { Link } from "react-router-dom";

function NavBar({logout}){

    return(
        <div>
            <button onClick={logout}>Logout</button>
            <button><Link to="/profile">Profile</Link></button>
            <button><Link to="/">Home</Link></button>
            <button><Link to="/garments">All Garments</Link></button>
            <button><Link to="/closets">All Closets</Link></button>
            <button><Link to="/laundry">Laundry Basket</Link></button>
            <button><Link to="/suggested">suggested garms</Link></button>
        </div>
    )
}

export default NavBar;