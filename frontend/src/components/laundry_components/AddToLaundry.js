import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AddToLaundry({garment}){
    const [worn, setWorn] = useState(garment.is_clean);
    const dispatch = useDispatch();
    const allTypes = useSelector((state) => state.garmentReducer.garmentTypes);
    const laundry_weight = useSelector((state) => state.laundryReducer.weight);
        
        function addToLaundry(){
        let garmentType = allTypes.find(type => type.name == garment.garment_type);
        let garmentWeight = garmentType.weight

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
            dispatch({type: "addLaundry", payload: data});
            dispatch({type: "incLaundryWeight", payload: garmentWeight})
            setWorn(!worn);
            if(laundry_weight + garmentWeight > 1000){
                alert("Time to do laundry!")
            }
        })
    }
    return(
        <div>
            <button onClick={addToLaundry}>{worn ? "Wear" : "Worn"}</button>
        </div>
    )
}

export default AddToLaundry;