import axios from 'axios';
import { URl } from '../../src/Utils/Constant/URL';
import * as ACTION from '../../redux/reducers/reactionPubli';
import * as ACTIONP  from '../../redux/reducers/publications.tsx';




const recupMesLike = async (userId: any, dispatch: any) => {
    dispatch(ACTION.FETCH_START())
    const response = await  axios.get(URl.GET_REACTION_PUBLICATION_BY_ID_USER + userId);
    dispatch(ACTION.FETCH_SUCCESS(response.data.data))
}


const recupPubli = async (dispatch: any) => {
    dispatch(ACTION.FETCH_START())
    const response = await axios.get(URl.GET_ALL_PUBLICATION_VALID);
    dispatch(ACTIONP.FETCH_SUCCESS(response.data.data))
  }

const validerPublication = async (idPublication: number, dispatch: any) => {  

    dispatch(ACTIONP.FETCH_START())
    try {
        const valider = await axios.put(URl.UPDATE_PUBLICATION+idPublication);
        dispatch(ACTIONP.FETCH_SUCCESS(valider.data.result));
    } catch (e) {
        console.log(e);
    }  
}



const publier = ( formData: any) => {
    const enregistrer = async () => {
        try {
            await axios.post(URl.ADD_PUBLICATION, formData);        
        } catch (error) {
            console.log(error);
        }
    }
    enregistrer();
}


export {
    recupMesLike, validerPublication, publier, recupPubli
}