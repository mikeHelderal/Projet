

import { createSelector } from 'reselect';


export const getPublications = (state: any) => {
    return state.publications.data ;
}
export const getPublicationsAttenteByIdUser= (state: any, idUser: any) => {
    const result: any[] = [];
    state.publications.data.map((item: any) => {
        if(item.UserId === idUser && item.is_valid === false){
            result.push(item)
        }
    })
    return result;
}
/**
export const getPublicationValider = (state: any) => {
    const result: any[] = [];
    state.publications.data.map((item: any) => {
        if( item.is_valid === true){
            result.push(item)
        }
    })
    return result

}

*/
// Input selector : sélectionne les données brutes
const selectPublicationsData = (state: any) => state.publications.data;

// Output selector : applique le filtre et mémorise le résultat
export const getPublicationValider = createSelector(
    [selectPublicationsData],
    (data) => data.filter((item: any) => item.is_valid === true) // Filtre les publications validées
);