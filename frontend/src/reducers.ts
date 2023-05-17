import { combineReducers } from "redux";
import pathReducer, { initialPathState, PathState } from "./reducers/pathFetch";

export interface State {
    readonly path: PathState
}

export const initialState: State = {
    path: initialPathState
}

export default combineReducers(
    {
        path: pathReducer
    }
)