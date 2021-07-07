import { useSelector } from "react-redux";
import { Button, CardDeck } from "react-bootstrap";
import ClosetCard from "./ClosetCard";

function AllUserClosets(){
    const closets = useSelector((state) => state.closetReducer.closets)

    let closetsList = closets.map((closet => {
        return <ClosetCard key={closet.id} closet={closet} />
    }))
    return(
        <div className="center">
            <h1>All Closets</h1>
            <Button size="lg" variant="outline-dark" href={'/new-closet'}>New Closet Form</Button >
            <div className="cardContainer">
                <CardDeck>
                    {closetsList}
                </CardDeck>
            </div>
        </div>
    )
}

export default AllUserClosets;