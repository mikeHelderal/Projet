import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getReactPubli } from '../../../services/selector/ReactionPubli.selecteur';
import * as ACTION from '../../../redux/reducers/reactionPubli';
import * as ACTIONNBPUBLI from '../../../redux/reducers/nbReactionPublication';
import axios from 'axios';
import { URl } from '../../Utils/Constant/URL';
import { RootState } from '../../Utils/interfaces/reactPubli.interface';
import { Badge, Button } from 'react-bootstrap';
import "../../Styles/reaction.css";
import { RootStateReaciontPublication } from '../../Utils/interfaces/nbReactionPublication.interface';

import { getNbReactionPublication } from '../../../services/selector/NbReactionPublication.selecteur';
import { io } from "socket.io-client";



const ReactionPublication = (props: any) => {


    const socket = io(URl.BACK);
    const dispatch = useDispatch();
    const mes_reactions = useSelector((state: RootState) => getReactPubli(state));

    const PublicationId = props.PublicationId;

    const userId = localStorage.getItem("UserId")
    const LIKE_ID = 1;
    const UNLIKE_ID = 2;

    const nbReactP = useSelector((state: RootStateReaciontPublication) => getNbReactionPublication(state));


    useEffect( () => {
        dispatch(ACTION.FETCH_START())  ;
        dispatch(ACTIONNBPUBLI.FETCH_START());
        
        const recupMesLike = async () => {
          const response = await axios.get(URl.GET_REACTION_PUBLICATION_BY_ID_USER + userId);
          //setMesReactions([response.data.data]);
          dispatch(ACTION.FETCH_SUCCESS(response.data.data))
        }

        const recupCountreact = async () => {
          const response = await axios(URl.GET_ALL_REACTION_PUBLICATION);
          dispatch(ACTIONNBPUBLI.FETCH_SUCCESS(response.data.data));
        }
        

        
        recupMesLike();
        recupCountreact();

        socket.on("connect", () => {
          socket.on('getNbReactionP', (response) => {
              dispatch(ACTIONNBPUBLI.FETCH_SUCCESS( response))
          })
      })


        
    
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

  return (
    <fieldset>
                <Button variant={styliserLike(PublicationId) ? 'success' : 'outline-success' }  onClick={() => {liker(PublicationId)}} >
                  <Badge bg="success">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-emoji-grimace" viewBox="0 0 16 16">
<path d="M7 6.25c0 .69-.448 1.25-1 1.25s-1-.56-1-1.25S5.448 5 6 5s1 .56 1 1.25m3 1.25c.552 0 1-.56 1-1.25S10.552 5 10 5s-1 .56-1 1.25.448 1.25 1 1.25m2.98 3.25A1.5 1.5 0 0 1 11.5 12h-7a1.5 1.5 0 0 1-1.48-1.747v-.003A1.5 1.5 0 0 1 4.5 9h7a1.5 1.5 0 0 1 1.48 1.747zm-8.48.75h.25v-.75H3.531a1 1 0 0 0 .969.75m7 0a1 1 0 0 0 .969-.75H11.25v.75zm.969-1.25a1 1 0 0 0-.969-.75h-.25v.75zM4.5 9.5a1 1 0 0 0-.969.75H4.75V9.5zm1.75 2v-.75h-1v.75zm.5 0h1v-.75h-1zm1.5 0h1v-.75h-1zm1.5 0h1v-.75h-1zm1-2h-1v.75h1zm-1.5 0h-1v.75h1zm-1.5 0h-1v.75h1zm-1.5 0h-1v.75h1z"/>
<path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m0-1A7 7 0 1 1 8 1a7 7 0 0 1 0 14"/>
                    </svg>
                  </Badge>
                  <br></br>
                  {nbReactP.map((item, index) => (
                    <span key={index} >
                      {item.Publicationid == props.PublicationId && item.TypeId == 1 ?
                      <span>{item.nombre}</span>
                      : null}
                      </span>
                  ))}
                 
                </Button>
                            
                <Button variant={styliserUnlike(PublicationId) ? 'danger' : 'outline-danger' }  onClick={() => {unlike(PublicationId)}}>
                  <Badge bg="danger"> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-emoji-frown" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
        <path d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.5 3.5 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.5 4.5 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5"/>
                    </svg>
                  </Badge>
                  <br></br>
                  {nbReactP.map((item, index) => (
                    <span key={index} >
                      {item.Publicationid == props.PublicationId && item.TypeId == 2 ?
                      <span>{item.nombre}</span>
                      : <span>    </span>}
                      </span>
                  ))}
                </Button>
                
                </fieldset>
  )
}

export default ReactionPublication