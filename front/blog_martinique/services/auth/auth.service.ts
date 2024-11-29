import axios from 'axios';
import { URl } from '../../src/Utils/Constant/URL';
import React from 'react'
import { USER } from '../../src/Utils/Constant/Types';





    

const inscrire = async(user: USER) => {
    try {
        const response = await axios.post(URl.SIGNUP, user);
        return response;
    } catch (error) {
        return {id: "error", msg: "erreur lors de la connexion de l'utilisateur"};
    }

}

const connexion = async (user: USER) => {
    try {
        const response = await axios.post(URl.LOGIN, user);
        localStorage.setItem('UserId', response.data.id);
        localStorage.setItem("isAdmin",response.data.isAdmin );
        return response.data ; 
    } catch (error) {
        return {id: "erreur", msg: "erreur lors de la tentative de connexion  de l'utilisateur"};
    }
}
export {
    inscrire, connexion
}