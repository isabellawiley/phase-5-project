import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

function NavBar(){
    const history = useHistory();
    const dispatch = useDispatch();
    
    function logout(){
        localStorage.clear();
        history.push("/login");
        dispatch({type: "setCurrentUser", payload: {}});
    }
    return(
        <div>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default NavBar;