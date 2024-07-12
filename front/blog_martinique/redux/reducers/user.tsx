import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../src/Utils/interfaces/user.interface"

type initialUser = {
  data: User[];
  loading: boolean | null;
  error: boolean
}

const initialState: initialUser = {
  data: [],
  loading: null,
  error: false
} 

export const Reseau = createSlice({
  name: "User",
  initialState,
  /* 
    C'EST ICI QUE LES "REDUCERS" sont définis.
    les "reducers" sont des fonctions qui decrivent comment l'état de l'application change en réponse à des actions.
    Dans ce cas, trois "reducers" sont definis:
    FETCH_START, FETCH_SUCCES et FETCH_FAILURE 
  */
  reducers: {
    FETCH_START: (draft: initialUser) => {
      draft.loading = true
    }, 
    FETCH_SUCCES: (draft: initialUser, actions: PayloadAction<User[]> ) => {
      draft.loading = false
      draft.data = actions.payload
    },
    FETCH_FAILURE: (draft: initialUser) => {
      draft.loading = false
      draft.error = true
    }
  }
})

export const {
  FETCH_START,
  FETCH_SUCCES,
  FETCH_FAILURE
} = Reseau.actions

export default Reseau.reducer