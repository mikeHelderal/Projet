



import { configureStore } from "@reduxjs/toolkit";
import reactionPubli from "./reducers/reactionPubli";
import commentair from "./reducers/commentair";
import nbReactPublication from "./reducers/nbReactionPublication";
import publications from "./reducers/publications";
import events from "./reducers/events";
import reactionEvents from "./reducers/reactionEvent"
import nbReactEvent from "./reducers/nbReactionEvent"




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