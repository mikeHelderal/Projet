import { useEffect, useState } from 'react'
import {  Button, Card, Container, Row, Col } from 'react-bootstrap'

import "../../../Styles/CardT.css";
import { useDispatch, } from 'react-redux';

import * as publicationService from '../../../../services/publication/publication.service.ts' 
import * as imageService from '../../../../services/S3.service.ts'

import Commentaires from './Commentaires.tsx';
import ReactionPublication from './ReactionPublication.tsx';




const CardEA = (props : any) => {
  const [maPublication, setMaPublication] = useState(props.maPublication);
  const [monImage, setMonImage] = useState("");

  const userId = localStorage.getItem("UserId")
  const dispatch = useDispatch();
  //const mes_reactions = useSelector((state: RootState) => getReactPubli(state));
  const [show, setShow] = useState(false);
  const [selecteur, setSelecteur]= useState(0);

  const [showCom, setShowCom] = useState(false);
  const [selecteurCom, setSelecteurCom] = useState<Number[]>([0]);


  useEffect( () => {
    setMaPublication(props.maPublication); 
    const recupImage = async (img: any) => {
      const image = await imageService.getImageFromS3(img);
      if(image){   
        setMonImage(image);
      }
    }  
    recupImage(maPublication.image);
    publicationService.recupMesLike(userId, dispatch)

  },[monImage, maPublication])


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
          <Card className='card'  bg='dark' text='light' border='dark' >
            <Card.Header className='text-center'><h1> {maPublication.title}</h1> </Card.Header>
              <Card.Body>
              <Container>               
                <Row>
                  <Col>
                    <Card.Text>{maPublication.resume}</Card.Text>
                  </Col>                  
                  <Col>
                      <img className="img-fluid rounded" src={monImage} ></img>
                  </Col>
                </Row>
              </Container> 
                <Button variant="danger" onClick={() => {setShow(!show), setSelecteur(maPublication.id)}}>voir Article</Button>
                { show && selecteur == maPublication.id ?  <div> {maPublication.content}  </div>          : null}
              </Card.Body>
              <Card.Footer>
                <ReactionPublication PublicationId = {maPublication.id}></ReactionPublication>
                <br></br>
                <Button variant="danger"  onClick={() => {setShowCom(!showCom), afficherCom(maPublication.id)}}>Commentaires</Button>
                  {selecteurCom.includes(maPublication.id) ? <div> affichage commentaire <Commentaires valid= {disabledButton()} PublicationId = {maPublication.id}  Commentaires = {maPublication.Comments}></Commentaires></div>
                  : null}
              </Card.Footer> 
          </Card>
      </div>
      :

      <div>
                  <Card className='card' bg='dark' text='light' border='danger' >
            <Card.Header className='text-center'><h1> {maPublication.title}</h1> </Card.Header>
              <Card.Body>
              <Container>               
                <Row>
                  <Col>
                    <Card.Text>{maPublication.resume}</Card.Text>
                  </Col> 
                </Row>
                <br></br>
                <Row>
                  <Col>
                    <Button variant="danger" onClick={() => {setShow(!show), setSelecteur(maPublication.id)}}>voir Article</Button>
                    { show && selecteur == maPublication.id ?  <div> {maPublication.content}  </div>          : null}
                  </Col>
                  <Col>
                      <img className="img-fluid rounded" src={monImage}></img>
                  </Col>
                </Row>
              </Container> 
              </Card.Body>
              <Card.Footer>
                  <br></br>
                  <Button variant="danger" onClick={() => {validerPublication(maPublication.id)}} >valider</Button>
                  
              </Card.Footer>
          </Card>
      </div>
      }
    </div>
  )
}

export default CardEA 