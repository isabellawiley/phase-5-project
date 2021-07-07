import { useSelector } from "react-redux";
import DeleteProfile from "./DeleteProfile";
import {Card, Button, ListGroup, ListGroupItem, Col, Row} from 'react-bootstrap';

function Profile({logout}){
    const currentUser = useSelector((state) => state.userReducer.currentUser);
    const defaultCloset = useSelector((state) => state.closetReducer.defaultCloset)


    return(
       <div>
           <Card border="dark" style={{ width: '50rem', margin: 'auto', marginTop: '50px' }}>
                <Card.Header as='h1'>Profile</Card.Header>
                <ListGroup variant="flush">
                    <ListGroupItem>
                        <Row style={{ width: '65%', marginLeft: '180px' }}>
                            <Col as='h3' class="pull-right" style={{ width: '50%', margin: 'auto' }}>Name: </Col>
                            <Col style={{ width: '50%', margin: 'auto' }}>{currentUser.name}</Col>
                        </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Row style={{ width: '65%', marginLeft: '180px' }}>
                            <Col as='h3' class="pull-right" style={{ width: '50%', margin: 'auto' }}>Birthdate: </Col>
                            <Col style={{ width: '50%', margin: 'auto' }}>{currentUser.birthdate}</Col>
                        </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Row style={{ width: '65%', marginLeft: '180px' }}>
                            <Col as='h3' class="pull-right" style={{ width: '50%', margin: 'auto' }}>Email: </Col>
                            <Col style={{ width: '50%', margin: 'auto' }}>{currentUser.email}</Col>
                        </Row>
                    </ListGroupItem>
                    {/* <ListGroupItem>
                        <Row style={{ width: '65%', marginLeft: '180px' }}>
                            <Col as='h3' class="pull-right" style={{ width: '50%', margin: 'auto' }}>Default Closet: </Col>
                            <Col style={{ width: '50%', margin: 'auto' }}>{defaultCloset.title}</Col>
                        </Row>
                    </ListGroupItem> */}
                    <ListGroupItem>
                        <Row style={{ width: '65%', marginLeft: '180px' }}>
                            <Col as='h3' class="pull-right" style={{ width: '50%', margin: 'auto' }}>Total Closets: </Col>
                            <Col style={{ width: '50%', margin: 'auto' }}>{currentUser.total_closets}</Col>
                        </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Row style={{ width: '65%', marginLeft: '180px' }}>
                            <Col as='h3' class="pull-right" style={{ width: '50%', margin: 'auto' }}>Total Garments: </Col>
                            <Col style={{ width: '50%', margin: 'auto' }}>{currentUser.total_garments}</Col>
                        </Row>
                    </ListGroupItem>
                </ListGroup>
                <Card.Footer>
                    <DeleteProfile currentUser={currentUser} logout={logout}/>
                </Card.Footer>
           </Card>


           {/* <h1>Profile</h1>
           <h2>Name: {currentUser.name}</h2>
           <h2>Birthdate: {currentUser.birthdate}</h2>
           <h2>Email: {currentUser.email}</h2>
           <h2>Default Closet: {defaultCloset.title}</h2>
           <h2>Total Closets: {currentUser.total_closets}</h2>
           <h2>Total Garments: {currentUser.total_garments}</h2>
           <DeleteProfile currentUser={currentUser} logout={logout}/> */}
       </div> 
    )
}

export default Profile;