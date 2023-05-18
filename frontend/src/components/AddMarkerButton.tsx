import React, {Dispatch, SetStateAction} from "react";
import { findNewLocation } from "./Map/utils";
import { Path } from "../models";

interface ButtonProps {
    readonly setMarker: Dispatch<SetStateAction<mapboxgl.LngLatLike | null>>,
    readonly path: Path | null
}

// TODO: Replace with real data
const dummyCoordinate = [29.440461, 40.797462] as [number, number]
const dummyDistance = .05

const AddMarkerButton = ({setMarker, path}: ButtonProps) => {
    return <button onClick={() => {
        if (path) {
            const newLoc = findNewLocation(path, dummyCoordinate, dummyDistance)
            setMarker(newLoc as [number, number])
        } else {
            console.error("No path available")
        }
    }}>
        Click Me!
    </button>
}

export default AddMarkerButton