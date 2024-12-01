

const URL_BACK = import.meta.env.REACT_APP_BACKEND_URL;

export const URl = {


    /////users
    LOGIN: `${URL_BACK}/api/user/login`,
    SIGNUP: `${URL_BACK}/api/user/signUp`,
    GET_ALL_USER: `${URL_BACK}/api/user/all`,
    GET_USER_BY_ID: `${URL_BACK}/api/user/get/`,
    UPDATE_USER: `${URL_BACK}/api/user/update/`,
    DELETE_BY_ID_USER: `${URL_BACK}/api/user/delete/`,


    



/** 
 * 
 * 
 * 
 * 
 * 
    ////////news
    ADD_NEWS: `${URL_BACK}/api/news/add`,
    GET_ALL_NEWS: `${URL_BACK}/api/news/all`,
    GET_NEWS_BY_ID: `${URL_BACK}/api/news/get/`,
    UPDATE_NEWS: `${URL_BACK}/api/news/update/`,
    DELETE_NEWS: `${URL_BACK}/api/news/delete/`,

    ///////neighbordhoods
    GET_ALL_NEIGHBORDHOOD: `${URL_BACK}/api/neighbhood/all`,
    GET_NEIGHBORDHOOD_BY_ID: `${URL_BACK}/api/neighbordhood/get/`,
    GET_CITY_OF_NEIGHBORDHOOD: `${URL_BACK}/api/neighbhood/city/`,
    DELETE_NEIGHBORDHOOD: `${URL_BACK}/api/neighbordhood/delete/`,

    //////cities 
    ADD_CITIES: `${URL_BACK}/api/city/add`,
    GET_ALL_CITIES: `${URL_BACK}/api/city/all`,
    GET_CITY_BY: `${URL_BACK}/api/city/get:`,
    GET_NEIGHBORHOOD_OF_CITY: `${URL_BACK}/api/city/getgetNeighbordhoods/`,
    DELETE_BY_ID_CITY: `${URL_BACK}/api/city/delete/`,


    /////////messages
    ADD_MESSAGE: `${URL_BACK}/api/messages/add`,
    GET_ALL_MESSAGES: `${URL_BACK}/api/messages/all`,
    GET_MESSAGE_BY_ID: `${URL_BACK}/api/messages/get/`,
    DELETE_MESSAGE: `${URL_BACK}/api/messages/delete/`,


    


    //////response
    ADD_RESPONSE: `${URL_BACK}/api/response/add`,
    GET_ALL_RESPONSE: `${URL_BACK}/api/response/all`,
    GET_RESPONSE_BY_ID: `${URL_BACK}/api/response/get/`,
    DELETE_RESPONSE: `${URL_BACK}/api/response/delete/`,






    ////////subjects
    ADD_SUBJECT: `${URL_BACK}/api/subject/add`,
    GET_ALL_SUBJECT: `${URL_BACK}/api/subject/all`,
    GET_SUBJECT_BY_ID: `${URL_BACK}/api/subject/get/`,
    UPDATE_SUBJECT: `${URL_BACK}/api/subject/update/`,
    DELETE_SUBJECT: `${URL_BACK}/api/subject/delete/`,




*/

    ///////comment
    ADD_COMMENT: `${URL_BACK}/api/comment/add`,
    GET_ALL_COMMENT: `${URL_BACK}/api/comment/all`,
    GET_COMMENT_BY_ID: `${URL_BACK}/api/comment/get/`,
    GET_COMMENT_BY_PUBLICATION: `${URL_BACK}/api/comment/get/publication/`,
    UPDATE_COMMENT: `${URL_BACK}/api/comment/update/`,
    DELETE_COMMENT: `${URL_BACK}/api/comment/delete/`,





    /////////events
    ADD_EVENTS: `${URL_BACK}/api/evenement/add`,
    GET_ALL_EVENTS: `${URL_BACK}/api/evenement/all`,
    GET_EVENT_BY_ID: `${URL_BACK}/api/evenement/get/`,
    UPDATE_EVENT: `${URL_BACK}/api/evenement/update/`,
    DELETE_EVENT: `${URL_BACK}/api/evenement/delete/`,
    







    ////////publications
    ADD_PUBLICATION: `${URL_BACK}/api/publication/add`,
    GET_ALL_PUBLICATION_VALID: `${URL_BACK}/api/publication/all`,
    GET_ALL_PUBLICATION_EN_ATTENTE: `${URL_BACK}/api/publication/all`,
    GET_ALL_PUBLICATION_EN_ATTENTE_BY_IDUSER: `${URL_BACK}/api/publication/all/attente/user/`,
    GET_PUBLICATION_BY_ID: `${URL_BACK}/api/publication/get/`,
    UPDATE_PUBLICATION: `${URL_BACK}/api/publication/update/`,
    DELETE_PUBLICATION: `${URL_BACK}/api/publication/delete/`,




    /////reaction_events
    ADD_REACTION_EVENT: `${URL_BACK}/api/reaction_events/add`,
    GET_ALL_REACTION_EVENT: `${URL_BACK}/api/reaction_events/all`,
    GET_REACTION_EVENT_BY_ID: `${URL_BACK}/api/reaction_events/get/`,
    GET_REACTION_EVENT_BY_ID_USER: `${URL_BACK}/api/reaction_events/getByUser/`,
    UPDATE_REACTION_EVENT_BY_ID: `${URL_BACK}/api/reaction_events/update/`,

    GET_NB_LIKE_BY_ID_EVENT: `${URL_BACK}/api/reaction_event/get/nblike/`,
    GET_NB_UNLIKE_BY_ID_EVENT: `${URL_BACK}/api/reaction_event/get/nbunlike/`,

    DELETE_REACTION_EVENT: `${URL_BACK}/api/reaction_events/delete/`,
    ///get/user/:id





    ///////reactions_publications
    ADD_REACTION_PUBLICATION: `${URL_BACK}/api/reaction_publication/add`,
    GET_ALL_REACTION_PUBLICATION: `${URL_BACK}/api/reaction_publication/all`,
    GET_REACTION_PUBLICATION_BY_ID: `${URL_BACK}/api/reaction_publication/`,
    UPDATE_REACTION_PUBLICATION_BY_ID: `${URL_BACK}/api/reaction_publication/update/`,
    DELETE_REACTION_PUBLICATION: `${URL_BACK}/api/reaction_publication/delete/`,
    GET_REACTION_PUBLICATION_BY_ID_USER: `${URL_BACK}/api/reaction_publication/get/user/`,

    GET_NB_LIKE_BY_ID_PUBLICATION: `${URL_BACK}/api/reaction_publication/get/nblike/`,
    GET_NB_UNLIKE_BY_ID_PUBLICATION: `${URL_BACK}/api/reaction_publication/get/nbunlike/`,






    ///////types
    GET_ALL_TYPE: `${URL_BACK}/api/type/all`,
    GET_TYPE_BY_ID: `${URL_BACK}/api/type/get/`,
    DELETE_TYPE: `${URL_BACK}/api/type/delete/`,






}

