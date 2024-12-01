import { useEffect, useState } from 'react'
import { Badge, Button, Card, Container, Row, Col } from 'react-bootstrap'
import { useDispatch } from 'react-redux';

import "../../../Styles/CardT.css"


import Carousel from 'react-bootstrap/Carousel';
import ReactionEvents from './ReactionEvents.tsx';


import * as eventService from '../../../../services/event/event.service.ts' 


const CardEvent = (props : any) => {
  //const socket = io("http://localhost:8181");
  const mesEvenment = props.evenment; 
  const userId = localStorage.getItem("UserId")
  const dispatch = useDispatch();
  //const mes_reactions = useSelector((state: RootState) => getReactEvents(state));
  const [show, setShow] = useState(false);
  const [selecteur, setSelecteur]= useState(0);




  useEffect( () => {
    
    if(props.valid == true){
      eventService.recupMesLike(userId, dispatch);
    }
      

  },[])



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
                  <img className="img-fluid rounded" src={item.image} ></img>
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
                  <img className="img-fluid rounded" src={item.image} ></img>
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