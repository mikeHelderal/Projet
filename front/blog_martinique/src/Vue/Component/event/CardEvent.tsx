import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Badge, Button, Card, Container, Row, Col } from 'react-bootstrap'
import { URl } from '../../../Utils/Constant/URL.ts';
import { io } from "socket.io-client";
import { useDispatch } from 'react-redux';

import "../../../Styles/CardT.css"


import Carousel from 'react-bootstrap/Carousel';
import ReactionEvents from './ReactionEvents.tsx';


import * as eventService from '../../../../services/event/event.service.ts' 


const CardEvent = (props : any) => {
  //const socket = io("http://localhost:8181");
  const mesEvenment = props.evenment; 
  const userId = localStorage.getItem("UserId")
  const LIKE_ID = 1;
  const UNLIKE_ID = 2;
  const dispatch = useDispatch();
  //const mes_reactions = useSelector((state: RootState) => getReactEvents(state));
  const [show, setShow] = useState(false);
  const [selecteur, setSelecteur]= useState(0);

  const [showCom, setShowCom] = useState(false);
  const [selecteurCom, setSelecteurCom] = useState<Number[]>([0]);

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };


  useEffect( () => {
    
    if(props.valid == true){
      eventService.recupMesLike(userId, dispatch);
    }
      

  },[])


const afficherCom = (idEvent: number) => {
  if(selecteurCom.includes(idEvent)){
    selecteurCom.splice(selecteurCom.indexOf(idEvent, 1));
    //return false
  }else{
    setSelecteurCom([...selecteurCom, idEvent])
    //return true
  }
}

const validerEvent = async (idEvent: number) => {

  eventService.validerEvent(idEvent, dispatch);

}




  return (
    <div>
      {props.valid == true ?
      <div>        
        {mesEvenment && mesEvenment.map((item: any, index: any) => (
          <Card className='card' key={index} bg='dark' text='success' border='danger' >
            <Card.Header className='text-center'><h1> {item.title}</h1> </Card.Header>
              <Card.Body>
              <Container>
                <Row>
                  <Col><h4>Date : <Badge bg="secondary">{item.date_event}</Badge></h4></Col>
                  <Col><h4> Lieu : <Badge bg="secondary">{item.adresse} {item.ville}</Badge></h4></Col>
                  <Col><h4> Horraire : <Badge bg="secondary">de {item.heure_debut} à {item.heure_fin}</Badge></h4></Col>
                </Row> 
                <br /><br />               
                <Row>
                  <Col>
                    <Card.Text>{item.resume}</Card.Text>
                  </Col>                  
                  <Col>
                    <Carousel>
      <Carousel.Item>
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
                    </Carousel>
                  </Col>
                </Row>
              </Container>                              
                <Button variant="danger" onClick={() => {setShow(!show), setSelecteur(item.id)}}>voir Article</Button>
                { show && selecteur == item.id ?  <div> {item.content}  </div>          : null}
              </Card.Body>
              <Card.Footer>
                <ReactionEvents EventId = {item.id}></ReactionEvents>
                <br></br>
              </Card.Footer> 
          </Card>
        ))} 
      </div>
      :

      <div>
        {mesEvenment && mesEvenment.map((item: any, index: any) => (
          <Card className='card' key={index} bg='dark' text='success' border='danger' >
            <Card.Header className='text-center'><h1> {item.title}</h1> </Card.Header>
              <Card.Body>
              <Container>
                <Row>
                  <Col><h4>Date : <Badge bg="secondary">{item.date_event}</Badge></h4></Col>
                  <Col><h4> Lieu : <Badge bg="secondary">{item.adresse} {item.ville}</Badge></h4></Col>
                  <Col><h4> Horraire : <Badge bg="secondary">de {item.heure_debut} à {item.heure_fin}</Badge></h4></Col>
                </Row> 
                <br /><br />               
                <Row>
                  <Col>
                    <Card.Text>{item.resume}</Card.Text>
                  </Col>                  
                  <Col>
                    <Carousel>
      <Carousel.Item>
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
                    </Carousel>
                  </Col>
                </Row>
              </Container>
                <Button variant="danger" onClick={() => {setShow(!show), setSelecteur(item.id)}}>voir Article</Button>
                { show && selecteur == item.id ?  <div> {item.content}  </div>          : null}
              </Card.Body>
              <Card.Footer>
                  <br></br>
                  <Button variant="danger" onClick={() => {validerEvent(item.id)}} >valider</Button>
                  
              </Card.Footer>
          </Card>
        ))} 

      </div>
      }
    </div>
  )
}

export default CardEvent