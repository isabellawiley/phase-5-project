import { useState } from "react";
import {Button} from 'react-bootstrap';
import DeleteGarment from "./DeleteGarment";
import EditGarment from "./EditGarment";

function GarmentCard({garment, addToLaundry}){
    const [worn, setWorn] = useState(garment.is_clean);
    
    function handleClick(){
        addToLaundry(garment);
        setWorn(!worn);
    }

    return(
        <div className='coolCard'>
            <img className="cardImage" alt="garmentimage" src={garment.image}/>
            <h2>{garment.name}</h2>
            <div>
                <Button variant="outline-dark" onClick={handleClick}>{worn ? "Wear" : "Worn"}</Button >
                <br/><EditGarment garment={garment}/><br/>
                <DeleteGarment garment={garment} />
            </div>
        </div>
    )
}

export default GarmentCard;