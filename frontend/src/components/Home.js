import {connect} from 'react-redux';
import { useSelector} from 'react-redux';
import SuggestedGarments from './garment_components/SuggestedGarments';

function Home(){
    const currentUser = useSelector((state) => state.userReducer.currentUser)
    const currentTemp = useSelector((state) => state.userReducer.currentTemp)
    const garments = useSelector((state) => state.garmentReducer.garments)

    let favGarms = garments.filter((garm) => garm.is_favorite == true)
    console.log(favGarms)

    return(
        <div>
            <h1>Hello, {currentUser.name}!</h1>
            <aside>{currentTemp}</aside>
            <section><SuggestedGarments /></section>
        </div>
    )
}

export default connect()(Home);