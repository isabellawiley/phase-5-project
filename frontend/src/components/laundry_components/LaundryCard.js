import {Button, Card} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

function LaundryCard({garment}){
    const laundry = useSelector((state) => state.laundryReducer.laundry);
    const dispatch = useDispatch();

    function cleanGarment(){
        fetch(`http://localhost:3000/garments/${garment.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    is_clean: true
                })
            })
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                let updatedLaundry = laundry.filter(garm => {
                    return garm !== data;
                })
                dispatch({type: "setUserLaundry", payload: updatedLaundry})
                window.location.reload();
            })
    }
    return(
        <div>
            <Card border="dark" className="text-center" style={{ width: '18rem', height: '25rem', flex: 1, margin: '5px' }}>
                <Card.Img class="garmImg" variant="top" src={garment.image} alt={garment.name} />
                <Card.Body>
                    <Card.Title as="h2">{garment.name}</Card.Title>
                    <div>
                        <Button className="button" variant="outline-dark" onClick={cleanGarment}>Clean Garment</Button >
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

export default LaundryCard;