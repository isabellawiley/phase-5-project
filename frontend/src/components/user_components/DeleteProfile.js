import { useState } from "react";
import { Modal } from "semantic-ui-react";
import {Button, Form} from 'react-bootstrap'

function DeleteProfile({logout, currentUser}){
    const [open, setOpen] = useState(false);
    console.log(currentUser)
    console.log(currentUser.id)

    function handleDelete(e){
        e.preventDefault();

        fetch(`http://localhost:3000/users/${currentUser.id}`, {
            method: "DELETE",
        })
        .then(res => res.json())
        .then((d) => {
            console.log(d)
            logout();
        })
    }

    return(
        <div>
            <Modal onClose={() => setOpen(false) } onOpen={() => setOpen(true)}
            open={open} trigger={<Button variant="outline-dark">Delete Profile</Button>} >
                <h2>Delete Profile</h2>
                <Modal.Content>
                    <Modal.Description>
                        <Form onSubmit={handleDelete}>
                            <Form.Group>
                                <Form.Label as="h2">Are you sure you want to delete your account?</Form.Label>{'    '}
                                <Button variant="outline-dark" type="submit">Yes, I can manage my closet.</Button>
                            </Form.Group>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        </div>
    )
}

export default DeleteProfile;