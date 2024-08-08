import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { commentair } from "../../src/Utils/interfaces/commentaire.interface"

type initialCom = {
  data: commentair[];
  loading: boolean | null;
  error: boolean
}

const initialState: initialCom = {
  data: [],
  loading: null,
  error: false
} 

export const Reseau = createSlice({
  name: "commentair",
  initialState,
  /* 
    C'EST ICI QUE LES "REDUCERS" sont définis.
    les "reducers" sont des fonctions qui decrivent comment l'état de l'application change en réponse à des actions.
    Dans ce cas, trois "reducers" sont definis:
    FETCH_START, FETCH_SUCCES et FETCH_FAILURE 
  */
  reducers: {
    FETCH_START: (draft: initialCom) => {
      draft.loading = true
    }, 
    FETCH_SUCCESS: (draft: initialCom, actions: PayloadAction<commentair[]> ) => {
      draft.loading = false
      draft.data = actions.payload
    },
    FETCH_FAILURE: (draft: initialCom) => {
      draft.loading = false
      draft.error = true
    },
    FETCH_UPDATE: (draft: initialCom, actions: PayloadAction<commentair>) => {
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