import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  authToken: null,
  isLoading: false,
  refreshToken: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userExists: (state, action) => {
      state.user = action.payload;
    },
    userNotExists: () => initialState,
    
    setToken: (state, action) => {
      state.authToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken
    },
    removeToken: (state) => {
      state.authToken = null;
    },
    resetUserState: () => initialState,
    
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { userExists, userNotExists, setToken, removeToken, resetUserState, setLoading } = userSlice.actions;
export default userSlice;