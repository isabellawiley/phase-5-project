import { useSelector } from "react-redux";

function SuggestedGarments(){
    const currentTemp = useSelector((state) => state.userReducer.currentTemp)
    const garments = useSelector((state) => state.garmentReducer.garments)

    console.log(currentTemp, garments)
    const suggestedGarms = garments.filter((garment) => garment.lowest_temp < currentTemp && currentTemp < garment.highest_temp)

    const list = suggestedGarms.map((garm) => {
        return(<h2>{garm.name}</h2>)
    })

    console.log(suggestedGarms)
    return(
        <div>
            <h1>Suggest Garments</h1>
            {list}
        </div>
    )
}

export default SuggestedGarments;