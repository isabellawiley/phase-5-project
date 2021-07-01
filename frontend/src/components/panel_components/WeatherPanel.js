import { useSelector } from "react-redux";
import {Card, Col, Row} from 'react-bootstrap';

function WeatherPanel(){
    const currentTemp = useSelector((state) => state.userReducer.currentTemp)
    const icon = useSelector((state) => state.temperatureReducer.icon)
    const description = useSelector((state) => state.temperatureReducer.description)

    return(
        <Card style={{ height: '25rem' }}>
            <Row >
            <Col className="m-auto">
                <Card.Img src={`http://openweathermap.org/img/wn/${icon}@2x.png`}/>
            </Col>
            <Col className="m-auto">
                <Card.Text as="h1">{description}</Card.Text>
                <Card.Text as="h1">{currentTemp}°F</Card.Text>
            </Col>
            </Row>
        </Card>
    )
}

export default WeatherPanel;