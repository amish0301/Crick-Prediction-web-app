import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  authToken: null,
  isLoading: false,
  refreshToken: null,
  verifyingMailWindowTime:
    parseInt(localStorage.getItem("verifyingMailWindowTime")) || 300,
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
      if (state.user) {
        state.user = { ...state.user, role: action.payload ? "admin" : "user" };
      }
    },

    removeToken: (state) => {
      state.authToken = null;
    },

    resetUserState: () => initialState,

    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setVerifyingMailWindowTime: (state, action) => {
      state.verifyingMailWindowTime = action.payload;
      localStorage.setItem("verifyingMailWindowTime", action.payload); // Store in localStorage
    },
    resetVerifyingMailWindowTime: (state) => {
      state.verifyingMailWindowTime = 300; // Reset to 300 seconds
      localStorage.setItem("verifyingMailWindowTime", 300); // Also reset in localStorage
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
  setVerifyingMailWindowTime,
  resetVerifyingMailWindowTime,
} = userSlice.actions;
export default userSlice;
