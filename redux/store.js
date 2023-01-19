import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import rootReducer from "./rootReducer";
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

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: [
    "cart",
    "savedProduct",
    "savedStore",
    "viewedProduct",
    "savedAddress",
    "user",
    "notification",
    "settings",
  ],
  blacklist: ["stores", "category", "banners", "order", "chat"],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers(rootReducer)
);

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
