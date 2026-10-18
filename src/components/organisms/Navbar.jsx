import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaCircleUser } from 'react-icons/fa6';
import '../../styles/components/organisms/Navbar.css';
import Image from '../atoms/Image';
import logo from '../../assets/images/logo.webp';
import { estaLogueado, cerrarSesion } from '../../logic/sesion';

function NavBar() {
  const logueado = estaLogueado();

  return (
    <Navbar className="custom-navbar" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">
          <Image src={logo} alt="Nevula" className="navbar-logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto nav-links">
            <Nav.Link href="/#">Home</Nav.Link>
            <Nav.Link href="/#quienes">Quienes somos</Nav.Link>
            <Nav.Link href="/#elegirnos">Por que elegirnos</Nav.Link>
            <Nav.Link href="/eventos#trabajamos">Como trabajamos</Nav.Link>
            <Nav.Link href="/eventos#fotos">Galeria de eventos</Nav.Link>
            <Nav.Link href="/faqcotiza#faq">FAQ</Nav.Link>
            <Nav.Link href="/faqcotiza#cotizacion">Cotizacion</Nav.Link>
          </Nav>
          <Nav>
            {logueado ? (
              <Nav.Link href="/" onClick={cerrarSesion}>Cerrar sesion</Nav.Link>
            ) : (
              <Nav.Link href="/login" aria-label="Iniciar sesión o registrarse" title="Iniciar sesión o registrarse">
                <FaCircleUser size={30} />
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;