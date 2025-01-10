import { useEffect, useState } from 'react'
import { Badge, Button, Card, Container, Row, Col,Image  } from 'react-bootstrap'
import { useDispatch } from 'react-redux';

import "../../../Styles/CardT.css"


import ReactionEvents from './ReactionEvents.tsx';
import * as imageService from '../../../../services/S3.service.ts'


import * as eventService from '../../../../services/event/event.service.ts' 


const CardEvent = (props : any) => {

  const userId = localStorage.getItem("UserId")
  const dispatch = useDispatch();
  const [monEvent, setMonEvent] = useState(props.monEvent)
  //const mes_reactions = useSelector((state: RootState) => getReactEvents(state));
  const [show, setShow] = useState(false);
  const [selecteur, setSelecteur]= useState(0);
  const [monImage, setMonImage] = useState("");





  useEffect( () => {
    
    
    setMonEvent(props.monEvent);
    const recupImage = async (img: any) => {
      const image = await imageService.getImageFromS3(img);
      if(image){   
        setMonImage(image);
      }
    }
    recupImage(monEvent.image)
    if(props.valid == true){
      eventService.recupMesLike(userId, dispatch);
    }
    
      

  },[monImage,monEvent])



const validerEvent = async (idEvent: number) => {

  eventService.validerEvent(idEvent, dispatch);

}




  return (
    <div>
      {props.valid == true ?
      <div>       
          <Card className='card'  bg='dark' text='light' border='dark' >
            <Card.Header className='text-center'><h1> {monEvent.title}</h1> </Card.Header>
              <Card.Body>
              <Container>
            <Row>
              <Col xs={12} md={4}>
                <h4>Date: <Badge bg="secondary">{monEvent.date_event}</Badge></h4>
              </Col>
              <Col xs={12} md={4}>
                <h4>Lieu: <Badge bg="secondary">{monEvent.adresse} {monEvent.ville}</Badge></h4>
              </Col>
              <Col xs={12} md={4}>
                <h4>Horraire: <Badge bg="secondary">de {monEvent.heure_debut} à {monEvent.heure_fin}</Badge></h4>
              </Col>
            </Row>
            <br />
            <br />
            <Row>
              <Col xs={12} md={8}>
                <Card.Text>{monEvent.resume}</Card.Text>
                <Button variant="danger" onClick={() => { setShow(!show); setSelecteur(monEvent.id); }}>
                  Voir Article
                </Button>
                {show && selecteur === monEvent.id ? <div>{monEvent.content}</div> : null}
              </Col>
              <Col xs={6} md={4}>
              <Image src={monImage} thumbnail  className="custom-image" fluid />
              </Col>
            </Row>
          </Container>                           
                
              </Card.Body>
              <Card.Footer>
                <ReactionEvents EventId = {monEvent.id}></ReactionEvents>
                <br></br>
              </Card.Footer> 
          </Card>
        
      </div>
      :

      <div>
      <Card className='card' bg='dark' text='light' border='danger'>
        <Card.Header className='text-center'>
          <h1>{monEvent.title}</h1>
        </Card.Header>
        <Card.Body>
          <Container>
            <Row>
              <Col xs={12} md={4}>
                <h4>Date: <Badge bg="secondary">{monEvent.date_event}</Badge></h4>
              </Col>
              <Col xs={12} md={4}>
                <h4>Lieu: <Badge bg="secondary">{monEvent.adresse} {monEvent.ville}</Badge></h4>
              </Col>
              <Col xs={12} md={4}>
                <h4>Horraire: <Badge bg="secondary">de {monEvent.heure_debut} à {monEvent.heure_fin}</Badge></h4>
              </Col>
            </Row>
            <br />
            <br />
            <Row>
              <Col xs={12} md={8}>
                <Card.Text>{monEvent.resume}</Card.Text>
                <Button variant="danger" onClick={() => { setShow(!show); setSelecteur(monEvent.id); }}>
                  Voir Article
                </Button>
                {show && selecteur === monEvent.id ? <div>{monEvent.content}</div> : null}
              </Col>
              <Col xs={6} md={4}>
              <Image src={monImage} thumbnail  className="custom-image" fluid />
              </Col>
            </Row>
          </Container>
        </Card.Body>
        <Card.Footer>
          <Button variant="danger" onClick={() => { validerEvent(monEvent.id); }}>Valider</Button>
        </Card.Footer>
      </Card>
    </div>
      }
    </div>
  )
}

export default CardEvent