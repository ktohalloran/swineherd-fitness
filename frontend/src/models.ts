import { Feature, LineString } from "geojson"


export interface CheckpointDetails {
    readonly distanceBetweenCoords: number,
    readonly remainingDistance: number,
    readonly nextCheckpointIndex: number
}

export interface Path {
    readonly name: string,
    readonly geometry: Feature<LineString>,
    readonly isActive: boolean
}

export interface Contributor {
    readonly id: number,
    readonly name: string,
    readonly user_color: string
}
