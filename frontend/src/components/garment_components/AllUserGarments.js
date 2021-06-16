import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import GarmentCard from "./GarmentCard";

function AllUserGarments(){
    const garments = useSelector((state) => state.garmentReducer.garments)

    let garmentList = garments.map((garment) => {
        return <GarmentCard key={garment.id} garment={garment} />
    })

    return(
        <div>
            <button><Link to='/new-garment'>New Garment Form</Link></button>
            {garmentList}
        </div>
    )
}

export default AllUserGarments;