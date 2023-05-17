import { Cmd, LoopReducer, Loop, loop } from "redux-loop";
import { ReadResource } from "../resource";
import { Path } from "../models";
import { getType } from "typesafe-actions";
import { Action } from "../actions";
import { pathFetch, pathFetchFailure, pathFetchSuccess } from "../actions/pathFetch";
import { fetchPath } from "../api";

export type PathState = ReadResource<Path>

export const initialPathState: PathState = {
    status: "idle"
}

const pathReducer = (
    state: PathState = initialPathState,
    action: Action
): PathState | Loop<PathState> => {
    switch (action.type) {
        case getType(pathFetch):
            return loop(
                {
                    status: "fetching"
                },
                Cmd.run(fetchPath, {
                    successActionCreator: pathFetchSuccess,
                    failActionCreator: pathFetchFailure
                })
            );
        case getType(pathFetchSuccess):
            return {
                status: "success",
                result: action.payload
            }
        case getType(pathFetchFailure):
            return {
                status: "error",
                errorMessage: action.payload
            }
        default:
            return state
    }
};

export default pathReducer;