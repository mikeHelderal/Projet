import React, { useState } from 'react'
import { Button, Offcanvas  } from 'react-bootstrap';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


import "../../Styles/NavBar.css";
import Connexion from '../Pages/Auth/Connexion';
import FormulairePublication from './FormulairePublication';
const NavBar = () => {

  const [show, setShow] = useState(false);


  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);



  return (
    <Navbar bg="dark" data-bs-theme="dark" collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Blog-Martinique</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/histoire">Histoire</Nav.Link>
            <Nav.Link href="/Events">Evenement</Nav.Link>
            <Nav.Link href="/News">Actualité</Nav.Link>
            <Nav.Link href="/tourisme">Tourisme</Nav.Link>


          </Nav>
          <Nav>
            <Button variant="link-dark" onClick={handleShow} >Créer une publication</Button>
            <Nav.Link href="/inscription">Inscription</Nav.Link>
            <Nav.Link eventKey={2} href="/connexion">Connexion </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>


      <Offcanvas show={show} onHide={handleClose} class="offcanvas offcanvas-start show text-bg-dark" >
        <Offcanvas.Header >
          <Offcanvas.Title>Votre publication</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <FormulairePublication></FormulairePublication>
        </Offcanvas.Body>
      </Offcanvas>
    </Navbar>
  )
}

export default NavBar