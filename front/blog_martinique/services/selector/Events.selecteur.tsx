export const getEvents = (state: any) => {
    return state.events.data ;
}
export const getEventsAttenteByIdUser= (state: any, idUser: any) => {
    const result: any[] = [];
    const response = state.events.data.map((item: any) => {
        if(item.UserId === idUser && item.is_valid === false){
            result.push(item)
        }
    })
    return result;
}

export const getEventsValider = (state: any) => {
    const result: any[] = [];
    const response = state.events.data.map((item: any) => {
        if( item.is_valid === true){
            result.push(item)
        }
    })
    return result

}