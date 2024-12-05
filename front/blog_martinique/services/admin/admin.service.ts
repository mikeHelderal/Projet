import axios from 'axios';
import { URl } from '../../src/Utils/Constant/URL';


const getUsers = async () => {
    const response = await axios.get(URl.GET_ALL_USER);
    return response.data.data;
}

const passerAdmin = async (user: any) => {
    try {
        user.isAdmin = 1 ;
        const response = await axios.put(URl.UPDATE_USER+user.id, user);
        return response.data.data;
    } catch (error) {
        console.log(error);          
    }
  }

  const retirerAdmin = async (user: any) => {
    try {
        user.isAdmin = 0 ;
        const response = await axios.put(URl.UPDATE_USER+user.id, user);
        return response.data.data;
    } catch (error) {
        console.log(error);          
    }
  }

  export {getUsers, passerAdmin, retirerAdmin }