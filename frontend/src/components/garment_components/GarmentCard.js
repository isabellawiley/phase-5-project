import AddToLaundry from "../laundry_components/AddToLaundry";
import DeleteGarment from "./DeleteGarment";
import EditGarment from "./EditGarment";

function GarmentCard({garment}){
    return(
        <div>
            <h2>{garment.name}</h2>
            <AddToLaundry garment={garment}/>
            <EditGarment garment={garment}/>
            <DeleteGarment garment={garment} />
        </div>
    )
}

export default GarmentCard;