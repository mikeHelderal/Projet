import React, { useEffect, useState } from 'react'
import { Button, Offcanvas  } from 'react-bootstrap';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import "../../Styles/NavBar.css";
import FormulairePublication from './FormulairePublication';
import FormulaireEvent from './FormulaireEvent';


const NavBar = () => {



  const [show, setShow] = useState(false);
  const [showEvent, setShowEvent] = useState(false);


  useEffect( () => {

  },[show])


  const handleClose = () => {
    setShow(false);
  }
  const handleCloseEvent = () => {
    setShowEvent(false);
  }

  const handleShow = () => setShow(true);

  const handleShowEvent = () => setShowEvent(true);




  return (
    <Navbar bg="dark" data-bs-theme="dark" collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/blogMartinique">Fusion Belka</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/blogMartinique/histoire">Histoire</Nav.Link>
            <Nav.Link href="/blogMartinique/Events">Evenement</Nav.Link>
            <Nav.Link href="/blogMartinique/News">Actualité</Nav.Link>
          </Nav>
          <Nav>
          <Nav.Link href="/blogMartinique/GU">Admin</Nav.Link>
            <Button variant="link-dark" onClick={handleShow} >Créer une publication</Button>
            <Button variant="link-dark" onClick={handleShowEvent} >Créer un évènement</Button>
            <Nav.Link href="/blogMartinique/inscription">Inscription</Nav.Link>
            <Nav.Link  href="/blogMartinique/connexion">Connexion </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>


      <Offcanvas show={show} onHide={handleClose} className="offcanvas offcanvas-start show text-bg-dark" >
        <Offcanvas.Header closeButton >
          <Offcanvas.Title>Votre publication</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <FormulairePublication handleClose = {handleClose}></FormulairePublication>
        </Offcanvas.Body>
      </Offcanvas>

      <Offcanvas show={showEvent} onHide={handleCloseEvent} className="offcanvas offcanvas-start show text-bg-dark" >
        <Offcanvas.Header closeButton >
          <Offcanvas.Title>Votre Evenement</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <FormulaireEvent handleCloseEvent = {handleCloseEvent}></FormulaireEvent>
        </Offcanvas.Body>
      </Offcanvas>
    </Navbar>
  )
}

export default NavBar