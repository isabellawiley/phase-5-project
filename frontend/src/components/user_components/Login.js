import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

function Login({currentWeather}){
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
        .then((user) => {
            if(user.message){
                dispatch({type: "setErrorMessage", payload: user.message})
            }
            else{
                currentWeather(user.lat, user.lon, user.garments)
                dispatch({type: "setCurrentUser", payload: user});
                dispatch({type: "setUserGarments", payload: user.garments});
                dispatch({type: "setUserClosets", payload: user.closets});
                dispatch({type: "defaultCloset", payload: user.default_closet})
                dispatch({type: "setUserLaundry", payload: user.laundry})
                dispatch({type: "setLaundryWeight", payload: user.laundry_weight})
                dispatch({type: "favoriteGarments", payload: user.fav_garments});   
                localStorage.setItem("loggedUser", JSON.stringify(user))
                history.push("/")
            }
            
        })
    }

    return(
        <div>
            <h1>Login</h1>
            <h2>Don't have an account? <Link to="/signup">Sign Up!</Link></h2>
            <Form onSubmit={handleLogin}>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" />
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" />
                <Button variant="dark" type="submit">Submit</Button>
            </Form>
            <h3>{errorMessage}</h3>
        </div>
    )
}

export default Login;