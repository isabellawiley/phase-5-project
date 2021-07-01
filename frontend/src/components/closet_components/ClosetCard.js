import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import DeleteCloset from "./DeleteCloset";
import EditCloset from "./EditCloset";

function ClosetCard({closet}){
    const dispatch = useDispatch();

    function setCloset(){
        dispatch({type: "getCloset", payload: closet});
        console.log("hi")
    }

    return(
        <div className='coolCard'>
            <h2>{closet.title}</h2>
            <div>
                <Button variant="outline-dark" onClick={setCloset} href={`/closets/${closet.id}`}>View Closet</Button><br/>
                <br/><EditCloset closet={closet} /><br/>
                <DeleteCloset closet={closet} />
            </div>
            
        </div>
    )
}

export default ClosetCard;