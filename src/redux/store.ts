import { configureStore, combineReducers } from "@reduxjs/toolkit";
import appDataReducer from "./appDataSlice";
import userDataReducer from "./userDataSlice";

import { persistReducer, persistStore, createMigrate } from "redux-persist";
import storage from "redux-persist/lib/storage";

// defining migrate method
const migrations = {
  3: (state: any) => {
    return {
      ...state,
    };
  },
};

// 1. Redux Persist configuration
const persistConfig = {
  key: "root",
  version: 3,
  storage,
  whitelist: ["userData", "appData"],
  migrate: createMigrate(migrations, { debug: false }),
};

// 2. Combine reducers
const rootReducer = combineReducers({
  appData: appDataReducer,
  userData: userDataReducer,
});

// 3. Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. Configure the store with the persisted reducer
export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore actions or paths that are non-serializable
        ignoredActions: ["persist/PERSIST"], // You can also add specific actions here
        ignoredPaths: ["register"], // You can add paths that might be non-serializable
      },
    }),
});

// original persistor
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
