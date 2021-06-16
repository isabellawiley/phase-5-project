import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

function Login(){
    const history = useHistory();
    const dispatch = useDispatch();
    const errorMessage = useSelector((state) => state.userReducer.errorMessage)

    function handleLogin(e){
        e.preventDefault();

        fetch(`http://localhost:3000/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: e.target[0].value,
                password: e.target[1].value
            })
        })
        .then(res => res.json())
        .then((data) => {
            if(data.message){
                dispatch({type: "setErrorMessage", payload: data.message})
            }
            else{
                dispatch({type: "setCurrentUser", payload: data});
                dispatch({type: "setUserGarments", payload: data.garments});
                dispatch({type: "setUserClosets", payload: data.closets});
                localStorage.setItem("loggedUser", JSON.stringify(data))
                history.push("/")
            }
            
        })
    }

    return(
        <div>
            <h1>Login</h1>
            <h2>Don't have an account? <Link to="/signup">Sign Up!</Link></h2>
            <form onSubmit={handleLogin}>
                <label>Email</label>
                <input name="email" type="text"></input>
                <label>Password</label>
                <input name="password" type="password"></input>
                <input type="submit"/>
            </form>
            <h3>{errorMessage}</h3>
        </div>
    )
}

export default Login;