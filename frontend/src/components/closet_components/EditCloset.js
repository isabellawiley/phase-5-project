import { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "semantic-ui-react";
import { Button, Form } from "react-bootstrap";

function EditCloset({closet}){
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    

    function handleSubmit(e){
        e.preventDefault();

        fetch(`http://localhost:3000/closets/${closet.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title:  e.target[0].value
            })
        })
        .then(res => res.json())
        .then(() => {
            setOpen(false);
        })
    }
    return(
        <div>
            <Modal onClose={() => setOpen(false)} onOpen={() => setOpen(true)}
            open={open} trigger={<Button variant="outline-dark">Edit Closet</Button>} >
                <h1>Edit Closet</h1>
                <Modal.Content>
                    <Modal.Description>
                        <h1>{closet.title}</h1>
                        <Form onSubmit={handleSubmit}>
                            <Form.Label>Closet Name</Form.Label>
                            <Form.Control type="text" defaultValue={closet.title} />
                            <Button variant="dark" type="submit">Save Changes</Button>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        </div>
    )
}

export default EditCloset;