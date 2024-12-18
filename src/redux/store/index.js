import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loginReducer from '../auth/authSlice'
import noteReducer from '../notes/notesSlice'
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
    key: "root",
    // storage: storageSession,
    whitelist: ["auth"],
    storage
};

const rootReducer = combineReducers({
    auth: loginReducer, note: noteReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger), // Correct the middleware setup
    devTools: true, // Optionally, you can enable devTools
});

export const persistor = persistStore(store);

export default store;
