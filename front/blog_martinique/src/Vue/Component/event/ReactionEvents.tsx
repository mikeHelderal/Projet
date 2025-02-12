import  { useEffect, useState, useMemo } from 'react'
import { getReactEvents } from '../../../../services/selector/reactionEvents.selecteur.tsx';
import {getNbReactionEvent } from '../../../../services/selector/NbReactionEvent.selecteur.tsx'
import { RootStateEvent } from '../../../Utils/interfaces/reactEvents.interface.ts';
import { RootStateNbReactiontEvent } from '../../../Utils/interfaces/nbReactionEvent.interface.ts';
import { useDispatch, useSelector } from 'react-redux';
import { io } from "socket.io-client";
import * as ACTIONNBReactEvent from '../../../../redux/reducers/nbReactionEvent.tsx'
import { Badge, Button } from 'react-bootstrap';
import "../../../Styles/reaction.css";

import * as reactionEventService from '../../../../services/reactionEvent/reactionEvent.service.ts' 
import { URl } from '../../../Utils/Constant/URL.ts';


const ReactionEvents = (props: any) => {

    

    const socket = useMemo(() => io(URl.URL_BACK), []);
    const dispatch = useDispatch();
    const mes_reactions = useSelector((state: RootStateEvent) => getReactEvents(state));    
    const EventId = props.EventId;
    const userId = localStorage.getItem("UserId")
    const LIKE_ID = import.meta.env.REACT_APP_LIKE_ID;
    const UNLIKE_ID = import.meta.env.REACT_APP_UNLIKE_ID;

    const [nbReact, setNbReact] =useState(useSelector((state: RootStateNbReactiontEvent) => getNbReactionEvent(state)));

    useEffect( () => {
        const recup = async () => {
            reactionEventService.recupMesLike(userId, dispatch);
            const response = await reactionEventService.recupReactionEvent(EventId,dispatch);
            setNbReact(response);
        }
        recup();    
        
        const handleNbReactionUpdate = (response: any) => {
        if (JSON.stringify(response) !== JSON.stringify(nbReact)) {
            setNbReact(response);
            dispatch(ACTIONNBReactEvent.FETCH_SUCCESS(response));
        }
        };         
        socket.on("getNbReactionE", handleNbReactionUpdate);        
        return () => {
            socket.off("getNbReactionE", handleNbReactionUpdate);
        };
        }, [EventId, userId, nbReact, dispatch, socket]);
        

    const liker = async (eventId: any) => {
        if(mes_reactions.length == 0){
            await reactionEventService.ajoutReaction(eventId, mes_reactions, userId, LIKE_ID, dispatch) ;
        }else{
            await reactionEventService.updateById(eventId, mes_reactions, dispatch)   ;
        }
        await reactionEventService.recupMesLike(userId, dispatch);

    }

    
const unlike = async (eventId: any) => {
    if(mes_reactions.length == 0){
        await reactionEventService.ajoutReaction(eventId, mes_reactions, userId, UNLIKE_ID, dispatch) ;
    }else{
    await reactionEventService.updateById(eventId, mes_reactions,  dispatch);
    }
    await reactionEventService.recupMesLike(userId, dispatch);

}


    const styliserLike= (idEvent: number) => {
        if(mes_reactions){
            let maReaction = mes_reactions.filter( (like: any) => like.EventId === idEvent);  
            if(maReaction.length == 0){
                return false;
            }else{
                if(maReaction[0]?.TypeId == LIKE_ID){
                    return true;
                }else {
                    return false;
                }
            } 
        }else {
            return false;
        }       
    }
    

    const styliserUnlike= (idEvent: number) => {
        if(mes_reactions){
            let maReaction = mes_reactions.filter( (unlike: any) => unlike.EventId === idEvent);  
            if(maReaction.length == 0){
                return false;
            }else{
                if(maReaction[0]?.TypeId == UNLIKE_ID){
                    return true;
                }else {
                    return false;
                }   
            } 
        }else{
            return false ;
        }           
    }

/**
    const countReactions = (typeId: any) => {
        const reaction = nbReact.find((item: any) => item.EventId === EventId && item.TypeId === typeId);
        return reaction ? reaction.nombre : 0;
      };

*/


const counts = useMemo(() => {
    const initialCounts = { likes: 0, unlikes: 0 };
  
    if (nbReact.length !== 0) {
      const likeReaction = nbReact.find(
        (item: any) => item.PublicationId === EventId && item.TypeId === LIKE_ID
      );
      const unlikeReaction = nbReact.find(
        (item: any) => item.PublicationId === EventId && item.TypeId === UNLIKE_ID
      );
      console.log(likeReaction);
      return {
        likes: likeReaction ? likeReaction.nombre : 0,
        unlikes: unlikeReaction ? unlikeReaction.nombre : 0,
      };
    }
    return initialCounts;
  }, [nbReact, EventId, LIKE_ID, UNLIKE_ID]);



    const disabledButton = () => {
        if(userId){
            return false;
        }else{
            return true;
        }
    }      


return (
    <fieldset>
        <Button disabled= {disabledButton()} variant={styliserLike(EventId) ? 'success' : 'outline-success' }  onClick={() => {liker(EventId)}} >
        <Badge bg="success">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-emoji-grimace" viewBox="0 0 16 16">
<path d="M7 6.25c0 .69-.448 1.25-1 1.25s-1-.56-1-1.25S5.448 5 6 5s1 .56 1 1.25m3 1.25c.552 0 1-.56 1-1.25S10.552 5 10 5s-1 .56-1 1.25.448 1.25 1 1.25m2.98 3.25A1.5 1.5 0 0 1 11.5 12h-7a1.5 1.5 0 0 1-1.48-1.747v-.003A1.5 1.5 0 0 1 4.5 9h7a1.5 1.5 0 0 1 1.48 1.747zm-8.48.75h.25v-.75H3.531a1 1 0 0 0 .969.75m7 0a1 1 0 0 0 .969-.75H11.25v.75zm.969-1.25a1 1 0 0 0-.969-.75h-.25v.75zM4.5 9.5a1 1 0 0 0-.969.75H4.75V9.5zm1.75 2v-.75h-1v.75zm.5 0h1v-.75h-1zm1.5 0h1v-.75h-1zm1.5 0h1v-.75h-1zm1-2h-1v.75h1zm-1.5 0h-1v.75h1zm-1.5 0h-1v.75h1zm-1.5 0h-1v.75h1z"/>
<path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m0-1A7 7 0 1 1 8 1a7 7 0 0 1 0 14"/>
        </svg>
        </Badge>
        <br />
        <span>{counts.likes}</span>
    </Button>                
    <Button disabled= {disabledButton()} variant={styliserUnlike(EventId) ? 'danger' : 'outline-danger' }  onClick={() => {unlike(EventId)}}>
        <Badge bg="danger"> 
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-emoji-frown" viewBox="0 0 16 16">
<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
<path d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.5 3.5 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.5 4.5 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5"/>
        </svg>
        </Badge>
        <br />
        <span>{counts.unlikes}</span>
    </Button>
    
    </fieldset>
)
}

export default ReactionEvents