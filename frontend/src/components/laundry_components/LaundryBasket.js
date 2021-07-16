import { Button, CardDeck } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"
import LaundryCard from "./LaundryCard"

function LaundryBasket({}){
    const laundry = useSelector((state) => state.laundryReducer.laundry);
    const dispatch = useDispatch();
    const laundryWeight = useSelector((state) => state.laundryReducer.weight);
    console.log(laundry)
    
    // function reloadPage(){
    //     console.log("UGH")
    // }

    function cleanLaundry(){
        let i = laundry.length - 1;
        let lastGarm = laundry[i];
        let otherGarms = laundry.filter((garm) => garm !== lastGarm);

        otherGarms.forEach((garment) => {
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
            })
        })

        fetch(`http://localhost:3000/garments/${lastGarm.id}`, {
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
            console.log('last one', data)
            // dispatch({type: "resetLaundry"})
            window.location.reload();
        })




        // let i = laundry.length - 1;
        // while (i >= 0){
        //     fetch(`http://localhost:3000/garments/${laundry[i].id}`, {
        //         method: "PATCH",
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify({
        //             is_clean: true
        //         })
        //     })
        //     .then(res => res.json())
        //     .then((data) => {
        //         console.log(data, i)
        //         if(i === 0){
        //             reloadPage();
        //         }
        //         i--;
        //     })

            // if(i > 0){
            //     console.log(laundry[i])
            //     fetch(`http://localhost:3000/garments/${laundry[i].id}`, {
            //         method: "PATCH",
            //         headers: {
            //             "Content-Type": "application/json"
            //         },
            //         body: JSON.stringify({
            //             is_clean: true
            //         })
            //     })
            //     .then(res => res.json())
            //     .then((data) => {
            //         console.log(data, i)
            //         if(i === 0){
            //             reloadPage();
            //         }
            //     })
            //     i--;
            // }
            // else{
            //     console.log(laundry[i])
            //     fetch(`http://localhost:3000/garments/${laundry[i].id}`, {
            //         method: "PATCH",
            //         headers: {
            //             "Content-Type": "application/json"
            //         },
            //         body: JSON.stringify({
            //             is_clean: true
            //         })
            //     })
            //     .then(res => res.json())
            //     .then((data) => {
            //         console.log('last one', data, i)
            //         dispatch({type: "resetLaundry"})
            //         // window.location.reload();
            //         reloadPage();
            //     })
            //     i--;
            // }
            // i--;
            // console.log(i)
        // }


        // laundry.forEach((garment) => {
        //     fetch(`http://localhost:3000/garments/${garment.id}`, {
        //         method: "PATCH",
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify({
        //             is_clean: true
        //         })
        //     })
        //     .then(res => res.json())
        //     .then((data) => {
        //         console.log(data)
        //         dispatch({type: "resetLaundry"})
        //         console.log('after fetch', laundry, laundry.length)
        //     })
        // })
        // reloadPage()
    }
    
    return(
        <div className="center" >
            <h1>Laundry Basket</h1>
            <Button size="lg" variant="outline-dark" onClick={cleanLaundry}>Clean Laundry</Button>
            {laundry.length > 0 ? 
                <div className="cardContainer">
                    <CardDeck>
                    {
                        laundry.map((garment) => {
                            return <LaundryCard key={garment.id} garment={garment} />
                        })
                    }
                    </CardDeck>
                </div>
                :
                <h2>All Clean!</h2>
            }
        </div>
    )
}

export default LaundryBasket;