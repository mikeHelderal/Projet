import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { URl } from '../../../Utils/Constant/URL';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import CardEA from '../../Component/CardEA';


const ValidationPublication = (props : any) => {

    const [publications, setPublications] = useState();

    const [show, setShow] = useState(false);


    useEffect( () => {
        const getPublication = async () => {
            console.log("props => ", props.UserId);
            const response = await axios.get(URl.GET_ALL_PUBLICATION_EN_ATTENTE_BY_IDUSER+props.UserId);
            setPublications(response.data.data);
            console.log("response => ",response.data.data);

        };
        getPublication();
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
            <CardEA publication = {publications} valid= {false} ></CardEA>
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

export default ValidationPublication