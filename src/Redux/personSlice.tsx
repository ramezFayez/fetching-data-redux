import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Person } from "../types";

import axios from "axios";

export const getPersons = createAsyncThunk(
  "persons/fetching",
  async (persons) => {
    const res = await axios.get("https://randomuser.me/api/?results=10");
    return res.data.results as Person[];
  }
);

const list: Person[] = [];

export const personSlice = createSlice({
  name: "persons",
  initialState: {
    list,
    pending: false,
    error: false,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPersons.fulfilled, (state, action) => {
      return { ...state, list: action.payload };
      //or use  ---->   return { list: action.payload, pending: false, error: false };
      //or use  ---->   state.list.push(...action.payload)
    });
  },
});

export const {} = personSlice.actions;

export const selectpersons = (state: RootState) => state.persons.list;

export default personSlice.reducer;
