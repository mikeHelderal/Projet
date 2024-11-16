/* 
Cette dependences ets un outil qui permet de faciliter l'utilisation de redux.
*/
import { configureStore } from "@reduxjs/toolkit";
import reactionPubli from "./reducers/reactionPubli";
import commentair from "./reducers/commentair";
import nbReactPublication from "./reducers/nbReactionPublication";
import publications from "./reducers/publications";
import events from "./reducers/events";
import reactionEvents from "./reducers/reactionEvent"
import nbReactEvent from "./reducers/nbReactionEvent"
/* 
cONFIGUREsTORE PERMET DE CRÉER LE STORE plus simplement contrairement aux version précédentes de redux.

cette methode reçoit un objet en paramètre avec une propriété reducer qui utilise automatiquement combinerReducer.

La fonction configureStore se connecte automatiquement au DevTools

*/



export default configureStore({
  reducer: {
    reactionPubli: reactionPubli,
    commentair: commentair,
    nbReactionPublication: nbReactPublication,
    publications: publications,
    events: events,
    reactionEvents: reactionEvents,
    nbReactionEvent: nbReactEvent
  },
});