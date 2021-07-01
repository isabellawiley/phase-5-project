import {connect} from 'react-redux';
import { useSelector} from 'react-redux';
import {Container, Row, Col} from 'react-bootstrap';
import SuggestedGarmentsPanel from './panel_components/SuggestedGarmentsPanel';
import WeatherPanel from './panel_components/WeatherPanel';
import FavoriteGarmentsPanel from './panel_components/FavoriteGarmentsPanel';
import LaundryBasketPanel from './panel_components/LaundryBasketPanel';

function Home({addToLaundry}){
    const currentUser = useSelector((state) => state.userReducer.currentUser)

    return(
        <div>
            <h1>Hello, {currentUser.name}!</h1>
            <Container>
                <Row>
                    <Col>
                        <WeatherPanel />
                    </Col>
                    <Col>
                        <LaundryBasketPanel />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <SuggestedGarmentsPanel addToLaundry={addToLaundry} />
                    </Col>                    
                </Row>
                <Row>
                    <Col>
                        <FavoriteGarmentsPanel addToLaundry={addToLaundry} />
                    </Col>
                </Row>
            </Container>            
        </div>
    )
}

export default connect()(Home);