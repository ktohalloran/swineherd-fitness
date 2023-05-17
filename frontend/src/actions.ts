import { ActionType } from "typesafe-actions"
import * as pathActions from "./actions/pathFetch"

export type PathAction = ActionType<typeof pathActions>

export type Action = PathAction