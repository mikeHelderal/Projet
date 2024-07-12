export const getUser = (state: any) => {
    console.log(state.User.data);
    return state.User.data ;
}
export const getidUser = (state: any) => {

    return {userId : state.User.data.id}  ;
}