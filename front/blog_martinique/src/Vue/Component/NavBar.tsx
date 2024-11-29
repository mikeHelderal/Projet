import React, { useEffect, useState } from 'react'
import { Button, Offcanvas  } from 'react-bootstrap';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import "../../Styles/NavBar.css";
import FormulairePublication from './publication/FormulairePublication';
import FormulaireEvent from './event/FormulaireEvent';

import Alerte from "../Component/Alerte.tsx"

const NavBar = () => {



  const [show, setShow] = useState(false);
  const [showEvent, setShowEvent] = useState(false);
  const [isAdmin , setisAdmin] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [msg, setMsg] = useState("");
  const [variantAlert, setVariantAlert] = useState("");


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


  const afficherAlert = (msg: any, variant: any) => {
    setShowAlert(true);
    setMsg(msg);
    setVariantAlert(variant);
    setTimeout(() => {
      setShowAlert(false);
      }, 3000);
  }


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

  const disabledButton = () => {
    if (isAdmin == "not_connected" ) {
        return true;
    }else{
        return false;
    }
   }




  return (
    
    <Navbar bg="dark" data-bs-theme="dark" collapseOnSelect expand="lg" className="bg-body-tertiary">
      {isAdmin && isAdmin === "not_connected" ? 
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
             <Nav.Link href="/blogMartinique/inscription">Inscription</Nav.Link>
             <Nav.Link  href="/blogMartinique/connexion">Connexion </Nav.Link>
           </Nav>
         </Navbar.Collapse>
       </Container>
       :
        isAdmin && isAdmin === "admin" ?
        <Container>
        <Navbar.Brand href="/blogMartinique">Fusion Belka</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/blogMartinique/histoire">Histoire</Nav.Link>
            <Nav.Link href="/blogMartinique/Events">Evenement</Nav.Link>
            <Nav.Link href="/blogMartinique/News">Actualité</Nav.Link>
          </Nav>
          <div>  
                    <Alerte show={true} message={msg} variant="success"></Alerte>
          </div>


          <Nav>
          <Nav.Link href="/blogMartinique/GU">Admin</Nav.Link>
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
        <Navbar.Brand href="/blogMartinique">Fusion Belka</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/blogMartinique/histoire">Histoire</Nav.Link>
            <Nav.Link href="/blogMartinique/Events">Evenement</Nav.Link>
            <Nav.Link href="/blogMartinique/News">Actualité</Nav.Link>
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
          <FormulairePublication afficherAlert = {afficherAlert}  handleClose = {handleClose}></FormulairePublication>
        </Offcanvas.Body>
      </Offcanvas>

      <Offcanvas show={showEvent} onHide={handleCloseEvent} className="offcanvas offcanvas-start show text-bg-dark" >
        <Offcanvas.Header closeButton >
          <Offcanvas.Title>Votre Evenement</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <FormulaireEvent afficherAlert = {afficherAlert} handleCloseEvent = {()=> {handleCloseEvent()}}></FormulaireEvent>
        </Offcanvas.Body>
      </Offcanvas>
    </Navbar>
  )
}

export default NavBar