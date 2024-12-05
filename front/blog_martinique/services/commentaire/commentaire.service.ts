import axios from 'axios'
import * as ACTION from '../../redux/reducers/commentair.tsx';
import { URl } from '../../src/Utils/Constant/URL';



const recupComments = async (dispatch: any) => {
    const response = await axios.get(URl.GET_ALL_COMMENT);
    console.log(response);
    dispatch(ACTION.FETCH_SUCCESS(response.data.data))
}

const commenter = async (commentaire: any, dispatch: any) => {
    dispatch(ACTION.FETCH_START());
    try {
        await axios.post(URl.ADD_COMMENT, commentaire);
        //dispatch(ACTION.FETCH_SUCCESS( response.data.response))
        
    } catch (error) {
        
    }
}


export {recupComments, commenter}