import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

function SignUp(){
    const history = useHistory();
    const dispatch = useDispatch();
    const errorMessage = useSelector((state) => state.userReducer.errorMessage)

    function handleSubmit(e){
        e.preventDefault();

        fetch(`http://localhost:3000/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: e.target[0].value,
                birthdate: e.target[1].value,
                email: e.target[2].value,
                password: e.target[3].value
            })
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data)
            dispatch({type: "setCurrentUser", payload: data});
            localStorage.setItem("loggedUser", JSON.stringify(data));
            history.push("/");

            // if(data.message){
            //     dispatch({type: "setErrorMessage", payload: data.message})
            // }
            // else{
            //     dispatch({type: "setCurrentUser", payload: data});
            //     localStorage.setItem("loggedUser", JSON.stringify(data));
            //     history.push("/");
            // }
        })
    }

    return(
        <div>
            <h1>Sign Up</h1>
            <h2>Already have an account? <Link to="login">Login!</Link></h2>
            <Form onSubmit={handleSubmit}>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" />
                <Form.Label>Birthdate</Form.Label>
                <Form.Control type="date" />
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" />
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" />
                <Button variant="dark" type="submit">Submit</Button>
            </Form>
            {/* <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input name="name" type="text"></input>
                <label>Birthdate</label>
                <input name="birthdate" type="date"></input>
                <label>Email</label>
                <input name="email" type="text"></input>
                <label>Password</label>
                <input name="password" type="password"></input>
                <input type="submit"/>
            </form> */}
            <h3>{errorMessage}</h3>
        </div>
    )
}

export default SignUp;