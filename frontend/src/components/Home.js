import {connect} from 'react-redux';
import { useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

function Home(){
    const currentUser = useSelector((state) => state.userReducer.currentUser)

    return(
        <div>
            <h>Greetings, {currentUser.name}!</h>
            <button><Link to="/garments">All Garments</Link></button>
            <button><Link to="/closets">All Closets</Link></button>
            <button><Link to="/laundry">Laundry Basket</Link></button>
        </div>
    )
}

export default connect()(Home);