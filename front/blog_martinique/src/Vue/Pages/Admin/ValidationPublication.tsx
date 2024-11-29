import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { URl } from '../../../Utils/Constant/URL';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import CardEA from '../../Component/publication/CardEA.tsx';
import { useSelector } from 'react-redux';
import { RootStatePublications } from '../../../Utils/interfaces/publication.interface';
import { getPublicationsAttenteByIdUser} from "../../../../services/selector/Publication.selecteur.tsx"


const ValidationPublication = (props : any) => {

    // [publications, setPublications] = useState();

    const [show, setShow] = useState(false);
    const publications = useSelector((state: RootStatePublications) => getPublicationsAttenteByIdUser(state, props.UserId));

    useEffect( () => {
        publications.map((item: any)  => {
          })
    },[])

    const disabledButton = () => {
        if (publications.length === 0) {
            return true;
        }else{
            return false;
        }
    }
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
    <div>
        <div>
            <Button variant="danger" disabled={disabledButton()} onClick={handleShow} >voir </Button>
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