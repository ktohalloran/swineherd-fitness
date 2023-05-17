import { Cmd, Loop, loop } from "redux-loop";
import { ReadResource } from "../resource";
import { Path } from "../models";
import { Action } from "../actions";
import { PATH_ACTIONS, pathFetchSuccess, pathFetchFailure } from "../actions/pathFetch";
import { fetchPath } from "../api";

export type PathState = ReadResource<Path>

export const initialPathState: PathState = {
    status: "idle"
}

const pathReducer = (
    state: PathState = initialPathState,
    action: Action
) => {
    switch (action.type) {
        case PATH_ACTIONS.FETCH_ACTIVE_PATH:
            console.log("STARTED")
            return loop(
                {
                    status: "fetching"
                },
                Cmd.run(fetchPath, {
                    successActionCreator: pathFetchSuccess,
                    failActionCreator: pathFetchFailure
                })
            )
        case PATH_ACTIONS.FETCH_PATH_SUCCESS:
            console.log("SUCCESS")
            return {
                status: "success",
                result: action.payload
            }
        case PATH_ACTIONS.FETCH_PATH_FAILURE:
            console.log("FAILURE")
            return {
                status: "error",
                errorMessage: action.payload
            }
        default:
            return state
    }
};

export default pathReducer;