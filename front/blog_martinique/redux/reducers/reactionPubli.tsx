import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { reactionPubli } from "../../src/Utils/interfaces/reactPubli.interface"

type initialReactPubli = {
  data: reactionPubli[];
  loading: boolean | null;
  error: boolean
}

const initialState: initialReactPubli = {
  data: [],
  loading: null,
  error: false
} 

export const Reseau = createSlice({
  name: "reaction_publication",
  initialState,
  /* 
    C'EST ICI QUE LES "REDUCERS" sont définis.
    les "reducers" sont des fonctions qui decrivent comment l'état de l'application change en réponse à des actions.
    Dans ce cas, trois "reducers" sont definis:
    FETCH_START, FETCH_SUCCES et FETCH_FAILURE 
  */
  reducers: {
    FETCH_START: (draft: initialReactPubli) => {
      draft.loading = true
    }, 
    FETCH_SUCCESS: (draft: initialReactPubli, actions: PayloadAction<reactionPubli[]> ) => {
      draft.loading = false
      draft.data = actions.payload
    },
    FETCH_FAILURE: (draft: initialReactPubli) => {
      draft.loading = false
      draft.error = true
    },
    FETCH_UPDATE: (draft: initialReactPubli, actions: PayloadAction<reactionPubli>) => {
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