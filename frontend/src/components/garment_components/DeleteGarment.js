import { useDispatch, useSelector } from "react-redux";

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
            <button onClick={handleDelete}>Delete Garment</button>
        </div>
    )
}

export default DeleteGarment;