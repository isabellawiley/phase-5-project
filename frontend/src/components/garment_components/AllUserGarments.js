import { useSelector } from "react-redux";
import { Button, CardDeck } from "react-bootstrap";

function AllUserGarments({makeCards}){
    const garments = useSelector((state) => state.garmentReducer.garments);
    let garmentList = garments.map((garment) => makeCards(garment));

    return(
        <div className="center">
            <h1>All Garments</h1>
            <Button size="lg" variant="outline-dark" href={'/new-garment'}>New Garment Form</Button >
            <div className="cardContainer">
                <CardDeck>
                    {garmentList}
                </CardDeck>
            </div>
        </div>
    )
}

export default AllUserGarments;