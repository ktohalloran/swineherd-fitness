import { AnyAction, createSlice } from "@reduxjs/toolkit";
import { Path } from "./models";
import {AppDispatch, RootState} from "./store";
import axios from "axios";

export interface PathState {
    geometry: Path | null
}

const initialState: PathState = {
    geometry: null
}

export const pathSlice = createSlice({
    name: "path",
    initialState,
    reducers: {
        pathFetch: (state, action) => {
            state.geometry = action.payload
            console.log(state.geometry)
        }
    }
})

export const { pathFetch } = pathSlice.actions

export default pathSlice.reducer