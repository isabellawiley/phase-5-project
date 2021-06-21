import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal } from "semantic-ui-react";

function EditCloset({closet}){
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [closetDetails, setClosetDetails] = useState({
        title: closet.title
    })

    function setValue(key, value){
        setClosetDetails({...closetDetails, [key]: value});
    }

    function handleSubmit(e){
        e.preventDefault();

        fetch(`http://localhost:3000/closets/${closet.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: closetDetails.title
            })
        })
        .then(res => res.json())
        .then((closet) => {
            dispatch({type: "editCloset", payload: closet})
            if (closet.is_default){
                dispatch({type: "defaultCloset", payload: closet})
            }
            setOpen(false);
        })
    }
    return(
        <div>
            <Modal onClose={() => setOpen(false)} onOpen={() => setOpen(true)}
            open={open} trigger={<Button>Edit Closet</Button>} >
                <h1>Edit Closet</h1>
                <Modal.Content>
                    <Modal.Description>
                        <h1>{closet.title}</h1>
                        <form onSubmit={handleSubmit}>
                            <label>Closet Title: </label>
                            <input id="title" type="text" value={closetDetails.title} onChange={(e) => setValue("title", e.target.value)}></input><br/>
                            <input type="submit" value="Save Changes"/>
                        </form>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        </div>
    )
}

export default EditCloset;