import { Button, Card } from "react-bootstrap";
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
        <div>
            <Card className="text-center" style={{ width: '18rem', height: '25rem', flex: 1, margin: '5px' }} >
                <Card.Body>
                    <Card.Title as="h2">{closet.title}</Card.Title>
                    <div>
                    <Button className="button" variant="outline-dark" onClick={setCloset} href={`/closets/${closet.id}`}>View Closet</Button>
                    <EditCloset closet={closet} />
                    <DeleteCloset closet={closet} /> 
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

export default ClosetCard;