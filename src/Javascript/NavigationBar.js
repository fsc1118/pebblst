import React from "react";
import {Nav, Navbar} from "react-bootstrap";

class NavigationBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {"isHidden" : props.isHidden}
    }
    render() {
        let isHidden = this.state.isHidden
        let displayProfile = isHidden ? "none" : "flex"
        let bg = isHidden ? "rgba(0,0,0,0.3)" : "white"
        let display = isHidden ? "none" : "block"
        let i = <div id="app">
            <Navbar id="nav" expand="lg" bg={bg}>
            <Navbar.Brand id={"brand"} href="#home">Pebblst</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#home"><b>Home</b></Nav.Link>
                    <Nav.Link href="#link">My Pebbles</Nav.Link>
                    <Nav.Link href="#link">Friends</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            <div id={"profile"} style={{display:displayProfile}}>SB</div>
        </Navbar>
            <div>
                <div id="a" style={{display: !display}}></div>
                <div id="b" style={{display: display}}></div>
            </div>
        </div>
        return i
    }
}
export {NavigationBar}