import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";

function DeleteGarment({garment}){
    const garments = useSelector((state) => state.garmentReducer.garments);
    const dispatch = useDispatch();

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
        })
    }
    return(
        <div>
            <Button variant="outline-dark" onClick={handleDelete}>Delete Garment</Button >
        </div>
    )
}

export default DeleteGarment;