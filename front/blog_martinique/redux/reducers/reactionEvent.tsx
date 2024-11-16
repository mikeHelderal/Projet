import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {reactionEvents } from "../../src/Utils/interfaces/reactEvents.interface"
type initialReactEvents = {
  data: reactionEvents[];
  loading: boolean | null;
  error: boolean
}

const initialState: initialReactEvents = {
  data: [],
  loading: null,
  error: false
} 

export const Reseau = createSlice({
  name: "reaction_events",
  initialState,
  /* 
    C'EST ICI QUE LES "REDUCERS" sont définis.
    les "reducers" sont des fonctions qui decrivent comment l'état de l'application change en réponse à des actions.
    Dans ce cas, trois "reducers" sont definis:
    FETCH_START, FETCH_SUCCES et FETCH_FAILURE 
  */
  reducers: {
    FETCH_START: (draft: initialReactEvents) => {
      draft.loading = true
    }, 
    FETCH_SUCCESS: (draft: initialReactEvents, actions: PayloadAction<reactionEvents[]> ) => {
      draft.loading = false
      draft.data = actions.payload
    },
    FETCH_FAILURE: (draft: initialReactEvents) => {
      draft.loading = false
      draft.error = true
    },
    FETCH_UPDATE: (draft: initialReactEvents, actions: PayloadAction<reactionEvents>) => {
      draft.data = draft.data.map((item) => item.id === actions.payload.id ?  actions.payload: item)
    }
  }
})

export const {
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  FETCH_UPDATE
} = Reseau.actions

export default Reseau.reducer