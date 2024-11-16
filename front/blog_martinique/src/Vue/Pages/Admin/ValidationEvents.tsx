import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import { RootStateEvents } from '../../../Utils/interfaces/events.interface';
import { getEvents, getEventsAttenteByIdUser } from '../../../../services/selector/Events.selecteur';
import CardEvent from '../../Component/CardEvent';


const ValidationEvents = (props : any) => {
   // [publications, setPublications] = useState();

   const [show, setShow] = useState(false);
   const events = useSelector((state: RootStateEvents) => getEventsAttenteByIdUser(state, props.UserId));

   useEffect( () => {
       
   },[])

   
 const handleClose = () => setShow(false);
 const handleShow = () => setShow(true);


 return (
   <div>
       <div>
           <Button variant="danger" onClick={handleShow} >voir </Button>
       </div>
       <div>
       <Modal show={show} fullscreen= {true} scrollable= {true} onHide={handleClose}>
           <Modal.Header closeButton>
               <Modal.Title>Modal heading</Modal.Title>
           </Modal.Header>
           <Modal.Body>
            <CardEvent evenment = {events} valid = {false}></CardEvent>
           </Modal.Body>
           <Modal.Footer>
           <Button variant="secondary" onClick={handleClose}>
               Close
           </Button>
           
           </Modal.Footer>
       </Modal>
       </div>
       
   </div>
 )
}


export default ValidationEvents