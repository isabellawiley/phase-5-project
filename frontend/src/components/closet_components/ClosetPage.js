import { useSelector } from "react-redux";
import { useParams } from "react-router";
import ClosetGarmentCard from "./ClosetGarmentCard";

function ClosetPage(){
    const {id} = useParams();
    const closet = useSelector((state) => state.closetReducer.closet)
    const garments = useSelector((state) => state.garmentReducer.garments)

    let filtered_garments = garments.filter(garment => {
        return garment.closet.id === id;
    })

    let closet_garments = filtered_garments.map((garm) => {
        return <ClosetGarmentCard key={garm.id} garment={garm} />
    })

    return(
        <div>
            <h1>{closet.title}</h1>
            {closet_garments}
        </div>
    )
}

export default ClosetPage;