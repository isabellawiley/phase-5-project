import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

function NewClosetForm(){
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUser = useSelector((state) => state.userReducer.currentUser)

    function handleSubmit(e){
        e.preventDefault();

        fetch(`http://localhost:3000/closets`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: e.target[0].value,
                user_id: currentUser.id
            })
        })
        .then(res => res.json())
        .then((data) => {
            dispatch({type: "newCloset", payload: data})
            history.push("/closets")
        })
    }
    return(
        <div>
            <form onSubmit={(handleSubmit)}>
                <label>Closet Title: </label>
                <input id="title" type="text"></input><br/>
                <input type="submit"/>
            </form>
        </div>
    )
}

export default NewClosetForm;