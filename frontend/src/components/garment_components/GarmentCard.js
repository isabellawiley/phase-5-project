import { useState } from "react";
import {Button, Card} from 'react-bootstrap';
import DeleteGarment from "./DeleteGarment";
import EditGarment from "./EditGarment";

function GarmentCard({garment, addToLaundry}){
    const [worn, setWorn] = useState(garment.is_clean);
    
    function handleClick(){
        addToLaundry(garment);
        setWorn(!worn);
    }

    return(
        <div >
            <Card className="text-center" style={{ width: '18rem', height: '25rem', flex: 1, margin: '5px' }}>
                <Card.Img variant="top" src={garment.image} alt={garment.name} />
                <Card.Body>
                    <Card.Title as="h3">{garment.name}</Card.Title>
                    <div>
                        <Button className="button" variant="outline-dark" onClick={handleClick}>{worn ? "Wear" : "Worn"}</Button >
                        <EditGarment garment={garment}/>
                        <DeleteGarment garment={garment} />
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

export default GarmentCard;