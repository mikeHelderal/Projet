import  { useEffect, useState } from 'react'
import { Button, Offcanvas  } from 'react-bootstrap';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import "../../Styles/NavBar.css";
import FormulairePublication from './publication/FormulairePublication';
import FormulaireEvent from './event/FormulaireEvent';


const NavBar = () => {



  const [show, setShow] = useState(false);
  const [showEvent, setShowEvent] = useState(false);
  const [isAdmin , setisAdmin] = useState("");


  useEffect( () => {
    if(localStorage.getItem("isAdmin")){
      if(localStorage.getItem("isAdmin") === "false"){
        setisAdmin("connected");
      }else {

        setisAdmin("admin");
      }
    }else{
      setisAdmin("not_connected");
    }

  },[show,isAdmin])




  const handleClose = () => {
    setShow(false);

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
    localStorage.removeItem("UserId")
    setisAdmin("not_connected");
    window.location.reload();
  }

  




  return (
    
    <Navbar bg="dark" data-bs-theme="dark" collapseOnSelect expand="lg" className="bg-body-tertiary">
      {isAdmin && isAdmin === "not_connected" ? 
         <Container>
         <Navbar.Brand href="">Fusion Belka</Navbar.Brand>
         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
         <Navbar.Collapse id="responsive-navbar-nav">
           <Nav className="me-auto">
             <Nav.Link href="/histoire">Histoire</Nav.Link>
             <Nav.Link href="/Events">Evenement</Nav.Link>
             <Nav.Link href="/News">Actualité</Nav.Link>
           </Nav>
           <Nav>
             <Nav.Link href="/inscription">Inscription</Nav.Link>
             <Nav.Link  href="/connexion">Connexion </Nav.Link>
           </Nav>
         </Navbar.Collapse>
       </Container>
       :
        isAdmin && isAdmin === "admin" ?
        <Container>
        <Navbar.Brand href="">Fusion Belka</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/histoire">Histoire</Nav.Link>
            <Nav.Link href="/Events">Evenement</Nav.Link>
            <Nav.Link href="/News">Actualité</Nav.Link>
          </Nav>
         

          <Nav>
          <Nav.Link href="/GU">Admin</Nav.Link>
            <Button variant="link-dark" onClick={handleShow} >Créer une publication</Button>
            <Button variant="link-dark" onClick={handleShowEvent} >Créer un évènement</Button>
            </Nav>
            <Nav>
            <Button variant="link-dark" onClick={deconnexion} >Déconnexion</Button>

           </Nav>
        </Navbar.Collapse>
      </Container>
        :
        <Container>
        <Navbar.Brand href="">Fusion Belka</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/histoire">Histoire</Nav.Link>
            <Nav.Link href="/Events">Evenement</Nav.Link>
            <Nav.Link href="/News">Actualité</Nav.Link>
          </Nav>

          <Nav>
            <Button variant="link-dark" onClick={handleShow} >Créer une publication</Button>
            <Button variant="link-dark" onClick={handleShowEvent} >Créer un évènement</Button>
          </Nav>
          <Nav>
          <Button variant="link-dark" onClick={deconnexion} >Déconnexion</Button>

           </Nav>
        </Navbar.Collapse>
      </Container>

      }



      <Offcanvas show={show} onHide={handleClose} className="offcanvas offcanvas-start show text-bg-dark" >
        <Offcanvas.Header closeButton >
          <Offcanvas.Title>Votre publication</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <FormulairePublication   handleClose = {handleClose}></FormulairePublication>
        </Offcanvas.Body>
      </Offcanvas>

      <Offcanvas show={showEvent} onHide={handleCloseEvent} className="offcanvas offcanvas-start show text-bg-dark" >
        <Offcanvas.Header closeButton >
          <Offcanvas.Title>Votre Evenement</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <FormulaireEvent  handleCloseEvent = {()=> {handleCloseEvent()}}></FormulaireEvent>
        </Offcanvas.Body>
      </Offcanvas>
    </Navbar>
  )
}

export default NavBar