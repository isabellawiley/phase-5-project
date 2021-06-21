import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import ClosetGarmentCard from "./ClosetGarmentCard";
import DeleteCloset from "./DeleteCloset";

function ClosetPage(){
    const {id} = useParams();
    const dispatch = useDispatch();
    const closet = useSelector((state) => state.closetReducer.closet)

   
    let closet_garments = closet.garments.map((garm) => {
        return <ClosetGarmentCard key={garm.id} garment={garm} />
    })

    useEffect(() => {
        fetch(`http://localhost:3000/closets/${id}`)
        .then(res => res.json())
        .then((closet) => {
            dispatch({type: "getCloset", payload: closet})
        })
    },[])

    return(
        <div>
            <DeleteCloset closet={closet} />
            <h1>{closet.title}</h1>
            {closet_garments}
        </div>
    )
}

export default ClosetPage;