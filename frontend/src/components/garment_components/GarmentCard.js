import { useDispatch } from "react-redux";
import DeleteGarment from "./DeleteGarment";

function GarmentCard({garment}){
    const dispatch = useDispatch();

    function addToLaundry(){
        fetch(`http://localhost:3000/garments/${garment.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                is_clean: false
            })
        })
        .then(res => res.json())
        .then((data) => {
            dispatch({type: "addLaundry", payload: data})
        })
    }
    return(
        <div>
            <h2>{garment.name}</h2>
            <button onClick={addToLaundry}>{garment.is_clean ? "Wear" : "Worn"}</button>
            <DeleteGarment garment={garment} />
        </div>
    )
}

export default GarmentCard;