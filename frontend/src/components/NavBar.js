import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function NavBar({logout}){

    return(
        <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <NavDropdown title="Closets" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/new-closet">New Closet</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="/closets">All Closets</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Garments" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/new-garment">New Garment</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="/garments">All Garments</NavDropdown.Item>
                            <NavDropdown.Item href="/suggested">Suggested Garments</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/laundry">Laundry</Nav.Link>
                        <NavDropdown title="Account" id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                            <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default NavBar;