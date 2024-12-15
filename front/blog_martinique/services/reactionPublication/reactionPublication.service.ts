import axios from 'axios';
import { URl } from '../../src/Utils/Constant/URL';
import * as ACTION from '../../redux/reducers/reactionPubli';
import * as ACTIONNBPUBLI from '../../redux/reducers/nbReactionPublication';




const recupMesLike = async (userId: any, dispatch: any) => {
    dispatch(ACTION.FETCH_START())  ;
    const response = await axios.get(URl.GET_REACTION_PUBLICATION_BY_ID_USER + userId);
    dispatch(ACTION.FETCH_SUCCESS(response.data.data))
}

const recupReactionPublication= async(idPublication: any, dispatch: any) => {
    dispatch(ACTIONNBPUBLI.FETCH_START())  ;
    const response = await axios.get(URl.GET_NB_REACTION_PUBLICATION+idPublication);
    dispatch(ACTIONNBPUBLI.FETCH_SUCCESS(response.data.data));
}



const recupCountreact = async ( dispatch: any) => {

    dispatch(ACTIONNBPUBLI.FETCH_START());
    const response = await axios(URl.GET_ALL_REACTION_PUBLICATION);
    dispatch(ACTIONNBPUBLI.FETCH_SUCCESS(response.data.data));
}

const liker = async (publicationId: any, mes_reactions: any[], userId: any, LIKE_ID: any, UNLIKE_ID: any, dispatch: any) => {


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
                await axios.delete(URl.DELETE_REACTION_PUBLICATION + maReaction[0].id);
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


const unlike = async (publicationId: any, mes_reactions: any[], userId: any, LIKE_ID: any, UNLIKE_ID: any, dispatch: any) => {


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
                await axios.delete(URl.DELETE_REACTION_PUBLICATION + maReaction[0].id);
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

export { recupMesLike, recupCountreact, liker, unlike , recupReactionPublication}