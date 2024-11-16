import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {events } from "../../src/Utils/interfaces/events.interface"

type initialEvents = {
  data: events[];
  loading: boolean | null;
  error: boolean
}

const initialState: initialEvents = {
  data: [],
  loading: null,
  error: false
} 

export const Reseau = createSlice({
  name: "events",
  initialState,
  /* 
    C'EST ICI QUE LES "REDUCERS" sont définis.
    les "reducers" sont des fonctions qui decrivent comment l'état de l'application change en réponse à des actions.
    Dans ce cas, trois "reducers" sont definis:
    FETCH_START, FETCH_SUCCES et FETCH_FAILURE 
  */
  reducers: {
    FETCH_START: (draft: initialEvents) => {
      draft.loading = true
    }, 
    FETCH_SUCCESS: (draft: initialEvents, actions: PayloadAction<events[]> ) => {
      draft.loading = false
      draft.data = actions.payload
    },
    FETCH_FAILURE: (draft: initialEvents) => {
      draft.loading = false
      draft.error = true
    },
    FETCH_UPDATE: (draft: initialEvents, actions: PayloadAction<events>) => {
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