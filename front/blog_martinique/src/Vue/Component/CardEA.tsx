import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Badge, Button, Card } from 'react-bootstrap'
import { URl } from '../../Utils/Constant/URL';
import "../../Styles/CardT.css";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from 'react-redux';
import * as ACTION from '../../../redux/reducers/reactionPubli';
import { RootState } from '../../Utils/interfaces/reactPubli.interface';
import { getReactPubli} from "../../../services/selector/ReactionPubli.selecteur.tsx"
import Commentaires from './Commentaires.tsx';
import ReactionPublication from './ReactionPublication.tsx';



const CardEA = (props : any) => {
  //const socket = io("http://localhost:8181");
  const [mesPublications, setMesPublication ] = useState();
  const userId = localStorage.getItem("UserId")
  const LIKE_ID = 1;
  const UNLIKE_ID = 2;
  const dispatch = useDispatch();
  const mes_reactions = useSelector((state: RootState) => getReactPubli(state));
  const [show, setShow] = useState(false);
  const [selecteur, setSelecteur]= useState(0);

  const [showCom, setShowCom] = useState(false);
  const [selecteurCom, setSelecteurCom] = useState<Number[]>([0]);


  useEffect( () => {
    dispatch(ACTION.FETCH_START())
    
    
    const recupMesLike = async () => {
      const response = await axios.get(URl.GET_REACTION_PUBLICATION_BY_ID_USER + userId);
      //setMesReactions([response.data.data]);
      dispatch(ACTION.FETCH_SUCCESS(response.data.data))
    }
    setMesPublication(props.publication);
    recupMesLike();
    

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




  return (
    <div>
      {mesPublications && mesPublications.map((item, index) => (
        <Card className='card' key={index} bg='dark' text='success' border='danger' >
          <Card.Header className='text-center'><h1> {item.title}</h1> </Card.Header>
            <Card.Body>
              <Card.Text>
                {item.resume}
              </Card.Text>
              <Button variant="danger" onClick={() => {setShow(!show), setSelecteur(item.id)}}>voir Article</Button>
              { show && selecteur == item.id ? 
                  <div>
                    {item.content}
                  </div>
                  : null}

            </Card.Body>
            <Card.Footer>
              <ReactionPublication PublicationId = {item.id}></ReactionPublication>
                <br></br>
                <Button variant="danger" onClick={() => {setShowCom(!showCom), afficherCom(item.id)}}>Commentaires</Button>
                {selecteurCom.includes(item.id) ? 
                  <div>
                    affichage commentaire
                    <Commentaires PublicationId = {item.id}  Commentaires = {item.Comments}></Commentaires>
                  </div>
                  : null}
            </Card.Footer>
        </Card>
     ))} 
    </div>
  )
}

export default CardEA 