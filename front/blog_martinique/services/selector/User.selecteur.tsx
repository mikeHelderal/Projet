export const getUser = (state: any) => {
    return state.User.data ;
}
export const getidUser = (state: any) => {

    return {userId : state.User.data.id}  ;
}