import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

function NavBar(){
    const history = useHistory();
    const dispatch = useDispatch();
    
    function logout(){
        localStorage.clear();
        history.push("/login");
        dispatch({type: "setCurrentUser", payload: {}});
        dispatch({type: "setUserGarments", payload: []});
        dispatch({type: "setUserClosets", payload: []});
    }
    return(
        <div>
            <button onClick={logout}>Logout</button>
            <button><Link to="/">Home</Link></button>
        </div>
    )
}

export default NavBar;