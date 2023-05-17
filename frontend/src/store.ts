import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers"

// TODO: Turn serializable check back on

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
})

export default store;