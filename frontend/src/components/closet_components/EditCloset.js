import { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "semantic-ui-react";
import { Button, Form, Row, Col } from "react-bootstrap";

function EditCloset({closet}){
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState(closet.image);
    const [valid, setValid] = useState(false);
    console.log(image)

    const uploadImage = async e => {
        setValid(true);
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'mngmeimages');
        
        const res = await fetch("https://api.cloudinary.com/v1_1/ddr8azah3/image/upload", {
            method: "POST",
            body: data
        })

        const file = await res.json();
        console.log(file);

        setImage(file.secure_url);
        console.log(file.secure_url);
    }

    function handleSubmit(e){
        e.preventDefault();

        fetch(`http://localhost:3000/closets/${closet.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title:  e.target[0].value, 
                image: image
            })
        })
        .then(res => res.json())
        .then(() => {
            setImage("");
            setOpen(false);
            window.location.reload();
        })
    }
    return(
        <div>
            <Modal style={{justifyContent: 'center', marginLeft: '25%', height: '60%', marginTop: '10%', width: '50%'}} onClose={() => setOpen(false)} onOpen={() => setOpen(true)}
            open={open} trigger={<Button className="button" variant="outline-dark">Edit Closet</Button>} >
                <Modal.Header>Edit Closet</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <h1>{closet.title}</h1>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Row>
                                    <Col>
                                        <Form.Label>Closet Name</Form.Label>
                                        <Form.Control type="text" defaultValue={closet.title} />
                                    </Col>
                                    <Col>
                                        <Form.Label>Closet Image</Form.Label>
                                        <Form.File id="custom-file" type="file" name="image" custom>
                                            <Form.File.Input isValid={valid} onChange={uploadImage}/>
                                            <Form.File.Label>Image Upload</Form.File.Label>
                                            <Form.Control.Feedback type='valid'><img className="uploadedImg" alt={image} src={image}/></Form.Control.Feedback>
                                        </Form.File>
                                    </Col>
                                </Row>
                                <Row>
                                    <Button variant="dark" type="submit" style={{marginTop: "2%", marginLeft: "2%"}} >Save Changes</Button>
                                </Row>
                            </Form.Group>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        </div>
    )
}

export default EditCloset;