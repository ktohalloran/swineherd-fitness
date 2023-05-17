import { createAction } from "typesafe-actions";
import { Path} from "../models";

export const pathFetch = createAction("Fetch active path")();
export const pathFetchSuccess = createAction("Fetch active path success")<Path>();
export const pathFetchFailure = createAction("Fetch active path failure")<string>();
    