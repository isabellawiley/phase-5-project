import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

function NewClosetForm(){
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUser = useSelector((state) => state.userReducer.currentUser)
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);

    const uploadImage = async e => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'mngmeimages');
        setLoading(true);
        
        const res = await fetch("https://api.cloudinary.com/v1_1/ddr8azah3/image/upload", {
            method: "POST",
            body: data
        })

        const file = await res.json();
        console.log(file);

        setImage(file.secure_url);
        console.log(file.secure_url);
        setLoading(false);
    }

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
                image: image
            })
        })
        .then(res => res.json())
        .then((data) => {
            setImage("");
            dispatch({type: "newCloset", payload: data})
            history.push("/closets")
        })
    }
    return(
        <div className="center">
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Closet Name</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>
                <Form.Group>
                        <label>Image Upload</label>
                        <input type="file" name="image" onChange={uploadImage}/>
                        {loading ? 
                        <h3>Loading...</h3> :
                        <img src={image} alt="closetImage" style={{width:150}} />}
                </Form.Group>
                <Button variant="dark" type="submit">Submit</Button>
            </Form>
        </div>
    )
}

export default NewClosetForm;