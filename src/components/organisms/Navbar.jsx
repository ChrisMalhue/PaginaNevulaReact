import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import '../../styles/components/organisms/Navbarstyle.css';
import Image from '../atoms/Image';
import logo from '../../assets/images/logo.webp';

function NavBar() {
  return (
    <Navbar className="custom-navbar" variant="dark" expand="lg">
      <Container fluid>                              {/* Esto hace que use todo el ancho de la pantalla */}
        <Navbar.Brand href="/">
          <Image src={logo} alt="Nevula" className="navbar-logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto nav-links">        {/* 2. mx-auto + nav-links (Esto se llama del css de navbar) */}
            <Nav.Link href="/#">Home</Nav.Link>
            <Nav.Link href="/#quienes">Quienes somos</Nav.Link>
            <Nav.Link href="/#elegirnos">Por que elegirnos</Nav.Link>
            <Nav.Link href="/eventos#trabajamos">Como trabajamos</Nav.Link>
            <Nav.Link href="/eventos#fotos">Galeria de eventos</Nav.Link>
            <Nav.Link href="/">FAQ</Nav.Link>
            <Nav.Link href="/">Cotizacion</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/">Iniciar sesion</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;