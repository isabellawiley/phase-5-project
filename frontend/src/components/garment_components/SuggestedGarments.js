import { useDispatch, useSelector } from "react-redux";

function SuggestedGarments(){
    const suggestedGarments = useSelector((state) => state.garmentReducer.suggestedGarments)

    const list = suggestedGarments.map((garm) => {
        return(<h2>{garm.name}</h2>)
    })

    return(
        <div className="center">
            <h1>Suggest Garments</h1>
            {list}
        </div>
    )
}

export default SuggestedGarments;