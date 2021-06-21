import { useState } from "react";
import { Button, Modal } from "semantic-ui-react";

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
            open={open} trigger={<Button>Delete Profile</Button>} >
                <h2>Delete Profile</h2>
                <Modal.Content>
                    <Modal.Description>
                        <form onSubmit={handleDelete} >
                            <label>Are you sure you want to delete your account?</label>
                            <input type="submit" value="Yes, I can manage my closet."></input>
                        </form>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        </div>
    )
}

export default DeleteProfile;