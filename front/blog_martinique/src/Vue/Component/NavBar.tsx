import { useEffect, useState } from 'react'
import { Button, Offcanvas } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "../../Styles/NavBar.css";
import FormulairePublication from './publication/FormulairePublication';
import FormulaireEvent from './event/FormulaireEvent';

const NavBar = () => {

  const [show, setShow] = useState(false);
  const [showEvent, setShowEvent] = useState(false);
  const [isAdmin, setisAdmin] = useState("");

  useEffect(() => {
    if (localStorage.getItem("isAdmin")) {
      if (localStorage.getItem("isAdmin") === "false") {
        setisAdmin("connected");
      } else {
        setisAdmin("admin");
      }
    } else {
      setisAdmin("not_connected");
    }
  }, [show, isAdmin]);

  const handleClose = () => {
    setShow(false);
    window.location.reload();
  }

  const handleCloseEvent = () => {
    setShowEvent(false);
    window.location.reload();
  }

  const handleShow = () => setShow(true);
  const handleShowEvent = () => setShowEvent(true);

  const deconnexion = () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("token");
    localStorage.removeItem("UserId");
    setisAdmin("not_connected");
    window.location.reload();
  }

  return (
    <Navbar bg="dark" variant="dark" data-bs-theme="dark"  expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Fusion Belka</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/Events">Evenement</Nav.Link>
            <Nav.Link href="/News">Actualité</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {isAdmin === "not_connected" ? (
              <>
                <Nav.Link href="/inscription">Inscription</Nav.Link>
                <Nav.Link href="/connexion">Connexion</Nav.Link>
              </>
            ) : isAdmin === "admin" ? (
              <>
                <Button variant="link-dark" onClick={handleShow}>Créer une publication</Button>
                <Button variant="link-dark" onClick={handleShowEvent}>Créer un évènement</Button>
                <Nav.Link href="/GU">Admin</Nav.Link>
                <Button variant="link-dark" onClick={deconnexion}>Déconnexion</Button>
              </>
            ) : (
              <>
                <Button variant="link-dark" onClick={handleShow}>Créer une publication</Button>
                <Button variant="link-dark" onClick={handleShowEvent}>Créer un évènement</Button>
                <Button variant="link-dark" onClick={deconnexion}>Déconnexion</Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>

      {/* Offcanvas for Publication */}
      <Offcanvas show={show} onHide={handleClose} className="offcanvas offcanvas-start text-bg-dark">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Votre publication</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <FormulairePublication handleClose={handleClose} />
        </Offcanvas.Body>
      </Offcanvas>

      {/* Offcanvas for Event */}
      <Offcanvas show={showEvent} onHide={handleCloseEvent} className="offcanvas offcanvas-start text-bg-dark">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Votre Evenement</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <FormulaireEvent handleCloseEvent={handleCloseEvent} />
        </Offcanvas.Body>
      </Offcanvas>
    </Navbar>
  );
}

export default NavBar;
