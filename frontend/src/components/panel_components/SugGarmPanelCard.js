import { useState } from 'react';
import {Card, Button} from 'react-bootstrap';

function SugGarmPanelCard({garment, addToLaundry}){
    const [worn, setWorn] = useState(garment.is_clean);
    const {name, image } = garment;
    
    function handleClick(){
        addToLaundry(garment);
        setWorn(!worn);
    }

    return(
        <div>
            { worn ? 
            <Card style={{ height: '30rem' }}>
                <Card.Img className="d-block h-75 w-100" src={image} alt={name}/>
                <Card.Text as="h2" class="text-center">{name}</Card.Text>
                <Button variant="outline-dark" onClick={handleClick}>{worn ? "Wear" : "Worn"}</Button >
            </Card>
            :
            <Card style={{ height: '30rem', backgroundColor: "hsl(215, 5%, 85%)" }}>
                <Card.Img className="d-block h-75 w-100" src={image} alt={name} style={{ opacity: "0.4"}}/>
                <Card.Text as="h2" class="text-center">{name}</Card.Text>
                <Button variant="outline-dark" disabled>Worn</Button >
            </Card>
            }
        </div>
    )
}

export default SugGarmPanelCard;