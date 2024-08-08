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
  let test = [0];


  useEffect( () => {
    dispatch(ACTION.FETCH_START())
    const recupLike = async () => {
      const response = await axios.get(URl.GET_ALL_REACTION_PUBLICATION);
    }
    
    const recupMesLike = async () => {
      const response = await axios.get(URl.GET_REACTION_PUBLICATION_BY_ID_USER + userId);
      //setMesReactions([response.data.data]);
      dispatch(ACTION.FETCH_SUCCESS(response.data.data))
    }
    setMesPublication(props.publication);
    recupLike();
    recupMesLike();
    

  },[])

  const liker = async (publicationId: any) => {
    dispatch(ACTION.FETCH_START())      
    if(mes_reactions.length == 0){
      const leLike = {
                      "PublicationId": publicationId, 
                      "UserId": userId,
                      "TypeId": LIKE_ID 
      } 
      let response = await axios.post(URl.ADD_REACTION_PUBLICATION, leLike);
      dispatch(ACTION.FETCH_SUCCESS([...mes_reactions, response.data.data]))
    }else{
        let maReaction = mes_reactions.filter( (like) => like.PublicationId === publicationId);
        if(maReaction.length == 0){
          const leLike = {
            "PublicationId": publicationId,
            "UserId": userId,
            "TypeId": LIKE_ID  
          } 
          let response = await axios.post(URl.ADD_REACTION_PUBLICATION, leLike);
          dispatch(ACTION.FETCH_SUCCESS([...mes_reactions, response.data.data]))         
        }
        else{
          if(maReaction[0].TypeId == LIKE_ID){
            let response = await axios.delete(URl.DELETE_REACTION_PUBLICATION + maReaction[0].id);
            const tampon = mes_reactions.filter((like) => like.id !== maReaction[0].id);
            dispatch(ACTION.FETCH_SUCCESS(tampon))
          }
          else if(maReaction[0].TypeId == UNLIKE_ID){
            let response = await axios.put(URl.UPDATE_REACTION_PUBLICATION_BY_ID + maReaction[0].id);
            dispatch(ACTION.FETCH_UPDATE(response.data.data))
          }
        }
    }

   
    return 'tt'
  }

const unlike = async (publicationId: any) => {
  dispatch(ACTION.FETCH_START())      
  if(mes_reactions.length == 0){
    const leUnlike = {
                    "PublicationId": publicationId, 
                    "UserId": userId,
                    "TypeId": LIKE_ID 
    } 
    let response = await axios.post(URl.ADD_REACTION_PUBLICATION, leUnlike);
    dispatch(ACTION.FETCH_SUCCESS([...mes_reactions, response.data.dara]))

  }else{
      let maReaction = mes_reactions.filter( (unlike) => unlike.PublicationId === publicationId);
      if(maReaction.length == 0){
        const leUnlike = {
          "PublicationId": publicationId,
          "UserId": userId,
          "TypeId": LIKE_ID  
        } 
        let response = await axios.post(URl.ADD_REACTION_PUBLICATION, leUnlike);
        dispatch(ACTION.FETCH_SUCCESS([...mes_reactions, response.data.data]))       
      }
      else{
        if(maReaction[0].TypeId == UNLIKE_ID){
          let response = await axios.delete(URl.DELETE_REACTION_PUBLICATION + maReaction[0].id);
          const tampon = mes_reactions.filter((unlike) => unlike.id !== maReaction[0].id);
          dispatch(ACTION.FETCH_SUCCESS(tampon))

        }
        else if(maReaction[0].TypeId == LIKE_ID){
          const leUnlike = {
            "id" : maReaction[0].id ,
            "PublicationId": publicationId,
            "UserId": userId,
            "TypeId": LIKE_ID ,
            "createdAt": maReaction[0].createdAt,
            "updatedAt": maReaction[0].updatedAt,
          } 
          let response = await axios.put(URl.UPDATE_REACTION_PUBLICATION_BY_ID +maReaction[0].id);
          dispatch(ACTION.FETCH_UPDATE(response.data.data))
        }


      }
  }
  

  return 'tt'
}

const styliserLike= (idPublication: number) => {
  let maReaction = mes_reactions.filter( (like) => like.PublicationId === idPublication);  
  if(maReaction.length == 0){
    return false;
  }else{
    if(maReaction[0]?.TypeId == LIKE_ID){
      return true

    }else {
      return false;
    }
  } 

}

const styliserUnlike= (idPublication: number) => {
  let maReaction = mes_reactions.filter( (like) => like.PublicationId === idPublication);  
  if(maReaction.length == 0){
    return false;
  }else{
    if(maReaction[0]?.TypeId == UNLIKE_ID){
      return true;
    }else {
      return false;
    }
  } 

}

const afficherCom = (idPublication: number) => {
  console.log("afficher com =>W ",selecteurCom);
  if(selecteurCom.includes(idPublication)){
    console.log("dans le selecteur");
    selecteurCom.splice(selecteurCom.indexOf(idPublication, 1));
    //return false
  }else{
    console.log("n'est pas dans le selecteur");
    setSelecteurCom([...selecteurCom, idPublication])
    //return true
  }
}

const RecupNbLike  = async  (publicationId: any) => {

      const result = await axios.get(URl.GET_NB_REACTION_PUBLICATION_BY_ID_PUBLICATION + publicationId);
      console.log("nb like =>",result.data.data);
      return result.data.data;
  
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