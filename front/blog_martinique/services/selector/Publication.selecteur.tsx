export const getPublications = (state: any) => {
    return state.publications.data ;
}
export const getPublicationsAttenteByIdUser= (state: any, idUser: any) => {
    const result: any[] = [];
    const response = state.publications.data.map((item: any) => {
        if(item.UserId === idUser && item.is_valid === false){
            result.push(item)
        }
    })
    return result;
}

export const getPublicationValider = (state: any) => {
    const result: any[] = [];
    const response = state.publications.data.map((item: any) => {
        if( item.is_valid === true){
            result.push(item)
        }
    })
    return result

}