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
                    return <ClosetGarmentCard key={garm.id} garment={garm} />
                }))
            })
        },[id])

        if (!isLoaded){
            return(<h2>Loading...</h2>);
        }
        else{
            closet_garments.push(closet.garments.map((garm) => {
                return <ClosetGarmentCard key={garm.id} garment={garm} />
            }))
        }
        
    return(
        <div>
            {isLoaded ? 
            <div>
                <DeleteCloset closet={closet} />
                <h1>{closet.title}</h1>
                {closet_garments}
            </div>
            :
            <h2>Loading...</h2> }
        </div>
    )
}

export default ClosetPage;