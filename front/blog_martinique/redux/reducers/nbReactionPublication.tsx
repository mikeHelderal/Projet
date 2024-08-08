import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { nbReactionPublication } from "../../src/Utils/interfaces/nbReactionPublication.interface"

type initialNbReactionPublication = {
  data: nbReactionPublication[];
  loading: boolean | null;
  error: boolean
}

const initialState: initialNbReactionPublication = {
  data: [],
  loading: null,
  error: false
} 

export const Reseau = createSlice({
  name: "nbReactPublication",
  initialState,
  /* 
    C'EST ICI QUE LES "REDUCERS" sont définis.
    les "reducers" sont des fonctions qui decrivent comment l'état de l'application change en réponse à des actions.
    Dans ce cas, trois "reducers" sont definis:
    FETCH_START, FETCH_SUCCES et FETCH_FAILURE 
  */
  reducers: {
    FETCH_START: (draft: initialNbReactionPublication) => {
      draft.loading = true
    }, 
    FETCH_SUCCESS: (draft: initialNbReactionPublication, actions: PayloadAction<nbReactionPublication[]> ) => {
      draft.loading = false
      draft.data = actions.payload
    },
    FETCH_FAILURE: (draft: initialNbReactionPublication) => {
      draft.loading = false
      draft.error = true
    },
    FETCH_UPDATE: (draft: initialNbReactionPublication, actions: PayloadAction<nbReactionPublication>) => {
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