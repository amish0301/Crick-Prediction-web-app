import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import userSlice from "./slices/user";
import storage from "redux-persist/lib/storage";
import adminSlice from "./slices/admin";

// ROOT reducer
const rootReducer = combineReducers({
  user: userSlice.reducer,
  admin: adminSlice.reducer,
});


const persistConfig = {
  key: "CrickPrediction",
  storage, 
  whitelist: [userSlice.name,adminSlice.name], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export const clearLocalStorage = async () => {
  await persistor.purge();
  localStorage.removeItem("persist:CrickPrediction");
};
