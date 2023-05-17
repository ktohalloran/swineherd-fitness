import { Feature } from "geojson"


export interface CheckpointDetails {
    readonly distanceBetweenCoords: number,
    readonly remainingDistance: number,
    readonly nextCheckpointIndex: number
}

export interface Path {
    readonly name: string,
    readonly geometry: Feature,
    readonly isActive: Boolean
}
