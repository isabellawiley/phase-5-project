import { useSelector } from "react-redux";
import { Button, CardDeck } from "react-bootstrap";
import GarmentCard from "./GarmentCard";

function AllUserGarments({addToLaundry}){
    const garments = useSelector((state) => state.garmentReducer.garments);

    let garmentList = garments.map((garment) => {
        return <GarmentCard key={garment.id} garment={garment} addToLaundry={addToLaundry} />
    })

    return(
        <div className="center">
            <h1>All Garments</h1>
            <Button variant="outline-dark" href={'/new-garment'}>New Garment Form</Button >
            <div className="cardContainer">
                <CardDeck>
                    {garmentList}
                </CardDeck>
            </div>
        </div>
    )
}

export default AllUserGarments;