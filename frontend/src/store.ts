import { applyMiddleware, configureStore, combineReducers, AnyAction, ThunkDispatch, Store } from "@reduxjs/toolkit";
import pathReducer from "./pathSlice"
import thunkMiddleware from "redux-thunk"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

// TODO: Turn serializable check back on

const composedEnhancer = applyMiddleware(thunkMiddleware)

const rootReducer = combineReducers({
    path: pathReducer
})


export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;

export type AppStore = Omit<Store<RootState, AnyAction>, "dispatch"> & {
  dispatch: AppDispatch;
};

const store = configureStore({
    reducer: {
        rootReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
    enhancers: [composedEnhancer]
})

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


export default store;