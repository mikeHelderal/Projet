import { useEffect, useState } from 'react'
import {  Button, Card, Container, Row, Col } from 'react-bootstrap'

import { URl } from '../../../Utils/Constant/URL.ts';
import "../../../Styles/CardT.css";
import { useDispatch, } from 'react-redux';

import * as publicationService from '../../../../services/publication/publication.service.ts' 

import Commentaires from './Commentaires.tsx';
import ReactionPublication from './ReactionPublication.tsx';




const CardEA = (props : any) => {
  const mesPublications = props.publication; 
  const userId = localStorage.getItem("UserId")
  const dispatch = useDispatch();
  //const mes_reactions = useSelector((state: RootState) => getReactPubli(state));
  const [show, setShow] = useState(false);
  const [selecteur, setSelecteur]= useState(0);

  const [showCom, setShowCom] = useState(false);
  const [selecteurCom, setSelecteurCom] = useState<Number[]>([0]);


  useEffect( () => {
    publicationService.recupMesLike(userId, dispatch)
  },[])


const afficherCom = (idPublication: number) => {
  if(selecteurCom.includes(idPublication)){
    selecteurCom.splice(selecteurCom.indexOf(idPublication, 1));
    //return false
  }else{
    setSelecteurCom([...selecteurCom, idPublication])
    //return true
  }
}

const validerPublication = async (idPublication: number) => {
  publicationService.validerPublication(idPublication, dispatch);
}

const disabledButton = () => {
  
  if(userId){
    return false;
  }else{
    return true;
  }
}




  return (
    <div>
      {props.valid == true ?
      <div>        
        {mesPublications && mesPublications.map((item: any, index: any) => (
          <Card className='card' key={index} bg='dark' text='success' border='danger' >
            <Card.Header className='text-center'><h1> {item.title}</h1> </Card.Header>
              <Card.Body>
              <Container>               
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
                <ReactionPublication PublicationId = {item.id}></ReactionPublication>
                <br></br>
                <Button variant="danger" disabled= {disabledButton()} onClick={() => {setShowCom(!showCom), afficherCom(item.id)}}>Commentaires</Button>
                  {selecteurCom.includes(item.id) ? <div> affichage commentaire <Commentaires PublicationId = {item.id}  Commentaires = {item.Comments}></Commentaires></div>
                  : null}
              </Card.Footer> 
          </Card>
        ))} 
      </div>
      :

      <div>
        {mesPublications && mesPublications.map((item: any, index: any) => (
          <Card className='card' key={index} bg='dark' text='success' border='danger' >
            <Card.Header className='text-center'><h1> {item.title}</h1> </Card.Header>
              <Card.Body>
              <Container>               
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
                  <Button variant="danger" onClick={() => {validerPublication(item.id)}} >valider</Button>
                  
              </Card.Footer>
          </Card>
        ))} 

      </div>
      }
    </div>
  )
}

export default CardEA 