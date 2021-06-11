import {connect} from 'react-redux';
import { useSelector} from 'react-redux';

function Home(){
    const currentUser = useSelector((state) => state.currentUser)
    console.log(this)

    return(
        <div>
            <h>Greetings, {currentUser.name}!</h>


        </div>
    )
}

export default connect()(Home);