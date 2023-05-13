import { mapPathGeoJSON } from "../../constants"
import { CheckpointDetails } from "../../models"

const pathCoords = mapPathGeoJSON.geometry.coordinates

const distanceCalc = (start: [number, number], end: [number, number]) => {
    return Math.sqrt((end[0] - start[0])**2 + (end[1] - start[1])**2)
}

const findNextCheckpoint = (nextCoordIndex: number, startingCoords: [number, number], givenDistance: number): CheckpointDetails => {
    // Recursive function for determining whether the given distance is more than the distance between
    // the starting coordinates and the next checkpoint in the pathCoords array. If not, steps through the
    // checkpoints subtracting the spent distance from the given distance until more than the given distance
    // has been traveled
    const distanceToNext = distanceCalc(startingCoords, pathCoords[nextCoordIndex] as [number, number])
    if (distanceToNext > givenDistance) {
        return {
            "distanceBetweenCoords": distanceToNext,
            "remainingDistance": givenDistance,
            "nextCheckpointIndex": nextCoordIndex
        }
    } else {
        const newGivenDistance = givenDistance - distanceToNext
        return findNextCheckpoint(nextCoordIndex + 1, pathCoords[nextCoordIndex] as [number, number], newGivenDistance)
    }
}

export const findNewLocation = (startingCoords: [number, number], givenDistance: number) => {
    // Uses the current progress coordinates and provided distance traveled to determine where
    // along the path to place the new current progress location
    // TODO #10: Replace dummy starting coordinates with current Progress
    // TODO improvement: Don't assume x2 > x1
    const nextCoordsinPathIndex = pathCoords.findIndex(coords => coords[0] > startingCoords[0])
    const checkPointDict = findNextCheckpoint(nextCoordsinPathIndex, startingCoords, givenDistance)
    const percentTraveled = (checkPointDict.distanceBetweenCoords - checkPointDict.remainingDistance)/checkPointDict.distanceBetweenCoords
    const newCoordsX = pathCoords[checkPointDict.nextCheckpointIndex-1][0]*percentTraveled
    const newCoordsY = pathCoords[checkPointDict.nextCheckpointIndex-1][1]*percentTraveled
    return [newCoordsX, newCoordsY]
}