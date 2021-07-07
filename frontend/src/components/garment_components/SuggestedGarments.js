import { useDispatch, useSelector } from "react-redux";
import { CardDeck } from "react-bootstrap";

function SuggestedGarments({makeCards}){
    const suggestedGarments = useSelector((state) => state.garmentReducer.suggestedGarments)

    const list = suggestedGarments.map((garm) => makeCards(garm))

    return(
        <div className="center">
            <h1>Suggest Garments</h1>
            <CardDeck>
                {list}
            </CardDeck>
        </div>
    )
}

export default SuggestedGarments;