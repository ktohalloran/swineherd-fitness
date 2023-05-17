import { createAction } from "@reduxjs/toolkit";
import { Path} from "../models";

export enum PATH_ACTIONS {
    FETCH_ACTIVE_PATH = "Fetch active path",
    FETCH_PATH_SUCCESS = "Fetch active path success",
    FETCH_PATH_FAILURE = "Fetch active path failure"
}

export const pathFetch = createAction<undefined>(PATH_ACTIONS.FETCH_ACTIVE_PATH);
export const pathFetchSuccess = createAction<Path>(PATH_ACTIONS.FETCH_PATH_SUCCESS);
export const pathFetchFailure = createAction<string>(PATH_ACTIONS.FETCH_PATH_FAILURE);

