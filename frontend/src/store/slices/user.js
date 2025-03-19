import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  authToken: null,
  isLoading: false,
  refreshToken: null,
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
      state.refreshToken = action.payload.refreshToken;
    },

    setAdmin: (state, action) => {
      if (action.payload === true) {
        state.user.role = "admin";
      } else state.user.role = "user";
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

export const {
  userExists,
  userNotExists,
  setToken,
  removeToken,
  resetUserState,
  setLoading,
  setAdmin,
} = userSlice.actions;
export default userSlice;
