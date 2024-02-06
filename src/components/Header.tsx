import { useContext } from 'react';
import { Link } from "react-router-dom";
import logo from '../logo.svg';
import { Container, Row, Col, Navbar, NavbarBrand, } from 'reactstrap';
import { KioskContext } from '../contexts/KioskContext'

function Header() {
  const kiosk = useContext(KioskContext)

  return (
    <Navbar fixed="top" color="light" light expand="xs" className="border-bottom border-gray bg-black" style={{ height: 60}}>
      <Container className="themed-container" fluid={true}>
        <Row  className="position-relative w-100 align-items-center g-0">

          <Col className="d-flex justify-content-xs-start justify-content-start">
            <NavbarBrand className="d-inline-block p-0" href="/" >
              { kiosk.logo? <img src={kiosk.logo} alt="company logo" onDragStart={(event)=> event.preventDefault()} className="position-relative img-fluid mr-1" style={{ maxHeight: '48px', marginTop: '3px' }}/> : <div/>} 
              { kiosk.name }
            </NavbarBrand>
          </Col>

          <Col className="d-flex justify-content-end">
            <Link to="/about" style={{ marginTop: '-4px', marginRight: '5px', textDecoration: 'none'}}>
              <span className="text-muted m-0" style={{fontSize: '9px'}}>POWERED BY</span><br/>
              <img src={logo} alt="kashing logo" onDragStart={(event)=> event.preventDefault()} className="position-relative img-fluid" style={{height: '20px', marginTop: '-10px'}} />
            </Link>
          </Col>

        </Row>
      </Container>
    </Navbar>
  )
}

export default Header;
