import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { nbReactionEvent } from "../../src/Utils/interfaces/nbReactionEvent.interface"

type initialNbReactionEvent = {
  data: nbReactionEvent[];
  loading: boolean | null;
  error: boolean
}

const initialState: initialNbReactionEvent = {
  data: [],
  loading: null,
  error: false
} 

export const Reseau = createSlice({
  name: "nbReactEvent",
  initialState,
  /* 
    C'EST ICI QUE LES "REDUCERS" sont définis.
    les "reducers" sont des fonctions qui decrivent comment l'état de l'application change en réponse à des actions.
    Dans ce cas, trois "reducers" sont definis:
    FETCH_START, FETCH_SUCCES et FETCH_FAILURE 
  */
  reducers: {
    FETCH_START: (draft: initialNbReactionEvent) => {
      draft.loading = true
    }, 
    FETCH_SUCCESS: (draft: initialNbReactionEvent, actions: PayloadAction<nbReactionEvent[]> ) => {
      draft.loading = false
      draft.data = actions.payload
    },
    FETCH_FAILURE: (draft: initialNbReactionEvent) => {
      draft.loading = false
      draft.error = true
    },
    FETCH_UPDATE: (draft: initialNbReactionEvent, actions: PayloadAction<nbReactionEvent>) => {
      draft.data = draft.data.map((item) => item === actions.payload ?  actions.payload: item)
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