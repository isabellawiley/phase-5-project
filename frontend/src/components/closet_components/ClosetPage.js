import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import ClosetGarmentCard from "./ClosetGarmentCard";
import DeleteCloset from "./DeleteCloset";

function ClosetPage(){
    const {id} = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const [closet, setCloset] = useState({});
    let closet_garments = [];
    
    useEffect(() => {
        fetch(`http://localhost:3000/closets/${id}`)
        .then(res => res.json())
        .then((closet) => {
            setCloset(closet);
            setIsLoaded(true);
            closet_garments.push(closet.garments.map((garm) => {
                    return <li> <ClosetGarmentCard key={garm.id} garment={garm} /></li>
                }))
            })
        },[id])

        if (isLoaded){
            closet_garments.push(closet.garments.map((garm) => {
                return <ClosetGarmentCard key={garm.id} garment={garm} />
            }))
        }
        
    return(
        <div>
            {isLoaded ? 
            <div className="center">
                <h1>{closet.title}</h1>
                <DeleteCloset closet={closet} />
                <ul>
                    {closet_garments}
                </ul>
            </div>
            :
            <h2>Loading...</h2> }
        </div>
    )
}

export default ClosetPage;