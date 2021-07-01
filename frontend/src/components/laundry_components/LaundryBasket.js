import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"
import LaundryCard from "./LaundryCard"

function LaundryBasket(){
    const laundry = useSelector((state) => state.laundryReducer.laundry);
    const dispatch = useDispatch();
    const laundryWeight = useSelector((state) => state.laundryReducer.weight);

    function cleanLaundry(){
        laundry.forEach((garment) => {
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
                dispatch({type: "resetLaundry"})
            })
        })
    }
    
    return(
        <div>
            <h1>Laundry Basket</h1>
            <Button variant="outline-dark" onClick={cleanLaundry}>Clean Laundry</Button>
            {laundry.length > 0 ? 
                laundry.map((garment) => {
                    return <LaundryCard key={garment.id} garment={garment} />
                })
                :
                <h2>All Clean!</h2>
            }
        </div>
    )
}

export default LaundryBasket;