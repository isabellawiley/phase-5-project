import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { Modal } from "semantic-ui-react";

function DeleteGarment({garment}){
    const garments = useSelector((state) => state.garmentReducer.garments);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    function handleDelete(){
        fetch(`http://localhost:3000/garments/${garment.id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(() => {
            const updatedGarms = garments.filter(garm => {
                return garm !== garment;
            })
            dispatch({type: "deleteGarment", payload: updatedGarms})
            setOpen(false)
        })
    }
    return(
        <Modal style={{justifyContent: 'center', marginLeft: '25%', height: '30%', marginTop: '10%', width: '50%'}} onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open} trigger={<Button className="button" variant="outline-dark" onClick={() => setOpen(true)}>Delete Garment</Button >}>
                <Modal.Header>Delete Garment</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <h3>Are you sure you want to delete this garment?</h3>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button size="lg" variant="outline-dark" onClick={handleDelete}>Yes, delete this garment.</Button>{'    '}
                    <Button size="lg" variant="outline-dark" onClick={() => setOpen(false)}>No</Button>
                </Modal.Actions>
            </Modal>
    )
}

export default DeleteGarment;