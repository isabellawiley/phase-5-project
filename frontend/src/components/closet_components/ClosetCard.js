import { Link } from "react-router-dom";
import DeleteCloset from "./DeleteCloset";
import EditCloset from "./EditCloset";

function ClosetCard({closet}){
    return(
        <div>
            <h2>{closet.title}</h2>
            <DeleteCloset closet={closet} />
            <button><Link to={`/closets/${closet.id}`}>View Closet</Link></button>
            <EditCloset closet={closet} />
        </div>
    )
}

export default ClosetCard;