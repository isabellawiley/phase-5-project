import { useSelector } from "react-redux";

function WeatherPanel(){
    const currentTemp = useSelector((state) => state.userReducer.currentTemp)

    return(
        <div>
            <aside>{currentTemp}</aside>
        </div>
    )
}

export default WeatherPanel;