import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ClosetCard from "./ClosetCard";

function AllUserClosets(){
    const closets = useSelector((state) => state.closetReducer.closets)

    let closetsList = closets.map((closet => {
        return <ClosetCard key={closet.id} closet={closet} />
    }))
    return(
        <div>
            <h1>All Closets</h1>
            <button><Link to='/new-closet'>New Closet Form</Link></button>
            {closetsList}
        </div>
    )
}

export default AllUserClosets;