import { useState } from 'react';
import {Card, Button} from 'react-bootstrap';

function FavGarmPanelCard({garment, addToLaundry}){
    const [worn, setWorn] = useState(garment.is_clean);
    const {name, image} = garment;
    
    function handleClick(){
        addToLaundry(garment);
        setWorn(!worn);
    }

    return(
        <div>
            <Card style={{ height: '30rem' }}>
                <Card.Img className="d-block h-75 w-100" src={image} alt={name}/>
                <Card.Text as="h2" class="text-center">{name}</Card.Text>
                <Button variant="outline-dark" onClick={handleClick}>{worn ? "Wear" : "Worn"}</Button >
            </Card>
        </div>
    )
}

export default FavGarmPanelCard;