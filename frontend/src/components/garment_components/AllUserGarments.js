import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import GarmentCard from "./GarmentCard";

function AllUserGarments({addToLaundry}){
    const garments = useSelector((state) => state.garmentReducer.garments)

    let garmentList = garments.map((garment) => {
        return <GarmentCard key={garment.id} garment={garment} addToLaundry={addToLaundry} />
    })

    return(
        <div>
            <Button variant="outline-dark" href={'/new-garment'}>New Garment Form</Button >
            <div>
                {garmentList}
            </div>
        </div>
    )
}

export default AllUserGarments;