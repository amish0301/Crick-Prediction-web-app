import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    teamPlayers:[],
    mainPlayers:[],

};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setTeamPlayers: (state, action) => {
        state.teamPlayers = action.payload;
      },
    setMainPlayers: (state, action) => {
        state.mainPlayers = action.payload;
      },
  }
});

export const {
setTeamPlayers,
setMainPlayers
} = adminSlice.actions;
export default adminSlice;