import React, {Dispatch, SetStateAction} from "react";
import { findNewLocation } from "./Map/utils";

interface ButtonProps {
    readonly setMarker: Dispatch<SetStateAction<[number, number]>>
}

const AddMarkerButton = ({setMarker}: ButtonProps) => {
    return <button onClick={() => {
        const newLoc = findNewLocation([29.440461, 40.797462], 50)
        setMarker(newLoc as [number, number])
    }}>
        Click Me!
    </button>
}

export default AddMarkerButton