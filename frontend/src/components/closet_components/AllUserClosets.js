import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import ClosetCard from "./ClosetCard";

function AllUserClosets(){
    const closets = useSelector((state) => state.closetReducer.closets)

    let closetsList = closets.map((closet => {
        return <ClosetCard key={closet.id} closet={closet} />
    }))
    return(
        <div>
            <h1>All Closets</h1>
            <Button variant="outline-dark" href={'/new-closet'}>New Closet Form</Button >
            <div>
                {closetsList}
            </div>
        </div>
    )
}

export default AllUserClosets;