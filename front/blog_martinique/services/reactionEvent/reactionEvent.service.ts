import { URl } from '../../src/Utils/Constant/URL';
import * as ACTIONReactEvent from '../../redux/reducers/reactionEvent';
import * as ACTIONNBReactEvent from '../../redux/reducers/nbReactionEvent'
import axios from 'axios';



const recupMesLike = async (userId: any, dispatch: any) => {
    const response = await axios.get(URl.GET_REACTION_EVENT_BY_ID_USER + userId);
    dispatch(ACTIONReactEvent.FETCH_SUCCESS(response.data.data))
}

const recupCountreact = async ( dispatch: any) => {
    dispatch(ACTIONNBReactEvent.FETCH_START());
    const response = await axios(URl.GET_ALL_REACTION_EVENT);
    dispatch(ACTIONNBReactEvent.FETCH_SUCCESS(response.data.data));
}


const recupReactionEvent= async(idEvent: any, dispatch: any) => {
    dispatch(ACTIONNBReactEvent.FETCH_START())  ;
    const response = await axios.get(URl.GET_NB_REACTION_EVENT+idEvent);
    dispatch(ACTIONNBReactEvent.FETCH_SUCCESS(response.data.data));
}



const liker = async (eventId: any, mes_reactions: any[], userId: any, LIKE_ID: any, UNLIKE_ID: any, dispatch: any) => {
    dispatch(ACTIONReactEvent.FETCH_START())      
    if(mes_reactions.length == 0){
        const leLike = {
            "EventId": eventId, 
            "UserId": userId,
            "TypeId": LIKE_ID 
        } 
        let response = await axios.post(URl.ADD_REACTION_EVENT, leLike);
        dispatch(ACTIONReactEvent.FETCH_SUCCESS([...mes_reactions, response.data.data]))
    }else{
        let maReaction = mes_reactions.filter( (like: any) => like.EventId === eventId);
        if(maReaction.length == 0){
            const leLike = {
                "EventId": eventId,
                "UserId": userId,
                "TypeId": LIKE_ID  
            } 
            let response = await axios.post(URl.ADD_REACTION_EVENT, leLike);
            dispatch(ACTIONReactEvent.FETCH_SUCCESS([...mes_reactions, response.data.data]))         
        }
        else{
            if(maReaction[0].TypeId == LIKE_ID){
                const result = await axios.delete(URl.DELETE_REACTION_EVENT + maReaction[0].id+"/"+maReaction[0].EventId);
                dispatch(ACTIONReactEvent.FETCH_SUCCESS(result .data.data))
            }
            else if(maReaction[0].TypeId == UNLIKE_ID){
                let response = await axios.put(URl.UPDATE_REACTION_EVENT_BY_ID + maReaction[0].id);
                dispatch(ACTIONReactEvent.FETCH_UPDATE(response.data.data))
            }
        }
    }         
    return 'tt'
}

const unlike = async (eventId: any, mes_reactions: any[], userId: any, LIKE_ID: any, UNLIKE_ID: any, dispatch: any) => {
dispatch(ACTIONReactEvent.FETCH_START())  
if(mes_reactions.length == 0){
    const leUnlike = {
        "EventId": eventId, 
        "UserId": userId,
        "TypeId": LIKE_ID 
} 
    let response = await axios.post(URl.ADD_REACTION_EVENT, leUnlike);
    dispatch(ACTIONReactEvent.FETCH_SUCCESS([...mes_reactions, response.data.data]))  
}else{
    let maReaction = mes_reactions.filter( (unlike: any) => unlike.EventId === eventId);
    if(maReaction.length == 0){
        const leUnlike = {
            "EventId": eventId,
            "UserId": userId,
            "TypeId": LIKE_ID  
        } 
        let response = await axios.post(URl.ADD_REACTION_EVENT, leUnlike);
        dispatch(ACTIONReactEvent.FETCH_SUCCESS([...mes_reactions, response.data.data]))       
    }
    else{
        if(maReaction[0].TypeId == UNLIKE_ID){
            const response = await axios.delete(URl.DELETE_REACTION_EVENT + maReaction[0].id);
            dispatch(ACTIONReactEvent.FETCH_SUCCESS(response.data.data))  
        }
        else if(maReaction[0].TypeId == LIKE_ID){            
            let response = await axios.put(URl.UPDATE_REACTION_EVENT_BY_ID +maReaction[0].id);
            dispatch(ACTIONReactEvent.FETCH_UPDATE(response.data.data))
        } 
    }
}  
return 'tt'
}

export { recupMesLike, recupCountreact, liker, unlike, recupReactionEvent }
