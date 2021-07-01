import { useState } from "react";
import { Form, Button,  } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

function NewClosetForm(){
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUser = useSelector((state) => state.userReducer.currentUser)
    const [image, setImage] = useState({});

    function handleSubmit(e){
        e.preventDefault();

        fetch(`http://localhost:3000/closets`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: e.target[0].value,
                user_id: currentUser.id, 
                // image: image
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
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Closet Name</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>
                {/* <Form.Group>
                        <label>Image Upload</label>
                        <input type="file" name="image" onChange={(e) => setImage(e.target.files[0])}/>
                </Form.Group> */}
                <Button variant="dark" type="submit">Submit</Button>
            </Form>
            {/* // <form onSubmit={(handleSubmit)}>
            //     <label>Closet Title: </label>
            //     <input id="title" type="text"></input><br/>
            //     <input type="submit"/>
            // </form> */}
        </div>
    )
}

export default NewClosetForm;