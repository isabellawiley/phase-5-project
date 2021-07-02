import { useState } from 'react';
import {Card, Button} from 'react-bootstrap';

function FavGarmPanelCard({garment, addToLaundry}){
    const [worn, setWorn] = useState(garment.is_clean);
    const {name, image} = garment;
    // const images = ["https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3900&q=80",
    // "https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
    // "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1566&q=80"];
    // let image = images[Math.floor(Math.random()*images.length)];

    function handleClick(){
        addToLaundry(garment);
        setWorn(!worn);
    }
    console.log(garment, garment.is_clean)

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