import { useEffect, useState } from "react";
import { useParams } from "react-router";
import DeleteCloset from "./DeleteCloset";
import { CardDeck } from "react-bootstrap";

function ClosetPage({makeCards}){
    const {id} = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const [closet, setCloset] = useState({});
    const [closetGarments, setClosetGarments] = useState([]);
    
    useEffect(() => {
        fetch(`http://localhost:3000/closets/${id}`)
        .then(res => res.json())
        .then((closet) => {
            setCloset(closet);
            setIsLoaded(true);
            let garms = closet.garments.map((garm) => makeCards(garm))
            setClosetGarments(garms);
            })
    },[id])
        
    return(
        <div>
            {isLoaded ? 
            <div className="center">
                <h1>{closet.title}</h1>
                <DeleteCloset closet={closet} />
                <div className="cardContainer">
                <CardDeck>
                    {closetGarments}
                </CardDeck>
            </div>
            </div>
            :
            <h2>Loading...</h2> }
        </div>
    )
}

export default ClosetPage;