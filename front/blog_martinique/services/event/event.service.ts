import axios from 'axios';
import { URl } from '../../src/Utils/Constant/URL';
import * as ACTION from '../../redux/reducers/reactionEvent.tsx';
import * as ACTIONE  from '../../redux/reducers/events.tsx';




const recupEvents = async (dispatch :any) => {
    dispatch(ACTIONE.FETCH_START())
    const response = await axios.get(URl.GET_ALL_EVENTS);    
    dispatch(ACTIONE.FETCH_SUCCESS(response.data.data));

  }

const recupMesLike = async (userId: any, dispatch: any) => {
    dispatch(ACTION.FETCH_START())

    const response = await axios.get(URl.GET_REACTION_EVENT_BY_ID_USER + userId);
    dispatch(ACTION.FETCH_SUCCESS(response.data.data))
}


const validerEvent = async (idEvent: number, dispatch: any) => {  
    dispatch(ACTIONE.FETCH_START())
    try {
        const valider = await axios.put(URl.UPDATE_EVENT+idEvent);
        dispatch(ACTIONE.FETCH_SUCCESS(valider.data.result));
    } catch (e) {
        console.log(e);
    }
}

const publier = async (formData: any) => {
    const enregistrer = async() => {
        try {
            const response = await axios.post(URl.ADD_EVENTS, formData);
            return response.data ;
        } catch (error) {
            console.log(error);
            return error;
        } 
    }
    enregistrer();         
    
}


export { recupMesLike, validerEvent, publier, recupEvents }