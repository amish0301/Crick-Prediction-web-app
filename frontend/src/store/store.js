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

// ROOT reducer
const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  // so on
});

const persistConfig = {
  key: "CrickPrediction",
  storage, 
  whitelist: [userSlice.name], 
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
